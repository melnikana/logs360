/*
 * Logs360 app - Class for Wazuh-API functions
 * Copyright (C) 2019 Logs360, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

// Require some libraries
import needle from 'needle';
import { pciRequirementsFile } from '../integration-files/pci-requirements';
import { gdprRequirementsFile } from '../integration-files/gdpr-requirements';
import { hipaaRequirementsFile } from '../integration-files/hipaa-requirements';
import { nistRequirementsFile } from '../integration-files/nist-requirements';
import { ElasticWrapper } from '../lib/elastic-wrapper';
import { getPath } from '../../util/get-path';
import { Monitoring } from '../monitoring';
import { ErrorResponse } from './error-response';
import { Parser } from 'json2csv';
import { getConfiguration } from '../lib/get-configuration';
import { log } from '../logger';
import { KeyEquivalence } from '../../util/csv-key-equivalence';
import { ApiErrorEquivalence } from '../../util/api-errors-equivalence';
import { cleanKeys } from '../../util/remove-key';
import { apiRequestList } from '../../util/api-request-list';
import * as ApiHelper from '../lib/api-helper';
import { Queue } from '../jobs/queue';
import querystring from 'querystring';
import fs from 'fs';
import path from 'path';
export class WazuhApiCtrl {
  /**
   * Constructor
   * @param {*} server
   */
  constructor(server) {
    this.queue = Queue;
    this.wzWrapper = new ElasticWrapper(server);
    this.monitoringInstance = new Monitoring(server, true);
    this.wazuhVersion = path.join(__dirname, '../wazuh-version.json');
  }

  /**
   * Returns if the wazuh-api configuration is working
   * @param {Object} req
   * @param {Object} reply
   * @returns {Object} status obj or ErrorResponse
   */
  async checkStoredAPI(req, reply) {
    try {
      // Get config from elasticsearch
      const api = await this.wzWrapper.getWazuhConfigurationById(req.payload);

      // Check Elasticsearch API errors
      if (api.error_code) {
        throw new Error('Não foi possível encontrar a entrada da API Logs360 no Elasticsearch.');
      }

      log('wazuh-api:checkStoredAPI', `${req.payload} existe`, 'debug');

      // Build credentials object for making a API Logs360 request
      const credInfo = ApiHelper.buildOptionsObject(api);

      // Fetch needed information about the cluster and the manager itself
      const response = await needle(
        'get',
        `${api.url}:${api.port}/manager/info`,
        {},
        credInfo
      );

      // Look for socket-related errors
      if (this.checkResponseIsDown(response)) {
        return ErrorResponse('ERROR3099', 3099, 500, reply);
      }

      // Store error and data fields from the API Logs360 into different variables
      const { body } = response;
      const { error, data, message } = body;

      // Check if the response has no errors (error code is zero and there is data)
      const validResponse = parseInt(error) === 0 && data;

      // If we have a valid response from the API Logs360
      if (validResponse) {
        const { name, cluster } = data;
        // Clear and update cluster information before being sent back to frontend
        delete api.cluster_info;
        const clusterEnabled = cluster.enabled === 'yes';
        api.cluster_info = {
          status: clusterEnabled ? 'enabled' : 'disabled',
          manager: name,
          node: cluster.node_name,
          cluster: clusterEnabled ? cluster.name : 'Disabled'
        };

        // Update cluster information in Elasticsearch .wazuh document
        await this.wzWrapper.updateWazuhIndexDocument(null, req.payload, {
          doc: { cluster_info: api.cluster_info }
        });

        // Hide API Logs360 password
        const copied = {...api};
        copied.secret = '****';

        return {
          statusCode: 200,
          data: copied,
          idChanged: req.idChanged || null
        };
      }

      // If we have an invalid response from the API Logs360
      throw new Error(message || `${api.url}:${api.port} is unreachable`);
    } catch (error) {
      log('wazuh-api:checkStoredAPI', error.message || error);
      if (error.code === 'EPROTO') {
        return {
          statusCode: 200,
          data: { password: '****', apiIsDown: true }
        };
      } else if (error.code === 'ECONNREFUSED') {
        return {
          statusCode: 200,
          data: { password: '****', apiIsDown: true }
        };
      } else {
        // Check if we can connect to a different API
        if (
          error &&
          error.body &&
          typeof error.body.found !== 'undefined' &&
          !error.body.found
        ) {
          try {
            const apis = await this.wzWrapper.getWazuhAPIEntries();
            for (const api of apis.hits.hits) {
              try {
                const options = ApiHelper.buildOptionsObject(api);

                options.password = Buffer.from(
                  api._source.api_password,
                  'base64'
                ).toString('ascii');

                const response = await needle(
                  'get',
                  `${api._source.url}:${api._source.api_port}/version`,
                  {},
                  options
                );

                if (this.checkResponseIsDown(response)) {
                  return ErrorResponse('ERROR3099', 3099, 500, reply);
                }

                if (
                  ((response || {}).body || {}).error === 0 &&
                  ((response || {}).body || {}).data
                ) {
                  req.payload = api._id;
                  req.idChanged = api._id;
                  return this.checkStoredAPI(req, reply);
                }
              } catch (error) {} // eslint-disable-line
            }
          } catch (error) {
            return ErrorResponse(error.message || error, 3020, 500, reply);
          }
        }
        return ErrorResponse(error.message || error, 3002, 500, reply);
      }
    }
  }

  /**
   * This perfoms a validation of API params
   * @param {Object} payload API params
   */
  validateCheckApiParams(payload) {
    if (!('user' in payload)) {
      return 'Parâmetro ausente: USUÁRIO DA API';
    }

    if (!('password' in payload) && !('id' in payload)) {
      return 'Parâmetro ausente: SENHA DA API API';
    }

    if (!('url' in payload)) {
      return 'Parâmetro ausente: URL da API';
    }

    if (!('port' in payload)) {
      return 'Parâmetro ausente: API PORT';
    }

    if (!payload.url.includes('https://') && !payload.url.includes('http://')) {
      return 'protocol_error';
    }

    return false;
  }

  /**
   * This check the wazuh-api configuration received in the POST body will work
   * @param {Object} req
   * @param {Object} reply
   * @returns {Object} status obj or ErrorResponse
   */
  async checkAPI(req, reply) {
    try {
      let apiAvailable = null;

      const notValid = this.validateCheckApiParams(req.payload);
      if (notValid) return ErrorResponse(notValid, 3003, 500, reply);
      log('wazuh-api:checkAPI', `${req.payload.id} is valid`, 'debug');
      // Check if a API Logs360 id is given (already stored API)
      if (req.payload && req.payload.id && !req.payload.password) {
        const data = await this.wzWrapper.getWazuhConfigurationById(
          req.payload.id
        );
        if (data) {
          apiAvailable = data;
        } else {
          log('wazuh-api:checkAPI', `API ${req.payload.id} not found`);
          return ErrorResponse(
            `The API ${req.payload.id} was not found`,
            3029,
            500,
            reply
          );
        }

        // Check if a password is given
      } else if (req.payload && req.payload.password) {
        apiAvailable = req.payload;
        apiAvailable.password = Buffer.from(
          req.payload.password,
          'base64'
        ).toString('ascii');
      }

      let response = await needle(
        'get',
        `${apiAvailable.url}:${apiAvailable.port}/version`,
        {},
        ApiHelper.buildOptionsObject(apiAvailable)
      );

      // Check wrong credentials
      if (parseInt(response.statusCode) === 401) {
        log('wazuh-api:checkAPI', `Wrong API Logs360 credentials used`);
        return ErrorResponse('Wrong credentials', 3004, 500, reply);
      }
      log(
        'wazuh-api:checkAPI',
        `${req.payload.id} credentials are valid`,
        'debug'
      );
      if (parseInt(response.body.error) === 0 && response.body.data) {
        response = await needle(
          'get',
          `${apiAvailable.url}:${apiAvailable.port}/agents/000`,
          {},
          ApiHelper.buildOptionsObject(apiAvailable)
        );

        if (!response.body.error) {
          const managerName = response.body.data.name;

          response = await needle(
            'get',
            `${apiAvailable.url}:${apiAvailable.port}/cluster/status`,
            {},
            ApiHelper.buildOptionsObject(apiAvailable)
          );

          if (!response.body.error) {
            log(
              'wazuh-api:checkStoredAPI',
              `API Logs360 response is valid`,
              'debug'
            );
            if (response.body.data.enabled === 'yes') {
              // If cluster mode is active
              response = await needle(
                'get',
                `${apiAvailable.url}:${apiAvailable.port}/cluster/node`,
                {},
                ApiHelper.buildOptionsObject(apiAvailable)
              );

              if (!response.body.error) {
                return {
                  manager: managerName,
                  node: response.body.data.node,
                  cluster: response.body.data.cluster,
                  status: 'enabled'
                };
              }
            } else {
              // Cluster mode is not active
              return {
                manager: managerName,
                cluster: 'Disabled',
                status: 'disabled'
              };
            }
          }
        }
      }

      const tmpMsg =
        ((response || {}).body || {}).message ||
        'Erro inesperado ao verificar a API Logs360';

      throw new Error(tmpMsg);
    } catch (error) {
      log('wazuh-api:checkAPI', error.message || error);
      if (error.code === 'EPROTO') {
        return ErrorResponse(
          'Protocolo incorreto sendo usado para conectar-se à API Logs360',
          3005,
          500,
          reply
        );
      }
      return ErrorResponse(error.message || error, 3005, 500, reply);
    }
  }

  /**
   * This get PCI requirements
   * @param {Object} req
   * @param {Object} reply
   * @returns {Array<Object>} requirements or ErrorResponse
   */
  async getPciRequirement(req, reply) {
    try {
      let pci_description = '';

      if (req.params.requirement === 'all') {
        if (!req.headers.id) {
          return pciRequirementsFile;
        }
        let api = await this.wzWrapper.getWazuhConfigurationById(
          req.headers.id
        );

        if (api.error_code > 1) {
          log(
            'wazuh-api:getPciRequirement',
            'Erro inesperado do Elasticsearch ou não pode se conectar'
          );
          // Can not connect to elasticsearch
          return ErrorResponse(
            'Erro inesperado do Elasticsearch ou não pode se conectar',
            3007,
            400,
            reply
          );
        } else if (api.error_code > 0) {
          log('wazuh-api:getPciRequirement', 'Credenciais não existem');
          // Credentials not found
          return ErrorResponse('Credenciais não existem', 3008, 400, reply);
        }

        const response = await needle(
          'get',
          `${api.url}:${api.port}/rules/pci`,
          {},
          ApiHelper.buildOptionsObject(api)
        );

        if ((((response || {}).body || {}).data || {}).items) {
          let PCIobject = {};
          for (const item of response.body.data.items) {
            if (typeof pciRequirementsFile[item] !== 'undefined')
              PCIobject[item] = pciRequirementsFile[item];
          }
          return PCIobject;
        } else {
          log(
            'wazuh-api:getPciRequirement',
            'Ocorreu um erro ao tentar analisar os requisitos do PCI DSS'
          );
          return ErrorResponse(
            'Ocorreu um erro ao tentar analisar os requisitos do PCI DSS',
            3009,
            400,
            reply
          );
        }
      } else {
        if (
          typeof pciRequirementsFile[req.params.requirement] !== 'undefined'
        ) {
          pci_description = pciRequirementsFile[req.params.requirement];
        }

        return {
          pci: {
            requirement: req.params.requirement,
            description: pci_description
          }
        };
      }
    } catch (error) {
      log('wazuh-api:getPciRequirement', error.message || error);
      return ErrorResponse(error.message || error, 3010, 400, reply);
    }
  }

  /**
   * This get GDPR Requirements
   * @param {Object} req
   * @param {Object} reply
   * @returns {Array<Object>} requirements or ErrorResponse
   */
  async getGdprRequirement(req, reply) {
    try {
      let gdpr_description = '';

      if (req.params.requirement === 'all') {
        if (!req.headers.id) {
          return gdprRequirementsFile;
        }
        const api = await this.wzWrapper.getWazuhConfigurationById(
          req.headers.id
        );

        // Checking for GDPR
        const version = await needle(
          'get',
          `${api.url}:${api.port}/version`,
          {},
          ApiHelper.buildOptionsObject(api)
        );

        const number = version.body.data;

        const major = number.split('v')[1].split('.')[0];
        const minor = number
          .split('v')[1]
          .split('.')[1]
          .split('.')[0];
        const patch = number
          .split('v')[1]
          .split('.')[1]
          .split('.')[1];

        if (
          (major >= 3 && minor < 2) ||
          (major >= 3 && minor >= 2 && patch < 3)
        ) {
          return {};
        }

        if (api.error_code > 1) {
          log(
            'wazuh-api:getGdprRequirement',
            'Erro inesperado do Elasticsearch ou não pode se conectar'
          );
          // Can not connect to elasticsearch
          return ErrorResponse(
            'Erro inesperado do Elasticsearch ou não pode se conectar',
            3024,
            400,
            reply
          );
        } else if (api.error_code > 0) {
          log('wazuh-api:getGdprRequirement', 'Credenciais não existem');
          // Credentials not found
          return ErrorResponse('Credenciais não existem', 3025, 400, reply);
        }

        const response = await needle(
          'get',
          `${api.url}:${api.port}/rules/gdpr`,
          {},
          ApiHelper.buildOptionsObject(api)
        );

        if ((((response || {}).body || {}).data || {}).items) {
          let GDPRobject = {};
          for (const item of response.body.data.items) {
            if (typeof gdprRequirementsFile[item] !== 'undefined')
              GDPRobject[item] = gdprRequirementsFile[item];
          }
          return GDPRobject;
        } else {
          log(
            'wazuh-api:getGdprRequirement',
            'Ocorreu um erro ao tentar analisar os requisitos de GDPR'
          );
          return ErrorResponse(
            'Ocorreu um erro ao tentar analisar os requisitos de GDPR',
            3026,
            400,
            reply
          );
        }
      } else {
        if (
          typeof gdprRequirementsFile[req.params.requirement] !== 'undefined'
        ) {
          gdpr_description = gdprRequirementsFile[req.params.requirement];
        }

        return {
          gdpr: {
            requirement: req.params.requirement,
            description: gdpr_description
          }
        };
      }
    } catch (error) {
      log('wazuh-api:getGdprRequirement', error.message || error);
      return ErrorResponse(error.message || error, 3027, 400, reply);
    }
  }

  checkResponseIsDown(response) {
    const responseBody = (response || {}).body || {};
    const responseError = responseBody.error || false;

    // Avoid "Error communicating with socket" like errors
    const socketErrorCodes = [1013, 1014, 1017, 1018, 1019];

    const isDown = socketErrorCodes.includes(responseError || 1);

    isDown &&
      log(
        'wazuh-api:makeRequest',
        'A API do Logs360 está online, mas o Logs360 ainda não está pronto'
      );

    return isDown;
  }

  /**
   * This get PCI requirements
   * @param {Object} req
   * @param {Object} reply
   * @returns {Array<Object>} requirements or ErrorResponse
   */
  async getHipaaRequirement(req, reply) {
    try {
      let hipaa_description = '';

      if (req.params.requirement === 'all') {
        if (!req.headers.id) {
          return hipaaRequirementsFile;
        }
        let api = await this.wzWrapper.getWazuhConfigurationById(
          req.headers.id
        );

        if (api.error_code > 1) {
          log(
            'wazuh-api:getHipaaRequirement',
            'Erro inesperado do Elasticsearch ou não pode conectar-se'
          );
          // Can not connect to elasticsearch
          return ErrorResponse(
            'Erro inesperado do Elasticsearch ou não pode conectar-se',
            3007,
            400,
            reply
          );
        } else if (api.error_code > 0) {
          log('wazuh-api:getHipaaRequirement', 'Credenciais não existem');
          // Credentials not found
          return ErrorResponse('Credenciais não existem', 3008, 400, reply);
        }

        const response = await needle(
          'get',
          `${api.url}:${api.port}/rules/hipaa`,
          {},
          ApiHelper.buildOptionsObject(api)
        );

        if ((((response || {}).body || {}).data || {}).items) {
          let HIPAAobject = {};
          for (const item of response.body.data.items) {
            if (typeof hipaaRequirementsFile[item] !== 'undefined')
              HIPAAobject[item] = hipaaRequirementsFile[item];
          }
          return HIPAAobject;
        } else {
          log(
            'wazuh-api:getPciRequirement',
            'Ocorreu um erro ao tentar analisar os requisitos HIPAA'
          );
          return ErrorResponse(
            'Ocorreu um erro ao tentar analisar os requisitos HIPAA',
            3009,
            400,
            reply
          );
        }
      } else {
        if (
          typeof hipaaRequirementsFile[req.params.requirement] !== 'undefined'
        ) {
          hipaa_description = hipaaRequirementsFile[req.params.requirement];
        }

        return {
          hipaa: {
            requirement: req.params.requirement,
            description: hipaa_description
          }
        };
      }
    } catch (error) {
      log('wazuh-api:getPciRequirement', error.message || error);
      return ErrorResponse(error.message || error, 3010, 400, reply);
    }
  }

  /**
   * This get NIST 800-53 requirements
   * @param {Object} req
   * @param {Object} reply
   * @returns {Array<Object>} requirements or ErrorResponse
   */
  async getNistRequirement(req, reply) {
    try {
      let nist_description = '';

      if (req.params.requirement === 'all') {
        if (!req.headers.id) {
          return nistRequirementsFile;
        }
        let api = await this.wzWrapper.getWazuhConfigurationById(
          req.headers.id
        );

        if (api.error_code > 1) {
          log(
            'wazuh-api:getNistRequirement',
            'Erro inesperado do Elasticsearch ou não pode conectar-se'
          );
          // Can not connect to elasticsearch
          return ErrorResponse(
            'Erro inesperado do Elasticsearch ou não pode conectar-se',
            3007,
            400,
            reply
          );
        } else if (api.error_code > 0) {
          log('wazuh-api:getNistRequirement', 'Credenciais não existem');
          // Credentials not found
          return ErrorResponse('Credenciais não existem', 3008, 400, reply);
        }

        const response = await needle(
          'get',
          `${api.url}:${api.port}/rules/nist-800-53`,
          {},
          ApiHelper.buildOptionsObject(api)
        );

        if ((((response || {}).body || {}).data || {}).items) {
          let NISTobject = {};
          for (const item of response.body.data.items) {
            if (typeof nistRequirementsFile[item] !== 'undefined')
              NISTobject[item] = nistRequirementsFile[item];
          }
          return NISTobject;
        } else {
          log(
            'wazuh-api:getNistRequirement',
            'Ocorreu um erro ao tentar analisar os requisitos do NIST 800-53'
          );
          return ErrorResponse(
            'Ocorreu um erro ao tentar analisar os requisitos do NIST 800-53',
            3009,
            400,
            reply
          );
        }
      } else {
        if (
          typeof nistRequirementsFile[req.params.requirement] !== 'undefined'
        ) {
          nist_description = nistRequirementsFile[req.params.requirement];
        }

        return {
          nist: {
            requirement: req.params.requirement,
            description: nist_description
          }
        };
      }
    } catch (error) {
      log('wazuh-api:getNistRequirement', error.message || error);
      return ErrorResponse(error.message || error, 3010, 400, reply);
    }
  }

  /**
   * Check main Wazuh daemons status
   * @param {*} api API entry stored in .wazuh
   * @param {*} path Optional. API Logs360 target path.
   */
  async checkDaemons(api, path) {
    try {
      const response = await needle(
        'GET',
        getPath(api) + '/manager/status',
        {},
        ApiHelper.buildOptionsObject(api)
      );

      const daemons = ((response || {}).body || {}).data || {};

      const isCluster =
        ((api || {}).cluster_info || {}).status === 'enabled' &&
        typeof daemons['wazuh-clusterd'] !== 'undefined';
      const wazuhdbExists = typeof daemons['wazuh-db'] !== 'undefined';

      const execd = daemons['ossec-execd'] === 'running';
      const modulesd = daemons['wazuh-modulesd'] === 'running';
      const wazuhdb = wazuhdbExists ? daemons['wazuh-db'] === 'running' : true;
      const clusterd = isCluster
        ? daemons['wazuh-clusterd'] === 'running'
        : true;

      const isValid = execd && modulesd && wazuhdb && clusterd;

      isValid && log('wazuh-api:checkDaemons', `Logs360 está pronto`, 'debug');

      if (path === '/ping') {
        return { isValid };
      }

      if (!isValid) {
        throw new Error('Logs360 ainda não está pronto');
      }
    } catch (error) {
      log('wazuh-api:checkDaemons', error.message || error);
      return Promise.reject(error);
    }
  }

  sleep(timeMs) {
    // eslint-disable-next-line
    return new Promise((resolve, reject) => {
      setTimeout(resolve, timeMs);
    });
  }

  /**
   * Helper method for Dev Tools.
   * https://documentation.wazuh.com/current/user-manual/api/reference.html
   * Depending on the method and the path some parameters should be an array or not.
   * Since we allow the user to write the request using both comma-separated and array as well,
   * we need to check if it should be transformed or not.
   * @param {*} method The request method
   * @param {*} path The API Logs360 path
   */
  shouldKeepArrayAsIt(method, path) {
    // Methods that we must respect a do not transform them
    const isAgentsRestart = method === 'POST' && path === '/agents/restart';
    const isActiveResponse =
      method === 'PUT' && path.startsWith('/active-response/');
    const isAddingAgentsToGroup =
      method === 'POST' && path.startsWith('/agents/group/');

    // Returns true only if one of the above conditions is true
    return isAgentsRestart || isActiveResponse || isAddingAgentsToGroup;
  }

  /**
   * This performs a request over API Logs360 and returns its response
   * @param {String} method Method: GET, PUT, POST, DELETE
   * @param {String} path API route
   * @param {Object} data data and params to perform the request
   * @param {String} id API id
   * @param {Object} reply
   * @returns {Object} API response or ErrorResponse
   */
  async makeRequest(method, path, data, id, reply) {
    const devTools = !!(data || {}).devTools;
    try {
      const api = await this.wzWrapper.getWazuhConfigurationById(id);

      if (devTools) {
        delete data.devTools;
      }

      if (api.error_code > 1) {
        log('wazuh-api:makeRequest', 'Não foi possível conectar-se ao Elasticsearch');
        //Can not connect to elasticsearch
        return ErrorResponse(
          'Não foi possível conectar-se ao Elasticsearch',
          3011,
          404,
          reply
        );
      } else if (api.error_code > 0) {
        log('wazuh-api:makeRequest', 'Credenciais não existem');
        //Credentials not found
        return ErrorResponse('Credenciais não existem', 3012, 404, reply);
      }

      if (!data) {
        data = {};
      }

      const options = ApiHelper.buildOptionsObject(api);

      // Set content type application/xml if needed
      if (
        typeof (data || {}).content === 'string' &&
        (data || {}).origin === 'xmleditor'
      ) {
        options.content_type = 'application/xml';
        data = data.content;
      }

      if (
        typeof (data || {}).content === 'string' &&
        (data || {}).origin === 'json'
      ) {
        options.content_type = 'application/json';
        data = data.content.replace(new RegExp('\\n', 'g'), '');
      }

      if (
        typeof (data || {}).content === 'string' &&
        (data || {}).origin === 'raw'
      ) {
        options.content_type = 'application/octet-stream';
        data = data.content;
      }
      const delay = (data || {}).delay || 0;
      let fullUrl = getPath(api) + path;
      if (delay) {
        const current = new Date();
        this.queue.addJob({
          startAt: new Date(current.getTime() + delay),
          type: 'request',
          method,
          fullUrl,
          data,
          options
        });
        return { error: 0, message: 'Success' };
      }

      if (path === '/ping') {
        try {
          const check = await this.checkDaemons(api, path);
          return check;
        } catch (error) {
          const isDown = (error || {}).code === 'ECONNREFUSED';
          if (!isDown) {
            log(
              'wazuh-api:makeRequest',
              'A API do Logs360 está online, mas o Logs360 ainda não está pronto'
            );
            return ErrorResponse('ERROR3099', 3099, 500, reply);
          }
        }
      }

      log('wazuh-api:makeRequest', `${method} ${fullUrl}`, 'debug');

      // Extract keys from parameters
      const dataProperties = Object.keys(data);

      // Transform arrays into comma-separated string if applicable.
      // The reason is that we are accepting arrays for comma-separated
      // parameters in the Dev Tools
      if (!this.shouldKeepArrayAsIt(method, path)) {
        for (const key of dataProperties) {
          if (Array.isArray(data[key])) {
            data[key] = data[key].join();
          }
        }
      }

      // DELETE must use URL query but we accept objects in Dev Tools
      if (method === 'DELETE' && dataProperties.length) {
        const query = querystring.stringify(data);
        fullUrl += fullUrl.includes('?') ? `&${query}` : `?${query}`;
        data = {};
      }

      const response = await needle(method, fullUrl, data, options);

      const responseIsDown = this.checkResponseIsDown(response);

      if (responseIsDown) {
        return ErrorResponse('ERROR3099', 3099, 500, reply);
      }

      const responseBody = (response || {}).body || {};
      const responseData = responseBody.data || false;
      const responseError = responseBody.error || false;

      if (!responseError && responseData) {
        cleanKeys(response);
        return response.body;
      }

      if (responseError && devTools) {
        return response.body;
      }

      throw responseError && responseBody.message
        ? { message: responseBody.message, code: responseError }
        : new Error('Erro inesperado ao obter dados da API Logs360');
    } catch (error) {
      log('wazuh-api:makeRequest', error.message || error);
      if (devTools) {
        return { error: '3013', message: error.message || error };
      } else {
        if ((error || {}).code && ApiErrorEquivalence[error.code]) {
          error.message = ApiErrorEquivalence[error.code];
        }
        return ErrorResponse(
          error.message || error,
          error.code ? `Erro na API do Logs360: ${error.code}` : 3013,
          500,
          reply
        );
      }
    }
  }

  /**
   * This performs a generic request and returs its response
   * @param {String} method Method: GET, PUT, POST, DELETE
   * @param {String} path API route
   * @param {Object} data data and params to perform the request
   * @param {String} id API id
   */
  async makeGenericRequest(method, path, data, id) {
    try {
      const api = await this.wzWrapper.getWazuhConfigurationById(id);

      if (api.error_code > 1) {
        //Can not connect to elasticsearch
        throw new Error('Não foi possível conectar-se ao Elasticsearch');
      } else if (api.error_code > 0) {
        //Credentials not found
        throw new Error('Credenciais não existem');
      }

      if (!data) {
        data = {};
      }

      const options = ApiHelper.buildOptionsObject(api);

      const fullUrl = getPath(api) + path;

      log('wazuh-api:makeGenericRequest', `${method} ${fullUrl}`, 'debug');
      const response = await needle(method, fullUrl, data, options);

      if (
        response &&
        response.body &&
        !response.body.error &&
        response.body.data
      ) {
        cleanKeys(response);
        return response.body;
      }

      throw ((response || {}).body || {}).error &&
      ((response || {}).body || {}).message
        ? { message: response.body.message, code: response.body.error }
        : new Error('Erro inesperado ao obter dados da API Logs360');
    } catch (error) {
      log('wazuh-api:makeGenericRequest', error.message || error);
      return Promise.reject(error);
    }
  }

  /**
   * This make a request to API
   * @param {Object} req
   * @param {Object} reply
   * @returns {Object} api response or ErrorResponse
   */
  requestApi(req, reply) {
    const configuration = getConfiguration();
    const adminMode = !(
      configuration &&
      typeof configuration.admin !== 'undefined' &&
      !configuration.admin
    );

    if (!req.payload.method) {
      return ErrorResponse('Parâmetro ausente: método', 3015, 400, reply);
    } else if (!req.payload.path) {
      return ErrorResponse('Parâmetro ausente: Caminho', 3016, 400, reply);
    } else {
      if (req.payload.method !== 'GET' && !adminMode) {
        log('wazuh-api:requestApi', 'Forbidden action, allowed methods: GET');
        return ErrorResponse(
          req.payload.body && req.payload.body.devTools
            ? 'Allowed method: [GET]'
            : `Forbidden (${req.payload.method} ${req.payload.path}`,
          3029,
          400,
          reply
        );
      }
      if (req.payload.body.devTools) {
        //delete req.payload.body.devTools;
        const keyRegex = new RegExp(/.*agents\/\d*\/key.*/);
        if (
          typeof req.payload.path === 'string' &&
          keyRegex.test(req.payload.path) &&
          !adminMode
        ) {
          log('wazuh-api:makeRequest', 'Forbidden route /agents/:id/key');
          return ErrorResponse(
            'Forbidden route /agents/:id/key',
            3028,
            400,
            reply
          );
        }
      }
      return this.makeRequest(
        req.payload.method,
        req.payload.path,
        req.payload.body,
        req.payload.id,
        reply
      );
    }
  }

  /**
   * Fetch agent status and insert it directly on demand
   * @param {Object} req
   * @param {Object} reply
   * @returns {Object} status obj or ErrorResponseerror.message || error
   */
  async fetchAgents(req, reply) {
    try {
      const output = await this.monitoringInstance.fetchAgentsExternal();
      return {
        statusCode: 200,
        error: '0',
        data: '',
        output
      };
    } catch (error) {
      log('wazuh-api:fetchAgents', error.message || error);
      return ErrorResponse(error.message || error, 3018, 500, reply);
    }
  }

  /**
   * Get full data on CSV format from a list API Logs360 endpoint
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} csv or ErrorResponse
   */
  async csv(req, reply) {
    try {
      if (!req.payload || !req.payload.path)
        throw new Error('O caminho do campo é obrigatório');
      if (!req.payload.id) throw new Error('O ID do campo é obrigatório');

      const filters = Array.isArray(((req || {}).payload || {}).filters)
        ? req.payload.filters
        : [];

      const config = await this.wzWrapper.getWazuhConfigurationById(
        req.payload.id
      );

      let tmpPath = req.payload.path;

      if (tmpPath && typeof tmpPath === 'string') {
        tmpPath = tmpPath[0] === '/' ? tmpPath.substr(1) : tmpPath;
      }

      if (!tmpPath) throw new Error('Ocorreu um erro ao analisar o campo do caminho');

      log('wazuh-api:csv', `Report ${tmpPath}`, 'debug');
      // Real limit, regardless the user query
      const params = { limit: 500 };

      if (filters.length) {
        for (const filter of filters) {
          if (!filter.name || !filter.value) continue;
          params[filter.name] = filter.value;
        }
      }

      const cred = ApiHelper.buildOptionsObject(config);

      let itemsArray = [];
      const output = await needle(
        'get',
        `${config.url}:${config.port}/${tmpPath}`,
        params,
        cred
      );

      const totalItems = (((output || {}).body || {}).data || {}).totalItems;

      if (totalItems) {
        params.offset = 0;
        itemsArray.push(...output.body.data.items);
        while (itemsArray.length < totalItems && params.offset < totalItems) {
          params.offset += params.limit;
          const tmpData = await needle(
            'get',
            `${config.url}:${config.port}/${tmpPath}`,
            params,
            cred
          );
          itemsArray.push(...tmpData.body.data.items);
        }
      }

      if (totalItems) {
        const { path, filters } = req.payload;
        const isList = path.includes('/lists') && filters && filters.length;
        const isArrayOfLists =
          path.includes('/lists') && (!filters || !filters.length);
        const isAgents = path.includes('/agents') && !path.includes('groups');
        const isAgentsOfGroup = path.startsWith('/agents/groups/');
        let fields = Object.keys(output.body.data.items[0]);

        if (isAgents || isAgentsOfGroup) {
          fields = [
            'id',
            'status',
            'name',
            'ip',
            'group',
            'manager',
            'node_name',
            'dateAdd',
            'version',
            'lastKeepAlive',
            'os.arch',
            'os.build',
            'os.codename',
            'os.major',
            'os.minor',
            'os.name',
            'os.platform',
            'os.uname',
            'os.version'
          ];
        }

        if (isArrayOfLists) {
          const flatLists = [];
          for (const list of itemsArray) {
            const { path, items } = list;
            flatLists.push(
              ...items.map(item => ({ path, key: item.key, value: item.value }))
            );
          }
          fields = ['path', 'key', 'value'];
          itemsArray = [...flatLists];
        }

        if (isList) {
          fields = ['key', 'value'];
          itemsArray = itemsArray[0];
        }

        fields = fields.map(item => ({ value: item, default: '-' }));

        const json2csvParser = new Parser({ fields });

        let csv = json2csvParser.parse(itemsArray);

        for (const field of fields) {
          const { value } = field;
          if (csv.includes(value)) {
            csv = csv.replace(value, KeyEquivalence[value] || value);
          }
        }

        return reply.response(csv).type('text/csv');
      } else if (
        output &&
        output.body &&
        output.body.data &&
        !output.body.data.totalItems
      ) {
        throw new Error('Nenhum resultado');
      } else {
        throw new Error('Ocorreu um erro ao obter dados da API Logs360');
      }
    } catch (error) {
      log('wazuh-api:csv', error.message || error);
      return ErrorResponse(error.message || error, 3034, 500, reply);
    }
  }

  /**
   * Get the each filed unique values of agents
   * @param {Object} req
   * @param {Object} reply
   * @returns {Array<Object>} unique fileds or ErrorResponse
   */
  async getAgentsFieldsUniqueCount(req, reply) {
    try {
      if (!req.params || !req.params.api)
        throw new Error('A API do campo é obrigatória');

      const config = await this.wzWrapper.getWazuhConfigurationById(
        req.params.api
      );

      const headers = ApiHelper.buildOptionsObject(config);

      const distinctUrl = `${config.url}:${config.port}/summary/agents`;

      const data = await needle('get', distinctUrl, {}, headers);
      const response = ((data || {}).body || {}).data || {};

      const nodes = response.nodes;
      const groups = response.groups;
      const osPlatforms = response.agent_os;
      const versions = response.agent_version;
      const summary = response.agent_status;
      const lastAgent = response.last_registered_agent;

      const result = {
        groups: [],
        nodes: [],
        versions: [],
        osPlatforms: [],
        lastAgent: {},
        summary: {
          agentsCountActive: 0,
          agentsCountDisconnected: 0,
          agentsCountNeverConnected: 0,
          agentsCountTotal: 0,
          agentsCoverity: 0
        }
      };

      if (nodes && nodes.items) {
        result.nodes = nodes.items
          .filter(item => !!item.node_name && item.node_name !== 'unknown')
          .map(item => item.node_name);
      }

      if (groups && groups.items) {
        result.groups = groups.items.map(item => item.name);
      }

      if (osPlatforms && osPlatforms.items) {
        result.osPlatforms = osPlatforms.items
          .filter(
            item =>
              !!item.os && item.os.platform && item.os.name && item.os.version
          )
          .map(item => item.os);
      }

      if (versions && versions.items) {
        result.versions = versions.items
          .filter(item => !!item.version)
          .map(item => item.version);
      }

      if (summary) {
        Object.assign(result.summary, {
          agentsCountActive: summary.Active - 1,
          agentsCountDisconnected: summary.Disconnected,
          agentsCountNeverConnected: summary['Nunca conectado'],
          agentsCountTotal: summary.Total - 1,
          agentsCoverity:
            summary.Total - 1
              ? ((summary.Active - 1) / (summary.Total - 1)) * 100
              : 0
        });
      }

      if (lastAgent) {
        Object.assign(result.lastAgent, lastAgent);
      }

      return { error: 0, result };
    } catch (error) {
      log('wazuh-api:getAgentsFieldsUniqueCount', error.message || error);
      return ErrorResponse(error.message || error, 3035, 500, reply);
    }
  }

  // Get de list of available requests in the API
  getRequestList() {
    //Read a static JSON until the api call has implemented
    return apiRequestList;
  }

  /**
   * This get the timestamp field
   * @param {Object} req
   * @param {Object} reply
   * @returns {Object} timestamp field or ErrorResponse
   */
  getTimeStamp(req, reply) {
    try {
      const source = JSON.parse(fs.readFileSync(this.wazuhVersion, 'utf8'));
      if (source.installationDate && source.lastRestart) {
        log(
          'wazuh-api:getTimeStamp',
          `Data de instalação: ${source.installationDate}. Última reinicialização: ${source.lastRestart}`,
          'debug'
        );
        return {
          installationDate: source.installationDate,
          lastRestart: source.lastRestart
        };
      } else {
        throw new Error('Não foi possível buscar o registro da versão Logs360');
      }
    } catch (error) {
      log('wazuh-api:getTimeStamp', error.message || error);
      return ErrorResponse(
        error.message || 'Não foi possível buscar o registro da versão Logs360',
        4001,
        500,
        reply
      );
    }
  }

  /**
   * This get the wazuh setup settings
   * @param {Object} req
   * @param {Object} reply
   * @returns {Object} setup info or ErrorResponse
   */
  async getSetupInfo(req, reply) {
    try {
      const source = JSON.parse(fs.readFileSync(this.wazuhVersion, 'utf8'));
      return !Object.values(source).length
        ? { statusCode: 200, data: '' }
        : { statusCode: 200, data: source };
    } catch (error) {
      log('wazuh-api:getSetupInfo', error.message || error);
      return ErrorResponse(
        `Não foi possível obter dados do registro da versão Logs360 devido a ${error.message ||
          error}`,
        4005,
        500,
        reply
      );
    }
  }

  /**
   * Get basic syscollector information for given agent.
   * @param {Object} req
   * @param {Object} reply
   * @returns {Object} Basic syscollector information
   */
  async getSyscollector(req, reply) {
    try {
      if (!req.params || !req.headers.id || !req.params.agent) {
        throw new Error('O ID do agente e o ID da API são obrigatórios');
      }

      const { agent } = req.params;
      const api = req.headers.id;

      const config = await this.wzWrapper.getWazuhConfigurationById(api);

      const headers = ApiHelper.buildOptionsObject(config);

      const data = await Promise.all([
        needle(
          'get',
          `${config.url}:${config.port}/syscollector/${agent}/hardware`,
          {},
          headers
        ),
        needle(
          'get',
          `${config.url}:${config.port}/syscollector/${agent}/os`,
          {},
          headers
        )
      ]);

      const result = data.map(item => (item.body || {}).data || false);
      const [hardwareResponse, osResponse] = result;

      // Fill syscollector object
      const syscollector = {
        hardware:
          typeof hardwareResponse === 'object' &&
          Object.keys(hardwareResponse).length
            ? { ...hardwareResponse }
            : false,
        os:
          typeof osResponse === 'object' && Object.keys(osResponse).length
            ? { ...osResponse }
            : false
      };

      return syscollector;
    } catch (error) {
      log('wazuh-api:getSyscollector', error.message || error);
      return ErrorResponse(error.message || error, 3035, 500, reply);
    }
  }
}

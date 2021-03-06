/*
 * Logs360 app - Module for app initialization
 * Copyright (C) 2019 Logs360, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { log } from './logger';
import { ElasticWrapper } from './lib/elastic-wrapper';
import packageJSON from '../package.json';
import { kibanaTemplate } from './integration-files/kibana-template';
import { getConfiguration } from './lib/get-configuration';
import { defaultExt } from './lib/default-ext';
import { BuildBody } from './lib/replicas-shards-helper';
import { checkKnownFields } from './lib/refresh-known-fields';
import { totalmem } from 'os';
import fs from 'fs';
import path from 'path';

export function Initialize(server) {
  const wazuhVersion = path.join(__dirname, '/wazuh-version.json');
  const blueWazuh = '\u001b[34mLogs360\u001b[39m';
  const initializeErrorLogColors = [blueWazuh, 'initialize', 'error'];
  // Elastic JS Client
  const wzWrapper = new ElasticWrapper(server);
  log('initialize', `Kibana index: ${wzWrapper.WZ_KIBANA_INDEX}`, 'info');
  log('initialize', `App revision: ${packageJSON.revision}`, 'info');

  let configurationFile = {};
  let pattern = null;
  // Read config from package.json and config.yml
  try {
    configurationFile = getConfiguration();

    pattern =
      configurationFile && typeof configurationFile.pattern !== 'undefined'
        ? configurationFile.pattern
        : 'logs360-alerts-1.x-*';
    global.XPACK_RBAC_ENABLED =
      configurationFile &&
      typeof configurationFile['xpack.rbac.enabled'] !== 'undefined'
        ? configurationFile['xpack.rbac.enabled']
        : true;
  } catch (e) {
    log('initialize', e.message || e);
    server.log(
      initializeErrorLogColors,
      'Ocorreu um erro ao ler a configuração.' + e.message
    );
  }

  try {
    // RAM in MB
    const ram = Math.ceil(totalmem() / 1024 / 1024);
    log('initialize', `Total RAM: ${ram}MB`, 'info');
  } catch (error) {
    log(
      'initialize',
      `Não foi possível verificar a RAM total devido a: ${error.message || error}`
    );
  }

  const defaultIndexPattern = pattern || 'logs360-alerts-1.x-*';

  // Save Logs360 App setup
  const saveConfiguration = () => {
    try {
      const commonDate = new Date().toISOString();

      const configuration = {
        name: 'Logs360 App',
        'app-version': packageJSON.version,
        revision: packageJSON.revision,
        installationDate: commonDate,
        lastRestart: commonDate
      };

      try {
        fs.writeFileSync(wazuhVersion, JSON.stringify(configuration), err => {
          if (err) {
            throw new Error(err);
          }
        });
        log(
          'initialize:saveConfiguration',
          'Registro de configuração do Logs360 inserido',
          'debug'
        );
      } catch (error) {
        log('initialize:saveConfiguration', error.message || error);
        server.log(
          initializeErrorLogColors,
          'Não foi possível criar o registro de configuração do Logs360'
        );
      }

      return;
    } catch (error) {
      log('initialize:saveConfiguration', error.message || error);
      server.log(
        initializeErrorLogColors,
        'Erro ao criar o registro da versão Logs360'
      );
    }
  };

  /**
   * Checks for new extensions added to the config.yml,
   * useful whenever a new extension is added and it's enabled by default.
   * An old app package needs to update its stored API entries, this way we have consistency
   * with the new extensions.
   */
  const checkAPIEntriesExtensions = async () => {
    try {
      log(
        'initialize:checkAPIEntriesExtensions',
        `Verificando a consistência das extensões para todas as entradas da API`,
        'debug'
      );

      const apiEntries = await wzWrapper.getWazuhAPIEntries();
      const configFile = await getConfiguration();

      if ((((apiEntries || {}).hits || {}).total || {}).value > 0) {
        const currentExtensions = !configFile ? defaultExt : {};

        if (configFile) {
          for (const key in defaultExt) {
            currentExtensions[key] =
              typeof configFile['extensions.' + key] !== 'undefined'
                ? configFile['extensions.' + key]
                : defaultExt[key];
          }
        }

        for (const item of apiEntries.hits.hits) {
          for (const key in currentExtensions) {
            if ((((item || {})._source || {}).extensions || {})[key]) {
              continue;
            } else {
              if (((item || {})._source || {}).extensions) {
                item._source.extensions[key] = currentExtensions[key];
              }
            }
          }
          try {
            await wzWrapper.updateWazuhIndexDocument(null, item._id, {
              doc: { extensions: item._source.extensions }
            });
            log(
              'initialize:checkAPIEntriesExtensions',
              `Extensões de entrada da API atualizadas com sucesso com ID: ${item._id}`,
              'debug'
            );
          } catch (error) {
            log(
              'initialize:checkAPIEntriesExtensions',
              `Erro ao atualizar extensões de entrada da API com o ID: ${
                item._id
              } due to ${error.message || error}`
            );
            server.log(
              initializeErrorLogColors,
              `Erro ao atualizar extensões de entrada da API com o ID: ${
                item._id
              } due to ${error.message || error}`
            );
          }
        }
      } else {
        log(
          'initialize:checkAPIEntriesExtensions',
          'Não há entradas de API, ignorando a verificação de extensões',
          'debug'
        );
      }

      return;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const checkWazuhIndex = async () => {
    try {
      log('initialize:checkWazuhIndex', 'Checking .wazuh index.', 'debug');

      const result = await wzWrapper.checkIfIndexExists('.wazuh');

      const shardConfiguration = BuildBody(configurationFile, 'Logs360');

      if (!result) {
        try {
          await wzWrapper.createWazuhIndex(shardConfiguration);

          log('initialize:checkWazuhIndex', 'Index .wazuh created.', 'debug');
        } catch (error) {
          throw new Error('Error creating index .wazuh.');
        }
      } else {
        await wzWrapper.updateIndexSettings('.wazuh', shardConfiguration);
        await checkAPIEntriesExtensions();
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const checkWazuhVersionRegistry = async () => {
    try {
      log(
        'initialize[checkWazuhVersionRegistry]',
        'Checking wazuh-version registry.',
        'debug'
      );
      try {
        await wzWrapper.deleteWazuhVersionIndex();
        log(
          'initialize[checkWazuhVersionRegistry]',
          'Índice antigo .logs360-versão excluído com sucesso.',
          'debug'
        );
      } catch (error) {
        log(
          'initialize[checkWazuhVersionRegistry]',
          'Não é necessário excluir o índice antigo da versão .logs360',
          'debug'
        );
      }

      if (!fs.existsSync(wazuhVersion)) {
        log(
          'initialize[checkWazuhVersionRegistry]',
          'O registro da versão logs360 não existe. Inicializando a configuração.',
          'debug'
        );

        // Create the app registry file for the very first time
        saveConfiguration();
      } else {
        // App registry file exists, just update it
        const currentDate = new Date().toISOString();

        // If this function fails, it throws an exception
        const source = JSON.parse(fs.readFileSync(wazuhVersion, 'utf8'));

        // Check if the stored revision differs from the package.json revision
        const isNewApp = packageJSON.revision !== source.revision;

        // If it's an app with a different revision, it's a new installation
        source['installationDate'] = isNewApp
          ? currentDate
          : source['installationDate'];

        source['app-version'] = packageJSON.version;
        source.revision = packageJSON.revision;
        source.lastRestart = currentDate;

        // If this function fails, it throws an exception
        fs.writeFileSync(wazuhVersion, JSON.stringify(source), 'utf-8');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Init function. Check for "wazuh-version" document existance.
  const init = async () => {
    try {
      await Promise.all([
        checkWazuhIndex(),
        checkWazuhVersionRegistry(),
        checkKnownFields(wzWrapper, log, server, defaultIndexPattern)
      ]);
      const reindexResult = await wzWrapper.reindexAppIndices();
      Array.isArray(reindexResult) &&
        reindexResult.length === 2 &&
        log(
          'initialize:init',
          `${reindexResult[0].value} (${reindexResult[0].result}) / ${reindexResult[1].value} (${reindexResult[1].result})`,
          'debug'
        );
    } catch (error) {
      log('initialize:init', error.message || error);
      server.log(initializeErrorLogColors, error.message || error);
      return Promise.reject(error);
    }
  };

  const createKibanaTemplate = () => {
    log(
      'initialize:createKibanaTemplate',
      `Creating template for ${wzWrapper.WZ_KIBANA_INDEX}`,
      'debug'
    );

    try {
      kibanaTemplate.template = wzWrapper.WZ_KIBANA_INDEX + '*';
    } catch (error) {
      log('initialize:createKibanaTemplate', error.message || error);
      server.log(
        initializeErrorLogColors,
        'Exception: ' + error.message || error
      );
    }

    return wzWrapper.putWazuhKibanaTemplate(kibanaTemplate);
  };

  const createEmptyKibanaIndex = async () => {
    try {
      await wzWrapper.createEmptyKibanaIndex();
      log(
        'initialize:checkKibanaStatus',
        `Successfully created ${wzWrapper.WZ_KIBANA_INDEX} index.`,
        'debug'
      );
      await init();
      return;
    } catch (error) {
      return Promise.reject(
        new Error(
          `Error creating ${
            wzWrapper.WZ_KIBANA_INDEX
          } index due to ${error.message || error}`
        )
      );
    }
  };

  const fixKibanaTemplate = async () => {
    try {
      await createKibanaTemplate();
      log(
        'initialize:checkKibanaStatus',
        `Successfully created ${wzWrapper.WZ_KIBANA_INDEX} template.`,
        'debug'
      );
      await createEmptyKibanaIndex();
      return;
    } catch (error) {
      return Promise.reject(
        new Error(
          `Erro ao criar modelo para ${
            wzWrapper.WZ_KIBANA_INDEX
          } devido a ${error.message || error}`
        )
      );
    }
  };

  const getTemplateByName = async () => {
    try {
      await wzWrapper.getTemplateByName('Logs360-kibana');
      log(
        'initialize:checkKibanaStatus',
        `Não há necessidade de criar o ${wzWrapper.WZ_KIBANA_INDEX} modelo, já existe.`,
        'debug'
      );
      await createEmptyKibanaIndex();
      return;
    } catch (error) {
      log('initialize:checkKibanaStatus', error.message || error);
      return fixKibanaTemplate();
    }
  };

  // Does Kibana index exist?
  const checkKibanaStatus = async () => {
    try {
      const data = await wzWrapper.checkIfIndexExists(
        wzWrapper.WZ_KIBANA_INDEX
      );
      if (data) {
        // It exists, initialize!
        await init();
      } else {
        // No Kibana index created...
        log(
          'initialize:checkKibanaStatus',
          "Didn't find " + wzWrapper.WZ_KIBANA_INDEX + ' index...',
          'info'
        );
        await getTemplateByName();
      }
    } catch (error) {
      log('initialize:checkKibanaStatus', error.message || error);
      server.log(initializeErrorLogColors, error.message || error);
    }
  };

  // Wait until Elasticsearch js is ready
  const checkStatus = async () => {
    try {
      await server.plugins.elasticsearch.waitUntilReady();
      return checkKibanaStatus();
    } catch (error) {
      log(
        'initialize:checkStatus',
        'Aguardando o plug-in elasticsearch estar pronto...',
        'debug'
      );
      setTimeout(() => checkStatus(), 3000);
    }
  };

  // Check Kibana index and if it is prepared, start the initialization of Logs360 App.
  checkStatus();
}

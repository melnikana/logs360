/*
 * Logs360 app - Generic error response constructor
 * Copyright (C) 2019 Logs360, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

/**
 * Error codes:
 * wazuh-api-elastic 20XX
 * wazuh-api         30XX
 * wazuh-elastic     40XX
 * wazuh-reporting   50XX
 * unknown           1000
 */
/**
 * Returns a suitable error message
 * @param {String} message Error message
 * @param {Number} code Error code
 * @param {Number} statusCode Error status code
 * @returns {Object} Error response object
 */
export function ErrorResponse(
  message = null,
  code = null,
  statusCode = null,
  h
) {
  let filteredMessage = '';
  if (code) {
    const isString = typeof message === 'string';
    if (isString && message === 'socket hang up' && code === 3005) {
      filteredMessage = 'Protocolo incorreto sendo usado para conectar-se à API Logs360';
    } else if (
      isString &&
      (message.includes('ENOTFOUND') ||
        message.includes('EHOSTUNREACH') ||
        message.includes('EINVAL') ||
        message.includes('EAI_AGAIN')) &&
      code === 3005
    ) {
      filteredMessage = 'URL errado sendo usado para conectar-se à API Logs360';
    } else if (isString && message.includes('ECONNREFUSED') && code === 3005) {
      filteredMessage = 'Porta incorreta sendo usada para conectar-se à API Logs360';
    } else if (
      isString &&
      message.toLowerCase().includes('não encontrado') &&
      code === 3002
    ) {
      filteredMessage = 'Parece que a API selecionada foi excluída.';
    } else if (
      isString &&
      message.includes('ENOENT') &&
      message.toLowerCase().includes('Não existe tal arquivo ou diretório') &&
      message.toLowerCase().includes('data') &&
      code === 5029
    ) {
      filteredMessage = 'Os relatórios foram abortados';
    } else if (isString && code === 5029) {
      filteredMessage = `Os relatórios foram abortados (${message})`;
    }
  }

  return h
    .response({
      message: filteredMessage
        ? `${code || 1000} - ${filteredMessage}`
        : typeof message === 'string'
        ? `${code || 1000} - ${message}`
        : `${code || 1000} - Unexpected error`,
      code: code || 1000,
      statusCode: statusCode || 500
    })
    .code(statusCode || 500);
}

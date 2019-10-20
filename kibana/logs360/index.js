/*
 * Wazuh app - Module for Kibana plugin definition
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

// Imports the init module
import { initApp } from './init';
import { resolve } from 'path';

export default kibana =>
  new kibana.Plugin({
    id: 'logs360',
    name: 'logs360',
    require: ['kibana', 'elasticsearch'],
    uiExports: {
      app: {
        id: 'logs360',
        title: 'logs360',
        description: 'logs360 app for Kibana',
        icon: 'plugins/logs360/img/icon.svg',
        main: 'plugins/logs360/app'
      },
      hacks: ['plugins/logs360/icon-style'],
      __bundleProvider__(kbnServer) {
        kbnServer.uiBundles.addPostLoader({
          test: /\.pug$/,
          include: resolve(__dirname, 'public'),
          loader: require.resolve('pug-loader'),
          enforce: undefined
        });
      }
    },
    init(server, options) {
      // Kibana spaces locker
      const xpackMainPlugin = server.plugins.xpack_main;

      if (xpackMainPlugin) {
        xpackMainPlugin.registerFeature({
          id: 'logs360',
          name: 'logs360',
          app: ['logs360', 'kibana', 'elasticsearch'],
          navLinkId: 'logs360',
          privileges: {}
        });
      }

      return initApp(server, options);
    }
  });

/*
 * Logs360 app - Wazuh configuration item directive
 * Copyright (C) 2019 Logs360, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import template from './wz-config-item.html';
import { uiModules } from 'ui/modules';

const app = uiModules.get('app/logs360', []);

app.directive('wzConfigItem', function() {
  return {
    restrict: 'E',
    scope: {
      label: '@label',
      value: '=value',
      isArray: '=isArray'
    },
    template: template
  };
});

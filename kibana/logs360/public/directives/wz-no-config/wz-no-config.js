/*
 * Logs360 app - Logs360 no configuration card directive
 * Copyright (C) 2019 Logs360, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import template from './wz-no-config.html';
import { uiModules } from 'ui/modules';

const app = uiModules.get('app/logs360', []);

app.directive('wzNoConfig', function() {
  return {
    restrict: 'E',
    scope: {
      error: '=error'
    },
    template: template
  };
});

/*
 * Logs360 app - Load the Dev Tools controller.
 * Copyright (C) 2019 Logs360, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { uiModules } from 'ui/modules';
import { DevToolsController } from './dev-tools';

const app = uiModules.get('app/logs360', []);

app.controller('devToolsController', DevToolsController);

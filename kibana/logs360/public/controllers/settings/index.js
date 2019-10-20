/*
 * Logs360 app - Load the Settings React components.
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
import { SettingsController } from './settings';

const app = uiModules.get('app/logs360', []);

import { ApiTable } from './components/api-table';
import { AddApi } from './components/add-api';

app
  .controller('settingsController', SettingsController)
  .value('ApiTable', ApiTable)
  .value('AddApi', AddApi);

/*
 * Logs360 app - Wrap EUI components with ng-react and the Logs360 app
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
import 'react';
import {
  EuiIcon,
  EuiSuperSelect,
  EuiLoadingSpinner,
  EuiProgress,
  EuiBasicTable,
  EuiButtonIcon,
  EuiHealth,
  EuiCallOut,
  EuiSwitch
} from '@elastic/eui';

import { BasicTable } from '../directives/wz-table-eui/components/table';
import { Tabs } from '../directives/wz-tabs-eui/components/tabs';

const app = uiModules.get('app/logs360', ['react']);

app
  .value('EuiIcon', EuiIcon)
  .value('EuiSuperSelect', EuiSuperSelect)
  .value('EuiLoadingSpinner', EuiLoadingSpinner)
  .value('EuiProgress', EuiProgress)
  .value('EuiButtonIcon', EuiButtonIcon)
  .value('EuiBasicTable', EuiBasicTable)
  .value('EuiHealth', EuiHealth)
  .value('EuiCallOut', EuiCallOut)
  .value('BasicTable', BasicTable)
  .value('Tabs', Tabs)
  .value('EuiSwitch', EuiSwitch);

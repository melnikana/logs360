/*
 * Logs360 app - Load all the Misc controllers.
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
import { ReportingController } from './reporting';
import { HealthCheck } from './health-check';
import { BlankScreenController } from './blank-screen-controller';

const app = uiModules.get('app/logs360', []);

app
  .controller('reportingController', ReportingController)
  .controller('healthCheck', HealthCheck)
  .controller('blankScreenController', BlankScreenController);

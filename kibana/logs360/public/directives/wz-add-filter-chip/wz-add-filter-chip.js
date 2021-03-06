/*
 * Logs360 app - Logs360 register agents
 * Copyright (C) 2019 Logs360, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import template from './wz-add-filter-chip.html';
import { uiModules } from 'ui/modules';

const app = uiModules.get('app/logs360', []);

class WzAddFilterChip {
  /**
   * Class constructor
   */
  constructor() {
    this.template = template;
    this.restrict = 'E';
    this.scope = {
      idInput: '@',
      options: '='
    };
  }
  controller($scope) {
    $scope.showDropdown = false;
    $scope.select = chip => {
      $scope.showDropdown = false;
      const searchBar = $(`#${$scope.idInput}`);
      searchBar.val(`${chip.value}: `);
      searchBar.focus();
    };
  }
}

app.directive('wzAddFilterChip', () => new WzAddFilterChip());

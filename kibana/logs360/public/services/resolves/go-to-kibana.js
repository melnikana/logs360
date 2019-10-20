/*
 * Logs360 app - Module to catch last url
 * Copyright (C) 2019 Logs360, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
// Manage leaving the app to another Kibana tab
export function goToKibana($location, $window) {
  const url = $location.$$absUrl.substring(0, $location.$$absUrl.indexOf('#'));

  if (
    $window.sessionStorage
      .getItem(`lastSubUrl:${url}`)
      .includes('/logs360#/visualize') ||
    $window.sessionStorage
      .getItem(`lastSubUrl:${url}`)
      .includes('/logs360#/doc') ||
    $window.sessionStorage
      .getItem(`lastSubUrl:${url}`)
      .includes('/logs360#/context')
  ) {
    $window.sessionStorage.setItem(`lastSubUrl:${url}`, url);
  }

  $window.location.href = $location.absUrl().replace('/logs360#', '/kibana#');
}

/*
 * Logs360 app - Cluster monitoring controller
 * Copyright (C) 2019 Logs360, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { FilterHandler } from '../../utils/filter-handler';
import { timefilter } from 'ui/timefilter';

export function ClusterController(
  $scope,
  $rootScope,
  $timeout,
  errorHandler,
  apiReq,
  $window,
  $location,
  discoverPendingUpdates,
  rawVisualizations,
  loadedVisualizations,
  visHandlers,
  tabVisualizations,
  appState,
  genericReq
) {
  timefilter.setRefreshInterval({ pause: true, value: 0 });
  $scope.search = term => {
    $scope.$broadcast('wazuhSearch', { term });
  };

  const clusterEnabled =
    appState.getClusterInfo() && appState.getClusterInfo().status === 'enabled';
  $scope.isClusterEnabled = clusterEnabled;
  $scope.isClusterRunning = true;
  $location.search('tabView', 'cluster-monitoring');
  $location.search('tab', 'monitoring');
  $location.search('_a', null);
  const filterHandler = new FilterHandler(appState.getCurrentPattern());
  discoverPendingUpdates.removeAll();
  tabVisualizations.removeAll();
  rawVisualizations.removeAll();
  loadedVisualizations.removeAll();
  tabVisualizations.setTab('monitoring');
  tabVisualizations.assign({
    monitoring: 2
  });

  $scope.loading = true;
  $scope.showConfig = false;
  $scope.showNodes = false;
  $scope.currentNode = null;
  $scope.nodeSearchTerm = '';

  /**
   * This set default boolean flags for a given component
   * @param {String} component
   */
  const setBooleans = component => {
    $scope.showConfig = component === 'showConfig';
    $scope.showNodes = component === 'showNodes';
    $scope.currentNode = null;
  };

  /**
   * This navigates to agents preview
   */
  $scope.goAgents = () => {
    $window.location.href = '#/agents-preview';
  };

  /**
   * This navigates to configuration
   */
  $scope.goConfiguration = () => {
    setBooleans('showConfig');
    tabVisualizations.assign({
      monitoring: 1
    });
    assignFilters();
    $rootScope.$broadcast('updateVis');
  };

  /**
   * This navigates to nodes
   */
  $scope.goNodes = () => {
    setBooleans('showNodes');
    tabVisualizations.assign({
      monitoring: 1
    });
    assignFilters();
    $rootScope.$broadcast('updateVis');
  };

  /**
   * This navigates back
   */
  $scope.goBack = () => {
    setBooleans(null);
    tabVisualizations.assign({
      monitoring: 2
    });
    assignFilters();
    $rootScope.$broadcast('updateVis');
  };

  //listeners
  $scope.$on('wazuhShowClusterNode', async (event, parameters) => {
    try {
      tabVisualizations.assign({
        monitoring: 1
      });
      $scope.currentNode = parameters.node;
      const data = await apiReq.request('GET', '/cluster/healthcheck', {
        node: $scope.currentNode.name
      });

      $scope.currentNode.healthCheck =
        data.data.data.nodes[$scope.currentNode.name];

      if (
        $scope.currentNode.healthCheck &&
        $scope.currentNode.healthCheck.status
      ) {
        $scope.currentNode.healthCheck.status.last_sync_integrity.duration =
          'n/a';
        $scope.currentNode.healthCheck.status.last_sync_agentinfo.duration =
          'n/a';
        $scope.currentNode.healthCheck.status.last_sync_agentgroups.duration =
          'n/a';

        if (
          $scope.currentNode.healthCheck.status.last_sync_integrity
            .date_start_master !== 'n/a' &&
          $scope.currentNode.healthCheck.status.last_sync_integrity
            .date_end_master !== 'n/a'
        ) {
          const end = new Date(
            $scope.currentNode.healthCheck.status.last_sync_integrity.date_end_master
          );
          const start = new Date(
            $scope.currentNode.healthCheck.status.last_sync_integrity.date_start_master
          );
          $scope.currentNode.healthCheck.status.last_sync_integrity.duration = `${(end -
            start) /
            1000}s`;
        }

        if (
          $scope.currentNode.healthCheck.status.last_sync_agentinfo
            .date_start_master !== 'n/a' &&
          $scope.currentNode.healthCheck.status.last_sync_agentinfo
            .date_end_master !== 'n/a'
        ) {
          const end = new Date(
            $scope.currentNode.healthCheck.status.last_sync_agentinfo.date_end_master
          );
          const start = new Date(
            $scope.currentNode.healthCheck.status.last_sync_agentinfo.date_start_master
          );
          $scope.currentNode.healthCheck.status.last_sync_agentinfo.duration = `${(end -
            start) /
            1000}s`;
        }

        if (
          $scope.currentNode.healthCheck.status.last_sync_agentgroups
            .date_start_master !== 'n/a' &&
          $scope.currentNode.healthCheck.status.last_sync_agentgroups
            .date_end_master !== 'n/a'
        ) {
          const end = new Date(
            $scope.currentNode.healthCheck.status.last_sync_agentgroups.date_end_master
          );
          const start = new Date(
            $scope.currentNode.healthCheck.status.last_sync_agentgroups.date_start_master
          );
          $scope.currentNode.healthCheck.status.last_sync_agentgroups.duration = `${(end -
            start) /
            1000}s`;
        }
      }

      assignFilters($scope.currentNode.name);
      $rootScope.$broadcast('updateVis');

      $scope.$applyAsync();
    } catch (error) {
      errorHandler.handle(error, 'Cluster');
    }
  });

  let filters = [];
  /**
   * This creatie custom filters for visualizations for a given node
   * @param {Object} node
   */
  const assignFilters = (node = false) => {
    try {
      filters = [];
      filters.push(
        filterHandler.managerQuery(appState.getClusterInfo().cluster, true)
      );
      if (node) {
        filters.push(filterHandler.nodeQuery(node));
      }

      $rootScope.$emit('wzEventFilters', { filters, localChange: false });
      if (!$rootScope.$$listenerCount['wzEventFilters']) {
        $timeout(100).then(() => assignFilters(node));
      }
    } catch (error) {
      errorHandler.handle(
        'Ocorreu um erro ao criar filtros personalizados para visualizações',
        'Cluster',
        true
      );
    }
  };

  /**
   * This set some required settings at init
   */
  const load = async () => {
    try {
      visHandlers.removeAll();
      discoverPendingUpdates.removeAll();
      rawVisualizations.removeAll();
      loadedVisualizations.removeAll();

      const status = await apiReq.request('GET', '/cluster/status', {});
      $scope.status = status.data.data.running;
      if ($scope.status === 'no') {
        $scope.isClusterRunning = false;
        $scope.loading = false;
        return;
      }

      const data = await Promise.all([
        apiReq.request('GET', '/cluster/nodes', {}),
        apiReq.request('GET', '/cluster/config', {}),
        apiReq.request('GET', '/version', {}),
        apiReq.request('GET', '/agents', { limit: 1 }),
        apiReq.request('GET', '/cluster/healthcheck', {})
      ]);

      const result = data.map(item => ((item || {}).data || {}).data || false);

      const [
        nodeList,
        clusterConfig,
        version,
        agents,
        clusterHealthCheck
      ] = result;

      $scope.nodesCount = nodeList.totalItems;
      $scope.configuration = clusterConfig;
      $scope.version = version;
      $scope.agentsCount = agents.totalItems - 1;
      $scope.healthCheck = clusterHealthCheck;

      nodeList.name = $scope.configuration.name;
      nodeList.master_node = $scope.configuration.node_name;

      const visData = await genericReq.request(
        'POST',
        `/elastic/visualizations/cluster-monitoring/${appState.getCurrentPattern()}`,
        { nodes: nodeList }
      );

      rawVisualizations.assignItems(visData.data.raw);
      assignFilters();
      $rootScope.$broadcast('updateVis');

      $scope.loading = false;
      $scope.$applyAsync();
      return;
    } catch (error) {
      $scope.loading = false;
      errorHandler.handle(error, 'Cluster');
    }
  };

  $scope.falseAllExpand = () => {
    $scope.expandArray = [false, false];
  };

  $scope.expand = i => {
    const oldValue = $scope.expandArray[i];
    $scope.falseAllExpand();
    $scope.expandArray[i] = !oldValue;
  };

  $scope.expandArray = [false, false];

  if (clusterEnabled) load();

  //listeners
  $scope.$on('$destroy', () => {
    discoverPendingUpdates.removeAll();
    tabVisualizations.removeAll();
    rawVisualizations.removeAll();
    loadedVisualizations.removeAll();
    visHandlers.removeAll();
  });
}

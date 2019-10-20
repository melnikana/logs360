/*
 * Wazuh app - Pattern handler service
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
export class PatternHandler {
  /**
   * Class constructor
   * @param {*} $location
   * @param {*} genericReq
   * @param {*} appState
   * @param {*} errorHandler
   * @param {*} wzMisc
   */
  constructor($location, genericReq, appState, errorHandler, wzMisc) {
    this.$location = $location;
    this.genericReq = genericReq;
    this.appState = appState;
    this.errorHandler = errorHandler;
    this.wzMisc = wzMisc;
  }

  /**
   * Get the available pattern list
   */
  async getPatternList() {
    try {
      const patternList = await this.genericReq.request(
        'GET',
        '/elastic/index-patterns',
        {}
      );

      if (!patternList.data.data.length) {
        this.wzMisc.setBlankScr('Sorry but no valid index patterns were found');
        this.$location.search('tab', null);
        this.$location.path('/blank-screen');
        return;
      }

      if (this.appState.getCurrentPattern()) {
        let filtered = patternList.data.data.filter(item =>
          item.id.includes(this.appState.getCurrentPattern())
        );
        if (!filtered.length)
          this.appState.setCurrentPattern(patternList.data.data[0].id);
      }

      return patternList.data.data;
    } catch (error) {
      this.errorHandler.handle(error, 'Pattern Handler (getPatternList)');
    }
    return;
  }

  /**
   * Change current pattern for the given pattern
   * @param {String} selectedPattern
   */
  async changePattern(selectedPattern) {
    try {
      this.appState.setCurrentPattern(selectedPattern);
      await this.genericReq.request(
        'GET',
        `/elastic/known-fields/${selectedPattern}`,
        {}
      );
      return this.appState.getCurrentPattern();
    } catch (error) {
      this.errorHandler.handle(error, 'Pattern Handler (changePattern)');
    }
    return;
  }
}

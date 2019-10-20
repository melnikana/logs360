/*
 * Logs360 app - React component for showing stats about agents.
 *
 * Copyright (C) 2019 Logs360, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EuiStat, EuiFlexItem, EuiFlexGroup } from '@elastic/eui';

export class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <EuiFlexGroup>
          <EuiFlexItem />
          <EuiFlexItem>
            <EuiStat
              title={this.props.total}
              description="Total de agentes"
              titleColor="primary"
              textAlign="center"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiStat
              title={this.props.active}
              description="Agentes ativos"
              titleColor="secondary"
              textAlign="center"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiStat
              title={this.props.disconnected}
              description="Agentes desconectados"
              titleColor="danger"
              textAlign="center"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiStat
              title={this.props.neverConnected}
              description="Agentes nunca conectados"
              titleColor="subdued"
              textAlign="center"
            />
          </EuiFlexItem>
          <EuiFlexItem />
        </EuiFlexGroup>
      </div>
    );
  }
}

Stats.propTypes = {
  total: PropTypes.any,
  active: PropTypes.any,
  disconnected: PropTypes.any,
  neverConnected: PropTypes.any
};

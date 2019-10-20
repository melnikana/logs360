/*
 * Logs360 app - React component for building the management welcome screen.
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
import {
  EuiCard,
  EuiIcon,
  EuiPanel,
  EuiFlexItem,
  EuiFlexGroup,
  EuiSpacer
} from '@elastic/eui';

export class WelcomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiPanel betaBadgeLabel="Administração">
              <EuiSpacer size="m" />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiCard
                    layout="horizontal"
                    icon={<EuiIcon size="xl" type="indexRollupApp" />}
                    title="Conjunto de Regras"
                    onClick={() => this.props.switchTab('ruleset', true)}
                    description="Gerencie seu conjunto de regras no Cluster Logs360."
                  />
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiCard
                    layout="horizontal"
                    icon={<EuiIcon size="xl" type="usersRolesApp" />}
                    title="Grupos"
                    onClick={() => this.props.switchTab('groups', true)}
                    description="Gerencie seu grupo de agentes."
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiCard
                    layout="horizontal"
                    icon={<EuiIcon size="xl" type="devToolsApp" />}
                    title="Configurações"
                    onClick={() => this.props.switchTab('configuration', true)}
                    description="Gerencie as configurações do seu cluster Logs360."
                  />
                </EuiFlexItem>
                <EuiFlexItem />
              </EuiFlexGroup>
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel betaBadgeLabel="Status e Relatórios">
              <EuiSpacer size="m" />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiCard
                    layout="horizontal"
                    icon={<EuiIcon size="xl" type="uptimeApp" />}
                    title="Status"
                    onClick={() => this.props.switchTab('status', true)}
                    description="Gerencie o status do seu cluster Logs360."
                  />
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiCard
                    layout="horizontal"
                    icon={<EuiIcon size="xl" type="indexPatternApp" />}
                    title="Cluster"
                    onClick={() => this.props.switchTab('monitoring', true)}
                    description="Visualize seu Cluster Logs360."
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiCard
                    layout="horizontal"
                    icon={<EuiIcon size="xl" type="filebeatApp" />}
                    title="Logs"
                    onClick={() => this.props.switchTab('logs', true)}
                    description="Logs do seu Cluster Logs360."
                  />
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiCard
                    layout="horizontal"
                    icon={<EuiIcon size="xl" type="reportingApp" />}
                    title="Relatórios"
                    onClick={() => this.props.switchTab('reporting', true)}
                    description="Cheque seus Relatórios armazenados."
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}

WelcomeScreen.propTypes = {
  switchTab: PropTypes.func
};

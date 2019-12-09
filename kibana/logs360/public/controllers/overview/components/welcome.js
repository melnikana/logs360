/*
 * Logs360 app - React component for building the Overview welcome screen.
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
import Modal from 'react-awesome-modal';
import PropTypes from 'prop-types';
import {
  EuiCard,
  EuiIcon,
  EuiPanel,
  EuiFlexItem,
  EuiFlexGroup,
  EuiSpacer,
  EuiSwitch,
  EuiPopover,
  EuiButtonIcon,
  EuiFormRow,
  EuiFlexGrid,
  EuiCallOut,
  EuiButton,
  EuiConfirmModal,
  EuiOverlayMask,
} from '@elastic/eui';


import { TabDescription } from '../../../../server/reporting/tab-description';

export class WelcomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        visible : false
    }
}

openModal() {
    this.setState({
        visible : true
    });
}

closeModal() {
    this.setState({
        visible : false
    });
}

  onButtonClick(btn) {
    this.setState({
      [btn]: !this.state[btn]
    });
  }

  closePopover(popover) {
    this.setState({
      [popover]: false
    });
  }

  toggleExtension(extension) {
    const extensions = this.state.extensions;
    extensions[extension] = !extensions[extension];
    this.setState({
      extensions
    });
    try {
      const api = JSON.parse(this.props.api).id;
      api && this.props.setExtensions(api, extensions);
    } catch (error) {} //eslint-disable-line
  }

  buildTabCard(tab, icon) {
    return (
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type={icon} />}
          title={TabDescription[tab].title}
          onClick={() => this.props.switchTab(tab)}
          description={TabDescription[tab].description}
        />
      </EuiFlexItem>
    );
  }

buildCustomCard(tab, icon, modal) { 
        return (
        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
            icon={<EuiIcon size="xl" type={icon} />}
            title={TabDescription[tab].title}
            description={TabDescription[tab].description}
            onClick={() => this.openModal(modal)}
            modal={<section>
              <Modal 
                  visible={this.state.visible}
                  width="400"
                  height="300"
                  effect="fadeInUp"
                  onClickAway={() => this.closeModal()}
              >
                  <div>
                      <h1>Title</h1>
                      <p>Some Contents</p>
                      <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                  </div>
              </Modal>
          </section>}
          />               
        </EuiFlexItem>
    );  
  }  


  buildPopover(popoverName, extensions) {
    const switches = extensions.map(extension => {
      return (
        <EuiFormRow key={extension}>
          <EuiSwitch
            label={`${TabDescription[extension].title} extension`}
            checked={this.state.extensions[extension]}
            onChange={() => this.toggleExtension(extension)}
          />
        </EuiFormRow>
      );
    });

    return (
      <EuiPopover
        id={popoverName}
        button={
          <EuiButtonIcon
            aria-label="Extensions"
            iconType="eye"
            onClick={() => this.onButtonClick(popoverName)}
          />
        }
        isOpen={this.state[popoverName]}
        closePopover={() => this.closePopover(popoverName)}
      >
        {switches}
      </EuiPopover>
    );
  }

  render() {
    return (
      <div>
       <EuiFlexGroup>
          <EuiFlexItem>
            <EuiPanel betaBadgeLabel="Logs360 Store">
            <EuiSpacer size="xl" />
              <EuiFlexGroup gutterSize="xs">
              </EuiFlexGroup>
                <EuiFlexItem />
              <EuiFlexGrid columns={3}>
                {this.buildCustomCard('windows', 'logoWindows', 'Modal')}
                {this.buildCustomCard('firewall', 'securityAnalyticsApp', '')}
                {this.buildCustomCard('bd', 'sqlApp', '')}
                {this.buildCustomCard('webserver', 'indexPatternApp', '')}
                {this.buildCustomCard('antivirus', 'securityApp', '')}
                {this.buildCustomCard('email', 'email', '')}
                {this.buildCustomCard('vpn', 'graphApp', '')}
                {this.buildCustomCard('azure1', 'logoAzure', '')}
                {this.buildCustomCard('aws1', 'logoAWS', '')}
                {this.buildCustomCard('proxy', 'securityAnalyticsApp', '')}
                {this.buildCustomCard('ftp', 'indexPatternApp', '')}
                {this.buildCustomCard('docker1', 'logoDocker', '')}
                {this.buildCustomCard('linux', 'consoleApp', '')}
                {this.buildCustomCard('costum', 'devToolsApp', '')}
              </EuiFlexGrid>
            </EuiPanel>
          </EuiFlexItem>
          </EuiFlexGroup>


          <EuiSpacer size="xl" />
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiPanel betaBadgeLabel="Gerenciamento de informações de segurança">
              <EuiFlexGroup gutterSize="xs">
                <EuiFlexItem />
                <EuiFlexItem grow={false}>
                  {this.buildPopover('popoverSecurity', ['aws'])}
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiFlexGrid columns={2}>
                {this.buildTabCard('general', 'dashboardApp')}
                {this.buildTabCard('fim', 'loggingApp')}
                {this.props.extensions.aws &&
                  this.buildTabCard('aws', 'logoAWSMono')}
                  {this.buildTabCard('office365', 'searchProfilerApp')}
              </EuiFlexGrid>
            </EuiPanel>
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiPanel betaBadgeLabel="Auditoria e Monitoramento de Políticas">
              <EuiFlexGroup gutterSize="xs">
                <EuiFlexItem />
                <EuiFlexItem grow={false}>
                  {this.buildPopover('popoverAuditing', [
                    'audit',
                    'oscap',
                    'ciscat'
                  ])}
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiFlexGrid columns={2}>
                {this.buildTabCard('pm', 'advancedSettingsApp')}
                {this.props.extensions.audit &&
                  this.buildTabCard('audit', 'monitoringApp')}
                {this.props.extensions.oscap &&
                  this.buildTabCard('oscap', 'codeApp')}
                {this.props.extensions.ciscat &&
                  this.buildTabCard('ciscat', 'auditbeatApp')}
              </EuiFlexGrid>
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="xl" />
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiPanel betaBadgeLabel="Detecção e resposta a ameaças">
              <EuiFlexGroup gutterSize="xs">
                <EuiFlexItem />
                <EuiFlexItem grow={false}>
                  {this.buildPopover('popoverThreat', [
                    'virustotal',
                    'osquery',
                    'docker'
                  ])}
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiFlexGrid columns={2}>
                {this.buildTabCard('vuls', 'securityApp')}
                {this.props.extensions.virustotal &&
                  this.buildTabCard('virustotal', 'savedObjectsApp')}
                {this.props.extensions.osquery &&
                  this.buildTabCard('osquery', 'searchProfilerApp')}
                {this.props.extensions.docker &&
                  this.buildTabCard('docker', 'spacesApp')}
              </EuiFlexGrid>
            </EuiPanel>
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiPanel betaBadgeLabel="Conformidade regulatória">
              <EuiFlexGroup gutterSize="xs">
                <EuiFlexItem />
                <EuiFlexItem grow={false}>
                  {this.buildPopover('popoverRegulatory', [
                    'pci',
                    'gdpr',
                    'hipaa',
                    'nist'
                  ])}
                </EuiFlexItem>
              </EuiFlexGroup>
              {!this.props.extensions.pci &&
                !this.props.extensions.gdpr &&
                !this.props.extensions.hipaa &&
                !this.props.extensions.nist && (
                  <EuiFlexGroup>
                    <EuiFlexItem>
                      <EuiCallOut
                        title={
                          <p>
                          Clique no <EuiIcon type="eye" /> ícone para mostrar extensões de conformidade regulamentar.
                          </p>
                        }
                        color="success"
                        iconType="help"
                      />
                    </EuiFlexItem>
                  </EuiFlexGroup>
                )}
              {(this.props.extensions.pci ||
                this.props.extensions.gdpr ||
                this.props.extensions.hipaa ||
                this.props.extensions.nist) && (
                <EuiFlexGrid columns={2}>
                  {this.props.extensions.pci &&
                    this.buildTabCard('pci', 'visTagCloud')}
                  {this.props.extensions.gdpr &&
                    this.buildTabCard('gdpr', 'visBarVertical')}
                  {this.props.extensions.hipaa &&
                    this.buildTabCard('hipaa', 'emsApp')}
                  {this.props.extensions.nist &&
                    this.buildTabCard('nist', 'apmApp')}
                </EuiFlexGrid>
              )}
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}

WelcomeScreen.propTypes = {
  extensions: PropTypes.object,
  switchTab: PropTypes.func,
  setExtensions: PropTypes.func,
  api: PropTypes.string
};


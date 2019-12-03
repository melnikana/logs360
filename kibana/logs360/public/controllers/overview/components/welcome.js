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
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiText,
  EuiButton,
  EuiButtonEmpty,
} from '@elastic/eui';


import { TabDescription } from '../../../../server/reporting/tab-description';

export class WelcomeScreen extends Component {
  
 /* 
  * Inicio da construção do modal
  */  
  constructor(props) {
    super(props);
    //Lista todos os modals e se estao visiveis
    this.state = {
      extensions: this.props.extensions,
      isWindowsModalVisible: false,
      isAzureModalVisible: false
    };

    this.closeWindowsModal = this.closeWindowsModal.bind(this);
    this.showWindowsModal = this.showWindowsModal.bind(this);
  }

  

  showWindowsModal() {
    this.setState({ isWindowsModalVisible: true })
  }

  closeWindowsModal = () => {
    this.setState({ isWindowsModalVisible: false })
  }




  
  /* 
  * Fim da construção do modal
  */

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
 buildCustomCard(tab, icon, WindowsModal) {
    return (
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type={icon} />}
          title={TabDescription[tab].title}
          onClick={() => this.showWindowsModal(WindowsModal)}
          description={TabDescription[tab].description}
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
/* inicio da pagina modal
  render() {
    let WindowsModal;

    if(this.state.isWindowsModalVisible) {
      WindowsModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do this thing"
            onCancel={this.CloseWindowsModal}
            onConfirm={this.CloseWindowsModal}
            cancelButtonText="Cancelar"
            confirmButtonText="Adiquirir"
            defaultFocusedButton="Confirmar">
            <p>You&rsquo;re about to do something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

fim da pagina modal*/   

render() {
  let windowsmodal;
if (this.state.isWindowsModalVisible) {
  windowsmodal = (
    <EuiOverlayMask>
      <EuiModal onClose={this.closeWindowsModal}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Overflow test</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <EuiText>
            <p>
              KING. Whats he that wishes so? My cousin, Westmorland? No, my
              fair cousin; If we are mark&rsquo;d to die, we are enow To do
              our country loss; and if to live, The fewer men, the greater
              share of honour. God&rsquo;
            </p>
          </EuiText>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty onClick={this.closeWindowsModal}>Fechar</EuiButtonEmpty>

          <EuiButton onClick={this.closeWindowsModal} fill>
            Adiquirir
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  );
}

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
                {this.buildCustomCard('windows', 'logoWindows', 'WindowsModal')}
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

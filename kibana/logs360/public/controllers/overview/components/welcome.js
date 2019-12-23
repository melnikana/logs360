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
  EuiButton,
  EuiConfirmModal,
  EuiOverlayMask,
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
      isFirewallModalVisible: false,
      isBancoModalVisible: false,
      isServerModalVisible: false,
      isAntivirusModalVisible: false,
      isEmailModalVisible: false,
      isVpnModalVisible: false,
      isAzureModalVisible: false,
      isAwsModalVisible: false,
      isProxyModalVisible: false,
      isFtpModalVisible: false,
      isDockerModalVisible: false,
      isLinuxModalVisible: false,
      isCustomModalVisible: false,
    };

    this.closeWindowsModal = this.closeWindowsModal.bind(this);
    this.showWindowsModal = this.showWindowsModal.bind(this);

    this.closeFirewallModal = this.closeFirewallModal.bind(this);
    this.showFirewallModal = this.showFirewallModal.bind(this);

    this.closeBancoModal = this.closeBancoModal.bind(this);
    this.showBancoModal = this.showBancoModal.bind(this);

    this.closeServerModal = this.closeServerModal.bind(this);
    this.showServerModal = this.showServerModal.bind(this);

    this.closeAntivirusModal = this.closeAntivirusModal.bind(this);
    this.showAntivirusModal = this.showAntivirusModal.bind(this);

    this.closeEmailModal = this.closeEmailModal.bind(this);
    this.showEmailModal = this.showEmailModal.bind(this);

    this.closeVpnModal = this.closeVpnModal.bind(this);
    this.showVpnModal = this.showVpnModal.bind(this);

    this.closeAzureModal = this.closeAzureModal.bind(this);
    this.showAzureModal = this.showAzureModal.bind(this);

    this.closeAwsModal = this.closeAwsModal.bind(this);
    this.showAwsModal = this.showAwsModal.bind(this);

    this.closeProxyModal = this.closeProxyModal.bind(this);
    this.showProxyModal = this.showProxyModal.bind(this);

    this.closeFtpModal = this.closeFtpModal.bind(this);
    this.showFtpModal = this.showFtpModal.bind(this);

    this.closeDockerModal = this.closeDockerModal.bind(this);
    this.showDockerModal = this.showDockerModal.bind(this);

    this.closeLinuxModal = this.closeLinuxModal.bind(this);
    this.showLinuxModal = this.showLinuxModal.bind(this);

    this.closeCustomModal = this.closeCustomModal.bind(this);
    this.showCustomModal = this.showCustomModal.bind(this);
  }

  

  showWindowsModal = () => {
    this.setState({ isWindowsModalVisible: true })
  }

  closeWindowsModal = () => {
    this.setState({ isWindowsModalVisible: false })
  }
  
  showFirewallModal = () => {
    this.setState({ isWindowsModalVisible: true })
  }

  closeFirewallModal = () => {
    this.setState({ isWindowsModalVisible: false })
  }

  showBancoModal = () => {
    this.setState({ isWindowsModalVisible: true })
  }

  closeBancoModal = () => {
    this.setState({ isWindowsModalVisible: false })
  }

  showServerModal = () => {
    this.setState({ isWindowsModalVisible: true })
  }

  closeServerModal = () => {
    this.setState({ isWindowsModalVisible: false })
  }

  showAntivirusModal = () => {
    this.setState({ isWindowsModalVisible: true })
  }

  closeAntivirusModal = () => {
    this.setState({ isWindowsModalVisible: false })
  }

  showEmailModal = () => {
    this.setState({ isWindowsModalVisible: true })
  }

  closeEmailModal = () => {
    this.setState({ isWindowsModalVisible: false })
  }

  showVpnModal = () => {
    this.setState({ isWindowsModalVisible: true })
  }

  closeVpnModal = () => {
    this.setState({ isWindowsModalVisible: false })
  }

  showAzureModal = () => {
    this.setState({ isWindowsModalVisible: true })
  }

  closeAzureModal = () => {
    this.setState({ isWindowsModalVisible: false })
  }

  showAwsModal = () => {
    this.setState({ isWindowsModalVisible: true })
  }

  closeAwsModal = () => {
    this.setState({ isWindowsModalVisible: false })
  }

  showProxyModal = () => {
    this.setState({ isWindowsModalVisible: true })
  }

  closeProxyModal = () => {
    this.setState({ isWindowsModalVisible: false })
  }

  showFtpModal = () => {
    this.setState({ isWindowsModalVisible: true })
  }

  closeFtpModal = () => {
    this.setState({ isWindowsModalVisible: false })
  }

  showDockerModal = () => {
    this.setState({ isWindowsModalVisible: true })
  }

  closeDockerModal = () => {
    this.setState({ isWindowsModalVisible: false })
  }

  showLinuxModal = () => {
    this.setState({ isWindowsModalVisible: true })
  }

  closeLinuxModal = () => {
    this.setState({ isWindowsModalVisible: false })
  }

  showCustomModal = () => {
    this.setState({ isWindowsModalVisible: true })
  }

  closeCustomModal = () => {
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

  /* construção card de modal*/

 buildWindowsCard(tab, icon) {
    return (
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type={icon} />}
          title={TabDescription[tab].title}
          onClick={this.showWindowsModal}
          description={TabDescription[tab].description}
        />
      </EuiFlexItem>
    );
  }

  buildFirewallCard(tab, icon) {
    return (
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type={icon} />}
          title={TabDescription[tab].title}
          onClick={this.showFirewallModal}
          description={TabDescription[tab].description}
        />
      </EuiFlexItem>
    );
  }

  buildBancoCard(tab, icon) {
    return (
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type={icon} />}
          title={TabDescription[tab].title}
          onClick={this.showBancoModal}
          description={TabDescription[tab].description}
        />
      </EuiFlexItem>
    );
  }

  buildServerCard(tab, icon) {
    return (
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type={icon} />}
          title={TabDescription[tab].title}
          onClick={this.showServerModal}
          description={TabDescription[tab].description}
        />
      </EuiFlexItem>
    );
  }

  buildAntivirusCard(tab, icon) {
    return (
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type={icon} />}
          title={TabDescription[tab].title}
          onClick={this.showAntivirusModal}
          description={TabDescription[tab].description}
        />
      </EuiFlexItem>
    );
  }

  buildEmailCard(tab, icon) {
    return (
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type={icon} />}
          title={TabDescription[tab].title}
          onClick={this.showEmailModal}
          description={TabDescription[tab].description}
        />
      </EuiFlexItem>
    );
  }

  buildVpnCard(tab, icon) {
    return (
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type={icon} />}
          title={TabDescription[tab].title}
          onClick={this.showVpnModal}
          description={TabDescription[tab].description}
        />
      </EuiFlexItem>
    );
  }

  buildAzureCard(tab, icon) {
    return (
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type={icon} />}
          title={TabDescription[tab].title}
          onClick={this.showAzureModal}
          description={TabDescription[tab].description}
        />
      </EuiFlexItem>
    );
  }

  buildAwsCard(tab, icon) {
    return (
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type={icon} />}
          title={TabDescription[tab].title}
          onClick={this.showAwsModal}
          description={TabDescription[tab].description}
        />
      </EuiFlexItem>
    );
  }

  buildProxyCard(tab, icon) {
    return (
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type={icon} />}
          title={TabDescription[tab].title}
          onClick={this.showProxyModal}
          description={TabDescription[tab].description}
        />
      </EuiFlexItem>
    );
  }

  buildFtpCard(tab, icon) {
    return (
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type={icon} />}
          title={TabDescription[tab].title}
          onClick={this.showFtpModal}
          description={TabDescription[tab].description}
        />
      </EuiFlexItem>
    );
  }

  buildDockerCard(tab, icon) {
    return (
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type={icon} />}
          title={TabDescription[tab].title}
          onClick={this.showDockerModal}
          description={TabDescription[tab].description}
        />
      </EuiFlexItem>
    );
  }

  buildLinuxCard(tab, icon) {
    return (
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type={icon} />}
          title={TabDescription[tab].title}
          onClick={this.showLinuxModal}
          description={TabDescription[tab].description}
        />
      </EuiFlexItem>
    );
  }

  buildCustomCard(tab, icon) {
    return (
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type={icon} />}
          title={TabDescription[tab].title}
          onClick={this.showCustomModal}
          description={TabDescription[tab].description}
        />
      </EuiFlexItem>
    );
  }

  /* fim do card modal */

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
/* inicio da pagina modal*/
  render() {
    let WindowsModal;

    if(this.state.isWindowsModalVisible) {
      WindowsModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do this thing"
            onCancel={this.closeWindowsModal}
            onConfirm={this.closeWindowsModal}
            cancelButtonText="Cancelar"
            confirmButtonText="Adiquirir"
            defaultFocusedButton="Confirmar">
            <p>You&rsquo;re about to do something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

    let FirewallModal;

    if(this.state.isFirewallModalVisible) {
      FirewallModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do this thing"
            onCancel={this.closeFirewallModal}
            onConfirm={this.closeFirewallModal}
            cancelButtonText="Cancelar"
            confirmButtonText="Adiquirir"
            defaultFocusedButton="Confirmar">
            <p>You&rsquo;re about to do something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

    let BancoModal;

    if(this.state.isBancoModalVisible) {
      BancoModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do this thing"
            onCancel={this.closeBancoModal}
            onConfirm={this.closeBancoModal}
            cancelButtonText="Cancelar"
            confirmButtonText="Adiquirir"
            defaultFocusedButton="Confirmar">
            <p>You&rsquo;re about to do something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

    let ServerModal;

    if(this.state.isServerModalVisible) {
      ServerModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do this thing"
            onCancel={this.closeServerModal}
            onConfirm={this.closeServerModal}
            cancelButtonText="Cancelar"
            confirmButtonText="Adiquirir"
            defaultFocusedButton="Confirmar">
            <p>You&rsquo;re about to do something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

    let AntivirusModal;

    if(this.state.isAntivirusModalVisible) {
      AntivirusModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do this thing"
            onCancel={this.closeAntivirusModal}
            onConfirm={this.closeAntivirusModal}
            cancelButtonText="Cancelar"
            confirmButtonText="Adiquirir"
            defaultFocusedButton="Confirmar">
            <p>You&rsquo;re about to do something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

    let EmailModal;

    if(this.state.isEmailModalVisible) {
      EmailModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do this thing"
            onCancel={this.closeEmailModal}
            onConfirm={this.closeEmailModal}
            cancelButtonText="Cancelar"
            confirmButtonText="Adiquirir"
            defaultFocusedButton="Confirmar">
            <p>You&rsquo;re about to do something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

    let VpnModal;

    if(this.state.isVpnModalVisible) {
      VpnModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do this thing"
            onCancel={this.closeVpnModal}
            onConfirm={this.closeVpnModal}
            cancelButtonText="Cancelar"
            confirmButtonText="Adiquirir"
            defaultFocusedButton="Confirmar">
            <p>You&rsquo;re about to do something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

    let AzureModal;

    if(this.state.isAzureModalVisible) {
      AzureModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do this thing"
            onCancel={this.closeAzureModal}
            onConfirm={this.closeAzureModal}
            cancelButtonText="Cancelar"
            confirmButtonText="Adiquirir"
            defaultFocusedButton="Confirmar">
            <p>You&rsquo;re about to do something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

    let AwsModal;

    if(this.state.isAwsModalVisible) {
      AwsModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do this thing"
            onCancel={this.closeAwsModal}
            onConfirm={this.closeAwsModal}
            cancelButtonText="Cancelar"
            confirmButtonText="Adiquirir"
            defaultFocusedButton="Confirmar">
            <p>You&rsquo;re about to do something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

    let ProxyModal;

    if(this.state.isProxyModalVisible) {
      ProxyModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do this thing"
            onCancel={this.closeProxyModal}
            onConfirm={this.closeProxyModal}
            cancelButtonText="Cancelar"
            confirmButtonText="Adiquirir"
            defaultFocusedButton="Confirmar">
            <p>You&rsquo;re about to do something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

    let FtpModal;

    if(this.state.isFtpModalVisible) {
      FtpModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do this thing"
            onCancel={this.closeFtpModal}
            onConfirm={this.closeFtpModal}
            cancelButtonText="Cancelar"
            confirmButtonText="Adiquirir"
            defaultFocusedButton="Confirmar">
            <p>You&rsquo;re about to do something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

    let DockerModal;

    if(this.state.isDockerModalVisible) {
      DockerModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do this thing"
            onCancel={this.closeDockerModal}
            onConfirm={this.closeDockerModal}
            cancelButtonText="Cancelar"
            confirmButtonText="Adiquirir"
            defaultFocusedButton="Confirmar">
            <p>You&rsquo;re about to do something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

    let LinuxModal;

    if(this.state.isLinuxModalVisible) {
      LinuxModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do this thing"
            onCancel={this.closeLinuxModal}
            onConfirm={this.closeLinuxModal}
            cancelButtonText="Cancelar"
            confirmButtonText="Adiquirir"
            defaultFocusedButton="Confirmar">
            <p>You&rsquo;re about to do something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

    let CustomModal;

    if(this.state.isCustomModalVisible) {
      CustomModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do this thing"
            onCancel={this.closeCustomModal}
            onConfirm={this.closeCustomModal}
            cancelButtonText="Cancelar"
            confirmButtonText="Adiquirir"
            defaultFocusedButton="Confirmar">
            <p>You&rsquo;re about to do something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }


/*fim da pagina modal*/    

    return (
      <div>
     {WindowsModal} 
     {FirewallModal} 
     {BancoModal} 
     {ServerModal} 
     {AntivirusModal} 
     {EmailModal} 
     {VpnModal} 
     {AzureModal} 
     {AwsModal} 
     {ProxyModal} 
     {FtpModal} 
     {DockerModal} 
     {LinuxModal} 
     {CustomModal} 
       <EuiFlexGroup>
          <EuiFlexItem>
            <EuiPanel betaBadgeLabel="Logs360 Store">
            <EuiSpacer size="xl" />
              <EuiFlexGroup gutterSize="xs">
              </EuiFlexGroup>
                <EuiFlexItem />
              <EuiFlexGrid columns={3}>
                {this.buildWindowsCard('windows', 'logoWindows')}
                {this.buildFirewallCard('firewall', 'securityAnalyticsApp')}
                {this.buildBancoCard('bd', 'sqlApp')}
                {this.buildServerCard('webserver', 'indexPatternApp')}
                {this.buildAntivirusCard('antivirus', 'securityApp')}
                {this.buildEmailCard('email', 'email')}
                {this.buildVpnCard('vpn', 'graphApp')}
                {this.buildAzureCard('azure1', 'logoAzure')}
                {this.buildAwsCard('aws1', 'logoAWS')}
                {this.buildProxyCard('proxy', 'securityAnalyticsApp')}
                {this.buildFtpCard('ftp', 'indexPatternApp')}
                {this.buildDockerCard('docker1', 'logoDocker')}
                {this.buildLinuxCard('linux', 'consoleApp')}
                {this.buildCustomCard('costum', 'devToolsApp')}
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

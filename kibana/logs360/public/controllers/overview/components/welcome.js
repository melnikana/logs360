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
  EuiOverlayMask,
  EuiModal,
  EuiModalHeader,
  EuiModalBody,
  EuiModalHeaderTitle,
  EuiModalFooter,
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
    this.setState({ isFirewallModalVisible: true })
  }

  closeFirewallModal = () => {
    this.setState({ isFirewallModalVisible: false })
  }

  showBancoModal = () => {
    this.setState({ isBancoModalVisible: true })
  }

  closeBancoModal = () => {
    this.setState({ isBancoModalVisible: false })
  }

  showServerModal = () => {
    this.setState({ isServerModalVisible: true })
  }

  closeServerModal = () => {
    this.setState({ isServerModalVisible: false })
  }

  showAntivirusModal = () => {
    this.setState({ isAntivirusModalVisible: true })
  }

  closeAntivirusModal = () => {
    this.setState({ isAntivirusModalVisible: false })
  }

  showEmailModal = () => {
    this.setState({ isEmailModalVisible: true })
  }

  closeEmailModal = () => {
    this.setState({ isEmailModalVisible: false })
  }

  showVpnModal = () => {
    this.setState({ isVpnModalVisible: true })
  }

  closeVpnModal = () => {
    this.setState({ isVpnModalVisible: false })
  }

  showAzureModal = () => {
    this.setState({ isAzureModalVisible: true })
  }

  closeAzureModal = () => {
    this.setState({ isAzureModalVisible: false })
  }

  showAwsModal = () => {
    this.setState({ isAwsModalVisible: true })
  }

  closeAwsModal = () => {
    this.setState({ isAwsModalVisible: false })
  }

  showProxyModal = () => {
    this.setState({ isProxyModalVisible: true })
  }

  closeProxyModal = () => {
    this.setState({ isProxyModalVisible: false })
  }

  showFtpModal = () => {
    this.setState({ isFtpModalVisible: true })
  }

  closeFtpModal = () => {
    this.setState({ isFtpModalVisible: false })
  }

  showDockerModal = () => {
    this.setState({ isDockerModalVisible: true })
  }

  closeDockerModal = () => {
    this.setState({ isDockerModalVisible: false })
  }

  showLinuxModal = () => {
    this.setState({ isLinuxModalVisible: true })
  }

  closeLinuxModal = () => {
    this.setState({ isLinuxModalVisible: false })
  }

  showCustomModal = () => {
    this.setState({ isCustomModalVisible: true })
  }

  closeCustomModal = () => {
    this.setState({ isCustomModalVisible: false })
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
    const cardFooterContent = (
      <EuiFlexGroup justifyContent="flexEnd">
        <EuiFlexItem grow={false}>
          <EuiButton href="http://logs360.com.br/#forms" target="_blank">Adiquirir</EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    );

    let WindowsModal;

    if(this.state.isWindowsModalVisible) {
      WindowsModal = (
        <EuiOverlayMask>
          <EuiModal onClose={this.closeWindowsModal}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Tudo para Windows</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody> 
              <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/M6ouYme.png"
                      title="Active Directory"
                      description={<div>
                        - Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/drlq2GW.png"
                      title="Comportamento de Usuário"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/pfKn56B.png"
                      title="File Server"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
            </EuiModalBody>

            <EuiModalFooter>
            <EuiButton onClick={this.closeWindowsModal} fill>
                Fechar
            </EuiButton>

            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }

    let FirewallModal;

    if(this.state.isFirewallModalVisible) {
      FirewallModal = (
        <EuiOverlayMask>
          <EuiModal onClose={this.closeFirewallModal}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Tudo para Firewall</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody> 
              <EuiFlexGroup gutterSize="l">
                  <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/jvuM55j.png"
                      title="Detecção de Ameaças"
                      description={
                      <div> - Menos riscos.<br />
                            - Mais segurança.<br />
                            - Tudo em tempo real. <br />
                       </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/y0NFqtw.png"
                      title="Monitoramento"
                      description={
                      <div> - Monitoramento de Segurança.<br />
                            - Analise de atividades.<br />
                            - Monitore com facilidade. <br /> 
                        </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/a9xBmro.png"
                      title="Compliance"
                      description={
                      <div> - Esteja em conformidade.<br />
                            - Tudo dendro da LGPD.<br />
                            - Esteja seguro de seus dados. <br /> 
                        </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
            </EuiModalBody>

            <EuiModalFooter>
            <EuiButton onClick={this.closeFirewallModal} fill>
                Fechar
            </EuiButton>

            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }

    let BancoModal;

    if(this.state.isBancoModalVisible) {
      BancoModal = (
        <EuiOverlayMask>
          <EuiModal onClose={this.closeBancoModal}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Tudo para Banco</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody> 
              <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/Md5gfOP.png"
                      title="Monitoramento de Segurança"
                      description={
                      <div>
                        - Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> 
                        </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/l2lA3oQ.png"
                      title="Monitoramento de Acesso"
                      description={
                      <div>
                        - Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br />
                      </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/a9xBmro.png"
                      title="Compliance"
                      description={
                      <div>
                        - Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> 
                      </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
            </EuiModalBody>

            <EuiModalFooter>
            <EuiButton onClick={this.closeBancoModal} fill>
                Fechar
            </EuiButton>

            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }

    let ServerModal;

    if(this.state.isServerModalVisible) {
      ServerModal = (
        <EuiOverlayMask>
          <EuiModal onClose={this.closeServerModal}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Tudo para Web Server</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody> 
              <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/Md5gfOP.png"
                      title="Monitoramento de segurança"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/a9xBmro.png"
                      title="Compliance"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/oURuXYV.png"
                      title="Analitics"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
            </EuiModalBody>

            <EuiModalFooter>
            <EuiButton onClick={this.closeServerModal} fill>
                Fechar
            </EuiButton>

            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }

    let AntivirusModal;

    if(this.state.isAntivirusModalVisible) {
      AntivirusModal = (
        <EuiOverlayMask>
          <EuiModal onClose={this.closeAntivirusModal}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Tudo para Antivirus</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody> 
              <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/NS4jGdj.png"
                      title="Monitoramento de Segurança"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/a9xBmro.png"
                      title="Compliance"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>                 
                </EuiFlexGroup>
            </EuiModalBody>

            <EuiModalFooter>
            <EuiButton onClick={this.closeAntivirusModal} fill>
                Fechar
            </EuiButton>

            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }

    let EmailModal;

    if(this.state.isEmailModalVisible) {
      EmailModal = (
        <EuiOverlayMask>
                    <EuiModal onClose={this.closeEmailModal}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Tudo para Email</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody> 
              <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/qw8YSfJ.png"
                      title="Monitoramento de Segurança"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/a9xBmro.png"
                      title="Compliance"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/r8CJ6Bd.png"
                      title="Analitics"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
            </EuiModalBody>

            <EuiModalFooter>
            <EuiButton onClick={this.closeEmailModal} fill>
                Fechar
            </EuiButton>

            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }

    let VpnModal;

    if(this.state.isVpnModalVisible) {
      VpnModal = (
        <EuiOverlayMask>
                    <EuiModal onClose={this.closeVpnModal}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Tudo para VPN</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody> 
              <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/04hm6Oq.png"
                      title="Monitoramento de Segurança"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/drlq2GW.png"
                      title="Comportamento de Usuário"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/a9xBmro.png"
                      title="Compliance"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
            </EuiModalBody>

            <EuiModalFooter>
            <EuiButton onClick={this.closeVpnModal} fill>
                Fechar
            </EuiButton>

            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }

    let AzureModal;

    if(this.state.isAzureModalVisible) {
      AzureModal = (
        <EuiOverlayMask>
          <EuiModal onClose={this.closeAzureModal}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Tudo para Azure</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/04hm6Oq.png"
                      title="Monitoramento de Segurança"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/lipfmYI.png"
                      title="Storage"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
            </EuiModalBody>

            <EuiModalFooter>
            <EuiButton onClick={this.closeAzureModal} fill>
                Fechar
            </EuiButton>

            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }

    let AwsModal;

    if(this.state.isAwsModalVisible) {
      AwsModal = (
        <EuiOverlayMask>
<EuiModal onClose={this.closeAwsModal}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Tudo para Antivirus</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody> 
              <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://source.unsplash.com/400x200/?Nature"
                      title="Wodle"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://source.unsplash.com/400x200/?Nature"
                      title="Cloudtrail"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://source.unsplash.com/400x200/?Nature"
                      title="Errors"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>

                <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://source.unsplash.com/400x200/?Nature"
                      title="Monitoramento de Acesso"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://source.unsplash.com/400x200/?Nature"
                      title="Guard Duty"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://source.unsplash.com/400x200/?Nature"
                      title="Maciel Alerts"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>

                <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://source.unsplash.com/400x200/?Nature"
                      title="VPC Flow"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://source.unsplash.com/400x200/?Nature"
                      title="AWS Config"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://source.unsplash.com/400x200/?Nature"
                      title="Config History"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>

                <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://source.unsplash.com/400x200/?Nature"
                      title="Trusty Advisor"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://source.unsplash.com/400x200/?Nature"
                      title="AWS KMS"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://source.unsplash.com/400x200/?Nature"
                      title="AWS Inspector"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
            </EuiModalBody>

            <EuiModalFooter>
            <EuiButton onClick={this.closeAwsModal} fill>
                Fechar
            </EuiButton>

            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }

    let ProxyModal;

    if(this.state.isProxyModalVisible) {
      ProxyModal = (
        <EuiOverlayMask>
                    <EuiModal onClose={this.closeProxyModal}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Tudo para Proxy</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody> 
              <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/04hm6Oq.png"
                      title="Monitoramento de segurança"
                      description={
                      <div>
                        - Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br />
                      </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/y0NFqtw.png"
                      title="Analytics"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/a9xBmro.png"
                      title="Compliance"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
            </EuiModalBody>

            <EuiModalFooter>
            <EuiButton onClick={this.closeProxyModal} fill>
                Fechar
            </EuiButton>

            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }

    let FtpModal;

    if(this.state.isFtpModalVisible) {
      FtpModal = (
        <EuiOverlayMask>
            <EuiModal onClose={this.closeFtpModal}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Tudo para FTP</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody> 
              <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/04hm6Oq.png"
                      title="Monitoramento de segurança"
                      description={
                      <div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> 
                      </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/XiJeB8a.png"
                      title="Controle de Acesso"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/a9xBmro.png"
                      title="Compliance"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
            </EuiModalBody>

            <EuiModalFooter>
            <EuiButton onClick={this.closeFtpModal} fill>
                Fechar
            </EuiButton>

            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }

    let DockerModal;

    if(this.state.isDockerModalVisible) {
      DockerModal = (
        <EuiOverlayMask>
                    <EuiModal onClose={this.closeDockerModal}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Tudo para Docker</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody> 
              <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/04hm6Oq.png"
                      title="Monitoramento de segurança"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/KtouL75.png"
                      title="Monitoramento de Containers"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/H8Zh1gt.png"
                      title="Monitoramento de Hardware"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>

                <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/a9xBmro.png"
                      title="Compliance"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/RISAolI.png"
                      title="Controle de Autenticação"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>                  
                </EuiFlexGroup>
            </EuiModalBody>

            <EuiModalFooter>
            <EuiButton onClick={this.closeDockerModal} fill>
                Fechar
            </EuiButton>

            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }

    let LinuxModal;

    if(this.state.isLinuxModalVisible) {
      LinuxModal = (
        <EuiOverlayMask>
                    <EuiModal onClose={this.closeLinuxModal}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Tudo para Linux</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody> 
              <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/XiJeB8a.png"
                      title="Controle de Acesso"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/a9xBmro.png"
                      title="Compliance"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>                  
                </EuiFlexGroup>

                <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/8Ekd5VG.png"
                      title="Sys Log"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/y0NFqtw.png"
                      title="Analytics"
                      description={<div>- Verfique atividades.<br />
                        - Monitore conteúdo.<br />
                        - Desempenho. <br /> </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>                  
                </EuiFlexGroup>
            </EuiModalBody>

            <EuiModalFooter>
            <EuiButton onClick={this.closeLinuxModal} fill>
                Fechar
            </EuiButton>

            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }

    let CustomModal;

    if(this.state.isCustomModalVisible) {
      CustomModal = (
        <EuiOverlayMask>
                    <EuiModal onClose={this.closeCustomModal}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Pacote customizado.</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody> 
              <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                    <EuiCard
                      textAlign="left"
                      image="https://i.imgur.com/KS3u2Dz.png"
                      title="Active Directory"
                      description={
                      <div>Pellentesque lobortis velit quis consequat dignissim. 
                        Pellentesque sagittis sollicitudin neque et aliquet. 
                        Duis mattis nisi nibh, luctus suscipit ex convallis nec. 
                        Nunc aliquet felis et gravida ornare. 
                        Maecenas volutpat fringilla risus sed sagittis.
                        Nulla a fringilla dolor. 
                        Donec ut purus id magna scelerisque consequat commodo sed ligula </div>}
                      footer={cardFooterContent}
                    />
                  </EuiFlexItem>                  
                </EuiFlexGroup>
            </EuiModalBody>

            <EuiModalFooter>
            <EuiButton onClick={this.closeCustomModal} fill>
                Fechar
            </EuiButton>

            </EuiModalFooter>
          </EuiModal>
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

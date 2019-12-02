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
      isAzureModalVisible: false
    };
  }


  ShowWindowsModal() {
    this.setState({ isWindowsModalVisible: true })
  }

  CloseWindowsModal = () => {
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
 buildCustomCard(tab, icon, modalname) {
    return (
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type={icon} />}
          title={TabDescription[tab].title}
          onClick={() => this.ShowWindowsModal(modalname)}
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
/* inicio da pagina modal*/
  render() {
    let WindowsModal;

    if(this.state.isWindowsModalVisible) {
      WindowsModal = (
        /*<EuiOverlayMask>
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
        </EuiOverlayMask>*/

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
                  share of honour. God&rsquo;s will! I pray thee, wish not one
                  man more. By Jove, I am not covetous for gold, Nor care I who
                  doth feed upon my cost; It yearns me not if men my garments
                  wear; Such outward things dwell not in my desires. But if it
                  be a sin to covet honour, I am the most offending soul alive.
                  No, faith, my coz, wish not a man from England. God&rsquo;s
                  peace! I would not lose so great an honour As one man more
                  methinks would share from me For the best hope I have. O, do
                  not wish one more! Rather proclaim it, Westmorland, through my
                  host, That he which hath no stomach to this fight, Let him
                  depart; his passport shall be made, And crowns for convoy put
                  into his purse; We would not die in that man&rsquo;s company
                  That fears his fellowship to die with us. This day is
                  call&rsquo;d the feast of Crispian. He that outlives this day,
                  and comes safe home, Will stand a tip-toe when this day is
                  nam&rsquo;d, And rouse him at the name of Crispian. He that
                  shall live this day, and see old age, Will yearly on the vigil
                  feast his neighbours, And say &ldquo;To-morrow is Saint
                  Crispian.&rdquo; Then will he strip his sleeve and show his
                  scars, And say &ldquo;These wounds I had on Crispin&rsquo;s
                  day.&rdquo; Old men forget; yet all shall be forgot, But
                  he&rsquo;ll remember, with advantages, What feats he did that
                  day. Then shall our names, Familiar in his mouth as household
                  words— Harry the King, Bedford and Exeter, Warwick and Talbot,
                  Salisbury and Gloucester— Be in their flowing cups freshly
                  rememb&rsquo;red. This story shall the good man teach his son;
                  And Crispin Crispian shall ne&rsquo;er go by, From this day to
                  the ending of the world, But we in it shall be rememberèd— We
                  few, we happy few, we band of brothers; For he to-day that
                  sheds his blood with me Shall be my brother; be he ne&rsquo;er
                  so vile, This day shall gentle his condition; And gentlemen in
                  England now a-bed Shall think themselves accurs&rsquo;d they
                  were not here, And hold their manhoods cheap whiles any speaks
                  That fought with us upon Saint Crispin&rsquo;s day.
                </p>
              </EuiText>
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButtonEmpty onClick={this.closeWindowsModal}>Cancel</EuiButtonEmpty>

              <EuiButton onClick={this.closeWindowsModal} fill>
                Save
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }
    return (
      <div>
        <EuiButton onClick={this.showWindowsModal}>Show Modal</EuiButton>

        {modal}
      </div>
    );
  }
}

/*fim da pagina modal*/    

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
                {this.buildCustomCard('windows', 'logoWindows', '')}
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

/*
 * Logs360 app - React component for the adding an API entry form.
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
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiFieldText,
  EuiFieldPassword,
  EuiFieldNumber,
  EuiButton,
  EuiPanel
} from '@elastic/eui';

export class AddApi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      password: '',
      url: '',
      port: 55000
    };
  }

  onChangeEdit(e, field) {
    this.setState({
      [field]: e.target.value
    });
  }

  render() {
    return (
      <EuiPanel>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow label="Usuario">
              <EuiFieldText
                onChange={e => this.onChangeEdit(e, 'user')}
                placeholder="Usuario de API"
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Senha">
              <EuiFieldPassword
                onChange={e => this.onChangeEdit(e, 'password')}
                placeholder="Senha"
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Host">
              <EuiFieldText
                onChange={e => this.onChangeEdit(e, 'url')}
                placeholder="https://localhost"
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Porta">
              <EuiFieldNumber
                max={99999}
                onChange={e => this.onChangeEdit(e, 'port')}
                placeholder={55000}
              />
            </EuiFormRow>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiFormRow label="Ações">
              <EuiButton
                aria-label="Save"
                iconType="save"
                color="primary"
                onClick={() => this.props.saveSettings({ ...this.state })}
              >
                Salvar
              </EuiButton>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    );
  }
}

AddApi.propTypes = {
  saveSettings: PropTypes.func
};

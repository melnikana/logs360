"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Logs360 app - Wazuh welcome card directive
 * Copyright (C) 2019 Logs360, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
// @ts-ignore
const wz_welcome_card_html_1 = __importDefault(require("./wz-welcome-card.html"));
// @ts-ignore
const modules_1 = require("ui/modules");
const app = modules_1.uiModules.get('app/logs360', []);
class WzWelcomeCard {
    constructor(appState) {
        this.restrict = 'E';
        this.scope = {
            cardTitle: '=cardTitle',
            description: '=description',
            logo: '=logo',
            switchTab: '&',
            currentTab: '=currentTab',
            wzLogo: '=wzLogo'
        };
        this.replace = true;
        this.template = wz_welcome_card_html_1.default;
        this.appState = appState;
    }
    link(scope, elm, attrs) {
        scope.callSwitchTab = () => {
            this.appState.setNavigation(true);
            scope.switchTab();
        };
    }
}
app.directive('wzWelcomeCard', (appState) => new WzWelcomeCard(appState));

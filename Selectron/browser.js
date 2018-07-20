'use strict';
/// <reference path="node.d.ts" />
/// <reference path="electron.d.ts" />
const { remote } = require('electron');
const { ipcRenderer } = require('electron');
ipcRenderer.setMaxListeners(0);
const hostWindow = remote.getCurrentWindow();
const { Menu, MenuItem } = remote;
const webviews = document.getElementById('webviews');

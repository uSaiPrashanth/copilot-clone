"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const CSConfig = {
    API_KEY: String(vscode.workspace.getConfiguration('copilotclone').get('key_value')),
    SEARCH_PHARSE_START: String(vscode.workspace.getConfiguration('copilotclone').get('searchphasestart')),
    SEARCH_PHARSE_END: String(vscode.workspace.getConfiguration('copilotclone').get('searchphaseend')),
    MODEL: String(vscode.workspace.getConfiguration('copilotclone').get('usemodel'))
};
exports.default = CSConfig;

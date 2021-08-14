"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
const vscode = require("vscode");
const CSConfig = {
    API_KEY: String(vscode.workspace.getConfiguration('copilotclone').get('key_value')),
    SEARCH_PHARSE_START: String(vscode.workspace.getConfiguration('copilotclone').get('searchphasestart')),
    SEARCH_PHARSE_END: String(vscode.workspace.getConfiguration('copilotclone').get('searchphaseend')),
    MODEL: String(vscode.workspace.getConfiguration('copilotclone').get('usemodel'))
=======
exports.getSearchURL = void 0;
const CSConfig = {
    SEARCH_PATTERN: /(\/\/|#|--|<!--)\s?find\s?(.+)\s?(\.|-->)/
>>>>>>> d3883d1299915e757752a27db169a90cad67e13b
};
function getSearchURL(site, keyword) {
    return `https://www.google.com/search?q=site%3A${site}+${keyword.replace(/\s/g, "+")}`;
}
exports.getSearchURL = getSearchURL;
exports.default = CSConfig;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const search_1 = require("./utils/search");
const config_1 = require("./config");
function activate(context) {
    const inpbox = vscode.window.createInputBox();
    const disposable = vscode.commands.registerCommand('extension.copilot-clone-settings', () => {
        vscode.window.showInformationMessage('Show settings');
    });
    context.subscriptions.push(disposable);
    const provider = {
        provideInlineCompletionItems: async (document, position, context, token) => {
            var _a;
            const textBeforeCursor = document.getText(new vscode.Range(position.with(0, 0), position));
            if (textBeforeCursor.indexOf(config_1.default.SEARCH_PHARSE_START) != -1 && textBeforeCursor[textBeforeCursor.length - 1] === config_1.default.SEARCH_PHARSE_END) {
                let rs;
                const val = (_a = config_1.default.API_KEY) !== null && _a !== void 0 ? _a : false;
                if (!val) {
                    inpbox.title = "Your API Code";
                    inpbox.placeholder = config_1.default.API_KEY;
                    inpbox.prompt = "Enter API Code to calibrate commands";
                    inpbox.show();
                    inpbox.onDidAccept((e) => {
                        vscode.workspace.getConfiguration('copilotclone').update('key_value', inpbox.value)
                            .then((res) => {
                            vscode.window.showInformationMessage("Key successfully updated. Now try again");
                        }, (res) => {
                            vscode.window.showInformationMessage("Key not updated as you are not in a workspace. Update it in settings");
                        });
                        inpbox.hide();
                    });
                    inpbox.onDidHide((e) => {
                        vscode.window.showInformationMessage("Note that you need to change the api key in order to use the extension");
                    });
                }
                try {
                    rs = await search_1.search(textBeforeCursor.substr(textBeforeCursor.search(config_1.default.SEARCH_PHARSE_START)));
                }
                catch (err) {
                    return { items: [] };
                }
                if (rs == null) {
                    return { items: [] };
                }
                const items = new Array();
                rs.results.forEach((item, i) => {
                    const output = item;
                    items.push({
                        text: output,
                        range: new vscode.Range(position.translate(0, output.length), position),
                        trackingId: `snippet-${i}`,
                    });
                });
                return { items };
            }
            return { items: [] };
        },
    };
    vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, provider);
    // Be aware that the API around `getInlineCompletionItemController` will not be finalized as is!
    vscode.window.getInlineCompletionItemController(provider).onDidShowCompletionItem(e => {
        const id = e.completionItem.trackingId;
    });
}
exports.activate = activate;

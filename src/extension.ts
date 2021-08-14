import * as vscode from 'vscode';
<<<<<<< HEAD
import { search } from './utils/search';
import CSConfig from './config';
=======

import { search } from './utils/search';
import { matchSearchPhrase } from './utils/matchSearchPhrase';

>>>>>>> d3883d1299915e757752a27db169a90cad67e13b
export function activate(context: vscode.ExtensionContext) {
	const inpbox = vscode.window.createInputBox();
	const disposable = vscode.commands.registerCommand(
		'extension.captain-stack-settings',
		() => {
			vscode.window.showInformationMessage('Show settings');
		}
	);
	context.subscriptions.push(disposable);

	const provider: vscode.InlineCompletionItemProvider<vscode.InlineCompletionItem> = {
		provideInlineCompletionItems: async (document, position, context, token) => {
			const textBeforeCursor = document.getText(
				new vscode.Range(position.with(0,0), position)
			);
<<<<<<< HEAD
			if (textBeforeCursor.indexOf(CSConfig.SEARCH_PHARSE_START) != -1 && textBeforeCursor[textBeforeCursor.length - 1] === CSConfig.SEARCH_PHARSE_END) {
=======

			const match = matchSearchPhrase(textBeforeCursor);

			if (match) {

>>>>>>> d3883d1299915e757752a27db169a90cad67e13b
				let rs;
				const val = CSConfig.API_KEY ?? false;
				if(!val){
					inpbox.title = "Your API Code";
					inpbox.placeholder = CSConfig.API_KEY;
					inpbox.prompt = "Enter API Code to calibrate commands";
					inpbox.show();
					inpbox.onDidAccept((e)=>{
						vscode.workspace.getConfiguration('copilotclone').update('key_value',inpbox.value)
						.then((res)=>{
							vscode.window.showInformationMessage("Key successfully updated. Now try again");
						},(res)=>{
							vscode.window.showInformationMessage("Key not updated as you are not in a workspace. Update it in settings" );
						});
						inpbox.hide();
					});
					inpbox.onDidHide((e)=>{
						vscode.window.showInformationMessage("Note that you need to change the api key in order to use the extension");
					});
				}
				try {
<<<<<<< HEAD
					rs = await search(textBeforeCursor.substr(textBeforeCursor.search(CSConfig.SEARCH_PHARSE_START)));
				} catch (err) {
					return { items:[] };
=======
					rs = await search(match.searchPhrase);
				} catch (err) {
					vscode.window.showErrorMessage(err.toString());
					return { items: [] };
>>>>>>> d3883d1299915e757752a27db169a90cad67e13b
				}

				if (rs == null) {
					return { items: [] };
				}

<<<<<<< HEAD
				const items = new Array<CustomInlineCompletionItem>();

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
=======
				const items = rs.results.map(item => {
					const output = `\n${match.commentSyntax} Source: ${item.sourceURL} ${match.commentSyntaxEnd}\n${item.code}`;
					return {
						text: output,
						range: new vscode.Range(position.translate(0, output.length), position)
					} as vscode.InlineCompletionItem;
				});

				return { items };
			}

>>>>>>> d3883d1299915e757752a27db169a90cad67e13b
			return { items: [] };
		},
	};

	vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, provider);
}

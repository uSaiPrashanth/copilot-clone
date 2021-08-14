import * as vscode from 'vscode';
const CSConfig = {
<<<<<<< HEAD
	API_KEY : String(vscode.workspace.getConfiguration('copilotclone').get('key_value')),
	SEARCH_PHARSE_START : String(vscode.workspace.getConfiguration('copilotclone').get('searchphasestart')),
	SEARCH_PHARSE_END : String(vscode.workspace.getConfiguration('copilotclone').get('searchphaseend')),
	MODEL:String(vscode.workspace.getConfiguration('copilotclone').get('usemodel'))
};
export default CSConfig;
=======
    SEARCH_PATTERN: /(\/\/|#|--|<!--)\s?find\s?(.+)\s?(\.|-->)/
};

export function getSearchURL(site: string, keyword: string) {
    return `https://www.google.com/search?q=site%3A${site}+${keyword.replace(/\s/g, "+")}`;
}

export default CSConfig;
>>>>>>> d3883d1299915e757752a27db169a90cad67e13b

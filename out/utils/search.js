"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const node_fetch_1 = require("node-fetch");
const config_1 = require("../config");
// Send search query to google, get answers from stackoverflow
// then extract and return code results
async function search(keyword) {
    let value = "Q:code to print hello world\nA:print(\"Hello World\")\nQ:";
    value += keyword.substr(config_1.default.SEARCH_PHARSE_START.length + 1, keyword.length - config_1.default.SEARCH_PHARSE_END.length - config_1.default.SEARCH_PHARSE_START.length);
    const res = await node_fetch_1.default("https://api.ai21.com/studio/v1/j1-" + config_1.default.MODEL + "/complete", {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + config_1.default.API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'prompt': value,
            'numResults': 1,
            'maxTokens': 256,
            'stopSequences': ["Q:"],
            'topKReturn': 0,
            'temperature': 0.0
        })
    });
    const json = await res.json();
    value = "\n";
    value += json.completions[0].data.text.substr(3);
    return new Promise((resolve) => {
        resolve({ results: [value] });
    });
}
exports.search = search;

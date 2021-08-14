"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
<<<<<<< HEAD
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
=======
const extractors_1 = require("./extractors");
const fetchPageContent_1 = require("./fetchPageContent");
const vscode = require("vscode");
/**
 * Cache results to avoid VSCode keep refetching
 */
const cachedResults = {};
// Send search query to google, get answers from stackoverflow
// then extract and return code results
async function search(keyword) {
    if (keyword in cachedResults) {
        return Promise.resolve({ results: cachedResults[keyword] });
    }
    /* eslint "no-async-promise-executor": "off" */
    return new Promise(async (resolve, reject) => {
        let results = [];
        let fetchResult;
        try {
            for (const i in extractors_1.default) {
                const extractor = extractors_1.default[i];
                const urls = await extractor.extractURLFromKeyword(keyword);
                for (const y in urls) {
                    // A promise for vscode to stop showing the status bar message when resolved with the FetchPageResult and then show message with attached promise
                    // so the message will be hidden again when promise has been resolved.
                    let promise = new Promise((resolve, reject) => {
                        resolve(fetchPageContent_1.fetchPageTextContent(urls[y]));
                    });
                    vscode.window.setStatusBarMessage("Loading Captain Stack results...", promise);
                    fetchResult = await promise;
                    // When promise resolved, show finished loading for 5 seconds
                    vscode.window.setStatusBarMessage("Finished loading results", 5000);
                    results = results.concat(extractor.extractSnippets(fetchResult));
                }
            }
            cachedResults[keyword] = results;
            resolve({ results });
        }
        catch (err) {
            reject(err);
        }
>>>>>>> d3883d1299915e757752a27db169a90cad67e13b
    });
}
exports.search = search;

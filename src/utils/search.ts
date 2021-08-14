<<<<<<< HEAD
import fetch from "node-fetch";
import CSConfig from "../config";
// Send search query to google, get answers from stackoverflow
// then extract and return code results
export async function search(keyword: string):  Promise<null | { results: string[] }> {
    let value = "Q:code to print hello world\nA:print(\"Hello World\")\nQ:";
    value += keyword.substr(CSConfig.SEARCH_PHARSE_START.length+1,keyword.length - CSConfig.SEARCH_PHARSE_END.length-CSConfig.SEARCH_PHARSE_START.length);
    const res = await fetch("https://api.ai21.com/studio/v1/j1-"+CSConfig.MODEL+"/complete",{
        method:'POST',
        headers:{
            'Authorization':'Bearer ' + CSConfig.API_KEY,
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
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
    return new Promise( (resolve) => {
        resolve({results:[value]});
    });
=======
import SnippetExtractors from "./extractors";
import { SnippetResult } from "./extractors/ExtractorAbstract";

import { FetchPageResult, fetchPageTextContent } from "./fetchPageContent";

import * as vscode from 'vscode';

/**
 * Cache results to avoid VSCode keep refetching
 */
const cachedResults: { [keyword: string]: SnippetResult[] } = {};

// Send search query to google, get answers from stackoverflow
// then extract and return code results
export async function search(keyword: string): Promise<null | { results: SnippetResult[] }> {

    if (keyword in cachedResults) {
        return Promise.resolve({ results: cachedResults[keyword] });
    }
    

    /* eslint "no-async-promise-executor": "off" */
    let promise = new Promise<{ results: SnippetResult[] }>(async (resolve, reject) => {

        let results: SnippetResult[] = [];
        let fetchResult: FetchPageResult;
        
        try {
            for (const i in SnippetExtractors) {
                const extractor = SnippetExtractors[i];
                const urls = await extractor.extractURLFromKeyword(keyword);

                 for (const y in urls) {
                    fetchResult = await fetchPageTextContent(urls[y]);
                    results = results.concat(extractor.extractSnippets(fetchResult));
                }
            }

            cachedResults[keyword] = results;

            resolve({ results });
        } catch (err) {
            reject(err);
        }
        
        // When promise resolved, show finished loading for 5 seconds
        vscode.window.setStatusBarMessage("Finished loading results", 5000);
    });
    
    vscode.window.setStatusBarMessage("Loading Captain Stack results...", promise);
    return promise;
>>>>>>> d3883d1299915e757752a27db169a90cad67e13b
}

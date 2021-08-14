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
}

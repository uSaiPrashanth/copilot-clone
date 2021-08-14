"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractGoogleResults = void 0;
function getres(keyword) {
    return keyword;
}
// Get search results from google, then return a list of stackoverflow links
function extractGoogleResults(keyword) {
    return new Promise((resolve, reject) => {
        return getres(keyword)
            .then(rs => {
            resolve(rs.textContent);
        })
            .catch(reject);
    });
}
exports.extractGoogleResults = extractGoogleResults;

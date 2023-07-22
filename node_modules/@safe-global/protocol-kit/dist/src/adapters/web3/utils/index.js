"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTxResult = exports.sameString = void 0;
function sameString(str1, str2) {
    return str1.toLowerCase() === str2.toLowerCase();
}
exports.sameString = sameString;
async function toTxResult(promiEvent, options) {
    return new Promise((resolve, reject) => promiEvent
        .once('transactionHash', (hash) => resolve({ hash, promiEvent, options }))
        .catch(reject));
}
exports.toTxResult = toTxResult;
//# sourceMappingURL=index.js.map
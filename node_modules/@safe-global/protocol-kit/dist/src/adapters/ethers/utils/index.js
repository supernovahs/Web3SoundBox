"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSignerCompatible = exports.isTypedDataSigner = exports.toTxResult = exports.sameString = void 0;
const abstract_signer_1 = require("@ethersproject/abstract-signer");
function sameString(str1, str2) {
    return str1.toLowerCase() === str2.toLowerCase();
}
exports.sameString = sameString;
function toTxResult(transactionResponse, options) {
    return {
        hash: transactionResponse.hash,
        options,
        transactionResponse
    };
}
exports.toTxResult = toTxResult;
function isTypedDataSigner(signer) {
    return signer._signTypedData !== undefined;
}
exports.isTypedDataSigner = isTypedDataSigner;
/**
 * Check if the signerOrProvider is compatible with `Signer`
 * @param signerOrProvider - Signer or provider
 * @returns true if the parameter is compatible with `Signer`
 */
function isSignerCompatible(signerOrProvider) {
    const candidate = signerOrProvider;
    return ((typeof candidate.signMessage === 'function' &&
        typeof candidate.signTransaction === 'function' &&
        candidate._isSigner) ||
        candidate instanceof abstract_signer_1.Signer);
}
exports.isSignerCompatible = isSignerCompatible;
//# sourceMappingURL=index.js.map
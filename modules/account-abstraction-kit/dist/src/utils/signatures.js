"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignature = exports.getSignTypedData = exports.isTypedDataSigner = void 0;
const constants_1 = require("../constants");
function isTypedDataSigner(signer) {
    return signer._signTypedData !== undefined;
}
exports.isTypedDataSigner = isTypedDataSigner;
function getSignTypedData(safeAddress, transaction, chainId) {
    return {
        types: constants_1.EIP712_SAFE_TX_TYPES,
        domain: {
            chainId,
            verifyingContract: safeAddress
        },
        primaryType: 'SafeTx',
        message: {
            to: transaction.to,
            value: transaction.value.toString(),
            data: transaction.data,
            operation: transaction.operation,
            safeTxGas: transaction.safeTxGas.toString(),
            baseGas: transaction.baseGas.toString(),
            gasPrice: transaction.gasPrice.toString(),
            gasToken: transaction.gasToken,
            refundReceiver: transaction.refundReceiver,
            nonce: transaction.nonce.toString()
        }
    };
}
exports.getSignTypedData = getSignTypedData;
async function getSignature(signer, safeAddress, transaction, chainId) {
    const typedData = getSignTypedData(safeAddress, transaction, chainId);
    let signature = '';
    if (isTypedDataSigner(signer)) {
        signature = await signer._signTypedData(typedData.domain, { SafeTx: typedData.types.SafeTx }, typedData.message);
    }
    return signature;
}
exports.getSignature = getSignature;
//# sourceMappingURL=signatures.js.map
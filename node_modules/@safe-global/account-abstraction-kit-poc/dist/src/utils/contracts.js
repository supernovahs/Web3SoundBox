"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateChainSpecificProxyAddress = exports.getSafeInitializer = exports.encodeMultiSendData = exports.encodeExecTransaction = exports.encodeSetupCallData = exports.encodeCreateProxyWithNonce = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const bytes_1 = require("@ethersproject/bytes");
const solidity_1 = require("@ethersproject/solidity");
const ethers_1 = require("ethers");
const constants_1 = require("../constants");
const deployments_1 = require("./deployments");
function encodeCreateProxyWithNonce(safeProxyFactoryContract, safeSingletonAddress, initializer) {
    return safeProxyFactoryContract.interface.encodeFunctionData('createProxyWithNonce', [
        safeSingletonAddress,
        initializer,
        constants_1.PREDETERMINED_SALT_NONCE
    ]);
}
exports.encodeCreateProxyWithNonce = encodeCreateProxyWithNonce;
function encodeSetupCallData(safeContract, owners, chainId) {
    return safeContract.interface.encodeFunctionData('setup', [
        owners,
        bignumber_1.BigNumber.from(1),
        constants_1.ZERO_ADDRESS,
        '0x',
        (0, deployments_1.getCompatibilityFallbackHandlerAddress)(chainId),
        constants_1.ZERO_ADDRESS,
        bignumber_1.BigNumber.from(0),
        constants_1.ZERO_ADDRESS
    ]);
}
exports.encodeSetupCallData = encodeSetupCallData;
function encodeExecTransaction(safeContract, transaction, signature) {
    return safeContract.interface.encodeFunctionData('execTransaction', [
        transaction.to,
        transaction.value,
        transaction.data,
        transaction.operation,
        transaction.safeTxGas,
        transaction.baseGas,
        transaction.gasPrice,
        transaction.gasToken,
        transaction.refundReceiver,
        signature
    ]);
}
exports.encodeExecTransaction = encodeExecTransaction;
function encodeMetaTransaction(tx) {
    const data = (0, bytes_1.arrayify)(tx.data);
    const encoded = (0, solidity_1.pack)(['uint8', 'address', 'uint256', 'uint256', 'bytes'], [tx.operation, tx.to, tx.value, data.length, data]);
    return encoded.slice(2);
}
function encodeMultiSendData(txs) {
    return '0x' + txs.map((tx) => encodeMetaTransaction(tx)).join('');
}
exports.encodeMultiSendData = encodeMultiSendData;
async function getSafeInitializer(safeContract, signerAddress, chainId) {
    const initializer = await encodeSetupCallData(safeContract, [signerAddress], chainId);
    return initializer;
}
exports.getSafeInitializer = getSafeInitializer;
async function calculateChainSpecificProxyAddress(safeProxyFactoryContract, signer, chainId) {
    const safeSingletonContract = (0, deployments_1.getSafeContract)(chainId, signer);
    const deployer = safeProxyFactoryContract.address;
    const signerAddress = await signer.getAddress();
    const deploymentCode = ethers_1.ethers.utils.solidityPack(['bytes', 'uint256'], [
        await (0, deployments_1.getSafeProxyFactoryContract)(chainId, signer).proxyCreationCode(),
        safeSingletonContract.address
    ]);
    const salt = ethers_1.ethers.utils.solidityKeccak256(['bytes32', 'uint256'], [
        ethers_1.ethers.utils.solidityKeccak256(['bytes'], [await getSafeInitializer(safeSingletonContract, signerAddress, chainId)]),
        constants_1.PREDETERMINED_SALT_NONCE
    ]);
    const derivedAddress = ethers_1.ethers.utils.getCreate2Address(deployer, salt, ethers_1.ethers.utils.keccak256(deploymentCode));
    return derivedAddress;
}
exports.calculateChainSpecificProxyAddress = calculateChainSpecificProxyAddress;
//# sourceMappingURL=contracts.js.map
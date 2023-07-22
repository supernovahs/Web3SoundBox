"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompatibilityFallbackHandlerAddress = exports.getMultiSendCallOnlyContract = exports.getSafeProxyFactoryContract = exports.getSafeContract = exports.safeDeploymentsL1ChainIds = void 0;
const safe_deployments_1 = require("@safe-global/safe-deployments");
const factories_1 = require("../../typechain/factories");
const libraries_1 = require("../../typechain/factories/libraries");
const proxies_1 = require("../../typechain/factories/proxies");
exports.safeDeploymentsL1ChainIds = [
    1 // Ethereum Mainnet
];
function getSafeContract(chainId, signer, isL1SafeMasterCopy = false) {
    const filters = {
        version: '1.3.0',
        network: chainId.toString(),
        released: true
    };
    const contractDeployment = exports.safeDeploymentsL1ChainIds.includes(chainId) || isL1SafeMasterCopy
        ? (0, safe_deployments_1.getSafeSingletonDeployment)(filters)
        : (0, safe_deployments_1.getSafeL2SingletonDeployment)(filters);
    const contractAddress = contractDeployment === null || contractDeployment === void 0 ? void 0 : contractDeployment.networkAddresses[chainId];
    if (!contractAddress) {
        throw new Error('Invalid SafeProxy contract address');
    }
    const contract = factories_1.GnosisSafe__factory.connect(contractAddress, signer);
    return contract;
}
exports.getSafeContract = getSafeContract;
function getSafeProxyFactoryContract(chainId, signer) {
    const contractDeployment = (0, safe_deployments_1.getProxyFactoryDeployment)({
        version: '1.3.0',
        network: chainId.toString(),
        released: true
    });
    const contractAddress = contractDeployment === null || contractDeployment === void 0 ? void 0 : contractDeployment.networkAddresses[chainId];
    if (!contractAddress) {
        throw new Error('Invalid SafeProxyFactory contract address');
    }
    const contract = proxies_1.GnosisSafeProxyFactory__factory.connect(contractAddress, signer);
    return contract;
}
exports.getSafeProxyFactoryContract = getSafeProxyFactoryContract;
function getMultiSendCallOnlyContract(chainId, signer) {
    const contractDeployment = (0, safe_deployments_1.getMultiSendCallOnlyDeployment)({
        version: '1.3.0',
        network: chainId.toString(),
        released: true
    });
    const contractAddress = contractDeployment === null || contractDeployment === void 0 ? void 0 : contractDeployment.networkAddresses[chainId];
    if (!contractAddress) {
        throw new Error('Invalid MultiSendCallOnly contract address');
    }
    const contract = libraries_1.MultiSendCallOnly__factory.connect(contractAddress, signer);
    return contract;
}
exports.getMultiSendCallOnlyContract = getMultiSendCallOnlyContract;
function getCompatibilityFallbackHandlerAddress(chainId) {
    const contractDeployment = (0, safe_deployments_1.getCompatibilityFallbackHandlerDeployment)({
        version: '1.3.0',
        network: chainId.toString(),
        released: true
    });
    const contractAddress = contractDeployment === null || contractDeployment === void 0 ? void 0 : contractDeployment.networkAddresses[chainId];
    if (!contractAddress) {
        throw new Error('Invalid CompatibilityFallbackHandler contract address');
    }
    return contractAddress;
}
exports.getCompatibilityFallbackHandlerAddress = getCompatibilityFallbackHandlerAddress;
//# sourceMappingURL=deployments.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSimulateTxAccessorContractInstance = exports.getCreateCallContractInstance = exports.getSignMessageLibContractInstance = exports.getSafeProxyFactoryContractInstance = exports.getMultiSendCallOnlyContractInstance = exports.getMultiSendContractInstance = exports.getCompatibilityFallbackHandlerContractInstance = exports.getSafeContractInstance = void 0;
const Gnosis_safe__factory_1 = require("../../../../typechain/src/ethers-v5/v1.0.0/factories/Gnosis_safe__factory");
const Proxy_factory__factory_1 = require("../../../../typechain/src/ethers-v5/v1.0.0/factories/Proxy_factory__factory");
const Gnosis_safe__factory_2 = require("../../../../typechain/src/ethers-v5/v1.1.1/factories/Gnosis_safe__factory");
const Multi_send__factory_1 = require("../../../../typechain/src/ethers-v5/v1.1.1/factories/Multi_send__factory");
const Proxy_factory__factory_2 = require("../../../../typechain/src/ethers-v5/v1.1.1/factories/Proxy_factory__factory");
const Gnosis_safe__factory_3 = require("../../../../typechain/src/ethers-v5/v1.2.0/factories/Gnosis_safe__factory");
const Compatibility_fallback_handler__factory_1 = require("../../../../typechain/src/ethers-v5/v1.3.0/factories/Compatibility_fallback_handler__factory");
const Create_call__factory_1 = require("../../../../typechain/src/ethers-v5/v1.3.0/factories/Create_call__factory");
const Gnosis_safe__factory_4 = require("../../../../typechain/src/ethers-v5/v1.3.0/factories/Gnosis_safe__factory");
const Multi_send__factory_2 = require("../../../../typechain/src/ethers-v5/v1.3.0/factories/Multi_send__factory");
const Multi_send_call_only__factory_1 = require("../../../../typechain/src/ethers-v5/v1.3.0/factories/Multi_send_call_only__factory");
const Proxy_factory__factory_3 = require("../../../../typechain/src/ethers-v5/v1.3.0/factories/Proxy_factory__factory");
const Sign_message_lib__factory_1 = require("../../../../typechain/src/ethers-v5/v1.3.0/factories/Sign_message_lib__factory");
const Simulate_tx_accessor__factory_1 = require("../../../../typechain/src/ethers-v5/v1.3.0/factories/Simulate_tx_accessor__factory");
const Compatibility_fallback_handler__factory_2 = require("../../../../typechain/src/ethers-v5/v1.4.1/factories/Compatibility_fallback_handler__factory");
const Create_call__factory_2 = require("../../../../typechain/src/ethers-v5/v1.4.1/factories/Create_call__factory");
const Multi_send__factory_3 = require("../../../../typechain/src/ethers-v5/v1.4.1/factories/Multi_send__factory");
const Multi_send_call_only__factory_2 = require("../../../../typechain/src/ethers-v5/v1.4.1/factories/Multi_send_call_only__factory");
const Safe__factory_1 = require("../../../../typechain/src/ethers-v5/v1.4.1/factories/Safe__factory");
const Safe_proxy_factory__factory_1 = require("../../../../typechain/src/ethers-v5/v1.4.1/factories/Safe_proxy_factory__factory");
const Sign_message_lib__factory_2 = require("../../../../typechain/src/ethers-v5/v1.4.1/factories/Sign_message_lib__factory");
const Simulate_tx_accessor__factory_2 = require("../../../../typechain/src/ethers-v5/v1.4.1/factories/Simulate_tx_accessor__factory");
const CompatibilityFallbackHandler_V1_3_0_Ethers_1 = __importDefault(require("./CompatibilityFallbackHandler/v1.3.0/CompatibilityFallbackHandler_V1_3_0_Ethers"));
const CompatibilityFallbackHandler_V1_4_1_Ethers_1 = __importDefault(require("./CompatibilityFallbackHandler/v1.4.1/CompatibilityFallbackHandler_V1_4_1_Ethers"));
const CreateCallEthersContract_V1_3_0_Ethers_1 = __importDefault(require("./CreateCall/v1.3.0/CreateCallEthersContract_V1_3_0_Ethers"));
const CreateCallEthersContract_V1_4_1_Ethers_1 = __importDefault(require("./CreateCall/v1.4.1/CreateCallEthersContract_V1_4_1_Ethers"));
const MultiSendContract_V1_1_1_Ethers_1 = __importDefault(require("./MultiSend/v1.1.1/MultiSendContract_V1_1_1_Ethers"));
const MultiSendContract_V1_3_0_Ethers_1 = __importDefault(require("./MultiSend/v1.3.0/MultiSendContract_V1_3_0_Ethers"));
const MultiSendContract_V1_4_1_Ethers_1 = __importDefault(require("./MultiSend/v1.4.1/MultiSendContract_V1_4_1_Ethers"));
const MultiSendCallOnlyContract_V1_3_0_Ethers_1 = __importDefault(require("./MultiSendCallOnly/v1.3.0/MultiSendCallOnlyContract_V1_3_0_Ethers"));
const MultiSendCallOnlyContract_V1_4_1_Ethers_1 = __importDefault(require("./MultiSendCallOnly/v1.4.1/MultiSendCallOnlyContract_V1_4_1_Ethers"));
const SafeContract_V1_0_0_Ethers_1 = __importDefault(require("./Safe/v1.0.0/SafeContract_V1_0_0_Ethers"));
const SafeContract_V1_1_1_Ethers_1 = __importDefault(require("./Safe/v1.1.1/SafeContract_V1_1_1_Ethers"));
const SafeContract_V1_2_0_Ethers_1 = __importDefault(require("./Safe/v1.2.0/SafeContract_V1_2_0_Ethers"));
const SafeContract_V1_3_0_Ethers_1 = __importDefault(require("./Safe/v1.3.0/SafeContract_V1_3_0_Ethers"));
const SafeContract_V1_4_1_Ethers_1 = __importDefault(require("./Safe/v1.4.1/SafeContract_V1_4_1_Ethers"));
const SafeProxyFactoryContract_V1_0_0_Ethers_1 = __importDefault(require("./SafeProxyFactory/v1.0.0/SafeProxyFactoryContract_V1_0_0_Ethers"));
const SafeProxyFactoryContract_V1_1_1_Ethers_1 = __importDefault(require("./SafeProxyFactory/v1.1.1/SafeProxyFactoryContract_V1_1_1_Ethers"));
const SafeProxyFactoryContract_V1_3_0_Ethers_1 = __importDefault(require("./SafeProxyFactory/v1.3.0/SafeProxyFactoryContract_V1_3_0_Ethers"));
const SafeProxyFactoryContract_V1_4_1_Ethers_1 = __importDefault(require("./SafeProxyFactory/v1.4.1/SafeProxyFactoryContract_V1_4_1_Ethers"));
const SignMessageLibContract_V1_3_0_Ethers_1 = __importDefault(require("./SignMessageLib/v1.3.0/SignMessageLibContract_V1_3_0_Ethers"));
const SignMessageLibContract_V1_4_1_Ethers_1 = __importDefault(require("./SignMessageLib/v1.4.1/SignMessageLibContract_V1_4_1_Ethers"));
const SimulateTxAccessorContract_V1_3_0_Ethers_1 = __importDefault(require("./SimulateTxAccessor/v1.3.0/SimulateTxAccessorContract_V1_3_0_Ethers"));
const SimulateTxAccessorContract_V1_4_1_Ethers_1 = __importDefault(require("./SimulateTxAccessor/v1.4.1/SimulateTxAccessorContract_V1_4_1_Ethers"));
function getSafeContractInstance(safeVersion, contractAddress, signerOrProvider) {
    let safeContract;
    switch (safeVersion) {
        case '1.4.1':
            safeContract = Safe__factory_1.Safe__factory.connect(contractAddress, signerOrProvider);
            return new SafeContract_V1_4_1_Ethers_1.default(safeContract);
        case '1.3.0':
            safeContract = Gnosis_safe__factory_4.Gnosis_safe__factory.connect(contractAddress, signerOrProvider);
            return new SafeContract_V1_3_0_Ethers_1.default(safeContract);
        case '1.2.0':
            safeContract = Gnosis_safe__factory_3.Gnosis_safe__factory.connect(contractAddress, signerOrProvider);
            return new SafeContract_V1_2_0_Ethers_1.default(safeContract);
        case '1.1.1':
            safeContract = Gnosis_safe__factory_2.Gnosis_safe__factory.connect(contractAddress, signerOrProvider);
            return new SafeContract_V1_1_1_Ethers_1.default(safeContract);
        case '1.0.0':
            safeContract = Gnosis_safe__factory_1.Gnosis_safe__factory.connect(contractAddress, signerOrProvider);
            return new SafeContract_V1_0_0_Ethers_1.default(safeContract);
        default:
            throw new Error('Invalid Safe version');
    }
}
exports.getSafeContractInstance = getSafeContractInstance;
function getCompatibilityFallbackHandlerContractInstance(safeVersion, contractAddress, signerOrProvider) {
    let compatibilityFallbackHandlerContract;
    switch (safeVersion) {
        case '1.4.1':
            compatibilityFallbackHandlerContract = Compatibility_fallback_handler__factory_2.Compatibility_fallback_handler__factory.connect(contractAddress, signerOrProvider);
            return new CompatibilityFallbackHandler_V1_4_1_Ethers_1.default(compatibilityFallbackHandlerContract);
        case '1.3.0':
        case '1.2.0':
        case '1.1.1':
            compatibilityFallbackHandlerContract = Compatibility_fallback_handler__factory_1.Compatibility_fallback_handler__factory.connect(contractAddress, signerOrProvider);
            return new CompatibilityFallbackHandler_V1_3_0_Ethers_1.default(compatibilityFallbackHandlerContract);
        default:
            throw new Error('Invalid Safe version');
    }
}
exports.getCompatibilityFallbackHandlerContractInstance = getCompatibilityFallbackHandlerContractInstance;
function getMultiSendContractInstance(safeVersion, contractAddress, signerOrProvider) {
    let multiSendContract;
    switch (safeVersion) {
        case '1.4.1':
            multiSendContract = Multi_send__factory_3.Multi_send__factory.connect(contractAddress, signerOrProvider);
            return new MultiSendContract_V1_4_1_Ethers_1.default(multiSendContract);
        case '1.3.0':
            multiSendContract = Multi_send__factory_2.Multi_send__factory.connect(contractAddress, signerOrProvider);
            return new MultiSendContract_V1_3_0_Ethers_1.default(multiSendContract);
        case '1.2.0':
        case '1.1.1':
        case '1.0.0':
            multiSendContract = Multi_send__factory_1.Multi_send__factory.connect(contractAddress, signerOrProvider);
            return new MultiSendContract_V1_1_1_Ethers_1.default(multiSendContract);
        default:
            throw new Error('Invalid Safe version');
    }
}
exports.getMultiSendContractInstance = getMultiSendContractInstance;
function getMultiSendCallOnlyContractInstance(safeVersion, contractAddress, signerOrProvider) {
    let multiSendCallOnlyContract;
    switch (safeVersion) {
        case '1.4.1':
            multiSendCallOnlyContract = Multi_send_call_only__factory_2.Multi_send_call_only__factory.connect(contractAddress, signerOrProvider);
            return new MultiSendCallOnlyContract_V1_4_1_Ethers_1.default(multiSendCallOnlyContract);
        case '1.3.0':
        case '1.2.0':
        case '1.1.1':
        case '1.0.0':
            multiSendCallOnlyContract = Multi_send_call_only__factory_1.Multi_send_call_only__factory.connect(contractAddress, signerOrProvider);
            return new MultiSendCallOnlyContract_V1_3_0_Ethers_1.default(multiSendCallOnlyContract);
        default:
            throw new Error('Invalid Safe version');
    }
}
exports.getMultiSendCallOnlyContractInstance = getMultiSendCallOnlyContractInstance;
function getSafeProxyFactoryContractInstance(safeVersion, contractAddress, signerOrProvider) {
    let safeProxyFactoryContract;
    switch (safeVersion) {
        case '1.4.1':
            safeProxyFactoryContract = Safe_proxy_factory__factory_1.Safe_proxy_factory__factory.connect(contractAddress, signerOrProvider);
            return new SafeProxyFactoryContract_V1_4_1_Ethers_1.default(safeProxyFactoryContract);
        case '1.3.0':
            safeProxyFactoryContract = Proxy_factory__factory_3.Proxy_factory__factory.connect(contractAddress, signerOrProvider);
            return new SafeProxyFactoryContract_V1_3_0_Ethers_1.default(safeProxyFactoryContract);
        case '1.2.0':
        case '1.1.1':
            safeProxyFactoryContract = Proxy_factory__factory_2.Proxy_factory__factory.connect(contractAddress, signerOrProvider);
            return new SafeProxyFactoryContract_V1_1_1_Ethers_1.default(safeProxyFactoryContract);
        case '1.0.0':
            safeProxyFactoryContract = Proxy_factory__factory_1.Proxy_factory__factory.connect(contractAddress, signerOrProvider);
            return new SafeProxyFactoryContract_V1_0_0_Ethers_1.default(safeProxyFactoryContract);
        default:
            throw new Error('Invalid Safe version');
    }
}
exports.getSafeProxyFactoryContractInstance = getSafeProxyFactoryContractInstance;
function getSignMessageLibContractInstance(safeVersion, contractAddress, signerOrProvider) {
    let signMessageLibContract;
    switch (safeVersion) {
        case '1.4.1':
            signMessageLibContract = Sign_message_lib__factory_2.Sign_message_lib__factory.connect(contractAddress, signerOrProvider);
            return new SignMessageLibContract_V1_4_1_Ethers_1.default(signMessageLibContract);
        case '1.3.0':
            signMessageLibContract = Sign_message_lib__factory_1.Sign_message_lib__factory.connect(contractAddress, signerOrProvider);
            return new SignMessageLibContract_V1_3_0_Ethers_1.default(signMessageLibContract);
        default:
            throw new Error('Invalid Safe version');
    }
}
exports.getSignMessageLibContractInstance = getSignMessageLibContractInstance;
function getCreateCallContractInstance(safeVersion, contractAddress, signerOrProvider) {
    let createCallContract;
    switch (safeVersion) {
        case '1.4.1':
            createCallContract = Create_call__factory_2.Create_call__factory.connect(contractAddress, signerOrProvider);
            return new CreateCallEthersContract_V1_4_1_Ethers_1.default(createCallContract);
        case '1.3.0':
        case '1.2.0':
        case '1.1.1':
        case '1.0.0':
            createCallContract = Create_call__factory_1.Create_call__factory.connect(contractAddress, signerOrProvider);
            return new CreateCallEthersContract_V1_3_0_Ethers_1.default(createCallContract);
        default:
            throw new Error('Invalid Safe version');
    }
}
exports.getCreateCallContractInstance = getCreateCallContractInstance;
function getSimulateTxAccessorContractInstance(safeVersion, contractAddress, signerOrProvider) {
    let simulateTxAccessorContract;
    switch (safeVersion) {
        case '1.4.1':
            simulateTxAccessorContract = Simulate_tx_accessor__factory_2.Simulate_tx_accessor__factory.connect(contractAddress, signerOrProvider);
            return new SimulateTxAccessorContract_V1_4_1_Ethers_1.default(simulateTxAccessorContract);
        case '1.3.0':
            simulateTxAccessorContract = Simulate_tx_accessor__factory_1.Simulate_tx_accessor__factory.connect(contractAddress, signerOrProvider);
            return new SimulateTxAccessorContract_V1_3_0_Ethers_1.default(simulateTxAccessorContract);
        default:
            throw new Error('Invalid Safe version');
    }
}
exports.getSimulateTxAccessorContractInstance = getSimulateTxAccessorContractInstance;
//# sourceMappingURL=contractInstancesEthers.js.map
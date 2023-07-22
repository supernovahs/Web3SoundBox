"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AccountAbstraction_signer, _AccountAbstraction_chainId, _AccountAbstraction_safeContract, _AccountAbstraction_safeProxyFactoryContract, _AccountAbstraction_multiSendCallOnlyContract, _AccountAbstraction_relayAdapter;
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const factories_1 = require("../typechain/factories");
const constants_1 = require("./constants");
const types_1 = require("./types");
const utils_1 = require("./utils");
const contracts_1 = require("./utils/contracts");
const signatures_1 = require("./utils/signatures");
class AccountAbstraction {
    constructor(signer) {
        _AccountAbstraction_signer.set(this, void 0);
        _AccountAbstraction_chainId.set(this, void 0);
        _AccountAbstraction_safeContract.set(this, void 0);
        _AccountAbstraction_safeProxyFactoryContract.set(this, void 0);
        _AccountAbstraction_multiSendCallOnlyContract.set(this, void 0);
        _AccountAbstraction_relayAdapter.set(this, void 0);
        __classPrivateFieldSet(this, _AccountAbstraction_signer, signer, "f");
    }
    async init(options) {
        if (!__classPrivateFieldGet(this, _AccountAbstraction_signer, "f").provider) {
            throw new Error('Signer must be connected to a provider');
        }
        const { relayAdapter } = options;
        this.setRelayAdapter(relayAdapter);
        __classPrivateFieldSet(this, _AccountAbstraction_chainId, (await __classPrivateFieldGet(this, _AccountAbstraction_signer, "f").provider.getNetwork()).chainId, "f");
        __classPrivateFieldSet(this, _AccountAbstraction_safeProxyFactoryContract, (0, utils_1.getSafeProxyFactoryContract)(__classPrivateFieldGet(this, _AccountAbstraction_chainId, "f"), __classPrivateFieldGet(this, _AccountAbstraction_signer, "f")), "f");
        __classPrivateFieldSet(this, _AccountAbstraction_multiSendCallOnlyContract, (0, utils_1.getMultiSendCallOnlyContract)(__classPrivateFieldGet(this, _AccountAbstraction_chainId, "f"), __classPrivateFieldGet(this, _AccountAbstraction_signer, "f")), "f");
        const safeAddress = await (0, contracts_1.calculateChainSpecificProxyAddress)(__classPrivateFieldGet(this, _AccountAbstraction_safeProxyFactoryContract, "f"), __classPrivateFieldGet(this, _AccountAbstraction_signer, "f"), __classPrivateFieldGet(this, _AccountAbstraction_chainId, "f"));
        __classPrivateFieldSet(this, _AccountAbstraction_safeContract, factories_1.GnosisSafe__factory.connect(safeAddress, __classPrivateFieldGet(this, _AccountAbstraction_signer, "f")), "f");
    }
    setRelayAdapter(relayAdapter) {
        __classPrivateFieldSet(this, _AccountAbstraction_relayAdapter, relayAdapter, "f");
    }
    async getSignerAddress() {
        const signerAddress = await __classPrivateFieldGet(this, _AccountAbstraction_signer, "f").getAddress();
        return signerAddress;
    }
    async getNonce() {
        if (!__classPrivateFieldGet(this, _AccountAbstraction_safeContract, "f")) {
            throw new Error('SDK not initialized');
        }
        return (await this.isSafeDeployed()) ? (await __classPrivateFieldGet(this, _AccountAbstraction_safeContract, "f").nonce()).toNumber() : 0;
    }
    getSafeAddress() {
        if (!__classPrivateFieldGet(this, _AccountAbstraction_safeContract, "f")) {
            throw new Error('SDK not initialized');
        }
        return __classPrivateFieldGet(this, _AccountAbstraction_safeContract, "f").address;
    }
    async isSafeDeployed() {
        if (!__classPrivateFieldGet(this, _AccountAbstraction_signer, "f").provider) {
            throw new Error('SDK not initialized');
        }
        const address = this.getSafeAddress();
        const codeAtAddress = await __classPrivateFieldGet(this, _AccountAbstraction_signer, "f").provider.getCode(address);
        const isDeployed = codeAtAddress !== '0x';
        return isDeployed;
    }
    async _standardizeSafeTransactionData(transaction, options) {
        var _a;
        if (!__classPrivateFieldGet(this, _AccountAbstraction_relayAdapter, "f") || !__classPrivateFieldGet(this, _AccountAbstraction_chainId, "f")) {
            throw new Error('SDK not initialized');
        }
        const { gasLimit, gasToken, isSponsored } = options;
        const estimation = await __classPrivateFieldGet(this, _AccountAbstraction_relayAdapter, "f").getEstimateFee(__classPrivateFieldGet(this, _AccountAbstraction_chainId, "f"), gasLimit, gasToken);
        const standardizedSafeTx = {
            to: transaction.to,
            value: transaction.value,
            data: transaction.data,
            operation: (_a = transaction.operation) !== null && _a !== void 0 ? _a : types_1.OperationType.Call,
            safeTxGas: ethers_1.BigNumber.from(0),
            baseGas: !isSponsored ? estimation : ethers_1.BigNumber.from(0),
            gasPrice: !isSponsored ? ethers_1.BigNumber.from(1) : ethers_1.BigNumber.from(0),
            gasToken: gasToken !== null && gasToken !== void 0 ? gasToken : constants_1.ZERO_ADDRESS,
            refundReceiver: !isSponsored ? __classPrivateFieldGet(this, _AccountAbstraction_relayAdapter, "f").getFeeCollector() : constants_1.ZERO_ADDRESS,
            nonce: await this.getNonce()
        };
        return standardizedSafeTx;
    }
    async getDeployTransactionData() {
        if (!__classPrivateFieldGet(this, _AccountAbstraction_relayAdapter, "f") ||
            !__classPrivateFieldGet(this, _AccountAbstraction_chainId, "f") ||
            !__classPrivateFieldGet(this, _AccountAbstraction_safeContract, "f") ||
            !__classPrivateFieldGet(this, _AccountAbstraction_multiSendCallOnlyContract, "f") ||
            !__classPrivateFieldGet(this, _AccountAbstraction_safeProxyFactoryContract, "f")) {
            throw new Error('SDK not initialized');
        }
        const safeSingletonContract = (0, utils_1.getSafeContract)(__classPrivateFieldGet(this, _AccountAbstraction_chainId, "f"), __classPrivateFieldGet(this, _AccountAbstraction_signer, "f"));
        const initializer = await (0, contracts_1.getSafeInitializer)(__classPrivateFieldGet(this, _AccountAbstraction_safeContract, "f"), await this.getSignerAddress(), __classPrivateFieldGet(this, _AccountAbstraction_chainId, "f"));
        const safeDeploymentTransaction = {
            to: __classPrivateFieldGet(this, _AccountAbstraction_safeProxyFactoryContract, "f").address,
            value: ethers_1.BigNumber.from(0),
            data: (0, contracts_1.encodeCreateProxyWithNonce)(__classPrivateFieldGet(this, _AccountAbstraction_safeProxyFactoryContract, "f"), safeSingletonContract.address, initializer),
            operation: types_1.OperationType.Call
        };
        return safeDeploymentTransaction;
    }
    async relayTransaction(transaction, options) {
        if (!__classPrivateFieldGet(this, _AccountAbstraction_relayAdapter, "f") ||
            !__classPrivateFieldGet(this, _AccountAbstraction_chainId, "f") ||
            !__classPrivateFieldGet(this, _AccountAbstraction_safeContract, "f") ||
            !__classPrivateFieldGet(this, _AccountAbstraction_multiSendCallOnlyContract, "f") ||
            !__classPrivateFieldGet(this, _AccountAbstraction_safeProxyFactoryContract, "f")) {
            throw new Error('SDK not initialized');
        }
        const standardizedSafeTx = await this._standardizeSafeTransactionData(transaction, options);
        const signature = await (0, signatures_1.getSignature)(__classPrivateFieldGet(this, _AccountAbstraction_signer, "f"), this.getSafeAddress(), standardizedSafeTx, __classPrivateFieldGet(this, _AccountAbstraction_chainId, "f"));
        const transactionData = await (0, contracts_1.encodeExecTransaction)(__classPrivateFieldGet(this, _AccountAbstraction_safeContract, "f"), standardizedSafeTx, signature);
        let relayTransactionTarget = '';
        let encodedTransaction = '';
        const isSafeDeployed = await this.isSafeDeployed();
        if (isSafeDeployed) {
            relayTransactionTarget = __classPrivateFieldGet(this, _AccountAbstraction_safeContract, "f").address;
            encodedTransaction = transactionData;
        }
        else {
            relayTransactionTarget = __classPrivateFieldGet(this, _AccountAbstraction_multiSendCallOnlyContract, "f").address;
            const safeSingletonContract = (0, utils_1.getSafeContract)(__classPrivateFieldGet(this, _AccountAbstraction_chainId, "f"), __classPrivateFieldGet(this, _AccountAbstraction_signer, "f"));
            const initializer = await (0, contracts_1.getSafeInitializer)(__classPrivateFieldGet(this, _AccountAbstraction_safeContract, "f"), await this.getSignerAddress(), __classPrivateFieldGet(this, _AccountAbstraction_chainId, "f"));
            const safeDeploymentTransaction = {
                to: __classPrivateFieldGet(this, _AccountAbstraction_safeProxyFactoryContract, "f").address,
                value: ethers_1.BigNumber.from(0),
                data: (0, contracts_1.encodeCreateProxyWithNonce)(__classPrivateFieldGet(this, _AccountAbstraction_safeProxyFactoryContract, "f"), safeSingletonContract.address, initializer),
                operation: types_1.OperationType.Call
            };
            const safeTransaction = {
                to: __classPrivateFieldGet(this, _AccountAbstraction_safeContract, "f").address,
                value: ethers_1.BigNumber.from(0),
                data: transactionData,
                operation: types_1.OperationType.Call
            };
            const multiSendData = (0, contracts_1.encodeMultiSendData)([safeDeploymentTransaction, safeTransaction]);
            encodedTransaction = __classPrivateFieldGet(this, _AccountAbstraction_multiSendCallOnlyContract, "f").interface.encodeFunctionData('multiSend', [multiSendData]);
        }
        const relayTransaction = {
            target: relayTransactionTarget,
            encodedTransaction: encodedTransaction,
            chainId: __classPrivateFieldGet(this, _AccountAbstraction_chainId, "f"),
            options
        };
        const response = await __classPrivateFieldGet(this, _AccountAbstraction_relayAdapter, "f").relayTransaction(relayTransaction);
        return response.taskId;
    }
}
_AccountAbstraction_signer = new WeakMap(), _AccountAbstraction_chainId = new WeakMap(), _AccountAbstraction_safeContract = new WeakMap(), _AccountAbstraction_safeProxyFactoryContract = new WeakMap(), _AccountAbstraction_multiSendCallOnlyContract = new WeakMap(), _AccountAbstraction_relayAdapter = new WeakMap();
exports.default = AccountAbstraction;
//# sourceMappingURL=AccountAbstraction.js.map
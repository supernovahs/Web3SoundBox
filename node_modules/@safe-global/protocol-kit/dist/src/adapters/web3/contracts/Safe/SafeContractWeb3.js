"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const utils_1 = require("../../../../adapters/web3/utils");
class SafeContractWeb3 {
    constructor(contract) {
        this.contract = contract;
    }
    async getVersion() {
        return (await this.contract.methods.VERSION().call());
    }
    getAddress() {
        return this.contract.options.address;
    }
    async getNonce() {
        return Number(await this.contract.methods.nonce().call());
    }
    async getThreshold() {
        return Number(await this.contract.methods.getThreshold().call());
    }
    async getOwners() {
        return this.contract.methods.getOwners().call();
    }
    async isOwner(address) {
        return this.contract.methods.isOwner(address).call();
    }
    async getTransactionHash(safeTransactionData) {
        return this.contract.methods
            .getTransactionHash(safeTransactionData.to, safeTransactionData.value, safeTransactionData.data, safeTransactionData.operation, safeTransactionData.safeTxGas, safeTransactionData.baseGas, safeTransactionData.gasPrice, safeTransactionData.gasToken, safeTransactionData.refundReceiver, safeTransactionData.nonce)
            .call();
    }
    async approvedHashes(ownerAddress, hash) {
        return bignumber_1.BigNumber.from(await this.contract.methods.approvedHashes(ownerAddress, hash).call());
    }
    async approveHash(hash, options) {
        if (options && !options.gas) {
            options.gas = await this.estimateGas('approveHash', [hash], { ...options });
        }
        const txResponse = this.contract.methods.approveHash(hash).send(options);
        return (0, utils_1.toTxResult)(txResponse, options);
    }
    async isValidTransaction(safeTransaction, options) {
        let isTxValid = false;
        try {
            if (options && !options.gas) {
                options.gas = await this.estimateGas('execTransaction', [
                    safeTransaction.data.to,
                    safeTransaction.data.value,
                    safeTransaction.data.data,
                    safeTransaction.data.operation,
                    safeTransaction.data.safeTxGas,
                    safeTransaction.data.baseGas,
                    safeTransaction.data.gasPrice,
                    safeTransaction.data.gasToken,
                    safeTransaction.data.refundReceiver,
                    safeTransaction.encodedSignatures()
                ], {
                    ...options
                });
            }
            isTxValid = await this.contract.methods
                .execTransaction(safeTransaction.data.to, safeTransaction.data.value, safeTransaction.data.data, safeTransaction.data.operation, safeTransaction.data.safeTxGas, safeTransaction.data.baseGas, safeTransaction.data.gasPrice, safeTransaction.data.gasToken, safeTransaction.data.refundReceiver, safeTransaction.encodedSignatures())
                .call(options);
        }
        catch { }
        return isTxValid;
    }
    async execTransaction(safeTransaction, options) {
        if (options && !options.gas) {
            options.gas = await this.estimateGas('execTransaction', [
                safeTransaction.data.to,
                safeTransaction.data.value,
                safeTransaction.data.data,
                safeTransaction.data.operation,
                safeTransaction.data.safeTxGas,
                safeTransaction.data.baseGas,
                safeTransaction.data.gasPrice,
                safeTransaction.data.gasToken,
                safeTransaction.data.refundReceiver,
                safeTransaction.encodedSignatures()
            ], {
                ...options
            });
        }
        const txResponse = this.contract.methods
            .execTransaction(safeTransaction.data.to, safeTransaction.data.value, safeTransaction.data.data, safeTransaction.data.operation, safeTransaction.data.safeTxGas, safeTransaction.data.baseGas, safeTransaction.data.gasPrice, safeTransaction.data.gasToken, safeTransaction.data.refundReceiver, safeTransaction.encodedSignatures())
            .send(options);
        return (0, utils_1.toTxResult)(txResponse, options);
    }
    encode(methodName, params) {
        return this.contract.methods[methodName](...params).encodeABI();
    }
    async estimateGas(methodName, params, options) {
        return (await this.contract.methods[methodName](...params).estimateGas(options)).toString();
    }
}
exports.default = SafeContractWeb3;
//# sourceMappingURL=SafeContractWeb3.js.map
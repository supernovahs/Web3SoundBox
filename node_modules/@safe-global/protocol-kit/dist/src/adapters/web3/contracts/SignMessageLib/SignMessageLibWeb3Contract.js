"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../../adapters/web3/utils");
class SignMessageLibWeb3Contract {
    constructor(contract) {
        this.contract = contract;
    }
    getAddress() {
        return this.contract.options.address;
    }
    async signMessage(data, options) {
        if (options && !options.gas) {
            options.gas = await this.estimateGas('signMessage', [data], { ...options });
        }
        const txResponse = this.contract.methods.signMessage(data).send(options);
        return (0, utils_1.toTxResult)(txResponse, options);
    }
    async getMessageHash(message) {
        return this.contract.methods.getMessageHash(message).call();
    }
    encode(methodName, params) {
        return this.contract.methods[methodName](...params).encodeABI();
    }
    async estimateGas(methodName, params, options) {
        return (await this.contract.methods[methodName](...params).estimateGas(options)).toString();
    }
}
exports.default = SignMessageLibWeb3Contract;
//# sourceMappingURL=SignMessageLibWeb3Contract.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../../adapters/ethers/utils");
class SignMessageLibEthersContract {
    constructor(contract) {
        this.contract = contract;
        this.encode = (methodName, params) => {
            return this.contract.interface.encodeFunctionData(methodName, params);
        };
    }
    getAddress() {
        return this.contract.address;
    }
    async signMessage(data, options) {
        if (options && !options.gasLimit) {
            options.gasLimit = await this.estimateGas('signMessage', [data], { ...options });
        }
        const txResponse = await this.contract.signMessage(data, options);
        return (0, utils_1.toTxResult)(txResponse, options);
    }
    async getMessageHash(message) {
        return this.contract.getMessageHash(message);
    }
    async estimateGas(methodName, params, options) {
        return (await this.contract.estimateGas[methodName](...params, options)).toString();
    }
}
exports.default = SignMessageLibEthersContract;
//# sourceMappingURL=SignMessageLibEthersContract.js.map
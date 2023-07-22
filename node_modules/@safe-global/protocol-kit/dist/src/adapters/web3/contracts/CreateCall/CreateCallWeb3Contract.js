"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../../adapters/web3/utils");
class CreateCallWeb3Contract {
    constructor(contract) {
        this.contract = contract;
    }
    getAddress() {
        return this.contract.options.address;
    }
    async performCreate2(value, deploymentData, salt, options) {
        if (options && !options.gas) {
            options.gas = await this.estimateGas('performCreate2', [value, deploymentData, salt], {
                ...options
            });
        }
        const txResponse = this.contract.methods
            .performCreate2(value, deploymentData, salt)
            .send(options);
        return (0, utils_1.toTxResult)(txResponse, options);
    }
    async performCreate(value, deploymentData, options) {
        if (options && !options.gas) {
            options.gas = await this.estimateGas('performCreate', [value, deploymentData], { ...options });
        }
        const txResponse = this.contract.methods.performCreate(value, deploymentData).send(options);
        return (0, utils_1.toTxResult)(txResponse, options);
    }
    encode(methodName, params) {
        return this.contract.methods[methodName](...params).encodeABI();
    }
    async estimateGas(methodName, params, options) {
        return (await this.contract.methods[methodName](...params).estimateGas(options)).toString();
    }
}
exports.default = CreateCallWeb3Contract;
//# sourceMappingURL=CreateCallWeb3Contract.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../../adapters/ethers/utils");
class CreateCallEthersContract {
    constructor(contract) {
        this.contract = contract;
        this.encode = (methodName, params) => {
            return this.contract.interface.encodeFunctionData(methodName, params);
        };
    }
    getAddress() {
        return this.contract.address;
    }
    async performCreate2(value, deploymentData, salt, options) {
        if (options && !options.gasLimit) {
            options.gasLimit = await this.estimateGas('performCreate2', [value, deploymentData, salt], {
                ...options
            });
        }
        const txResponse = await this.contract.performCreate2(value, deploymentData, salt, options);
        return (0, utils_1.toTxResult)(txResponse, options);
    }
    async performCreate(value, deploymentData, options) {
        if (options && !options.gasLimit) {
            options.gasLimit = await this.estimateGas('performCreate', [value, deploymentData], {
                ...options
            });
        }
        const txResponse = await this.contract.performCreate(value, deploymentData, options);
        return (0, utils_1.toTxResult)(txResponse, options);
    }
    async estimateGas(methodName, params, options) {
        return (await this.contract.estimateGas[methodName](...params, options)).toString();
    }
}
exports.default = CreateCallEthersContract;
//# sourceMappingURL=CreateCallEthersContract.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimulateTxAccessorWeb3Contract {
    constructor(contract) {
        this.contract = contract;
    }
    getAddress() {
        return this.contract.options.address;
    }
    encode(methodName, params) {
        return this.contract.methods[methodName](...params).encodeABI();
    }
}
exports.default = SimulateTxAccessorWeb3Contract;
//# sourceMappingURL=SimulateTxAccessorWeb3Contract.js.map
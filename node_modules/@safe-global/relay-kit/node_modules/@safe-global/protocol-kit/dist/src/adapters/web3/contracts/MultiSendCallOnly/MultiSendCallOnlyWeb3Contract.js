"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MultiSendCallOnlyWeb3Contract {
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
exports.default = MultiSendCallOnlyWeb3Contract;
//# sourceMappingURL=MultiSendCallOnlyWeb3Contract.js.map
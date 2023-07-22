"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MultiSendWeb3Contract {
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
exports.default = MultiSendWeb3Contract;
//# sourceMappingURL=MultiSendWeb3Contract.js.map
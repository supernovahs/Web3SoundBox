"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CompatibilityFallbackHandlerWeb3Contract {
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
exports.default = CompatibilityFallbackHandlerWeb3Contract;
//# sourceMappingURL=CompatibilityFallbackHandlerWeb3Contract.js.map
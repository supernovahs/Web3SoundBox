"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CompatibilityFallbackHandlerWeb3Contract_1 = __importDefault(require("../CompatibilityFallbackHandlerWeb3Contract"));
class CompatibilityFallbackHandler_V1_4_1_Web3 extends CompatibilityFallbackHandlerWeb3Contract_1.default {
    constructor(contract) {
        super(contract);
        this.contract = contract;
    }
}
exports.default = CompatibilityFallbackHandler_V1_4_1_Web3;
//# sourceMappingURL=CompatibilityFallbackHandler_V1_4_1_Web3.js.map
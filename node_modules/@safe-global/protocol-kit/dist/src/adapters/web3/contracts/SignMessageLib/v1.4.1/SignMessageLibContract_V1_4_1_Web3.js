"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SignMessageLibWeb3Contract_1 = __importDefault(require("../SignMessageLibWeb3Contract"));
class SignMessageLibContract_V1_4_1_Web3 extends SignMessageLibWeb3Contract_1.default {
    constructor(contract) {
        super(contract);
        this.contract = contract;
    }
}
exports.default = SignMessageLibContract_V1_4_1_Web3;
//# sourceMappingURL=SignMessageLibContract_V1_4_1_Web3.js.map
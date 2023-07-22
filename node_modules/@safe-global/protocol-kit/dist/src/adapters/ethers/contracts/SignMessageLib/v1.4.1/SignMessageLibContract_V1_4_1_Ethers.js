"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SignMessageLibEthersContract_1 = __importDefault(require("../SignMessageLibEthersContract"));
class SignMessageLibContract_V1_4_1_Ethers extends SignMessageLibEthersContract_1.default {
    constructor(contract) {
        super(contract);
        this.contract = contract;
    }
}
exports.default = SignMessageLibContract_V1_4_1_Ethers;
//# sourceMappingURL=SignMessageLibContract_V1_4_1_Ethers.js.map
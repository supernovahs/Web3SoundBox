"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MultiSendWeb3Contract_1 = __importDefault(require("../MultiSendWeb3Contract"));
class MultiSendContract_V1_3_0_Web3 extends MultiSendWeb3Contract_1.default {
    constructor(contract) {
        super(contract);
        this.contract = contract;
    }
}
exports.default = MultiSendContract_V1_3_0_Web3;
//# sourceMappingURL=MultiSendContract_V1_3_0_Web3.js.map
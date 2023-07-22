"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SimulateTxAccessorWeb3Contract_1 = __importDefault(require("../SimulateTxAccessorWeb3Contract"));
class SimulateTxAccessor_V1_3_0_Web3 extends SimulateTxAccessorWeb3Contract_1.default {
    constructor(contract) {
        super(contract);
        this.contract = contract;
    }
}
exports.default = SimulateTxAccessor_V1_3_0_Web3;
//# sourceMappingURL=SimulateTxAccessorContract_V1_3_0_Web3.js.map
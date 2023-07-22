"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SimulateTxAccessorEthersContract_1 = __importDefault(require("../SimulateTxAccessorEthersContract"));
class SimulateTxAccessorContract_V1_4_1_Ethers extends SimulateTxAccessorEthersContract_1.default {
    constructor(contract) {
        super(contract);
        this.contract = contract;
    }
}
exports.default = SimulateTxAccessorContract_V1_4_1_Ethers;
//# sourceMappingURL=SimulateTxAccessorContract_V1_4_1_Ethers.js.map
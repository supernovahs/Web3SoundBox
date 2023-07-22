"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../../../adapters/web3/utils");
const constants_1 = require("../../../../../adapters/web3/utils/constants");
const SafeContractWeb3_1 = __importDefault(require("../SafeContractWeb3"));
class SafeContract_V1_3_0_Web3 extends SafeContractWeb3_1.default {
    constructor(contract) {
        super(contract);
        this.contract = contract;
    }
    async setup(setupConfig, options) {
        const { owners, threshold, to = constants_1.ZERO_ADDRESS, data = constants_1.EMPTY_DATA, fallbackHandler = constants_1.ZERO_ADDRESS, paymentToken = constants_1.ZERO_ADDRESS, payment = 0, paymentReceiver = constants_1.ZERO_ADDRESS } = setupConfig;
        if (options && !options.gas) {
            options.gas = await this.estimateGas('setup', [owners, threshold, to, data, fallbackHandler, paymentToken, payment, paymentReceiver], {
                ...options
            });
        }
        const txResponse = this.contract.methods
            .setup(owners, threshold, to, data, fallbackHandler, paymentToken, payment, paymentReceiver)
            .send(options);
        return (0, utils_1.toTxResult)(txResponse, options);
    }
    async getModules() {
        const { array } = await this.contract.methods.getModulesPaginated(constants_1.SENTINEL_ADDRESS, 10).call();
        return array;
    }
    async isModuleEnabled(moduleAddress) {
        return this.contract.methods.isModuleEnabled(moduleAddress).call();
    }
}
exports.default = SafeContract_V1_3_0_Web3;
//# sourceMappingURL=SafeContract_V1_3_0_Web3.js.map
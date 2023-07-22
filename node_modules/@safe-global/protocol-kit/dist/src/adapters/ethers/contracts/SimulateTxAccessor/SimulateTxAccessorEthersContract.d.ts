import { Simulate_tx_accessor as SimulateTxAccessor_V1_3_0, Simulate_tx_accessorInterface as SimulateTxAccessorInterface } from '../../../../../typechain/src/ethers-v5/v1.3.0/Simulate_tx_accessor';
import { Simulate_tx_accessor as SimulateTxAccessor_V1_4_1 } from '../../../../../typechain/src/ethers-v5/v1.4.1/Simulate_tx_accessor';
import { SimulateTxAccessorContract } from '@safe-global/safe-core-sdk-types';
declare abstract class SimulateTxAccessorEthersContract implements SimulateTxAccessorContract {
    contract: SimulateTxAccessor_V1_4_1 | SimulateTxAccessor_V1_3_0;
    constructor(contract: SimulateTxAccessor_V1_4_1 | SimulateTxAccessor_V1_3_0);
    getAddress(): string;
    encode: SimulateTxAccessorInterface['encodeFunctionData'];
}
export default SimulateTxAccessorEthersContract;

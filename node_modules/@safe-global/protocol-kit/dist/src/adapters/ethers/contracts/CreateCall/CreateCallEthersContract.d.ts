import { EthersTransactionOptions, EthersTransactionResult } from '../../../../adapters/ethers/types';
import { Create_call as CreateCall_V1_3_0, Create_callInterface as CreateCallContractInterface } from '../../../../../typechain/src/ethers-v5/v1.3.0/Create_call';
import { Create_call as CreateCall_V1_4_1 } from '../../../../../typechain/src/ethers-v5/v1.4.1/Create_call';
import { CreateCallContract } from '@safe-global/safe-core-sdk-types';
declare abstract class CreateCallEthersContract implements CreateCallContract {
    contract: CreateCall_V1_4_1 | CreateCall_V1_3_0;
    constructor(contract: CreateCall_V1_4_1 | CreateCall_V1_3_0);
    getAddress(): string;
    performCreate2(value: string, deploymentData: string, salt: string, options?: EthersTransactionOptions): Promise<EthersTransactionResult>;
    performCreate(value: string, deploymentData: string, options?: EthersTransactionOptions): Promise<EthersTransactionResult>;
    encode: CreateCallContractInterface['encodeFunctionData'];
    estimateGas(methodName: string, params: any[], options: EthersTransactionOptions): Promise<string>;
}
export default CreateCallEthersContract;

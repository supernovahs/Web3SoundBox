import { Web3TransactionOptions, Web3TransactionResult } from '../../../../adapters/web3/types';
import { Create_call as CreateCall_V1_3_0 } from '../../../../../typechain/src/web3-v1/v1.3.0/Create_call';
import { Create_call as CreateCall_V1_4_1 } from '../../../../../typechain/src/web3-v1/v1.4.1/Create_call';
import { CreateCallContract } from '@safe-global/safe-core-sdk-types';
declare abstract class CreateCallWeb3Contract implements CreateCallContract {
    contract: CreateCall_V1_4_1 | CreateCall_V1_3_0;
    constructor(contract: CreateCall_V1_4_1 | CreateCall_V1_3_0);
    getAddress(): string;
    performCreate2(value: string, deploymentData: string, salt: string, options?: Web3TransactionOptions): Promise<Web3TransactionResult>;
    performCreate(value: string, deploymentData: string, options?: Web3TransactionOptions): Promise<Web3TransactionResult>;
    encode(methodName: string, params: any[]): string;
    estimateGas(methodName: string, params: any[], options: Web3TransactionOptions): Promise<string>;
}
export default CreateCallWeb3Contract;

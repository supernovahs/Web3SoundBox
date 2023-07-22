import { Web3TransactionOptions, Web3TransactionResult } from '../../../../adapters/web3/types';
import { Sign_message_lib as SignMessageLib_V1_3_0 } from '../../../../../typechain/src/web3-v1/v1.3.0/Sign_message_lib';
import { Sign_message_lib as SignMessageLib_V1_4_1 } from '../../../../../typechain/src/web3-v1/v1.4.1/Sign_message_lib';
import { SignMessageLibContract } from '@safe-global/safe-core-sdk-types';
declare abstract class SignMessageLibWeb3Contract implements SignMessageLibContract {
    contract: SignMessageLib_V1_4_1 | SignMessageLib_V1_3_0;
    constructor(contract: SignMessageLib_V1_4_1 | SignMessageLib_V1_3_0);
    getAddress(): string;
    signMessage(data: string, options?: Web3TransactionOptions): Promise<Web3TransactionResult>;
    getMessageHash(message: string): Promise<string>;
    encode(methodName: string, params: any[]): string;
    estimateGas(methodName: string, params: any[], options: Web3TransactionOptions): Promise<string>;
}
export default SignMessageLibWeb3Contract;

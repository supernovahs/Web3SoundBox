import { Web3TransactionOptions, Web3TransactionResult } from '../../../../../adapters/web3/types';
import { Safe } from '../../../../../../typechain/src/web3-v1/v1.4.1/Safe';
import { SafeSetupConfig } from '@safe-global/safe-core-sdk-types';
import SafeContractWeb3 from '../SafeContractWeb3';
declare class SafeContract_V1_4_1_Web3 extends SafeContractWeb3 {
    contract: Safe;
    constructor(contract: Safe);
    setup(setupConfig: SafeSetupConfig, options?: Web3TransactionOptions): Promise<Web3TransactionResult>;
    getModules(): Promise<string[]>;
    isModuleEnabled(moduleAddress: string): Promise<boolean>;
}
export default SafeContract_V1_4_1_Web3;

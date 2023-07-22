import { EthersTransactionOptions, EthersTransactionResult } from '../../../../../adapters/ethers/types';
import { Gnosis_safe as Safe } from '../../../../../../typechain/src/ethers-v5/v1.0.0/Gnosis_safe';
import { SafeSetupConfig } from '@safe-global/safe-core-sdk-types';
import SafeContractEthers from '../SafeContractEthers';
declare class SafeContract_V1_0_0_Ethers extends SafeContractEthers {
    contract: Safe;
    constructor(contract: Safe);
    setup(setupConfig: SafeSetupConfig, options?: EthersTransactionOptions): Promise<EthersTransactionResult>;
    getModules(): Promise<string[]>;
    isModuleEnabled(moduleAddress: string): Promise<boolean>;
}
export default SafeContract_V1_0_0_Ethers;

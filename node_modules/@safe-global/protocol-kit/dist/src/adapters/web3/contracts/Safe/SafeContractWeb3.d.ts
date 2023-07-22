import { BigNumber } from '@ethersproject/bignumber';
import { Web3TransactionOptions, Web3TransactionResult } from '../../../../adapters/web3/types';
import { Gnosis_safe as Safe_V1_0_0 } from '../../../../../typechain/src/web3-v1/v1.0.0/Gnosis_safe';
import { Gnosis_safe as Safe_V1_1_1 } from '../../../../../typechain/src/web3-v1/v1.1.1/Gnosis_safe';
import { Gnosis_safe as Safe_V1_2_0 } from '../../../../../typechain/src/web3-v1/v1.2.0/Gnosis_safe';
import { Gnosis_safe as Safe_V1_3_0 } from '../../../../../typechain/src/web3-v1/v1.3.0/Gnosis_safe';
import { Safe as Safe_V1_4_1 } from '../../../../../typechain/src/web3-v1/v1.4.1/Safe';
import { SafeContract, SafeSetupConfig, SafeTransaction, SafeTransactionData, SafeVersion } from '@safe-global/safe-core-sdk-types';
declare abstract class SafeContractWeb3 implements SafeContract {
    contract: Safe_V1_4_1 | Safe_V1_3_0 | Safe_V1_2_0 | Safe_V1_1_1 | Safe_V1_0_0;
    constructor(contract: Safe_V1_4_1 | Safe_V1_3_0 | Safe_V1_2_0 | Safe_V1_1_1 | Safe_V1_0_0);
    abstract setup(setupConfig: SafeSetupConfig, options?: Web3TransactionOptions): Promise<Web3TransactionResult>;
    getVersion(): Promise<SafeVersion>;
    getAddress(): string;
    getNonce(): Promise<number>;
    getThreshold(): Promise<number>;
    getOwners(): Promise<string[]>;
    isOwner(address: string): Promise<boolean>;
    getTransactionHash(safeTransactionData: SafeTransactionData): Promise<string>;
    approvedHashes(ownerAddress: string, hash: string): Promise<BigNumber>;
    approveHash(hash: string, options?: Web3TransactionOptions): Promise<Web3TransactionResult>;
    abstract getModules(): Promise<string[]>;
    abstract isModuleEnabled(moduleAddress: string): Promise<boolean>;
    isValidTransaction(safeTransaction: SafeTransaction, options?: Web3TransactionOptions): Promise<boolean>;
    execTransaction(safeTransaction: SafeTransaction, options?: Web3TransactionOptions): Promise<Web3TransactionResult>;
    encode(methodName: string, params: any[]): string;
    estimateGas(methodName: string, params: any[], options: Web3TransactionOptions): Promise<string>;
}
export default SafeContractWeb3;

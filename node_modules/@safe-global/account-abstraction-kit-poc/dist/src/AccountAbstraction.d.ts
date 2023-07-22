import { ethers } from 'ethers';
import { AccountAbstractionConfig, MetaTransactionData, MetaTransactionOptions, RelayAdapter } from './types';
declare class AccountAbstraction {
    #private;
    constructor(signer: ethers.Signer);
    init(options: AccountAbstractionConfig): Promise<void>;
    setRelayAdapter(relayAdapter: RelayAdapter): void;
    getSignerAddress(): Promise<string>;
    getNonce(): Promise<number>;
    getSafeAddress(): string;
    isSafeDeployed(): Promise<boolean>;
    private _standardizeSafeTransactionData;
    getDeployTransactionData(): Promise<MetaTransactionData>;
    relayTransaction(transaction: MetaTransactionData, options: MetaTransactionOptions): Promise<string>;
}
export default AccountAbstraction;

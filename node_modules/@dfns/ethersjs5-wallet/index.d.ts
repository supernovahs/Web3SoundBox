import { DfnsApiClient } from '@dfns/sdk';
import { Provider, TransactionRequest } from '@ethersproject/abstract-provider';
import { Signer, TypedDataDomain, TypedDataField, TypedDataSigner } from '@ethersproject/abstract-signer';
export type DfnsWalletOptions = {
    walletId: string;
    dfnsClient: DfnsApiClient;
    maxRetries?: number;
    retryInterval?: number;
};
export declare class DfnsWallet extends Signer implements TypedDataSigner {
    private address?;
    private options;
    constructor(options: DfnsWalletOptions, provider?: Provider | null);
    connect(provider: Provider | null): Signer;
    getAddress(): Promise<string>;
    waitForSignature(signatureId: string): Promise<string>;
    signTransaction(transaction: TransactionRequest): Promise<string>;
    signMessage(message: string | Uint8Array): Promise<string>;
    _signTypedData(domain: TypedDataDomain, types: Record<string, TypedDataField[]>, value: Record<string, any>): Promise<string>;
}

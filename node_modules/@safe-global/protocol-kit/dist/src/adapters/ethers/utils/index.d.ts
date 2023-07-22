import { TypedDataSigner } from '@ethersproject/abstract-signer';
import { ContractTransaction } from '@ethersproject/contracts';
import { EthersTransactionOptions, EthersTransactionResult } from '../types';
import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/providers';
export declare function sameString(str1: string, str2: string): boolean;
export declare function toTxResult(transactionResponse: ContractTransaction, options?: EthersTransactionOptions): EthersTransactionResult;
export declare function isTypedDataSigner(signer: any): signer is TypedDataSigner;
/**
 * Check if the signerOrProvider is compatible with `Signer`
 * @param signerOrProvider - Signer or provider
 * @returns true if the parameter is compatible with `Signer`
 */
export declare function isSignerCompatible(signerOrProvider: Signer | Provider): signerOrProvider is Signer;

import { TypedDataSigner } from '@ethersproject/abstract-signer';
import { Signer } from 'ethers';
import { SafeTransactionData, SafeTxTypedData } from '../types';
export declare function isTypedDataSigner(signer: any): signer is TypedDataSigner;
export declare function getSignTypedData(safeAddress: string, transaction: SafeTransactionData, chainId: number): SafeTxTypedData;
export declare function getSignature(signer: Signer, safeAddress: string, transaction: SafeTransactionData, chainId: number): Promise<string>;

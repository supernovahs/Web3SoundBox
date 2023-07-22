import { PromiEvent, TransactionReceipt } from 'web3-core/types';
import { Web3TransactionOptions, Web3TransactionResult } from '../../../adapters/web3/types';
export declare function sameString(str1: string, str2: string): boolean;
export declare function toTxResult(promiEvent: PromiEvent<TransactionReceipt>, options?: Web3TransactionOptions): Promise<Web3TransactionResult>;

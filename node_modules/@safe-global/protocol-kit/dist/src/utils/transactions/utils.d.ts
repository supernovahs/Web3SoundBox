import { StandardizeSafeTransactionDataProps } from '../../types';
import { MetaTransactionData, SafeMultisigTransactionResponse, SafeTransaction, SafeTransactionData, SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types';
export declare function standardizeMetaTransactionData(tx: SafeTransactionDataPartial): MetaTransactionData;
export declare function standardizeSafeTransactionData({ safeContract, predictedSafe, ethAdapter, tx, contractNetworks }: StandardizeSafeTransactionDataProps): Promise<SafeTransactionData>;
export declare function encodeMultiSendData(txs: MetaTransactionData[]): string;
export declare function decodeMultiSendData(encodedData: string): MetaTransactionData[];
export declare function isMetaTransactionArray(safeTransactions: SafeTransactionDataPartial | MetaTransactionData[]): safeTransactions is MetaTransactionData[];
export declare function isSafeMultisigTransactionResponse(safeTransaction: SafeTransaction | SafeMultisigTransactionResponse): safeTransaction is SafeMultisigTransactionResponse;

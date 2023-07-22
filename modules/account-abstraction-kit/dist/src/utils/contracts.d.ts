import { Signer } from 'ethers';
import { GnosisSafe } from '../../typechain/GnosisSafe';
import { GnosisSafeProxyFactory } from '../../typechain/proxies/GnosisSafeProxyFactory';
import { MetaTransactionData, SafeTransactionData } from '../types';
export declare function encodeCreateProxyWithNonce(safeProxyFactoryContract: GnosisSafeProxyFactory, safeSingletonAddress: string, initializer: string): string;
export declare function encodeSetupCallData(safeContract: GnosisSafe, owners: string[], chainId: number): string;
export declare function encodeExecTransaction(safeContract: GnosisSafe, transaction: SafeTransactionData, signature: string): string;
export declare function encodeMultiSendData(txs: MetaTransactionData[]): string;
export declare function getSafeInitializer(safeContract: GnosisSafe, signerAddress: string, chainId: number): Promise<string>;
export declare function calculateChainSpecificProxyAddress(safeProxyFactoryContract: GnosisSafeProxyFactory, signer: Signer, chainId: number): Promise<string>;

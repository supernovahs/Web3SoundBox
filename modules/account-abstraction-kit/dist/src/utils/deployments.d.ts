import { ethers } from 'ethers';
import { GnosisSafe } from '../../typechain/GnosisSafe';
import { MultiSendCallOnly } from './../../typechain/libraries/MultiSendCallOnly';
import { GnosisSafeProxyFactory } from './../../typechain/proxies/GnosisSafeProxyFactory';
export declare const safeDeploymentsL1ChainIds: number[];
export declare function getSafeContract(chainId: number, signer: ethers.Signer, isL1SafeMasterCopy?: boolean): GnosisSafe;
export declare function getSafeProxyFactoryContract(chainId: number, signer: ethers.Signer): GnosisSafeProxyFactory;
export declare function getMultiSendCallOnlyContract(chainId: number, signer: ethers.Signer): MultiSendCallOnly;
export declare function getCompatibilityFallbackHandlerAddress(chainId: number): string;

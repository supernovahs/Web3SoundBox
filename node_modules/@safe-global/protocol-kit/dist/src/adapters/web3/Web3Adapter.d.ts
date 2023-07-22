import { BigNumber } from '@ethersproject/bignumber';
import { Eip3770Address, EthAdapter, EthAdapterTransaction, GetContractProps, SafeTransactionEIP712Args } from '@safe-global/safe-core-sdk-types';
import Web3 from 'web3';
import { Transaction } from 'web3-core';
import { ContractOptions } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import CompatibilityFallbackHandlerWeb3Contract from './contracts/CompatibilityFallbackHandler/CompatibilityFallbackHandlerWeb3Contract';
import CreateCallWeb3Contract from './contracts/CreateCall/CreateCallWeb3Contract';
import MultiSendWeb3Contract from './contracts/MultiSend/MultiSendWeb3Contract';
import MultiSendCallOnlyWeb3Contract from './contracts/MultiSendCallOnly/MultiSendCallOnlyWeb3Contract';
import SafeContractWeb3 from './contracts/Safe/SafeContractWeb3';
import SafeProxyFactoryWeb3Contract from './contracts/SafeProxyFactory/SafeProxyFactoryWeb3Contract';
import SignMessageLibWeb3Contract from './contracts/SignMessageLib/SignMessageLibWeb3Contract';
import SimulateTxAccessorWeb3Contract from './contracts/SimulateTxAccessor/SimulateTxAccessorWeb3Contract';
export interface Web3AdapterConfig {
    /** web3 - Web3 library */
    web3: Web3;
    /** signerAddress - Address of the signer */
    signerAddress?: string;
}
declare class Web3Adapter implements EthAdapter {
    #private;
    constructor({ web3, signerAddress }: Web3AdapterConfig);
    isAddress(address: string): boolean;
    getEip3770Address(fullAddress: string): Promise<Eip3770Address>;
    getBalance(address: string, defaultBlock?: string | number): Promise<BigNumber>;
    getNonce(address: string, defaultBlock?: string | number): Promise<number>;
    getChainId(): Promise<number>;
    getChecksummedAddress(address: string): string;
    getSafeContract({ safeVersion, singletonDeployment, customContractAddress, customContractAbi }: GetContractProps): Promise<SafeContractWeb3>;
    getSafeProxyFactoryContract({ safeVersion, singletonDeployment, customContractAddress, customContractAbi }: GetContractProps): Promise<SafeProxyFactoryWeb3Contract>;
    getMultiSendContract({ safeVersion, singletonDeployment, customContractAddress, customContractAbi }: GetContractProps): Promise<MultiSendWeb3Contract>;
    getMultiSendCallOnlyContract({ safeVersion, singletonDeployment, customContractAddress, customContractAbi }: GetContractProps): Promise<MultiSendCallOnlyWeb3Contract>;
    getCompatibilityFallbackHandlerContract({ safeVersion, singletonDeployment, customContractAddress, customContractAbi }: GetContractProps): Promise<CompatibilityFallbackHandlerWeb3Contract>;
    getSignMessageLibContract({ safeVersion, singletonDeployment, customContractAddress, customContractAbi }: GetContractProps): Promise<SignMessageLibWeb3Contract>;
    getCreateCallContract({ safeVersion, singletonDeployment, customContractAddress, customContractAbi }: GetContractProps): Promise<CreateCallWeb3Contract>;
    getSimulateTxAccessorContract({ safeVersion, singletonDeployment, customContractAddress, customContractAbi }: GetContractProps): Promise<SimulateTxAccessorWeb3Contract>;
    getContract(address: string, abi: AbiItem | AbiItem[], options?: ContractOptions): any;
    getContractCode(address: string, defaultBlock?: string | number): Promise<string>;
    isContractDeployed(address: string, defaultBlock?: string | number): Promise<boolean>;
    getStorageAt(address: string, position: string): Promise<string>;
    getTransaction(transactionHash: string): Promise<Transaction>;
    getSignerAddress(): Promise<string | undefined>;
    signMessage(message: string): Promise<string>;
    signTypedData(safeTransactionEIP712Args: SafeTransactionEIP712Args, methodVersion?: 'v3' | 'v4'): Promise<string>;
    estimateGas(transaction: EthAdapterTransaction, callback?: (error: Error, gas: number) => void): Promise<string>;
    call(transaction: EthAdapterTransaction, defaultBlock?: string | number): Promise<string>;
    encodeParameters(types: string[], values: any[]): string;
    decodeParameters(types: any[], values: string): {
        [key: string]: any;
    };
}
export default Web3Adapter;

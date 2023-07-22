import { TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber } from '@ethersproject/bignumber';
import { Provider } from '@ethersproject/providers';
import { Eip3770Address, EthAdapter, EthAdapterTransaction, GetContractProps, SafeTransactionEIP712Args } from '@safe-global/safe-core-sdk-types';
import { ethers } from 'ethers';
import CompatibilityFallbackHandlerContractEthers from './contracts/CompatibilityFallbackHandler/CompatibilityFallbackHandlerEthersContract';
import CreateCallEthersContract from './contracts/CreateCall/CreateCallEthersContract';
import MultiSendEthersContract from './contracts/MultiSend/MultiSendEthersContract';
import MultiSendCallOnlyEthersContract from './contracts/MultiSendCallOnly/MultiSendCallOnlyEthersContract';
import SafeContractEthers from './contracts/Safe/SafeContractEthers';
import SafeProxyFactoryEthersContract from './contracts/SafeProxyFactory/SafeProxyFactoryEthersContract';
import SignMessageLibEthersContract from './contracts/SignMessageLib/SignMessageLibEthersContract';
import SimulateTxAccessorEthersContract from './contracts/SimulateTxAccessor/SimulateTxAccessorEthersContract';
type Ethers = typeof ethers;
export interface EthersAdapterConfig {
    /** ethers - Ethers v5 library */
    ethers: Ethers;
    /** signerOrProvider - Ethers signer or provider */
    signerOrProvider: Signer | Provider;
}
declare class EthersAdapter implements EthAdapter {
    #private;
    constructor({ ethers, signerOrProvider }: EthersAdapterConfig);
    getProvider(): Provider;
    getSigner(): Signer | undefined;
    isAddress(address: string): boolean;
    getEip3770Address(fullAddress: string): Promise<Eip3770Address>;
    getBalance(address: string, blockTag?: string | number): Promise<BigNumber>;
    getNonce(address: string, blockTag?: string | number): Promise<number>;
    getChainId(): Promise<number>;
    getChecksummedAddress(address: string): string;
    getSafeContract({ safeVersion, singletonDeployment, customContractAddress }: GetContractProps): Promise<SafeContractEthers>;
    getSafeProxyFactoryContract({ safeVersion, singletonDeployment, customContractAddress }: GetContractProps): Promise<SafeProxyFactoryEthersContract>;
    getMultiSendContract({ safeVersion, singletonDeployment, customContractAddress }: GetContractProps): Promise<MultiSendEthersContract>;
    getMultiSendCallOnlyContract({ safeVersion, singletonDeployment, customContractAddress }: GetContractProps): Promise<MultiSendCallOnlyEthersContract>;
    getCompatibilityFallbackHandlerContract({ safeVersion, singletonDeployment, customContractAddress }: GetContractProps): Promise<CompatibilityFallbackHandlerContractEthers>;
    getSignMessageLibContract({ safeVersion, singletonDeployment, customContractAddress }: GetContractProps): Promise<SignMessageLibEthersContract>;
    getCreateCallContract({ safeVersion, singletonDeployment, customContractAddress }: GetContractProps): Promise<CreateCallEthersContract>;
    getSimulateTxAccessorContract({ safeVersion, singletonDeployment, customContractAddress }: GetContractProps): Promise<SimulateTxAccessorEthersContract>;
    getContractCode(address: string, blockTag?: string | number): Promise<string>;
    isContractDeployed(address: string, blockTag?: string | number): Promise<boolean>;
    getStorageAt(address: string, position: string): Promise<string>;
    getTransaction(transactionHash: string): Promise<TransactionResponse>;
    getSignerAddress(): Promise<string | undefined>;
    signMessage(message: string): Promise<string>;
    signTypedData(safeTransactionEIP712Args: SafeTransactionEIP712Args): Promise<string>;
    estimateGas(transaction: EthAdapterTransaction): Promise<string>;
    call(transaction: EthAdapterTransaction, blockTag?: string | number): Promise<string>;
    encodeParameters(types: string[], values: any[]): string;
    decodeParameters(types: string[], values: string): {
        [key: string]: any;
    };
}
export default EthersAdapter;

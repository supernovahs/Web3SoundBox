import { ContractNetworkConfig } from '../types';
import { CompatibilityFallbackHandlerContract, CreateCallContract, EthAdapter, MultiSendCallOnlyContract, MultiSendContract, SafeContract, SafeProxyFactoryContract, SafeVersion, SignMessageLibContract, SimulateTxAccessorContract } from '@safe-global/safe-core-sdk-types';
import { SingletonDeployment } from '@safe-global/safe-deployments';
interface GetContractInstanceProps {
    ethAdapter: EthAdapter;
    safeVersion: SafeVersion;
    customContracts?: ContractNetworkConfig;
}
interface GetSafeContractInstanceProps extends GetContractInstanceProps {
    isL1SafeMasterCopy?: boolean;
    customSafeAddress?: string;
}
export declare function getSafeContractDeployment(safeVersion: SafeVersion, chainId: number, isL1SafeMasterCopy?: boolean): SingletonDeployment | undefined;
export declare function getCompatibilityFallbackHandlerContractDeployment(safeVersion: SafeVersion, chainId: number): SingletonDeployment | undefined;
export declare function getMultiSendCallOnlyContractDeployment(safeVersion: SafeVersion, chainId: number): SingletonDeployment | undefined;
export declare function getMultiSendContractDeployment(safeVersion: SafeVersion, chainId: number): SingletonDeployment | undefined;
export declare function getSafeProxyFactoryContractDeployment(safeVersion: SafeVersion, chainId: number): SingletonDeployment | undefined;
export declare function getSignMessageLibContractDeployment(safeVersion: SafeVersion, chainId: number): SingletonDeployment | undefined;
export declare function getCreateCallContractDeployment(safeVersion: SafeVersion, chainId: number): SingletonDeployment | undefined;
export declare function getSimulateTxAccessorContractDeployment(safeVersion: SafeVersion, chainId: number): SingletonDeployment | undefined;
export declare function getSafeContract({ ethAdapter, safeVersion, customSafeAddress, isL1SafeMasterCopy, customContracts }: GetSafeContractInstanceProps): Promise<SafeContract>;
export declare function getProxyFactoryContract({ ethAdapter, safeVersion, customContracts }: GetContractInstanceProps): Promise<SafeProxyFactoryContract>;
export declare function getCompatibilityFallbackHandlerContract({ ethAdapter, safeVersion, customContracts }: GetContractInstanceProps): Promise<CompatibilityFallbackHandlerContract>;
export declare function getMultiSendContract({ ethAdapter, safeVersion, customContracts }: GetContractInstanceProps): Promise<MultiSendContract>;
export declare function getMultiSendCallOnlyContract({ ethAdapter, safeVersion, customContracts }: GetContractInstanceProps): Promise<MultiSendCallOnlyContract>;
export declare function getSignMessageLibContract({ ethAdapter, safeVersion, customContracts }: GetContractInstanceProps): Promise<SignMessageLibContract>;
export declare function getCreateCallContract({ ethAdapter, safeVersion, customContracts }: GetContractInstanceProps): Promise<CreateCallContract>;
export declare function getSimulateTxAccessorContract({ ethAdapter, safeVersion, customContracts }: GetContractInstanceProps): Promise<SimulateTxAccessorContract>;
export {};

import { EthAdapter, SafeContract, SafeProxyFactoryContract, SafeVersion } from '@safe-global/safe-core-sdk-types';
import { ContractNetworkConfig, SafeAccountConfig, SafeDeploymentConfig } from '../types';
export declare const PREDETERMINED_SALT_NONCE = "0xb1073742015cbcf5a3a4d9d1ae33ecf619439710b89475f92e2abd2117e90f90";
export interface PredictSafeAddressProps {
    ethAdapter: EthAdapter;
    safeAccountConfig: SafeAccountConfig;
    safeDeploymentConfig?: SafeDeploymentConfig;
    isL1SafeMasterCopy?: boolean;
    customContracts?: ContractNetworkConfig;
}
export interface encodeSetupCallDataProps {
    ethAdapter: EthAdapter;
    safeAccountConfig: SafeAccountConfig;
    safeContract: SafeContract;
    customContracts?: ContractNetworkConfig;
    customSafeVersion?: SafeVersion;
}
export declare function encodeCreateProxyWithNonce(safeProxyFactoryContract: SafeProxyFactoryContract, safeSingletonAddress: string, initializer: string): string;
export declare function encodeSetupCallData({ ethAdapter, safeAccountConfig, safeContract, customContracts, customSafeVersion }: encodeSetupCallDataProps): Promise<string>;
export declare function predictSafeAddress({ ethAdapter, safeAccountConfig, safeDeploymentConfig, isL1SafeMasterCopy, customContracts }: PredictSafeAddressProps): Promise<string>;
export declare const validateSafeAccountConfig: ({ owners, threshold }: SafeAccountConfig) => void;
export declare const validateSafeDeploymentConfig: ({ saltNonce }: SafeDeploymentConfig) => void;

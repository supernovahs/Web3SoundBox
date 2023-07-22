import { EthersTransactionOptions } from '../../../../adapters/ethers/types';
import { Proxy_factory as SafeProxyFactory_V1_0_0 } from '../../../../../typechain/src/ethers-v5/v1.0.0/Proxy_factory';
import { Proxy_factory as SafeProxyFactory_V1_1_1 } from '../../../../../typechain/src/ethers-v5/v1.1.1/Proxy_factory';
import { Proxy_factory as SafeProxyFactory_V1_3_0 } from '../../../../../typechain/src/ethers-v5/v1.3.0/Proxy_factory';
import { Safe_proxy_factory as SafeProxyFactory_V1_4_1 } from '../../../../../typechain/src/ethers-v5/v1.4.1/Safe_proxy_factory';
import { SafeProxyFactoryContract } from '@safe-global/safe-core-sdk-types';
export interface CreateProxyProps {
    safeMasterCopyAddress: string;
    initializer: string;
    saltNonce: string;
    options?: EthersTransactionOptions;
    callback?: (txHash: string) => void;
}
declare class SafeProxyFactoryEthersContract implements SafeProxyFactoryContract {
    contract: SafeProxyFactory_V1_4_1 | SafeProxyFactory_V1_3_0 | SafeProxyFactory_V1_1_1 | SafeProxyFactory_V1_0_0;
    constructor(contract: SafeProxyFactory_V1_4_1 | SafeProxyFactory_V1_3_0 | SafeProxyFactory_V1_1_1 | SafeProxyFactory_V1_0_0);
    getAddress(): string;
    proxyCreationCode(): Promise<string>;
    createProxy({ safeMasterCopyAddress, initializer, saltNonce, options, callback }: CreateProxyProps): Promise<string>;
    encode(methodName: string, params: any[]): string;
    estimateGas(methodName: string, params: any[], options: EthersTransactionOptions): Promise<string>;
}
export default SafeProxyFactoryEthersContract;

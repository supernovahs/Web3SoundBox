import { Proxy_factory as ProxyFactory } from '../../../../../../typechain/src/ethers-v5/v1.0.0/Proxy_factory';
import SafeProxyFactoryEthersContract from '../SafeProxyFactoryEthersContract';
declare class SafeProxyFactoryContract_V1_0_0_Ethers extends SafeProxyFactoryEthersContract {
    contract: ProxyFactory;
    constructor(contract: ProxyFactory);
}
export default SafeProxyFactoryContract_V1_0_0_Ethers;

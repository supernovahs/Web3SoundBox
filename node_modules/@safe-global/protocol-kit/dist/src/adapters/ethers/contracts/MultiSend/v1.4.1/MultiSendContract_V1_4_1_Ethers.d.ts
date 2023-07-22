import { Multi_send as MultiSend } from '../../../../../../typechain/src/ethers-v5/v1.4.1/Multi_send';
import MultiSendEthersContract from '../MultiSendEthersContract';
declare class MultiSendContract_V1_4_1_Ethers extends MultiSendEthersContract {
    contract: MultiSend;
    constructor(contract: MultiSend);
}
export default MultiSendContract_V1_4_1_Ethers;

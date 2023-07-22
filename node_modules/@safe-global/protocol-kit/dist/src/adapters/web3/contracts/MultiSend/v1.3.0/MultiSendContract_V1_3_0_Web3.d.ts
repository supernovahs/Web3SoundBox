import { Multi_send as MultiSend } from '../../../../../../typechain/src/web3-v1/v1.3.0/Multi_send';
import MultiSendWeb3Contract from '../MultiSendWeb3Contract';
declare class MultiSendContract_V1_3_0_Web3 extends MultiSendWeb3Contract {
    contract: MultiSend;
    constructor(contract: MultiSend);
}
export default MultiSendContract_V1_3_0_Web3;

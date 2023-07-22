import { Multi_send as MultiSend } from '../../../../../../typechain/src/web3-v1/v1.1.1/Multi_send';
import MultiSendWeb3Contract from '../MultiSendWeb3Contract';
declare class MultiSendContract_V1_1_1_Web3 extends MultiSendWeb3Contract {
    contract: MultiSend;
    constructor(contract: MultiSend);
}
export default MultiSendContract_V1_1_1_Web3;

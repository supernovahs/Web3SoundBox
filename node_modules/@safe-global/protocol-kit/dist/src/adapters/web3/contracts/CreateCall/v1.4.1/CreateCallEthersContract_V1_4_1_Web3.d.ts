import { Create_call as CreateCall } from '../../../../../../typechain/src/web3-v1/v1.4.1/Create_call';
import CreateCallWeb3Contract from '../CreateCallWeb3Contract';
declare class CreateCallContract_V1_4_1_Web3 extends CreateCallWeb3Contract {
    contract: CreateCall;
    constructor(contract: CreateCall);
}
export default CreateCallContract_V1_4_1_Web3;

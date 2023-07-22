import { Create_call as CreateCall } from '../../../../../../typechain/src/web3-v1/v1.3.0/Create_call';
import CreateCallWeb3Contract from '../CreateCallWeb3Contract';
declare class CreateCallContract_V1_3_0_Web3 extends CreateCallWeb3Contract {
    contract: CreateCall;
    constructor(contract: CreateCall);
}
export default CreateCallContract_V1_3_0_Web3;

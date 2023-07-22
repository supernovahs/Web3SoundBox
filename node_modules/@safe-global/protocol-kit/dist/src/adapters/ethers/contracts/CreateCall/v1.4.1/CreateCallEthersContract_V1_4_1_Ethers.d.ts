import { Create_call as CreateCall } from '../../../../../../typechain/src/ethers-v5/v1.4.1/Create_call';
import CreateCallEthersContract from '../CreateCallEthersContract';
declare class CreateCallContract_V1_4_1_Ethers extends CreateCallEthersContract {
    contract: CreateCall;
    constructor(contract: CreateCall);
}
export default CreateCallContract_V1_4_1_Ethers;

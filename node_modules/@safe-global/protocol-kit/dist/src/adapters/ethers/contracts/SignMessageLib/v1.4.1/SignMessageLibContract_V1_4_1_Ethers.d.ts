import { Sign_message_lib as SignMessageLib } from '../../../../../../typechain/src/ethers-v5/v1.4.1/Sign_message_lib';
import SignMessageLibEthersContract from '../SignMessageLibEthersContract';
declare class SignMessageLibContract_V1_4_1_Ethers extends SignMessageLibEthersContract {
    contract: SignMessageLib;
    constructor(contract: SignMessageLib);
}
export default SignMessageLibContract_V1_4_1_Ethers;

import { Sign_message_lib as SignMessageLib } from '../../../../../../typechain/src/web3-v1/v1.3.0/Sign_message_lib';
import SignMessageLibWeb3Contract from '../SignMessageLibWeb3Contract';
declare class SignMessageLibContract_V1_3_0_Web3 extends SignMessageLibWeb3Contract {
    contract: SignMessageLib;
    constructor(contract: SignMessageLib);
}
export default SignMessageLibContract_V1_3_0_Web3;

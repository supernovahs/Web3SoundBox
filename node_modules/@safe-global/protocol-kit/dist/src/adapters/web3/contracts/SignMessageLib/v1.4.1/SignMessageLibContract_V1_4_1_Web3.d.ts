import { Sign_message_lib as SignMessageLib } from '../../../../../../typechain/src/web3-v1/v1.4.1/Sign_message_lib';
import SignMessageLibWeb3Contract from '../SignMessageLibWeb3Contract';
declare class SignMessageLibContract_V1_4_1_Web3 extends SignMessageLibWeb3Contract {
    contract: SignMessageLib;
    constructor(contract: SignMessageLib);
}
export default SignMessageLibContract_V1_4_1_Web3;

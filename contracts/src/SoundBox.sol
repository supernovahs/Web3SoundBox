// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "openzeppelin/token/ERC20/IERC20.sol";
import {IAxelarGasService} from "axelar-gmp-sdk-solidity/interfaces/IAxelarGasService.sol";
import  "./AxelarExecutable.sol";
contract SoundBox is AxelarExecutable {
   
    address public  MERCHANT;
    bool initialized;
    address public  GATEWAY;

    string public DESTINATION_CHAIN;

    string public constant SYMBOL = 'aUSDC';

    IERC20 public  USDC;
    IERC20 public  aUSDC;
    IAxelarGasService public  GAS_SERVICE;

    function initialize (address _merchant,string memory _destinationchain, address _USDC,address _gateway,address _gasService,string memory  _receivercontract) public 
 {
    require(!initialized,'Already initialized');
        initialize_executable(_gateway);
        MERCHANT = _merchant;
        DESTINATION_CHAIN = _destinationchain;
        USDC = IERC20(_USDC);
        GATEWAY = _gateway;
        aUSDC = IERC20(gateway.tokenAddresses(SYMBOL));
        GAS_SERVICE = IAxelarGasService(_gasService);
        aUSDC.approve(address(GATEWAY),type(uint256).max);
    }

    function Transfer_tokens(string memory RECEIVER_CONTRACT) public payable  {
        bytes memory payload = abi.encode(MERCHANT);
        uint amount = USDC.balanceOf(address(this));
        if (msg.value > 0) {
            GAS_SERVICE.payNativeGasForContractCallWithToken{ value: msg.value }(
                address(this),
                DESTINATION_CHAIN,
                RECEIVER_CONTRACT,
                payload,
                SYMBOL,
                amount,
                msg.sender
            );
        }
        gateway.callContractWithToken(DESTINATION_CHAIN, RECEIVER_CONTRACT, payload, SYMBOL, amount);
    }
}

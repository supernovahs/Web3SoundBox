pragma solidity ^0.8.13;

import { IAxelarGateway } from './interfaces/IAxelarGateway.sol';
import { IAxelarExecutable } from './interfaces/IAxelarExecutable.sol';
import "openzeppelin/token/ERC20/IERC20.sol";
import {IAxelarGasService} from "axelar-gmp-sdk-solidity/interfaces/IAxelarGasService.sol";
import "./AxelarExecutable.sol";
import "openzeppelin/access/Ownable.sol";
contract DestinationChain is AxelarExecutable,Ownable{

    IERC20 USDC = IERC20(0x42451e7F68ef0d63d67dE1333aF7e6a246b275bd);
    IERC20 a_USDC;
    constructor(){
        initialize_executable(0xe432150cce91c13a887f7D836923d5597adD8E31);
        a_USDC = IERC20(gateway.tokenAddresses("aUSDC"));
    }

    function _executeWithToken(
        string calldata,
        string calldata,
        bytes calldata payload,
        string calldata,
        uint256 amount
    ) internal override {
        address recipient = abi.decode(payload, (address));
        USDC.transfer(recipient, amount);
    }

    function retreive_aUSDC() public onlyOwner {
        a_USDC.transfer(msg.sender,a_USDC.balanceOf(address(this)));
    }
    



}
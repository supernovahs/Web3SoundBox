// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/SoundBox.sol";
import "openzeppelin/utils/Create2.sol";
import "../src/DestinationChain.sol";
contract SoundBoxTest is Test {
    SoundBox public soundbox;

    function testDeployCreate2() public returns (address) {
        bytes memory bytecode = type(SoundBox).creationCode;
        uint _salt = 5475;
        address box = Create2.deploy(0,bytes32(_salt),bytecode);
        emit log_address(box);
        return box;
    }

    function testGetCreate2Address() public  {
        getCreate2Address();
    }

     function getCreate2Address() public  returns(address) {
        uint _salt = 5475;
        bytes memory bytecode = type(SoundBox).creationCode;
        address ret = Create2.computeAddress(bytes32(_salt),keccak256(bytecode),address(this));
        emit log_address(ret);  
        return ret;      
    }

    function testCreate2Success() public {
        assert(getCreate2Address() == testDeployCreate2());
    }
    
}

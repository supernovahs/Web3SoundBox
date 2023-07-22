pragma solidity ^0.8.19;
import "openzeppelin/utils/Create2.sol";
import "./SoundBox.sol";
contract Create2Compute {

    function getCreate2Address(uint _salt) public view  returns (address) {
        bytes memory bytecode = type(SoundBox).creationCode;
        address ret = Create2.computeAddress(
            bytes32(_salt),
            keccak256(bytecode),
            address(this)
        );
        return ret;
    }
}

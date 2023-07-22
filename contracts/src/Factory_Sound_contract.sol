pragma solidity ^0.8.19;
import "openzeppelin/utils/Create2.sol";
import "./SoundBox.sol";
contract FactorySoundContract {

SoundBox soundbox;

function Deploy(uint256 salt) public returns(address) {
    bytes memory bytecode = type(SoundBox).creationCode;
    address box = Create2.deploy(0,bytes32(salt),bytecode);
    return box;
  }
}



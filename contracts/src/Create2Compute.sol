pragma solidity ^0.8.19;
import "./SoundBox.sol";

contract Create2Compute {
    function getCreate2Address(
        uint _salt,
        address creator
    ) public view returns (address) {
        bytes memory bytecode = type(SoundBox).creationCode;
        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0x00),
                creator,
                bytes32(_salt),
                keccak256(bytecode)
            )
        );

        // NOTE: cast last 20 bytes of hash to address
        return address(uint160(uint(hash)));
    }
}

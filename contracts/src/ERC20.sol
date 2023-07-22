// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "openzeppelin/token/ERC20/ERC20.sol";

contract USDC is ERC20 {
    constructor() ERC20("USDC", "USDC") {
        _mint(0x1b37B1EC6B7faaCbB9AddCCA4043824F36Fb88D8, 100000 * 10 ** 6);
    }

     function decimals() public view  override returns (uint8) {
        return 6;
    }

    function mintowner() public {
        _mint(msg.sender,100000 * 10 ** 6);
    }
}





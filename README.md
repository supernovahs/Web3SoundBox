# Web3SoundBox

We are a Cross chain Merchant Solution for offline retailers , enabling them access different EVM chains across one device.
Users can pay through any EVM supported chain through our unified QR code. 

## Features
- Merchant do need to confirm the tx themselves personally. Our sound Box catches cross chain events and emit exact USDC received though sound Speech Synthesis Utterance.
- Merchant doesn't need to be a crypto degen. All they need to do is enter their email id and use touch id as their passcode , thanks to `dfns` .
- Merchant gets created a safe Wallet under the hood on their preferred destination chain (currently ethereum) through their newly created `dfns` wallet.
- We use Axelar to send cross chain token transfer messages to send USDC to merchant through various source chains periodically by calling `Transfer_Tokens()` through the app automatically in the backend.


## Tech

- ### Axelar
  Completed tx on polygon - https://testnet.axelarscan.io/gmp/0xad59bad137330f0062768a4891789c94c10709a9ed142dfa48bb450acc505195:35
 Axelar has a cool feature of adding more gas. I liked it . Also I liked the UI , where we could see all txs clearly with hashes and diagrams.

- ### Dfns
  https://github.com/supernovahs/Web3SoundBox/tree/main/pages/api/dfns
  We are using Dfns to verify offline merchants easily. Then it is used to interact with SafeSDK and create wallets.

- ### Safe SDK
 We made changes in safe Sdk to incorporate Dfns with it . Our offline merchants receive USDC in their safe wallets under the hood.

- ### Celo
  We support Celo network in our contracts. Merchants can receive value using celo network as well .

- ### Polygon
  We use polygon networks to send cross chain message to send USDC to merchants .
  https://testnet.axelarscan.io/gmp/0xad59bad137330f0062768a4891789c94c10709a9ed142dfa48bb450acc505195:35


### Contracts

-Factory Contracts using create across different chains : 0xEBF5560A8054794B450c921Bf05F0b915a598d16
- SoundBox contracts  using create2 : 0xb9569317a8769E09C42B3970b2944bB1cCBCa3Ed
  

  

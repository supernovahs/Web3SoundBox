# Web3SoundBox

We are a Cross chain Merchant Solution for offline retailers , enabling them access different EVM chains across one device.
Users can pay through any EVM supported chain through our unified QR code. 

## Features
- Merchant do need to confirm the tx themselves personally. Our sound Box catches cross chain events and emit exact USDC received though sound Speech Synthesis Utterance.
- Merchant doesn't need to be a crypto degen. All they need to do is enter their email id and use touch id as their passcode , thanks to `dfns` .
- Merchant gets created a safe Wallet under the hood on their preferred destination chain (currently ethereum) through their newly created `dfns` wallet.
- We use Axelar to send cross chain token transfer messages to send USDC to merchant through various source chains periodically by calling `Transfer_Tokens()` through the app automatically in the backend.



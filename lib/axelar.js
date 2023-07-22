import {
  AxelarGMPRecoveryAPI,
  AxelarQueryAPI,
  CHAINS,
  Environment,
} from "@axelar-network/axelarjs-sdk";

const api = new AxelarQueryAPI({ environment: Environment.TESTNET });
const sdk = new AxelarGMPRecoveryAPI({
  environment: Environment.TESTNET,
});
// async function waitForTransaction(provider, txnHash) {
//   let receipt = await provider.waitForTransaction(txnHash, 1);

//   return receipt;
// }

async function execute() {
  const fee = await api.estimateGasFee(
    CHAINS.TESTNET["POLYGON"],
    CHAINS.TESTNET["BASE"],
    "aUSDC"
  );
  console.log("Fee: ", fee);

  // const fvmContractWithSigner = fvmContract.connect(signer);
  // const sendTx = await fvmContractWithSigner.send(
  //   ETH_CONTRACT_ADDRESS,
  //   receiver,
  //   amount,
  //   {
  //     value: fee,
  //   }
  // );
  // const sendTxReceipt = await waitForTransaction(provider, sendTx.hash);
  // console.log("SendTxReceipt: ", sendTxReceipt);

  // // STEP 3: Query the Axelar network for the transaction status
  // console.log(
  //   "View Status At: https://testnet.axelarscan.io/gmp/" + sendTx.hash
  // );
  // let txStatus = await sdk.queryTransactionStatus(sendTx.hash);
  // while (txStatus.status !== GMPStatus.DEST_EXECUTED) {
  //   console.log(
  //     "Tx Status: ",
  //     txStatus.status,
  //     "\nGas Status: ",
  //     txStatus.gasPaidInfo?.status ?? GasPaidStatus.GAS_UNPAID
  //   );
  //   txStatus = await sdk.queryTransactionStatus(sendTx.hash);
  //   if (txStatus.error) {
  //     console.error("Error: ", txStatus.error);
  //     break;
  //   }
  // }
  // console.log(
  //   "Tx Status: ",
  //   txStatus.status,
  //   "\nGas Status: ",
  //   txStatus.gasPaidInfo?.status ?? GasPaidStatus.GAS_UNPAID
  // );
  // console.log(
  //   "Bidging Completed: https://goerli.etherscan.io/tx/" +
  //     txStatus.executed.transactionHash
  // );
}

export { execute };

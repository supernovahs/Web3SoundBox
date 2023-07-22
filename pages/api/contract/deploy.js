// import { getDfnsDelegatedClient, signer } from "../dfns/utils";
import { DFNS_END_USER_TOKEN_COOKIE } from "../../../common/constants";
import { getCookie } from "cookies-next";
import SafeApiKit from "@safe-global/api-kit";
import { DfnsApiClient } from "@dfns/sdk";
import { DfnsWallet } from "@dfns/ethersjs5-wallet";
import { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import destinationchainabi from "../../../assets/DestinationChain.json";
import soundboxabi from "../../../assets/SoundBox.json";
const txServiceUrl = "https://safe-transaction-goerli.safe.global";

export default async function handler(req, res) {
  if (req.method == "POST") {
    // const endUserAuthToken = getCookie(DFNS_END_USER_TOKEN_COOKIE, {
    //   req,
    //   res,
    // });

    // if (!endUserAuthToken) {
    //   return res.status(401).json({ message: "end user token not found" });
    // }

    // const dfnsDelegated = getDfnsDelegatedClient(endUserAuthToken);

    // const result = await dfnsDelegated.wallets.listWallets({});

    // const rpcProvider = new ethers.providers.JsonRpcProvider(
    //   "https://rpc.ankr.com/eth_goerli"
    // );

    // const dfns = new DfnsApiClient({
    //   appId: process.env.DFNS_APPLICATION_ID,
    //   baseUrl: process.env.DFNS_API_BASE_URL,
    //   authToken: endUserAuthToken,
    //   signer,
    // });
    // console.log(result.items[0]);
    // const wallet = new DfnsWallet({
    //   walletId: result.items[0].id,
    //   retryInterval: 2000,
    //   dfnsClient: dfns,
    //   endUserAuthToken,
    // }).connect(rpcProvider);

    // const ethAdapter = new EthersAdapter({
    //   ethers,
    //   signerOrProvider: wallet,
    // });
    // const safeService = new SafeApiKit({
    //   txServiceUrl,
    //   ethAdapter: ethAdapter,
    // });

    // // const safeWallet = (await safeService.getSafesByOwner(await wallet.getAddress()))
    // //   .safes[0];


    // const safeWallet = 0x305AEdB55Cd62106e075f0fE6cbDF0DA52FeDbDB;

    await createSoundBox();

    return res.status(200).json({});
  }
}


const createSoundBox = async () =>{

  const provider = new ethers.providers.JsonRpcProvider("https://endpoints.omniatech.io/v1/matic/mumbai/public");
  console.log
  const pvtkey = "61ca9882057770df2bf5ce9fc3fb8f006bf07e9a7c6d7c46322640ae39d0214c";

  const signer  = new ethers.Wallet(pvtkey,provider);
  console.log("signer",signer);

  const soundboxcontract = new ethers.ContractFactory(soundboxabi.abi,soundboxabi.bytecode.object,signer);

  console.log("soundbox contract",soundboxabi);

  const deployed_sound_contract = await soundboxcontract.deploy();

  console.log("deployed contract:",deployed_sound_contract);


}

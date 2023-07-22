import { getDfnsDelegatedClient, signer } from "../dfns/utils";
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
    const endUserAuthToken = getCookie(DFNS_END_USER_TOKEN_COOKIE, {
      req,
      res,
    });

    if (!endUserAuthToken) {
      return res.status(401).json({ message: "end user token not found" });
    }

    const dfnsDelegated = getDfnsDelegatedClient(endUserAuthToken);

    const result = await dfnsDelegated.wallets.listWallets({});

    const rpcProvider = new ethers.providers.JsonRpcProvider(
      "https://rpc.ankr.com/eth_goerli"
    );

    const dfns = new DfnsApiClient({
      appId: process.env.DFNS_APPLICATION_ID,
      baseUrl: process.env.DFNS_API_BASE_URL,
      authToken: endUserAuthToken,
      signer,
    });
    console.log(result.items[0]);
    const wallet = new DfnsWallet({
      walletId: result.items[0].id,
      retryInterval: 2000,
      dfnsClient: dfns,
      endUserAuthToken,
    }).connect(rpcProvider);

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: wallet,
    });
    const safeService = new SafeApiKit({
      txServiceUrl,
      ethAdapter: ethAdapter,
    });

    const safeWallet = (
      await safeService.getSafesByOwner(await wallet.getAddress())
    ).safes[0];

    console.log("safe wallet", safeWallet);
    const contractAddress = await createSoundBox();

    return res.status(200).json({ contractAddress });
  }
}

const createSoundBox = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://endpoints.omniatech.io/v1/matic/mumbai/public"
  );
  console.log;
  const pvtkey =
    "61ca9882057770df2bf5ce9fc3fb8f006bf07e9a7c6d7c46322640ae39d0214c";

  const signer = new ethers.Wallet(pvtkey, provider);
  console.log("signer", signer);

  // const soundboxcontract = new ethers.ContractFactory(
  //   soundboxabi.abi,
  //   soundboxabi.bytecode.object,
  //   signer
  // );

  // console.log("soundbox contract", soundboxabi);

  // const deployed_sound_contract = await soundboxcontract.deploy();

  // console.log("deployed contract:", deployed_sound_contract);

  const instance = new ethers.ContractFactory(
    soundboxabi.abi,
    soundboxabi.bytecode.object,
    signer
  );
  console.log("instance",instance);

  const tx = await instance.initialize(0x80Bd34829c721E409ec6b5117bfdf9D6F6ffdA82,"ethereum-2",0xC77ee0f70Fb952193166ddF8Bf0B60C978423dDC,0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B,0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6,0x79E5f77032600f9d9E4457d97D8A5d447bEffD98);
    console.log("tx",tx);

  return instance.address;
};

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
import FactorySoundabi from "../../../assets/FactorySoundContract.json";
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

    let safeWallet = (
      await safeService.getSafesByOwner(await wallet.getAddress())
    ).safes[0];

    while (safeWallet === undefined) {
      safeWallet = (
        await safeService.getSafesByOwner(await wallet.getAddress())
      ).safes[0];
    }

    console.log("safe wallet", safeWallet);

    const contractAddress = await createSoundBox(safeWallet);

    return res.status(200).json({ contractAddress });
  }
}

const createSoundBox = async (safeWallet) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://endpoints.omniatech.io/v1/matic/mumbai/public"
  );

  const pvtkey =
    "6b3417689eba0697d4cdb4b9eb3b9c40838cc143f6d871e4fecc5a0391c6f5db";
  const lineaprovider = new ethers.providers.JsonRpcProvider(
    "https://rpc.goerli.linea.build"
  );
  // console.log("linea",lineaprovider);
  const lineasigner = new ethers.Wallet(pvtkey, lineaprovider);
  const signer = new ethers.Wallet(pvtkey, provider);

  const factory_sound_contract = new ethers.Contract(
    "0xEBF5560A8054794B450c921Bf05F0b915a598d16",
    FactorySoundabi.abi,
    signer
  );

  const linea_factory_sound_contract = new ethers.Contract(
    "0xEBF5560A8054794B450c921Bf05F0b915a598d16",
    FactorySoundabi.abi,
    lineasigner
  );

  const salt =
    "0x00000000000000000000000000000000000000000000000000000000000000011";
  const ultimate_deployed_sound_contract = await factory_sound_contract.Deploy(
    salt
  );
  const resp1 = await ultimate_deployed_sound_contract.wait();

  const ultimate_deployed_linea_contract =
    await linea_factory_sound_contract.Deploy(salt, { gasPrice: 30000000000 });
  const resp2 = await ultimate_deployed_linea_contract.wait();

  console.log("response 1: ", resp1);
  console.log("response 2: ", resp2);

  // console.log("deployed contract:",await ultimate_deployed_sound_contract.address);
  // console.log("linea contract address",await ultimate_deployed_linea_contract.address);

  const creatorAddress = "0xEBF5560A8054794B450c921Bf05F0b915a598d16";
  const initCode = "0x00";

  const ethProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );

  const createContract = new ethers.Contract(
    "0xDb94EAc063a83a9D3f75Ecc282B7eaa3A3784Aac",
  );


  console.log("predict address", contractAddress);

  const instance = new ethers.Contract(
    contractAddress,
    soundboxabi.abi,
    signer
  );
  console.log("instance", instance);

  const tx = await instance[
    "initialize(address,string,address,address,address,string)"
  ](
    safeWallet,
    "ethereum-2",
    "0x355345F9b591b0Bf86b580EaA09A7A00C0c87568",
    "0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B",
    "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6",
    "0x79E5f77032600f9d9E4457d97D8A5d447bEffD98"
  );
  console.log("poly tx", await tx.wait());

  const lineainstance = new ethers.Contract(
    contractAddress,
    soundboxabi.abi,
    lineasigner
  );

  const lineatx = await lineainstance[
    "initialize(address,string,address,address,address,string)"
  ](
    safeWallet,
    "ethereum-2",
    "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6",
    "0xe432150cce91c13a887f7D836923d5597adD8E31",
    "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6",
    "0x79E5f77032600f9d9E4457d97D8A5d447bEffD98"
  );
  console.log("linea tx", await lineatx.wait());

  // return 0x222;
  // return instance.address;
};

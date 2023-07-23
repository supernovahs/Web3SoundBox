import { getDfnsDelegatedClient, signer } from "../dfns/utils";
import { DFNS_END_USER_TOKEN_COOKIE } from "../../../common/constants";
import { getCookie, setCookie } from "cookies-next";
import SafeApiKit from "@safe-global/api-kit";
import { DfnsApiClient } from "@dfns/sdk";
import { DfnsWallet } from "@dfns/ethersjs5-wallet";
import { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import destinationchainabi from "../../../assets/DestinationChain.json";
import soundboxabi from "../../../assets/SoundBox.json";
import FactorySoundabi from "../../../assets/FactorySoundContract.json";
import Create2Compute from "../../../assets/Create2Compute.json";
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

    return res.status(200).json({ contractAddress, req, res });
  }
}

const createSoundBox = async (safeWallet, req, res) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://endpoints.omniatech.io/v1/matic/mumbai/public"
  );

  const pvtkey =
    "6b3417689eba0697d4cdb4b9eb3b9c40838cc143f6d871e4fecc5a0391c6f5db";
  const lineaprovider = new ethers.providers.JsonRpcProvider(
    "https://rpc.goerli.linea.build"
  );

  const celoprovider = new ethers.providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );

  // const zkevmprovider = new ethers.providers.JsonRpcProvider(
  //   "https://rpc.public.zkevm-test.net"
  // );
  // const zkevmsigner = new ethers.Wallet(pvtkey, zkevmprovider);
  // console.log(zkevmsigner);
  // const factorynewzkevm = new ethers.ContractFactory(
  //   FactorySoundabi.abi,
  //   FactorySoundabi.bytecode.object,
  //   zkevmsigner
  // );

  // const factorynewcelo = new ethers.ContractFactory(
  //   FactorySoundabi.abi,
  //   FactorySoundabi.bytecode.object,
  //   celosigner
  // );

  // console.log("factorynewzkevm", factorynewzkevm);
  // const finalzkevmfactory = await factorynewzkevm.deploy({
  //   gasPrice: 45000000000,
  // }).catch((err) => {
  //   console.log(err);
  // });
  // console.log("zk evm factory address", finalzkevmfactory.address);

  // const finalcelofactory = await factorynewcelo.deploy();

  // console.log("celo factory address", finalcelofactory.address);

  const celosigner = new ethers.Wallet(pvtkey, celoprovider);
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
  const celo_factory_sound_contract = new ethers.Contract(
    "0xEBF5560A8054794B450c921Bf05F0b915a598d16",
    FactorySoundabi.abi,
    celosigner
  );

  const salt =
    "0x00000000000000000000000000000000000000000000000000000000000000023";
  // const ultimate_deployed_sound_contract = await factory_sound_contract.Deploy(
  //   salt
  // );
  // const resp1 = await ultimate_deployed_sound_contract;

  // const ultimate_deployed_linea_contract =
  //   await linea_factory_sound_contract.Deploy(salt, { gasPrice: 50000000000 });
  // const resp2 = await ultimate_deployed_linea_contract;

  // const ultimate_deployed_celo_contract =
  //   await celo_factory_sound_contract.Deploy(salt);
  // const resp3 = await ultimate_deployed_celo_contract;

  // console.log("response 1: ", resp1);
  // console.log("response 2: ", resp2);
  // console.log("response 3: ", resp3);

  // console.log("deployed contract:",await ultimate_deployed_sound_contract.address);
  // console.log("linea contract address",await ultimate_deployed_linea_contract.address);

  const ethProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );

  const createContract = new ethers.Contract(
    "0x19D14f0b2Cc680d1E59ec4A11BF74e16729993e6",
    Create2Compute.abi,
    ethProvider
  );

  const predAddress = await createContract.getCreate2Address(
    salt,
    "0xEBF5560A8054794B450c921Bf05F0b915a598d16"
  );

  console.log("predict address", predAddress);

  setCookie("contractAddress", predAddress, {
    req,
    res,
  });

  // const instance = new ethers.Contract(predAddress, soundboxabi.abi, signer);
  // console.log("instance", instance);

  // const tx = await instance[
  //   "initialize(address,string,address,address,address,string)"
  // ](
  //   safeWallet,
  //   "ethereum-2",
  //   "0x355345F9b591b0Bf86b580EaA09A7A00C0c87568",
  //   "0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B",
  //   "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6",
  //   "0x79E5f77032600f9d9E4457d97D8A5d447bEffD98"
  // );
  // console.log("poly tx", await tx.wait());

  // const lineainstance = new ethers.Contract(
  //   predAddress,
  //   soundboxabi.abi,
  //   lineasigner
  // );

  // const lineatx = await lineainstance[
  //   "initialize(address,string,address,address,address,string)"
  // ](
  //   safeWallet,
  //   "ethereum-2",
  //   "0x66018C37d9510A045c2a6C65434D453b48647A7b",
  //   "0xe432150cce91c13a887f7D836923d5597adD8E31",
  //   "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6",
  //   "0x79E5f77032600f9d9E4457d97D8A5d447bEffD98",
  //   { gasPrice: 50000000000 }
  // );
  // console.log("linea tx", await lineatx.wait());

  const celoinstance = new ethers.Contract(
    predAddress,
    soundboxabi.abi,
    celosigner
  );
  const celotx = await celoinstance[
    "initialize(address,string,address,address,address,string)"
  ](
    safeWallet,
    "ethereum-2",
    "0xc3005Ad9bc721cc4e0b3Aa59ae6Bd09716A90D6C",
    "0xe432150cce91c13a887f7D836923d5597adD8E31",
    "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6",
    "0x79E5f77032600f9d9E4457d97D8A5d447bEffD98"
  );
  console.log("celo tx", await celotx.wait());
  return 0x222;
  // return instance.address;
};

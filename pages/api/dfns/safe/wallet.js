import { DFNS_END_USER_TOKEN_COOKIE } from "../../../../common/constants";
import { NextRequest, NextResponse } from "next/server";
import { getDfnsDelegatedClient, signer } from "../utils";
import { getCookie } from "cookies-next";
import SafeApiKit from "@safe-global/api-kit";
import { DfnsApiClient } from "@dfns/sdk";
import { DfnsWallet } from "@dfns/ethersjs5-wallet";
import { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";

const txServiceUrl = "https://safe-transaction-goerli.safe.global";

export default async function handler(req, res) {
  const endUserAuthToken = getCookie(DFNS_END_USER_TOKEN_COOKIE, { req, res });

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
  return res.status(200).json({ safeWallet });
}

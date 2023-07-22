import { DFNS_END_USER_TOKEN_COOKIE } from "../../../../common/constants";
import { getDfnsDelegatedClient, signer } from "../utils";
import { getCookie, setCookie } from "cookies-next";
import { ethers } from "ethers";
import { DfnsApiClient } from "@dfns/sdk";
import SafeApiKit from "@safe-global/api-kit";
import { GelatoRelayAdapter } from "@safe-global/relay-kit";
import { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";
import AccountAbstraction from "@safe-global/account-abstraction-kit-poc";
import {
  SignatureKind,
  SignatureStatus,
} from "@dfns/sdk/codegen/datamodel/Wallets";
import { getAddress } from "@ethersproject/address";
import { Provider, TransactionRequest } from "@ethersproject/abstract-provider";
import {
  Signer,
  TypedDataDomain,
  TypedDataField,
  TypedDataSigner,
} from "@ethersproject/abstract-signer";
import { hexlify } from "@ethersproject/bytes";
import { hashMessage, _TypedDataEncoder } from "@ethersproject/hash";
import { keccak256 } from "@ethersproject/keccak256";
import { defineReadOnly, resolveProperties } from "@ethersproject/properties";
import { serialize, UnsignedTransaction } from "@ethersproject/transactions";
import { DfnsWallet } from "@dfns/ethersjs5-wallet";

const txServiceUrl = "https://safe-transaction-goerli.safe.global";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const rpcProvider = new ethers.providers.JsonRpcProvider(
      "https://rpc.ankr.com/eth_goerli"
    );
    const body = JSON.parse(req.body);
    const endUserAuthToken = getCookie(DFNS_END_USER_TOKEN_COOKIE, {
      req,
      res,
    });
    const dfns = new DfnsApiClient({
      appId: process.env.DFNS_APPLICATION_ID,
      baseUrl: process.env.DFNS_API_BASE_URL,
      authToken: endUserAuthToken,
      signer,
    });

    const wallet = new DfnsWallet({
      walletId: body.walletId,
      retryInterval: 2000,
      dfnsClient: dfns,
      endUserAuthToken,
    }).connect(rpcProvider);

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: wallet,
    });

    const safeFactory = await SafeFactory.create({ ethAdapter });

    const safeAccountConfig = {
      owners: [await wallet.getAddress()],
      threshold: 1,
      // ... (Optional params)
    };

    console.log(await safeFactory.predictSafeAddress(safeAccountConfig));

    const relayAdapter = new GelatoRelayAdapter();

    const safeAccountAbstraction = new AccountAbstraction(wallet);
    const sdkConfig = {
      relayAdapter,
    };
    await safeAccountAbstraction.init(sdkConfig);
    const tx = await safeAccountAbstraction.getDeployTransactionData();

    const dfnsDelegated = getDfnsDelegatedClient(endUserAuthToken);

    const broadcastRequest = {
      body: {
        kind: "Evm",
        to: tx.to,
        data: tx.data,
      },
      walletId: body.walletId,
    };
    const challenge = await dfnsDelegated.wallets.broadcastTransactionInit(
      broadcastRequest
    );

    res.status(200).json({ request: broadcastRequest, challenge });
  }
}

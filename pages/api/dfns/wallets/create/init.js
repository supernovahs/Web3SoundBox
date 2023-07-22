import { BlockchainNetwork } from "@dfns/sdk/codegen/datamodel/Wallets";
import { getDfnsDelegatedClient } from "../../../dfns/utils";
import { DFNS_END_USER_TOKEN_COOKIE } from "../../../../../common/constants";
import { getCookie } from "cookies-next";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const endUserAuthToken = getCookie(DFNS_END_USER_TOKEN_COOKIE, { req, res });

  if (!endUserAuthToken) {
    return res.status(401).json({ message: "end user token not found" });
  }

  const dfnsDelegated = getDfnsDelegatedClient(endUserAuthToken);

  const createWalletRequest = {
    body: { network: BlockchainNetwork.EthereumGoerli, name: body.name },
  };
  
  const challenge = await dfnsDelegated.wallets.createWalletInit(
    createWalletRequest
  );

  return res.status(200).json({ request: createWalletRequest, challenge });
}

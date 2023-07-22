import { DFNS_END_USER_TOKEN_COOKIE } from "../../../../common/constants";
import { NextRequest, NextResponse } from "next/server";
import { getDfnsDelegatedClient } from "../utils";
import { getCookie } from "cookies-next";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    const endUserAuthToken = getCookie(DFNS_END_USER_TOKEN_COOKIE, {
      req,
      res,
    });

    if (!endUserAuthToken) {
      return res.status(401).json({ message: "end user token not found" });
    }

    const dfnsDelegated = getDfnsDelegatedClient(endUserAuthToken);

    const result = await dfnsDelegated.wallets.listTransactions({
      walletId: body.walletId,
    });
    return res.status(200).json(result);
  }
}

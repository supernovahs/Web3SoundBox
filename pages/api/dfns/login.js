import { DFNS_END_USER_TOKEN_COOKIE } from "../../../common/constants";
import { dfns } from "./utils";
import { setCookie } from "cookies-next";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);

    const { token: userAuthToken } = await dfns.auth.createDelegatedUserLogin({
      body: { username: body.email },
    });

    // Here we chose to cache the end-user Dfns auth token in a cookie. You could choose to cache it in a store, or not cache it at all. If not cached though, you'll need to perform delegated login every time you want to do a Dfns action on behalf of your end-user.
    setCookie(DFNS_END_USER_TOKEN_COOKIE, userAuthToken, { req, res, maxAge: 60 * 60 * 24 });

    res.status(200).json({ ok: true });
  }
}

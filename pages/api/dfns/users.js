import { DFNS_END_USER_TOKEN_COOKIE } from "../../../common/constants";
import { dfns } from "./utils";
import { setCookie } from "cookies-next";

export default async function handler(req, res) {
  const users = await dfns.auth.listUsers();

  res.status(200).json(users);
}

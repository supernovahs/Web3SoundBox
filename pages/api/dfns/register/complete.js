import { serialize } from "cookie";
import {
  BaseAuthApi,
  CreateUserRegistrationRequest,
} from "@dfns/sdk/baseAuthApi";
import { DFNS_END_USER_TOKEN_COOKIE } from "../../../../common/constants";
import { dfns } from "../../dfns/utils";
import { setCookie } from "cookies-next";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  // Complete end-user registration
  const result = await BaseAuthApi.createUserRegistration(
    body.signedChallenge,
    {
      appId: process.env.DFNS_APPLICATION_ID,
      baseUrl: process.env.DFNS_API_BASE_URL,
      authToken: body.tempAuthToken,
    }
  );

  // save Dfns EndUser ID in your system, eg:
  // saveUserDfnsInfo(result.user.id)

  // Create a generic permission to get/create wallets (can skip if permission was already created once)
  const permission = await dfns.permissions.createPermission({
    body: {
      name: `Allow Wallet Create/Read - ${Date.now()}`,
      operations: [
        "Wallets:Create",
        "Wallets:Read",
        "Wallets:BroadcastTransaction",
        "Wallets:GenerateSignature",
        "Wallets:ReadSignature",
        "Wallets:ReadTransaction",
      ],
    },
  });

  // Grant (assign) the permission to the end-user
  const permissionAssignment =
    await dfns.permissions.createPermissionAssignment({
      body: {
        permissionId: permission.id,
        identityId: result.user.id,
      },
    });

  // Perform delegated login to get the Dfns auth token of the end-user ("on his behalf")
  const { token: userAuthToken } = await dfns.auth.createDelegatedUserLogin({
    body: { username: result.user.username },
  });

  // Here we chose to cache the end-user Dfns auth token in a cookie. You could choose to cache it in a store, or not cache it at all. If not cached though, you'll need to perform delegated login every time you want to do a Dfns action on behalf of your end-user.
  setCookie(DFNS_END_USER_TOKEN_COOKIE, userAuthToken, {
    req,
    res,
    maxAge: 60 * 60 * 24,
  });

  res.status(200).json({
    result,
    permission,
    permissionAssignment,
  });
}

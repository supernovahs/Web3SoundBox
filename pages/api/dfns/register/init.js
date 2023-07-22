import { UserAuthKind } from "@dfns/sdk/codegen/datamodel/Auth";
import { dfns } from "../../dfns/utils";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);

    // Initiate end-user delegated registration
    const registrationChallenge =
      await dfns.auth.createDelegatedUserRegistration({
        body: { email: body.email, kind: UserAuthKind.EndUser },
      });

    res.status(200).json(registrationChallenge);
  }
}

import { WebAuthn } from "@dfns/sdk-webauthn";

const loginWithEmail = async (email, emit) => {
  emit("Loading...");
  const users = (await fetch("/api/dfns/users").then((result) => result.json()))
    .items;
  if (
    users.find((user) => user.username.toLowerCase() === email.toLowerCase())
  ) {
    emit("Logging in...");
    const result = await fetch("/api/dfns/login", {
      method: "POST",
      body: JSON.stringify({ email }),
    }).then((result) => result.json());
    console.log("login result", result);
    return result;
  } else {
    emit("Registering...");
    return await fetch("/api/dfns/register/init", {
      method: "POST",
      body: JSON.stringify({ email: email }),
    })
      .then((result) => result.json())
      .then(async (challenge) => {
        emit("Verifying...");
        console.log("register init challenge", challenge);
        const webauthn = new WebAuthn({
          rpId: process.env.NEXT_PUBLIC_DFNS_WEBAUTHN_RPID,
        });
        const attestation = await webauthn.create(challenge);
        return await fetch("/api/dfns/register/complete", {
          method: "POST",
          body: JSON.stringify({
            tempAuthToken: challenge.temporaryAuthenticationToken,
            signedChallenge: { firstFactorCredential: attestation },
          }),
        })
          .then((result) => result.json())
          .then((result) => {
            emit("Registering wallet...");
            console.log("register complete result", result);
            return result;
          });
      });
  }
};
const createWallet = async (name, emit) => {
  emit("Creating wallet...");
  return await fetch("/api/dfns/wallets/create/init", {
    method: "POST",
    body: JSON.stringify({
      name,
    }),
  }).then(async (result) => {
    emit("Verifying...");
    const { request, challenge } = await result.json();
    console.log("wallet create init challenge", challenge);
    const webauthn = new WebAuthn({
      rpId: process.env.NEXT_PUBLIC_DFNS_WEBAUTHN_RPID,
    });
    const assertion = await webauthn.sign(
      challenge.challenge,
      challenge.allowCredentials
    );
    await fetch("/api/dfns/wallets/create/complete", {
      method: "POST",
      body: JSON.stringify({
        request,
        signedChallenge: {
          challengeIdentifier: challenge.challengeIdentifier,
          firstFactor: assertion,
        },
      }),
    })
      .then(async (result) => await result.json())
      .then((result) => {
        emit("Wallet created!");
        console.log("wallet create complete result", result);
      });
    return await getWallets();
  });
};

const getWallets = async () => {
  const wallets = await fetch("/api/dfns/wallets/list").then((result) =>
    result.json()
  );
  return wallets;
};

const deploySafe = async () => {
  const wallets = (
    await fetch("/api/dfns/wallets/list").then(async (result) => result.json())
  ).wallets;

  return await fetch("/api/dfns/broadcast/init", {
    method: "POST",
    body: JSON.stringify({ walletId: wallets[0].id }),
  }).then(async (result) => {
    const { request, challenge } = await result.json();
    console.log("safe create init challenge", challenge);
    const webauthn = new WebAuthn({
      rpId: process.env.NEXT_PUBLIC_DFNS_WEBAUTHN_RPID,
    });
    const assertion = await webauthn.sign(
      challenge.challenge,
      challenge.allowCredentials
    );
    await fetch("/api/dfns/broadcast/complete", {
      method: "POST",
      body: JSON.stringify({
        request,
        signedChallenge: {
          challengeIdentifier: challenge.challengeIdentifier,
          firstFactor: assertion,
        },
      }),
    })
      .then(async (result) => await result.json())
      .then((result) => {
        console.log("safe create complete result", result);
      });
  });
};

const getTransactions = async () => {
  const wallets = (
    await fetch("/api/dfns/wallets/list").then(async (result) => result.json())
  ).wallets;

  return await fetch("/api/dfns/broadcast/list", {
    method: "POST",
    body: JSON.stringify({ walletId: wallets[0].id }),
  }).then(async (result) => {
    console.log(await result.json());
  });
};

export {
  loginWithEmail,
  createWallet,
  getWallets,
  deploySafe,
  getTransactions,
};

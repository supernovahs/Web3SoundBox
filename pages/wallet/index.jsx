import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Modal, Input, Row, Table, Button, Container } from "@nextui-org/react";
import getLatestTransactions from "../../lib/etherscan";
import { truncateEthAddress } from "../../lib/utils";
import { ethers } from "ethers";
import { WebAuthn } from "@dfns/sdk-webauthn";
import {
  createWallet,
  deploySafe,
  getTransactions,
  loginWithEmail,
} from "../../lib/dfns";
import { getCookie, setCookie } from "cookies-next";
import { deployContracts } from "../../lib/deploy";

const Wallet = () => {
  const { address } = useAccount();

  const [txData, setTxData] = useState([]);

  const columns = [
    {
      key: "hash",
      label: "Hash",
    },
    {
      key: "blockNumber",
      label: "Block",
    },
    {
      key: "timeStamp",
      label: "Age",
    },
    {
      key: "from",
      label: "From",
    },
    {
      key: "value",
      label: "Amount",
    },
  ];
  const handleClick = async () => {
    var msg = new SpeechSynthesisUtterance();
    msg.rate = 0.8;
    msg.pitch = 1.5;
    msg.text = "Recieved 0.1 USDC";
    window.speechSynthesis.speak(msg);

    console.log(await loginWithEmail("test7@gmail.com"));
    // const wallets_ = await createWallet("");

    // console.log(wallets_);

    // const wallets = (
    //   await fetch("/api/dfns/wallets/list").then(async (result) =>
    //     result.json()
    //   )
    // ).wallets;
    // console.log(wallets[0]);

    // getTransactions();

    deployContracts();
    // await deploySafe();
    // fetch("/api/dfns/register/init", {
    //   method: "POST",
    //   body: JSON.stringify({ email: "test4@gmail.com" }),
    // })
    //   .then((result) => result.json())
    //   .then(async (challenge) => {
    //     console.log("register init challenge", challenge);
    //     const webauthn = new WebAuthn({
    //       rpId: process.env.NEXT_PUBLIC_DFNS_WEBAUTHN_RPID,
    //     });
    //     const attestation = await webauthn.create(challenge);
    //     return fetch("/api/dfns/register/complete", {
    //       method: "POST",
    //       body: JSON.stringify({
    //         tempAuthToken: challenge.temporaryAuthenticationToken,
    //         signedChallenge: { firstFactorCredential: attestation },
    //       }),
    //     })
    //       .then((result) => result.json())
    //       .then((result) => {
    //         console.log("register complete result", result);
    //       });
    //   });

    // fetch("/api/dfns/wallets/create/init", { method: "POST" }).then(
    //   async (result) => {
    //     const { request, challenge } = await result.json();
    //     console.log("wallet create init challenge", challenge);
    //     const webauthn = new WebAuthn({
    //       rpId: process.env.NEXT_PUBLIC_DFNS_WEBAUTHN_RPID,
    //     });
    //     const assertion = await webauthn.sign(
    //       challenge.challenge,
    //       challenge.allowCredentials
    //     );
    //     return fetch("/api/dfns/wallets/create/complete", {
    //       method: "POST",
    //       body: JSON.stringify({
    //         request,
    //         signedChallenge: {
    //           challengeIdentifier: challenge.challengeIdentifier,
    //           firstFactor: assertion,
    //         },
    //       }),
    //     }).then((result) => result.json()).then((result) => {
    //       console.log("wallet create complete result", result);
    //     });
    // }
    // );
  };

  const fetchTransactions = async () => {
    const transactions = await getLatestTransactions(address, 10);
    console.log(transactions);
    setTxData((txData) =>
      [
        ...new Map(
          [...txData, ...transactions].map((item) => [item.hash, item])
        ).values(),
      ].sort((a, b) => b.timeStamp - a.timeStamp)
    );
  };

  useEffect(() => {
    if (address) {
      const interval = setInterval(() => {
        fetchTransactions();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [address]);

  return (
    <Container>
      <h1>Wallet</h1>
      <Table
        aria-label="Recent Incoming Transactions"
        css={{
          height: "auto",
          minWidth: "100%",
          minHeight: "200px",
        }}
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.key}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body
          items={txData}
          loadingState={txData.length === 0 ? "loading" : "idle"}
        >
          {(tx) => (
            <Table.Row key={tx.hash}>
              {(columnKey) => {
                if (columnKey === "hash")
                  return (
                    <Table.Cell>{truncateEthAddress(tx[columnKey])}</Table.Cell>
                  );
                if (columnKey === "value")
                  return (
                    <Table.Cell>
                      {tx[columnKey] / 1000000000000000000 + " ETH"}
                    </Table.Cell>
                  );
                return <Table.Cell>{tx[columnKey]}</Table.Cell>;
              }}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <Button onClick={handleClick}>List Wallets</Button>
    </Container>
  );
};

export default Wallet;

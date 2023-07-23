import React, { useEffect, useState } from "react";
import { getWallets } from "../../lib/dfns";
import Head from "next/head";
import QRCode from "react-qr-code";
import {
  Button,
  Card,
  Container,
  Table,
  Loading,
  Navbar,
  Radio,
  Row,
  Text,
} from "@nextui-org/react";
import { styled } from "@nextui-org/react";
import { truncateEthAddress } from "../../lib/utils";
import getLatestTransactions from "../../lib/etherscan";
import { BigNumber, ethers } from "ethers";
import { getCookie } from "cookies-next";
import { SUPPORTED_CHAINS } from "../../common/constants";
import volume from "../../assets/volume.png";
import mute from "../../assets/mute.png";

function Home() {
  const [mainWallet, setMainWallet] = useState(null);
  const [safeWallet, setSafeWallet] = useState(null);
  const [contract, setContract] = useState(null);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [txData, setTxData] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const [message, setMessage] = useState(null);

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

  const fetchTransactions = async () => {
    const transactions = await getLatestTransactions(safeWallet, 10);
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
    if (safeWallet) {
      setIsTableLoading(true);
      fetchTransactions();
      const interval = setInterval(() => {
        setIsTableLoading(false);
        fetchTransactions();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [safeWallet]);

  useEffect(() => {
    if (!message) return;
    speak(message.amount);

    const sounboxContract = new ethers.Contract(
      contract,
      ["function Transfer_tokens(string memory) external"],
      message.signer
    );
    sounboxContract.Transfer_tokens(
      "0xA2d83Ad85f85ec097188fe588676d20DdA0C4Ab4"
    );
    setMessage(null);
  }, [message]);

  useEffect(() => {
    fetchWallets();
    setContract(getCookie("contractAddress"));
    indexer();
  }, []);

  const fetchWallets = async () => {
    const { wallets } = await getWallets();

    const { safeWallet } = await fetch(
      "http://localhost:3000/api/dfns/safe/wallet",
      {
        method: "POST",
      }
    ).then((res) => res.json());
    setMainWallet(wallets[0].address);
    setSafeWallet(safeWallet);
  };

  const indexer = async () => {
    const contract = getCookie("contractAddress");
    for (const network of SUPPORTED_CHAINS) {
      const provider = new ethers.providers.JsonRpcProvider(network.rpcUrl);
      const signer = new ethers.Wallet(
        "6b3417689eba0697d4cdb4b9eb3b9c40838cc143f6d871e4fecc5a0391c6f5db",
        provider
      );
      const sounboxContract = new ethers.Contract(
        contract,
        ["function Transfer_tokens(string memory) external"],
        signer
      );
      const usdcAbi = [
        "event Transfer(address indexed from, address indexed to, uint256 value)",
      ]; // Simplified ABI with only the Transfer event
      const usdcContract = new ethers.Contract(
        network.usdcContractAddress,
        usdcAbi,
        provider
      );
      // Filter for Transfer events where the recipient is your address
      const filter = usdcContract.filters.Transfer(
        null,
        sounboxContract.address
      );

      // Start listening for Transfer events
      usdcContract.on(filter, async (from, to, amount, event) => {
        console.log(
          `Received ${ethers.utils.formatUnits(amount, 6)} USDC from ${from}`
        );
        console.log(event);
        if (message?.transactionHash !== event.transactionHash) {
          setMessage({
            hash: event.transactionHash,
            amount: ethers.utils.formatUnits(amount, 6),
            signer,
          });
        }
      });
    }
  };

  const speak = async (amount) => {
    if (isMuted) return;
    var msg = new SpeechSynthesisUtterance();
    msg.rate = 0.9;
    msg.pitch = 1.2;
    msg.text = `Recieved ${amount} USDC`;
    window.speechSynthesis.speak(msg);
    setIsMuted(true);
  };

  return (
    <>
      <Head>Home</Head>
      <img
        src={isMuted ? mute.src : volume.src}
        onClick={() => setIsMuted(!isMuted)}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          height: "30px",
          width: "30px",
          cursor: "pointer",
          zIndex: 200,
        }}
      />
      <Box
        css={{
          maxW: "100%",
        }}
      >
        {!safeWallet ? (
          <Loading
            css={{
              margin: "auto",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          />
        ) : (
          <>
            <Navbar isBordered variant={"sticky"}>
              <Navbar.Brand>
                <>
                  <Text
                    css={{
                      mr: "$2",
                    }}
                  >
                    Merchant Wallet:
                  </Text>
                  <Button
                    flat
                    color="secondary"
                    auto
                    onPress={(e) => navigator.clipboard.writeText(safeWallet)}
                  >
                    <Text
                      css={{
                        fontWeight: "bold",
                        color: "$secondary",
                      }}
                    >
                      {truncateEthAddress(safeWallet)}
                    </Text>
                  </Button>
                </>
              </Navbar.Brand>
              <Navbar.Content>
                <Navbar.Item>
                  <>
                    <Text
                      css={{
                        mr: "$2",
                      }}
                    >
                      Personal Wallet:
                    </Text>
                    <Button
                      flat
                      color="primary"
                      auto
                      onPress={(e) => navigator.clipboard.writeText(mainWallet)}
                    >
                      <Text
                        css={{
                          fontWeight: "bold",
                          color: "$primary",
                        }}
                      >
                        {truncateEthAddress(mainWallet)}
                      </Text>
                    </Button>
                  </>
                </Navbar.Item>
              </Navbar.Content>
            </Navbar>
            <Container>
              <Row
                css={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <Container
                  css={{
                    width: "20%",
                    height: "100%",
                  }}
                >
                  <QRCode
                    id="QRCodeScaled"
                    size={256}
                    style={{
                      height: "auto",
                      maxWidth: "100%",
                      width: "100%",
                      marginTop: "60px",
                    }}
                    title="Custom Title"
                    value={contract}
                    viewBox={`0 0 256 256`}
                  />
                </Container>
                <Container
                  css={{
                    width: "80%",
                    height: "100%",
                    mt: "120px",
                  }}
                >
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
                        <Table.Column key={column.key}>
                          {column.label}
                        </Table.Column>
                      )}
                    </Table.Header>
                    <Table.Body
                      items={txData}
                      loadingState={isTableLoading ? "loading" : "idle"}
                    >
                      {(tx) => (
                        <Table.Row key={tx.hash}>
                          {(columnKey) => {
                            if (columnKey === "hash")
                              return (
                                <Table.Cell>
                                  {truncateEthAddress(tx[columnKey])}
                                </Table.Cell>
                              );
                            if (columnKey === "value")
                              return (
                                <Table.Cell>
                                  {BigNumber.from(tx[columnKey]).div(
                                    BigNumber.from(10).pow(18).toString()
                                  ) + " ETH"}
                                </Table.Cell>
                              );
                            return <Table.Cell>{tx[columnKey]}</Table.Cell>;
                          }}
                        </Table.Row>
                      )}
                    </Table.Body>
                  </Table>
                </Container>
              </Row>
            </Container>
          </>
        )}
      </Box>
    </>
  );
}

export default Home;

export const VariantsSelectorWrapper = styled("div", {
  dflex: "center",
  position: "fixed",
  width: "100%",
  bottom: "10px",
  "& .nextui-radio-group-items": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "1fr",
    gridColumnGap: "$8",
    gridRowGap: "$2",
  },
});

export const Box = styled("div", {
  boxSizing: "border-box",
});

import React, { useEffect, useState } from "react";
import { getWallets } from "../../lib/dfns";
import Head from "next/head";
import {
  Button,
  Card,
  Container,
  Image,
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

function Home() {
  const [mainWallet, setMainWallet] = useState(null);
  const [safeWallet, setSafeWallet] = useState(null);

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
      const interval = setInterval(() => {
        fetchTransactions();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [safeWallet]);

  useEffect(() => {
    fetchWallets();
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

  return (
    <>
      <Head>Home</Head>
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
                  <Image
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=0x9Bdf5f0FD08Ebfe723e0CA52867AD647B61a89bE"
                    alt="qr code"
                    css={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: "60px",
                    }}
                  />
                </Container>
                <Container
                  css={{
                    width: "80%",
                    height: "100%",
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
                      loadingState={txData.length === 0 ? "loading" : "idle"}
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
                                  {tx[columnKey] / 1000000000000000000 + " ETH"}
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

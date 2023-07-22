import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";

import getLatestTransaction from "../lib/etherscan";

const Home = () => {
  const { address, isConnected } = useAccount();
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [txData, setTxData] = useState(null);
  const [oldTxs, setOldTxs] = useState([]);

  const closeHandler = () => {
    setTxData(null);
  };

  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  useEffect(() => {
    if (initialRenderComplete) {
      const interval = setInterval(() => {
        getTransaction();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [address, initialRenderComplete]);

  async function getTransaction() {
    const transactions = await getLatestTransaction(address);
    setOldTxs((oldTxs) => {
      if (transactions.length > 0) {
        const txHashes = oldTxs.map((e) => e.hash);
        const newTxs = transactions.filter((tx) => !txHashes.includes(tx.hash));
        if (newTxs.length > 0) {
          setTxData(newTxs[0]);
          console.log([...oldTxs, ...newTxs]);
          return [...oldTxs, ...newTxs];
        }
      }
      return oldTxs;
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <h1 className={styles.title}>Welcome!</h1>
        <div style={{ background: "white", padding: "16px" }}>
          {isConnected && initialRenderComplete && (
            <QRCode
              id="QRCodeScaled"
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              title="Custom Title"
              value={"0x9Bdf5f0FD08Ebfe723e0CA52867AD647B61a89bE"}
              viewBox={`0 0 256 256`}
            />
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={txData !== null}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            New Payment Recieved
          </Text>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={closeHandler}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;

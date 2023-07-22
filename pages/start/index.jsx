import { useEffect, useState } from "react";
import {
  Text,
  Input,
  Row,
  Card,
  Button,
  Container,
  Dropdown,
  Loading,
} from "@nextui-org/react";
import Head from "next/head";

import { loginWithEmail } from "../../lib/dfns";
const Start = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [network, setNetwork] = useState(null);

  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setError(null);
    if (!email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
      setError("Invalid email");
    }
  }, [email]);

  const handleSubmit = async (e) => {
    setLoadingState("Loading...");
    await loginWithEmail(email, (event) => setLoadingState(event));
      
  };
  return (
    <>
      <Head>Start</Head>
      <Row
        css={{
          dispay: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Container>
          <Card
            bordered
            css={{
              position: "relative",
              minWidth: "500px",
              p: 20,
              maxWidth: "500px",
              margin: "0 auto",
              minHeight: "300px",
            }}
          >
            {loadingState ? (
              <Loading
                css={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "auto",
                }}
              >
                {loadingState}
              </Loading>
            ) : (
              <>
                {" "}
                <Text
                  h1
                  size={50}
                  css={{
                    textGradient: "45deg, $blue600 -20%, $blue500 50%",
                    textAlign: "center",
                  }}
                  weight="bold"
                >
                  Enter your email
                </Text>
                <Input
                  bordered
                  css={{ my: 5, mt: 20, mb: 20 }}
                  helperText={error && email != "" ? error : ""}
                  helperColor="error"
                  status={error ? "error" : "primary"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Dropdown>
                  <Dropdown.Button flat>
                    {network ? network : "Select Network"}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Static Actions"
                    onAction={(e) => setNetwork(e)}
                  >
                    <Dropdown.Item key="Ethereum">Ethereum</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  type="submit"
                  color="primary"
                  css={{ mt: 20 }}
                  disabled={error}
                  onClick={handleSubmit}
                >
                  Continue
                </Button>
              </>
            )}
          </Card>
        </Container>
      </Row>
    </>
  );
};

export default Start;

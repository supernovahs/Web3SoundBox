import { useEffect, useState } from "react";
import { Text, Input, Row, Card, Button, Container } from "@nextui-org/react";
import Head from "next/head";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    if (!email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
      setError("Invalid email");
    }
  }, [email]);
  return (
    <>
      <Head>Login</Head>
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
              minWidth: "500x",
              p: 20,
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <Text h3 weight="bold" css={{ textAlign: "center" }}>
              Enter your email
            </Text>
            <Input
              bordered
              css={{ my: 5, mt: 20 }}
              helperText={error && email != "" ? error : ""}
              helperColor="error"
              status={error ? "error" : "primary"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              color="primary"
              css={{ mt: 20 }}
              disabled={error}
            >
              Continue
            </Button>
          </Card>
        </Container>
      </Row>
    </>
  );
};

export default Login;

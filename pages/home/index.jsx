import React from "react";
import { getWallets } from "../../lib/dfns";

function Home() {
  return <div>Home</div>;
}

export async function getStaticProps() {
  const wallets = (await getWallets()).items;

  const mainWallet = wallets[0];

  const { safeWallet } = await fetch("localhost:3000/api/dfns/safe/wallet", {
    method: "POST",
  }).then((res) => res.json());
  const props = {
    mainWallet,
    safeWallet,
  };
  return {
    props,
  };
}
export default Home;

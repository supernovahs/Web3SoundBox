// Your Etherscan API Key

async function getLatestTransactions(address, offset = 1) {
  try {
    var raw = JSON.stringify({
      id: 67,
      jsonrpc: "2.0",
      method: "qn_getWalletTokenTransactions",
      params: [
        {
          address: `address`,
          contract: "0x42451e7F68ef0d63d67dE1333aF7e6a246b275bd",
          page: 1,
          perPage: 10,
        },
      ],
    });

    var requestOptions = {
      method: "POST",
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(
      "https://docs-demo.quiknode.pro/",
      requestOptions
    );

    const transactions = await response.json();
    return transactions;
  } catch (error) {
    console.error(error);
  }
}

export default getLatestTransactions;

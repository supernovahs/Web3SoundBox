// Your Etherscan API Key
const ETHERSCAN_API_KEY = "7M8EQ5E68Q25ZH9BSZH3JMVZ1JN5IM9JP3";

async function getLatestTransactions(address, offset = 1) {
  try {
    const response = await fetch(
      `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${offset}&sort=desc&apikey=${ETHERSCAN_API_KEY}`
    );

    const transactions = await response.json();
    const txs = transactions.result.filter((transaction) => {
      return (
        transaction.to.toLowerCase() === address.toLowerCase() &&
        transaction.value !== "0"
      );
    });
    return txs;
  } catch (error) {
    console.error(error);
  }
}

export default getLatestTransactions;

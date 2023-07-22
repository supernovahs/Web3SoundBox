export const deployContracts = async () => {
  fetch("/api/contract/deploy", {
    method: "POST",
  })
    .then((result) => result.json())
    .then((result) => {
      console.log("deploy result", result);
    });
};

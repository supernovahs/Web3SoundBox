export const deployContracts = async (emit) => {
  emit("Deploying contracts...");
  await fetch("/api/contract/deploy", {
    method: "POST",
  })
    .then((result) => result.json())
    .then((result) => {
      console.log("deploy result", result);
    });
  emit("Contracts deployed!");
};

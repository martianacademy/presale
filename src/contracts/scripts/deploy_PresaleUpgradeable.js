// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const balance = await deployer.getBalance();
  const formatedBalance = ethers.utils.formatEther(balance);
  console.log("Account balance:", formatedBalance.toString(), "ETH");

  const gas = await ethers.provider.getGasPrice();
  console.log("Gas price is ", gas);

  const ContractFactory = await ethers.getContractFactory("PresaleUpgradeable");
  const Deployed = await upgrades.deployProxy(ContractFactory, {
    gasPrice: gas,
  });

  await Deployed?.deployed();

  console.log("Contract deployed to:", Deployed.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

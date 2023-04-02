import { BSCTestnet } from "@usedapp/core";
import { Contract } from "ethers";

import PresaleABI from "../contracts/artifacts/contracts/PresaleUpgradeable.sol/PresaleUpgradeable.json";

export const TokenName = "To The Mars";
export const TokenSymbol = "MARTIAN";

export const useSupportedNetworks = {
  [BSCTestnet.chainId]: {
    token: {
      contractAddress: "0x0F0EC170DEAF700CAf78aA12806A22E3c8f7621a",
      name: TokenName,
      symbol: TokenSymbol,
      decimals: 18,
    },
    native: {
      contractAddress: "",
      name: BSCTestnet?.nativeCurrency?.name,
      symbol: BSCTestnet?.nativeCurrency?.symbol,
      decimals: BSCTestnet?.nativeCurrency?.decimals,
    },
    presaleAddress: "0x9d872E132607d22B1b6b369ee41c3F780B3dBCCb",
    presaleContractInterface: new Contract(
      "0x9d872E132607d22B1b6b369ee41c3F780B3dBCCb",
      PresaleABI?.abi
    ),
    explorerLink: {
      name: "bscscan.com",
    },
    nativeFunctions: BSCTestnet,
  },
};

import { Button } from "@chakra-ui/react";
import { shortenAddress, useEthers } from "@usedapp/core";
import React from "react";

export const ConnectWalletButton = () => {
  const { account, chainId, activateBrowserWallet } = useEthers();
  return (
    <Button
      borderRadius="xl"
      colorScheme="green"
      onClick={!account ? activateBrowserWallet : () => {}}
    >
      {account ? shortenAddress(account) : "Connect Wallet"}
    </Button>
  );
};

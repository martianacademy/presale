import { Button, HStack, Spacer, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { ConnectWalletButton } from "../ConnectWalletButton/ConnectWalletButton";
import { Logo } from "../Logo";

export const Nav = () => {
  return (
    <HStack w="full" p={5} bgColor={useColorModeValue("gray.50", "gray.900")}>
      <Logo />
      <Spacer />
      <ConnectWalletButton />
      <ColorModeSwitcher />
    </HStack>
  );
};

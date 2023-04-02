import {
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Input,
  Spacer,
  Tag,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  useContractFunction,
  useEtherBalance,
  useEthers,
  useTokenBalance,
} from "@usedapp/core";
import { BigNumber } from "ethers";
import { formatEther, formatUnits, parseUnits } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
import { useSupportedNetworks } from "../../constants/SupportedNetworks";
import { usePresalePrice } from "../../hooks/PresaleHooks";
import { Logo } from "../Logo";

export const SwapUI = () => {
  const { chainId, account } = useEthers();
  const toast = useToast();
  const currentNetwork = useSupportedNetworks[chainId!];
  const userNativeBalanceInWei: BigNumber | undefined =
    useEtherBalance(account);

  const userTokenBalanceInWei: BigNumber | undefined = useTokenBalance(
    currentNetwork?.token?.contractAddress,
    account
  );

  const presalePrice = usePresalePrice();

  const [userInput, setUserInput] = useState<{
    ethInput: string;
    tokenInput: string;
  }>({
    ethInput: "",
    tokenInput: "",
  });

  const { send, state, resetState } = useContractFunction(
    currentNetwork?.presaleContractInterface,
    "buy"
  );

  const [transactionStatus, setTransactionStatus] = useState<
    "No" | "Pending Signature" | "Mining"
  >("No");

  const handleEthInput = (e: any) => {
    const value = e.target.value;
    setUserInput((prev) => ({
      ...prev,
      ethInput: value,
      tokenInput:
        value?.length === 0 ? "" : Number(value * presalePrice).toFixed(5),
    }));
  };
  const handleTokenInput = (e: any) => {
    const value = e.target.value;
    setUserInput((prev) => ({
      ...prev,
      ethInput:
        value?.length === 0 ? "" : Number(value / presalePrice).toFixed(5),
      tokenInput: value,
    }));
  };

  const handleSwap = () => {
    if (
      Number(formatEther(userNativeBalanceInWei ?? 0)) <
      Number(userInput?.ethInput)
    ) {
      toast({
        title: "Insufficient Balance.",
        description: "Please enter the amount equal or less then your balance.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (Number(userInput?.ethInput) <= 0.005) {
      toast({
        title: "Please enter valid amount.",
        description: "Please enter value more than 0.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      proceedSwap();
    }
  };
  const proceedSwap = async () => {
    await send({
      value: parseUnits(userInput?.ethInput),
    });
  };

  useEffect(() => {
    if (state.status === "Exception") {
      toast({
        title: "Error",
        description: state.errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setTransactionStatus("No");
      resetState();
    } else if (state.status === "PendingSignature") {
      setTransactionStatus("Pending Signature");
    } else if (state.status === "Mining") {
      setTransactionStatus("Mining");
    } else if (state.status === "Success") {
      toast({
        title: "Transaction Success",
        description: (
          <VStack w="full">
            <Button
              as="a"
              target="_blank"
              href={currentNetwork?.nativeFunctions?.getExplorerTransactionLink(
                state.receipt?.transactionHash!
              )}
              colorScheme="yellow"
              borderRadius="xl"
            >
              View on {currentNetwork?.explorerLink?.name}
            </Button>
          </VStack>
        ),
        status: "success",
        duration: 50000,
        isClosable: true,
      });

      setTransactionStatus("No");
    }
  }, [state.status]);

  console.log(state);

  return (
    <VStack
      w={300}
      bgColor={useColorModeValue("gray.50", "gray.900")}
      borderRadius="3xl"
      boxShadow="md"
      p={5}
      spacing={5}
    >
      <HStack>
        <Heading size="md">Swap</Heading>
        <Logo />
      </HStack>
      <Center w="full">
        <Divider />
      </Center>
      <VStack w="full">
        <HStack w="full">
          <Tag>Balance</Tag>
          <Spacer />
          <Tag colorScheme={"yellow"}>
            {Number(formatEther(userNativeBalanceInWei ?? 0)).toFixed(3)}{" "}
            {currentNetwork?.native?.symbol}
          </Tag>
        </HStack>
        <Input
          placeholder={`Please enter the ${currentNetwork?.native?.symbol} value`}
          h={16}
          borderRadius="3xl"
          value={userInput?.ethInput}
          onChange={handleEthInput}
        ></Input>
      </VStack>
      <VStack w="full">
        <HStack w="full">
          <Tag>Balance</Tag>
          <Spacer />
          <Tag colorScheme={"pink"}>
            {Number(
              formatUnits(
                userTokenBalanceInWei ?? 0,
                currentNetwork?.token?.decimals
              )
            ).toFixed(3)}{" "}
            {currentNetwork?.token?.symbol}
          </Tag>
        </HStack>
        <Input
          placeholder={`Please enter the ${currentNetwork?.token?.symbol} value`}
          h={16}
          borderRadius="3xl"
          value={userInput?.tokenInput}
          onChange={handleTokenInput}
        ></Input>
      </VStack>
      <Button
        w="full"
        h={20}
        borderRadius="3xl"
        colorScheme="green"
        onClick={handleSwap}
        isDisabled={userInput?.ethInput.length === 0}
        isLoading={
          transactionStatus === "Mining" ||
          transactionStatus === "Pending Signature"
        }
        loadingText={`${state.status}...`}
      >
        Swap
      </Button>
    </VStack>
  );
};

import { useCall, useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useSupportedNetworks } from "../constants/SupportedNetworks";

export const useCallHook = (
  functionName: string,
  arg: any[]
): BigNumber[] | undefined => {
  const { chainId } = useEthers();
  const currentNetwork = useSupportedNetworks[chainId!];

  const { value, error } =
    useCall(
      currentNetwork?.presaleAddress && {
        contract: currentNetwork?.presaleContractInterface,
        method: functionName,
        args: arg ?? [],
      }
    ) ?? {};
  if (error) {
    console.error("Presale Hook Errors", error.message);
  }

  return value;
};

export const usePresalePrice = () => {
  const value: BigNumber[] | undefined = useCallHook("getPrice", []);
  const valueFormatted = value ? Number(formatEther(value?.[0])) : 0;
  return valueFormatted;
};

import {
  ChakraProvider,
  Heading,
  theme,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Footer, Nav, SwapUI } from "./components";

export const App = () => (
  <VStack w="full" bgColor={useColorModeValue("gray.200", "gray.700")}>
    <Nav />
    <VStack w="full" minH={"100vh"} pt={20}>
      <SwapUI />
    </VStack>
    <Footer />
  </VStack>
);

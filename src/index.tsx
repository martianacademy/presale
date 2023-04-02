import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import { BSCTestnet, Config, DAppProvider } from "@usedapp/core";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

const dappConfig: Config = {
  readOnlyUrls: {
    [BSCTestnet.chainId]: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
};

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <DAppProvider config={dappConfig}>
        <App />
      </DAppProvider>
    </ChakraProvider>
  </React.StrictMode>
);

serviceWorker.unregister();

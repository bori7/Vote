// import { createContext } from 'react';
// import externalContracts from "./contracts/external_contracts";
// import deployedContracts from "./contracts/hardhat_contracts.json";
// import "./App.css";
// import Home from "./pages/Home";
// import { ThemeProvider } from "./components/ThemeContext";
// import Background from "./components/Background";
// import Toggle from "./components/ThemeToggle";
// import Sidebars from "./components/Sidebars";
// import Stakeholders from "./pages/Stakeholders";
// import Election from "./components/Election";
// import LandingPage from "./pages/LandingPage";

// import Portis from "@portis/web3";
// import WalletConnectProvider from "@walletconnect/web3-provider";

// import "antd/dist/antd.css";
// import Authereum from "authereum";
// import {
//   useBalance,
//   useContractLoader,
//   useContractReader,
//   useGasPrice,
//   useOnBlock,
//   useUserProviderAndSigner,
// } from "eth-hooks";
// import { useExchangeEthPrice } from "eth-hooks/dapps/dex";
// import { useEventListener } from "eth-hooks/events/useEventListener";
// import Fortmatic from "fortmatic";
// import React, { useCallback, useEffect, useState } from "react";
// import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
// //import Torus from "@toruslabs/torus-embed"
// import WalletLink from "walletlink";
// import Web3Modal from "web3modal";
// import {
//   Account,
//   Address,
//   AddressInput,
//   Balance,
//   Contract,
//   Faucet,
//   GasGauge,
//   Header,
//   Ramp,
//   ThemeSwitch,
//   UploadFile,
// } from "./components";
// import { INFURA_ID, NETWORK, NETWORKS } from "./constants";
// import { Transactor } from "./helpers";

// const { ethers } = require("ethers");

// export const EthContext = createContext({});

// export const EthContextProvider = props => {

// const { ethers } = require("ethers");

// /// 📡 What chain are your contracts deployed to?
// const targetNetwork = NETWORKS.rinkeby; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

// // 😬 Sorry for all the console logging
// const DEBUG = true;
// const NETWORKCHECK = true;

// // 🛰 providers
// if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");
// // const mainnetProvider = getDefaultProvider("mainnet", { infura: INFURA_ID, etherscan: ETHERSCAN_KEY, quorum: 1 });
// // const mainnetProvider = new InfuraProvider("mainnet",INFURA_ID);
// //
// // attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
// // Using StaticJsonRpcProvider as the chainId won't change see https://github.com/ethers-io/ethers.js/issues/901
// const scaffoldEthProvider = navigator.onLine
//   ? new ethers.providers.StaticJsonRpcProvider("https://rpc.scaffoldeth.io:48544")
//   : null;
// const poktMainnetProvider = navigator.onLine
//   ? new ethers.providers.StaticJsonRpcProvider(
//       "https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406",
//     )
//   : null;
// const mainnetInfura = navigator.onLine
//   ? new ethers.providers.StaticJsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID)
//   : null;
// // ( ⚠️ Getting "failed to meet quorum" errors? Check your INFURA_ID

// // 🏠 Your local provider is usually pointed at your local blockchain
// const localProviderUrl = targetNetwork.rpcUrl;
// // as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
// const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
// if (DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
// const localProvider = new ethers.providers.StaticJsonRpcProvider(localProviderUrlFromEnv);

// // 🔭 block explorer URL
// const blockExplorer = targetNetwork.blockExplorer;

// // Coinbase walletLink init
// const walletLink = new WalletLink({
//   appName: "coinbase",
// });

// // WalletLink provider
// const walletLinkProvider = walletLink.makeWeb3Provider(`https://mainnet.infura.io/v3/${INFURA_ID}`, 1);

// // Portis ID: 6255fb2b-58c8-433b-a2c9-62098c05ddc9
// /*
//   Web3 modal helps us "connect" external wallets:
// */

//     const allProps = {

//     }

//    return (
//      <EthContext.Provider value={}>
//        {props.children}
//      </EthContext.Provider>
//    );
//  };

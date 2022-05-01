import externalContracts from "./contracts/external_contracts";
import deployedContracts from "./contracts/hardhat_contracts.json";
import "./App.css";
import Home from "./pages/Home";
import { ThemeProvider } from "./components/ThemeContext";
import Background from "./components/Background";
import Toggle from "./components/ThemeToggle";
import Sidebars from "./components/Sidebars";
import Stakeholders from "./pages/Stakeholders";
import Election from "./components/Election";
import LandingPage from "./pages/LandingPage";

import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

import "antd/dist/antd.css";
import Authereum from "authereum";
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useGasPrice,
  useOnBlock,
  useUserProviderAndSigner,
} from "eth-hooks";
import { useExchangeEthPrice } from "eth-hooks/dapps/dex";
import { useEventListener } from "eth-hooks/events/useEventListener";
import Fortmatic from "fortmatic";
import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
//import Torus from "@toruslabs/torus-embed"
import WalletLink from "walletlink";
import Web3Modal from "web3modal";
import {
  Account,
  Address,
  AddressInput,
  Balance,
  Contract,
  Faucet,
  GasGauge,
  Header,
  Ramp,
  ThemeSwitch,
  UploadFile,
} from "./components";
import { INFURA_ID, NETWORK, NETWORKS } from "./constants";
import { Transactor } from "./helpers";

// import bg from "./assets/nestcoin.jpeg";

// contracts

// const { Panel } = Collapse;

const { ethers } = require("ethers");

/// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS.rinkeby; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

// 😬 Sorry for all the console logging
const DEBUG = true;
const NETWORKCHECK = true;

// 🛰 providers
if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");
// const mainnetProvider = getDefaultProvider("mainnet", { infura: INFURA_ID, etherscan: ETHERSCAN_KEY, quorum: 1 });
// const mainnetProvider = new InfuraProvider("mainnet",INFURA_ID);
//
// attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
// Using StaticJsonRpcProvider as the chainId won't change see https://github.com/ethers-io/ethers.js/issues/901
const scaffoldEthProvider = navigator.onLine
  ? new ethers.providers.StaticJsonRpcProvider("https://rpc.scaffoldeth.io:48544")
  : null;
const poktMainnetProvider = navigator.onLine
  ? new ethers.providers.StaticJsonRpcProvider(
      "https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406",
    )
  : null;
const mainnetInfura = navigator.onLine
  ? new ethers.providers.StaticJsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID)
  : null;
// ( ⚠️ Getting "failed to meet quorum" errors? Check your INFURA_ID

// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl;
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
if (DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
const localProvider = new ethers.providers.StaticJsonRpcProvider(localProviderUrlFromEnv);

// 🔭 block explorer URL
const blockExplorer = targetNetwork.blockExplorer;

// Coinbase walletLink init
const walletLink = new WalletLink({
  appName: "coinbase",
});

// WalletLink provider
const walletLinkProvider = walletLink.makeWeb3Provider(`https://mainnet.infura.io/v3/${INFURA_ID}`, 1);

// Portis ID: 6255fb2b-58c8-433b-a2c9-62098c05ddc9
/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  network: "mainnet", // Optional. If using WalletConnect on xDai, change network to "xdai" and add RPC info below for xDai chain.
  cacheProvider: true, // optional
  theme: "light", // optional. Change to "dark" for a dark theme.
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        bridge: "https://polygon.bridge.walletconnect.org",
        infuraId: INFURA_ID,
        rpc: {
          1: `https://mainnet.infura.io/v3/${INFURA_ID}`, // mainnet // For more WalletConnect providers: https://docs.walletconnect.org/quick-start/dapps/web3-provider#required
          42: `https://kovan.infura.io/v3/${INFURA_ID}`,
          100: "https://dai.poa.network", // xDai
        },
      },
    },
    portis: {
      display: {
        logo: "https://user-images.githubusercontent.com/9419140/128913641-d025bc0c-e059-42de-a57b-422f196867ce.png",
        name: "Portis",
        description: "Connect to Portis App",
      },
      package: Portis,
      options: {
        id: "6255fb2b-58c8-433b-a2c9-62098c05ddc9",
      },
    },
    fortmatic: {
      package: Fortmatic, // required
      options: {
        key: "pk_live_5A7C91B2FC585A17", // required
      },
    },
    // torus: {
    //   package: Torus,
    //   options: {
    //     networkParams: {
    //       host: "https://localhost:8545", // optional
    //       chainId: 1337, // optional
    //       networkId: 1337 // optional
    //     },
    //     config: {
    //       buildEnv: "development" // optional
    //     },
    //   },
    // },
    "custom-walletlink": {
      display: {
        logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
        name: "Coinbase",
        description: "Connect to Coinbase Wallet (not Coinbase App)",
      },
      package: walletLinkProvider,
      connector: async (provider, _options) => {
        await provider.enable();
        return provider;
      },
    },
    authereum: {
      package: Authereum, // required
    },
  },
});

function App(props) {
  const mainnetProvider =
    poktMainnetProvider && poktMainnetProvider._isProvider
      ? poktMainnetProvider
      : scaffoldEthProvider && scaffoldEthProvider._network
      ? scaffoldEthProvider
      : mainnetInfura;

  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect == "function") {
      await injectedProvider.provider.disconnect();
    }
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };

  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangeEthPrice(targetNetwork, mainnetProvider);

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "fast");
  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProviderAndSigner = useUserProviderAndSigner(injectedProvider, localProvider);
  const userSigner = userProviderAndSigner.signer;

  useEffect(() => {
    async function getAddress() {
      if (userSigner) {
        const newAddress = await userSigner.getAddress();
        setAddress(newAddress);
      }
    }
    getAddress();
  }, [userSigner]);

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  const selectedChainId =
    userSigner && userSigner.provider && userSigner.provider._network && userSigner.provider._network.chainId;

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userSigner, gasPrice);

  // Faucet Tx can be used to send funds from the faucet
  // const faucetTx = Transactor(localProvider, gasPrice);

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const yourLocalBalance = useBalance(localProvider, address);

  // Just plug in different 🛰 providers to get your balance on different chains:
  const yourMainnetBalance = useBalance(mainnetProvider, address);

  const contractConfig = { deployedContracts: deployedContracts || {}, externalContracts: externalContracts || {} };

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider, contractConfig);

  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const writeContracts = useContractLoader(userSigner, contractConfig, localChainId);

  // EXTERNAL CONTRACT EXAMPLE:
  //
  // If you want to bring in the mainnet DAI contract it would look like:
  const mainnetContracts = useContractLoader(mainnetProvider, contractConfig);

  // If you want to call a function on a new block
  useOnBlock(mainnetProvider, () => {
    // console.log(`⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`);
  });

  // Then read your DAI balance like:
  const myMainnetDAIBalance = useContractReader(mainnetContracts, "DAI", "balanceOf", [
    "0x34aA3F359A9D614239015126635CE7732c18fDF3",
  ]);

  // const vendorAddress = readContracts && readContracts.Vendor && readContracts.Vendor.address;

  // const vendorETHBalance = useBalance(localProvider, vendorAddress);
  // if (DEBUG)
  // console.log("💵 vendorETHBalance", vendorETHBalance ? ethers.utils.formatEther(vendorETHBalance) : "...");

  // const vendorApproval = useContractReader(readContracts, "YourToken", "allowance", [
  //   address, vendorAddress
  // ]);
  // console.log("🤏 vendorApproval", vendorApproval)

  // const vendorTokenBalance = useContractReader(readContracts, "YourToken", "balanceOf", [vendorAddress]);
  // console.log("🏵 vendorTokenBalance:", vendorTokenBalance ? ethers.utils.formatEther(vendorTokenBalance) : "...");

  const voteCoinBalance = useContractReader(readContracts, "NestVotingToken", "balanceOf", [address]);
  // console.log("🏵 voteCoinBalance:", voteCoinBalance ? ethers.utils.formatEther(voteCoinBalance) : "...");

  const bankCoinBalance = useContractReader(readContracts, "NestVotingToken", "balanceOf", [
    "0xe3983c5E79E5ad5FEBB18030A2959a978c095C6D",
  ]);
  // console.log("🏵 bankCoinBalance:", bankCoinBalance ? ethers.utils.formatEther(bankCoinBalance) : "...");

  // var nestTokenBalance = useContractReader(readContracts, "NestToken", "balanceOf", [address]);
  var teachers = useContractReader(writeContracts, "NestVotingToken", "showTeachers");
  // console.log("🏵 nestTokenteachers:", teachers ? teachers : "...");

  var students = useContractReader(writeContracts, "NestVotingToken", "showStudents");
  // console.log("🏵 nestTokenstudents:", students ? students : "...");

  var boards = useContractReader(writeContracts, "NestVotingToken", "showBoards");
  // console.log("🏵 nestTokenboards:", boards ? boards : "...");

  // var boards = useContractReader(writeContracts, "NestVotingToken", "showBoards");
  // console.log("🏵 nestTokenboards:", boards ? boards : "...");

  var pollsNum = useContractReader(writeContracts, "NestVotingToken", "showPolls");
  // console.log("🏵 nestTokenBalance:", pollsNum, "...");

  useEffect(() => {
    if (
      DEBUG &&
      mainnetProvider &&
      address &&
      selectedChainId &&
      yourLocalBalance &&
      yourMainnetBalance &&
      readContracts &&
      writeContracts &&
      mainnetContracts
    ) {
      console.log("_____________________________________ 🏗 scaffold-eth _____________________________________");
      console.log("🌎 mainnetProvider", mainnetProvider);
      // console.log("🏠 localChainId", localChainId);
      // console.log("👩‍💼 selected address:", address);
      // console.log("🕵🏻‍♂️ selectedChainId:", selectedChainId);
      // console.log("💵 yourLocalBalance", yourLocalBalance ? ethers.utils.formatEther(yourLocalBalance) : "...");
      // console.log("💵 yourMainnetBalance", yourMainnetBalance ? ethers.utils.formatEther(yourMainnetBalance) : "...");
      // console.log("📝 readContracts", readContracts);
      // console.log("🌍 DAI contract on mainnet:", mainnetContracts);
      // console.log("💵 yourMainnetDAIBalance", myMainnetDAIBalance);
      // console.log("🔐 writeContracts", writeContracts);
    }
  }, [
    mainnetProvider,
    address,
    selectedChainId,
    yourLocalBalance,
    yourMainnetBalance,
    readContracts,
    writeContracts,
    mainnetContracts,
  ]);

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new ethers.providers.Web3Provider(provider));

    provider.on("chainChanged", chainId => {
      // console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    provider.on("accountsChanged", () => {
      // console.log(`account changed!`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      // console.log(code, reason);
      logoutOfWeb3Modal();
    });
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  const [route, setRoute] = useState();
  useEffect(() => {
    setRoute(window.location.pathname);
  }, [setRoute]);

  useEffect(() => {}, [readContracts]);

  // const [tokenSendToAddress, setTokenSendToAddress] = useState();
  // const [tokenSendAmount, setTokenSendAmount] = useState();

  // const [buying, setBuying] = useState();

  const [pollId, setPollId] = useState(0);

  const [voteFor, setVoteFor] = useState();

  const pollcurr = useContractReader(writeContracts, "NestVotingToken", "showPoll", [pollId]);
  // console.log("🏦 tokensPerEth:", pollcurr);

  var totvotes = useContractReader(writeContracts, "NestVotingToken", "showVote", [pollId]);
  // console.log("🏵 totvotes:", totvotes ? totvotes.toNumber() : "...");

  var results = useContractReader(readContracts, "NestVotingToken", "displayResults", [pollId]);
  // console.log("🏵 nestVotingResults:", results ? results : "...");

  useEffect(() => {}, [pollId, pollcurr]);
  return (
    // className="App"
    // style={{ backgroundImage: `url(${bg})` }}

    <BrowserRouter>
      <ThemeProvider>
        <Background>
          <div className="fixed md:left-10  bottom-0 mr-14 mt-7 md:mr-2 md:mt-6 z-50">
            <Toggle />
          </div>
          <div>
            <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
              <div className="fixed w-full flex items-center justify-between h-14 text-white z-10">
                <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-blue-800 dark:bg-gray-800 border-none">
                  {/* <img
                    className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden"
                    src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
                  />
                  <span className="hidden md:block">ADMIN</span> */}{" "}
                  {address ? (
                    <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />
                  ) : (
                    "Connecting..."
                  )}
                </div>
                <div className="flex justify-between items-center h-14 bg-transparent header-right">
                  <div>
                    <a href="#" className="flex items-center text-blue-700 dark:text-white   mr-4 hover:text-blue-100">
                      <span className="inline-flex mr-1">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          ></path>
                        </svg>
                      </span>
                      <Account
                        address={address}
                        localProvider={localProvider}
                        userSigner={userSigner}
                        mainnetProvider={mainnetProvider}
                        price={price}
                        web3Modal={web3Modal}
                        loadWeb3Modal={loadWeb3Modal}
                        logoutOfWeb3Modal={logoutOfWeb3Modal}
                        blockExplorer={blockExplorer}
                        networkDisplay={
                          <div
                            style={{
                              // zIndex: -1,
                              position: "absolute",
                              right: 15,
                              // top: 28,
                              // padding: 5,
                              color: targetNetwork.color,
                              // border: "1px solid red",
                            }}
                          >
                            {targetNetwork?.name}
                          </div>
                        }
                      />
                      {/* Logout */}
                    </a>
                  </div>
                </div>
              </div>

              <Sidebars />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      noTeachers={teachers}
                      noStudents={students}
                      noBoards={boards}
                      noPolls={pollsNum}
                      voteCoinBalance={voteCoinBalance ? ethers.utils.formatEther(voteCoinBalance) : 0}
                      bankCoinBalance={bankCoinBalance ? ethers.utils.formatEther(bankCoinBalance) : 0}
                    />
                  }
                />
                <Route
                  path="/stakeholders"
                  element={
                    <Stakeholders
                      tx={tx}
                      writeContracts={writeContracts}
                      noTeachers={teachers}
                      noStudents={students}
                      noBoards={boards}
                      mainnetProvider={mainnetProvider}
                      blockExplorer={blockExplorer}
                    />
                  }
                />
                <Route
                  path="elections"
                  element={
                    <Election
                      noPolls={pollsNum}
                      pollcurr={pollcurr}
                      totvotes={totvotes}
                      tx={tx}
                      writeContracts={writeContracts}
                      pollId={pollId}
                      setPollId={setPollId}
                      results={results}
                    />
                  }
                />
              </Routes>
            </div>
            <footer className="dark:bg-slate-900 flex py-2 justify-center align-middle border-t">
              <a
                href="https://blockgames.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-grow justify-center align-middle self-center text-sm dark:text-gray-200 text-gray-500"
              >
                Powered by{" "}
                <h1 className="text-gray-500 dark:text-gray-200 ml-2 font-bold text-sm self-center">Blockgames</h1>
              </a>
            </footer>
          </div>
        </Background>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Input,
  List,
  Menu,
  Row,
  Collapse,
  Radio,
  Space,
  Form,
  Checkbox,
} from "antd";
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
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
//import Torus from "@toruslabs/torus-embed"
import WalletLink from "walletlink";
import Web3Modal from "web3modal";
import "./App.css";
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

import bg from "./assets/nestcoin.jpeg";

// contracts
import externalContracts from "./contracts/external_contracts";
import deployedContracts from "./contracts/hardhat_contracts.json";

const { Panel } = Collapse;

const { ethers } = require("ethers");
/*
    Welcome to 🏗 scaffold-eth !

    Code:
    https://github.com/austintgriffith/scaffold-eth

    Support:
    https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA
    or DM @austingriffith on twitter or telegram

    You should get your own Infura.io ID and put it in `constants.js`
    (this is your connection to the main Ethereum network for ENS etc.)


    🌏 EXTERNAL CONTRACTS:
    You can also bring in contract artifacts in `constants.js`
    (and then use the `useExternalContractLoader()` hook!)
*/

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
  const faucetTx = Transactor(localProvider, gasPrice);

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
    console.log(`⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`);
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

  // const yourTokenBalance = useContractReader(readContracts, "YourToken", "balanceOf", [address]);
  // console.log("🏵 yourTokenBalance:", yourTokenBalance ? ethers.utils.formatEther(yourTokenBalance) : "...");

  // var nestTokenBalance = useContractReader(readContracts, "NestToken", "balanceOf", [address]);
  var teachers = useContractReader(writeContracts, "NestVotingToken", "showTeachers");
  console.log("🏵 nestTokenteachers:", teachers ? teachers : "...");

  var students = useContractReader(writeContracts, "NestVotingToken", "showStudents");
  console.log("🏵 nestTokenstudents:", students ? students : "...");

  var boards = useContractReader(writeContracts, "NestVotingToken", "showBoards");
  console.log("🏵 nestTokenboards:", boards ? boards : "...");

  var boards = useContractReader(writeContracts, "NestVotingToken", "showBoards");
  console.log("🏵 nestTokenboards:", boards ? boards : "...");

  var pollsNum = useContractReader(writeContracts, "NestVotingToken", "showPolls");
  console.log("🏵 nestTokenBalance:", pollsNum, "...");

  // const pollcurr = useContractReader(writeContracts, "NestVotingToken", "showPoll", [pollId]);
  // console.log("🏦 tokensPerEth:", pollcurr);

  // const complete = useContractReader(readContracts,"ExampleExternalContract", "completed")
  // console.log("✅ complete:",complete)
  //
  // const exampleExternalContractBalance = useBalance(localProvider, readContracts && readContracts.ExampleExternalContract.address);
  // if(DEBUG) console.log("💵 exampleExternalContractBalance", exampleExternalContractBalance )

  // let completeDisplay = ""
  // if(false){
  //   completeDisplay = (
  //     <div style={{padding:64, backgroundColor:"#eeffef", fontWeight:"bolder"}}>
  //       🚀 🎖 👩‍🚀  -  Staking App triggered `ExampleExternalContract` -- 🎉  🍾   🎊
  //       <Balance
  //         balance={0}
  //         fontSize={64}
  //       /> ETH staked!
  //     </div>
  //   )
  // }

  /*
  const addressFromENS = useResolveName(mainnetProvider, "austingriffith.eth");
  console.log("🏷 Resolved austingriffith.eth as:",addressFromENS)
  */

  //
  // 🧫 DEBUG 👨🏻‍🔬
  //
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
      console.log("🏠 localChainId", localChainId);
      console.log("👩‍💼 selected address:", address);
      console.log("🕵🏻‍♂️ selectedChainId:", selectedChainId);
      console.log("💵 yourLocalBalance", yourLocalBalance ? ethers.utils.formatEther(yourLocalBalance) : "...");
      console.log("💵 yourMainnetBalance", yourMainnetBalance ? ethers.utils.formatEther(yourMainnetBalance) : "...");
      console.log("📝 readContracts", readContracts);
      console.log("🌍 DAI contract on mainnet:", mainnetContracts);
      console.log("💵 yourMainnetDAIBalance", myMainnetDAIBalance);
      console.log("🔐 writeContracts", writeContracts);
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

  let networkDisplay = "";
  if (NETWORKCHECK && localChainId && selectedChainId && localChainId !== selectedChainId) {
    const networkSelected = NETWORK(selectedChainId);
    const networkLocal = NETWORK(localChainId);
    if (selectedChainId === 1337 && localChainId === 31337) {
      networkDisplay = (
        <div style={{ zIndex: 2, position: "absolute", right: 0, top: 60, padding: 16 }}>
          <Alert
            message="⚠️ Wrong Network ID"
            description={
              <div>
                You have <b>chain id 1337</b> for localhost and you need to change it to <b>31337</b> to work with
                HardHat.
                <div>(MetaMask -&gt; Settings -&gt; Networks -&gt; Chain ID -&gt; 31337)</div>
              </div>
            }
            type="error"
            closable={false}
          />
        </div>
      );
    } else {
      networkDisplay = (
        <div style={{ zIndex: 2, position: "absolute", right: 0, top: 60, padding: 16 }}>
          <Alert
            message="⚠️ Wrong Network"
            description={
              <div>
                You have <b>{networkSelected && networkSelected.name}</b> selected and you need to be on{" "}
                <Button
                  onClick={async () => {
                    const ethereum = window.ethereum;
                    const data = [
                      {
                        chainId: "0x" + targetNetwork.chainId.toString(16),
                        chainName: targetNetwork.name,
                        nativeCurrency: targetNetwork.nativeCurrency,
                        rpcUrls: [targetNetwork.rpcUrl],
                        blockExplorerUrls: [targetNetwork.blockExplorer],
                      },
                    ];
                    console.log("data", data);

                    let switchTx;
                    // https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
                    try {
                      switchTx = await ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: data[0].chainId }],
                      });
                    } catch (switchError) {
                      // not checking specific error code, because maybe we're not using MetaMask
                      try {
                        switchTx = await ethereum.request({
                          method: "wallet_addEthereumChain",
                          params: data,
                        });
                      } catch (addError) {
                        // handle "add" error
                      }
                    }

                    if (switchTx) {
                      console.log(switchTx);
                    }
                  }}
                >
                  <b>{networkLocal && networkLocal.name}</b>
                </Button>
              </div>
            }
            type="error"
            closable={false}
          />
        </div>
      );
    }
  } else {
    networkDisplay = (
      <div style={{ zIndex: -1, position: "absolute", right: 154, top: 28, padding: 16, color: targetNetwork.color }}>
        {targetNetwork.name}
      </div>
    );
  }

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new ethers.providers.Web3Provider(provider));

    provider.on("chainChanged", chainId => {
      console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    provider.on("accountsChanged", () => {
      console.log(`account changed!`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
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

  let faucetHint = "";
  // const faucetAvailable = localProvider && localProvider.connection && targetNetwork.name.indexOf("local") !== -1;

  const [faucetClicked, setFaucetClicked] = useState(false);
  if (
    !faucetClicked &&
    localProvider &&
    localProvider._network &&
    localProvider._network.chainId === 31337 &&
    yourLocalBalance &&
    ethers.utils.formatEther(yourLocalBalance) <= 0
  ) {
    faucetHint = (
      <div style={{ padding: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            faucetTx({
              to: address,
              value: ethers.utils.parseEther("1"),
            });
            setFaucetClicked(true);
          }}
        >
          💰 Grab funds from the faucet ⛽️
        </Button>
      </div>
    );
  }

  // const buyTokensEvents = useEventListener(readContracts, "Vendor", "BuyTokens", localProvider, 1);

  const nestTokensSingleRewardEvents = useEventListener(readContracts, "NestToken", "SingleReward", localProvider, 1);
  const nestTokensBatchRewardsEvents = useEventListener(readContracts, "NestToken", "BatchRewards", localProvider, 1);
  const nestTokenssingleAmountEvents = useEventListener(readContracts, "NestToken", "singleAmount", localProvider, 1);

  useEffect(() => {}, [readContracts]);

  const [tokenSendToAddress, setTokenSendToAddress] = useState();
  const [tokenSendAmount, setTokenSendAmount] = useState();

  const [buying, setBuying] = useState();

  const [name, setName] = useState("");
  const [pollId, setPollId] = useState(1);
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState("");

  const [voteFor, setVoteFor] = useState();

  const [batchUpload, setBatchUpload] = useState(false);
  const [batchData, setBatchData] = useState();

  const [sameBatchUpload, setSameBatchUpload] = useState(false);
  const [sameBatchData, setSameBatchData] = useState();
  const [sameBuying, setSameBuying] = useState();
  const [sameTokenSendAmount, setSameTokenSendAmount] = useState();

  const pollcurr = useContractReader(writeContracts, "NestVotingToken", "showPoll", [pollId]);
  console.log("🏦 tokensPerEth:", pollcurr);

  var totvotes = useContractReader(writeContracts, "NestVotingToken", "showVote", [pollId]);
  console.log("🏵 nestTokenBalance:", totvotes, "...");

  let transferDisplay = "";
  transferDisplay = (
    <div style={{ padding: 8, marginTop: 32, width: 420, margin: "auto" }}>
      <Card
        title="Single Reward Transfer"
        headStyle={{
          borderRadius: 5,
          background:
            "linear-gradient(-90deg, rgba(162,34,195,0.5760898109243697) 7%, rgba(45,205,253,0.5312718837535014) 88%)",
        }}
        bodyStyle={{
          borderRadius: 10,
          background:
            "linear-gradient(90deg, rgba(140,34,195,0.5760898109243697) 7%, rgba(45,159,253,0.5312718837535014) 88%)",
        }}
      >
        <div>
          <div style={{ padding: 8 }}>
            <AddressInput
              ensProvider={mainnetProvider}
              placeholder="to address"
              value={tokenSendToAddress}
              onChange={setTokenSendToAddress}
            />
          </div>
          <div style={{ padding: 8 }}>
            <Input
              style={{ textAlign: "center" }}
              placeholder={"amount of tokens to send"}
              value={tokenSendAmount}
              onChange={e => {
                setTokenSendAmount(e.target.value);
              }}
            />
          </div>
        </div>
        <div style={{ padding: 8 }}>
          <Button
            type={"primary"}
            disabled={!(tokenSendToAddress && tokenSendAmount)}
            onClick={() => {
              tx(
                writeContracts.NestToken.SingleRewardMint(
                  tokenSendToAddress,

                  ethers.utils.parseEther("" + tokenSendAmount),
                ),
              );
            }}
          >
            Send Tokens
          </Button>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <Header />
      {networkDisplay}
      <BrowserRouter>
        <Menu
          style={{
            textAlign: "center",
            borderRadius: 5,
            background:
              "linear-gradient(45deg, rgba(0,0,36,0.19233630952380953) 0%, rgba(9,118,121,0.8590029761904762) 17%, rgba(237,0,255,0.35760241596638653) 100%)",
          }}
          selectedKeys={[]}
          mode="horizontal"
        >
          <Menu.Item key="/">
            <Link
              onClick={() => {
                setRoute("/");
              }}
              to="/"
            >
              Add Teachers
            </Link>
          </Menu.Item>
          <Menu.Item key="/batch_diff">
            <Link
              onClick={() => {
                setRoute("/contracts");
              }}
              to="/batch_diff"
            >
              Add Students
            </Link>
          </Menu.Item>
          <Menu.Item key="/batch_same">
            <Link
              onClick={() => {
                setRoute("/contracts");
              }}
              to="/batch_same"
            >
              Add Board Members
            </Link>
          </Menu.Item>
          <Menu.Item key="/voting">
            <Link
              onClick={() => {
                setRoute("/voting");
              }}
              to="/voting"
            >
              Voting Page
            </Link>
          </Menu.Item>
          <Menu.Item key="/contracts">
            <Link
              onClick={() => {
                setRoute("/contracts");
              }}
              to="/contracts"
            >
              Admin Control
            </Link>
          </Menu.Item>
        </Menu>

        <Switch>
          <Route exact path="/">
            <div
              style={{
                padding: 8,
                marginTop: 32,
                width: 300,
                margin: "auto",
              }}
            >
              <Card
                title="Total number of Teachers"
                // extra={<a href="#">code</a>}
                headStyle={{
                  borderRadius: 5,
                  background:
                    "linear-gradient(40deg, rgba(1,36,0,0.4360337885154062) 0%, rgba(100,9,121,0.6825323879551821) 17%, rgba(139,0,255,0.7049413515406162) 78%)",
                }}
                bodyStyle={{
                  borderRadius: 10,
                  background:
                    "linear-gradient(-50deg, rgba(77,63,251,0.7301514355742297) 0%, rgba(215,70,252,0.6685267857142857) 100%)",
                }}
              >
                <div style={{ padding: 8 }}>
                  {/* <Balance balance={yourTokenBalance} fontSize={64} /> */}
                  {/* <Balance balance={nestTokenBalance} fontSize={64} />
                   */}
                  {teachers?.length}
                </div>
              </Card>
            </div>
            <div style={{ padding: 8, marginTop: 32, width: 500, margin: "auto" }}>
              <Card
                title="Add Teachers"
                headStyle={{
                  borderRadius: 5,
                  background:
                    "linear-gradient(90deg, rgba(63,141,251,0.7469581582633054) 0%, rgba(252,70,210,0.6797312675070029) 100%)",
                }}
                bodyStyle={{
                  borderRadius: 10,
                  background:
                    "linear-gradient(-50deg, rgba(63,141,251,0.7301514355742297) 0%, rgba(252,70,210,0.6685267857142857) 100%)",
                }}
              >
                {/* <div style={{ padding: 8 }}>{tokensPerEth && tokensPerEth.toNumber()} tokens per ETH</div> */}
                <div style={{ padding: 8 }}>
                  <UploadFile setBatchUpload={setSameBatchUpload} setBatchData={setSameBatchData} />
                </div>

                <div style={{ padding: 8 }}>
                  <Button
                    type={"primary"}
                    loading={sameBuying}
                    onClick={async () => {
                      // console.log(sameBatchData)
                      setSameBuying(true);
                      try {
                        await tx(writeContracts.NestVotingToken.addTeachers(sameBatchData.accounts));
                        //  console.log(batchData.amounts)
                      } catch (error) {
                        console.error(error);
                      } finally {
                        setSameBuying(false);
                      }
                    }}
                    disabled={!sameBatchUpload}
                  >
                    Add Teachers
                  </Button>
                </div>
              </Card>
            </div>
            <Divider />
          </Route>
          <Route exact path="/batch_diff">
            <div
              style={{
                padding: 8,
                marginTop: 32,
                width: 300,
                margin: "auto",
              }}
            >
              <Card
                title="Total Number of Students"
                // extra={<a href="#">code</a>}
                headStyle={{
                  borderRadius: 5,
                  background:
                    "linear-gradient(40deg, rgba(1,36,0,0.4360337885154062) 0%, rgba(100,9,121,0.6825323879551821) 17%, rgba(139,0,255,0.7049413515406162) 78%)",
                }}
                bodyStyle={{
                  borderRadius: 10,
                  background:
                    "linear-gradient(-50deg, rgba(77,63,251,0.7301514355742297) 0%, rgba(215,70,252,0.6685267857142857) 100%)",
                }}
              >
                <div style={{ padding: 8 }}>
                  {/* <Balance balance={yourTokenBalance} fontSize={64} /> */}
                  {students?.length}
                </div>
              </Card>
            </div>
            <Divider />

            <div
              style={{
                padding: 8,
                marginTop: 32,
                width: 500,
                margin: "auto",
              }}
            >
              <Card
                title="Add Students
                 "
                headStyle={{
                  borderRadius: 5,
                  background:
                    "linear-gradient(90deg, rgba(162,34,195,0.5760898109243697) 7%, rgba(45,205,253,0.5312718837535014) 88%)",
                }}
                bodyStyle={{
                  borderRadius: 10,
                  background:
                    "linear-gradient(-45deg, rgba(140,34,195,0.5760898109243697) 7%, rgba(45,159,253,0.5312718837535014) 88%)",
                }}
              >
                {/* <div style={{ padding: 8 }}>{tokensPerEth && tokensPerEth.toNumber()} tokens per ETH</div> */}
                <div style={{ padding: 8 }}>
                  <UploadFile setBatchUpload={setBatchUpload} setBatchData={setBatchData} />
                </div>

                <div style={{ padding: 8 }}>
                  <Button
                    type={"primary"}
                    loading={buying}
                    onClick={async () => {
                      // console.log(batchData)
                      setBuying(true);
                      try {
                        await tx(writeContracts.NestVotingToken.addStudents(batchData.accounts));
                        //  console.log(batchData.amounts)
                      } catch (error) {
                        console.error(error);
                      } finally {
                        setBuying(false);
                      }
                    }}
                    disabled={!batchUpload}
                  >
                    Add Students
                  </Button>
                </div>
              </Card>
            </div>

            {/* <div style={{ padding: 8, marginTop: 32 }}>
              <div>Nest Token Balance:</div>
              <Balance balance={nestTokenBalance} fontSize={64} />
            </div> */}
          </Route>
          <Route exact path="/batch_same">
            <div
              style={{
                padding: 8,
                marginTop: 32,
                width: 300,
                margin: "auto",
              }}
            >
              <Card
                title="Number Of Board Members"
                // extra={<a href="#">code</a>}
                headStyle={{
                  borderRadius: 5,
                  background:
                    "linear-gradient(40deg, rgba(1,36,0,0.4360337885154062) 0%, rgba(100,9,121,0.6825323879551821) 17%, rgba(139,0,255,0.7049413515406162) 78%)",
                }}
                bodyStyle={{
                  borderRadius: 10,
                  background:
                    "linear-gradient(-50deg, rgba(77,63,251,0.7301514355742297) 0%, rgba(215,70,252,0.6685267857142857) 100%)",
                }}
              >
                <div style={{ padding: 8 }}>
                  {/* <Balance balance={yourTokenBalance} fontSize={64} /> */}
                  {/* <Balance balance={nestTokenBalance} fontSize={64} /> */}
                  {boards?.length}
                </div>
              </Card>
            </div>
            <Divider />

            <div style={{ padding: 8, marginTop: 32, width: 500, margin: "auto" }}>
              <Card
                title="Add Board Members"
                headStyle={{
                  borderRadius: 5,
                  background:
                    "linear-gradient(90deg, rgba(63,141,251,0.7469581582633054) 0%, rgba(252,70,210,0.6797312675070029) 100%)",
                }}
                bodyStyle={{
                  borderRadius: 10,
                  background:
                    "linear-gradient(-50deg, rgba(63,141,251,0.7301514355742297) 0%, rgba(252,70,210,0.6685267857142857) 100%)",
                }}
              >
                {/* <div style={{ padding: 8 }}>{tokensPerEth && tokensPerEth.toNumber()} tokens per ETH</div> */}
                <div style={{ padding: 8 }}>
                  <UploadFile setBatchUpload={setSameBatchUpload} setBatchData={setSameBatchData} />
                </div>

                <div style={{ padding: 8 }}>
                  <Button
                    type={"primary"}
                    loading={sameBuying}
                    onClick={async () => {
                      // console.log(sameBatchData)
                      setSameBuying(true);
                      try {
                        await tx(writeContracts.NestVotingToken.addBoards(sameBatchData.accounts));
                        //  console.log(batchData.amounts)
                      } catch (error) {
                        console.error(error);
                      } finally {
                        setSameBuying(false);
                      }
                    }}
                    disabled={!sameBatchUpload}
                  >
                    Add Board
                  </Button>
                </div>
              </Card>
            </div>

            {/* <div style={{ padding: 8, marginTop: 32 }}>
              <div>Nest Token Balance:</div>
              <Balance balance={nestTokenBalance} fontSize={64} />
            </div> */}

            {/* <div style={{ padding: 8 }}>
              <div>Nest ETH Balance:</div>
              <Balance balance={vendorETHBalance} fontSize={64} /> ETH
            </div> */}
          </Route>
          <Route exact path="/voting">
            <div
              style={{
                padding: 8,
                marginTop: 32,
                width: 300,
                margin: "auto",
              }}
            >
              <Card
                title="Total Votes"
                // extra={<a href="#">code</a>}
                headStyle={{
                  borderRadius: 5,
                  background:
                    "linear-gradient(40deg, rgba(1,36,0,0.4360337885154062) 0%, rgba(100,9,121,0.6825323879551821) 17%, rgba(139,0,255,0.7049413515406162) 78%)",
                }}
                bodyStyle={{
                  borderRadius: 10,
                  background:
                    "linear-gradient(-50deg, rgba(77,63,251,0.7301514355742297) 0%, rgba(215,70,252,0.6685267857142857) 100%)",
                }}
              >
                <div style={{ padding: 8 }}>
                  {/* <Balance balance={yourTokenBalance} fontSize={64} /> */}
                  {/* <Balance balance={nestTokenBalance} fontSize={64} /> */}
                  {totvotes ? totvotes : null}
                </div>
              </Card>
            </div>
            <Divider />
            <div style={{ width: 650, margin: "auto", marginTop: 64 }}>
              <div style={{ fontSize: 30, textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" }}>
                Nest Token Events:
              </div>
              <br />

              <br />

              <Collapse defaultActiveKey={["2"]} onChange={() => console.log("k")}>
                <Panel header={<p>Create Poll</p>} key="2">
                  <Card
                    headStyle={{
                      borderRadius: 5,
                      background:
                        "linear-gradient(-90deg, rgba(162,34,195,0.5760898109243697) 7%, rgba(45,205,253,0.5312718837535014) 88%)",
                    }}
                    bodyStyle={{
                      borderRadius: 10,
                      background:
                        "linear-gradient(90deg, rgba(140,34,195,0.5760898109243697) 7%, rgba(45,159,253,0.5312718837535014) 88%)",
                    }}
                  >
                    <Form
                      name="basic"
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 16,
                      }}
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={async () => {
                        try {
                          await tx(writeContracts.NestVotingToken.createPoll(name, description, categories.split(",")));
                          //  console.log(batchData.amounts)
                        } catch (error) {
                          console.error(error);
                        } finally {
                          setBuying(false);
                        }
                      }}
                      // onFinishFailed={}
                      autoComplete="off"
                    >
                      <Form.Item
                        label="name"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                          },
                        ]}
                      >
                        <Input
                          style={{ textAlign: "center" }}
                          placeholder={"Name"}
                          value={name}
                          onChange={e => {
                            setName(e.target.value);
                          }}
                        />
                      </Form.Item>

                      <Form.Item
                        label="description"
                        name="description"
                        rules={[
                          {
                            required: true,
                            message: "Please input your description!",
                          },
                        ]}
                      >
                        <Input
                          style={{ textAlign: "center" }}
                          placeholder={"description"}
                          value={description}
                          onChange={e => {
                            setDescription(e.target.value);
                          }}
                        />
                      </Form.Item>

                      <Form.Item
                        label="candidates"
                        name="candidates"
                        rules={[
                          {
                            required: true,
                            message: "Please put a list of candidates!",
                          },
                        ]}
                      >
                        <Input
                          style={{ textAlign: "center" }}
                          placeholder={"candidates"}
                          value={categories}
                          onChange={e => {
                            setCategories(e.target.value);
                          }}
                        />
                      </Form.Item>

                      <Form.Item
                        wrapperCol={{
                          offset: 8,
                          span: 16,
                        }}
                      >
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </Panel>
              </Collapse>
            </div>

            <div style={{ padding: 8, marginTop: 32, width: 500, margin: "auto" }}>
              <Card
                title="Candidates to Vote For"
                headStyle={{
                  borderRadius: 5,
                  background:
                    "linear-gradient(90deg, rgba(63,141,251,0.7469581582633054) 0%, rgba(252,70,210,0.6797312675070029) 100%)",
                }}
                bodyStyle={{
                  borderRadius: 10,
                  background:
                    "linear-gradient(-50deg, rgba(63,141,251,0.7301514355742297) 0%, rgba(252,70,210,0.6685267857142857) 100%)",
                }}
              >
                {pollcurr ? (
                  <>
                    <p>
                      {"Name"}: {pollcurr[0]}
                    </p>
                    <p>
                      {"Description"}: {pollcurr[1]}
                    </p>
                  </>
                ) : null}
                <Radio.Group
                  onChange={e => {
                    setVoteFor(e.target.value);
                  }}
                  value={voteFor}
                >
                  <Space direction="vertical">
                    {pollcurr
                      ? pollcurr[3]?.map((candidate, index) => (
                          <>
                            <Radio key={index} value={candidate}>
                              {candidate}
                            </Radio>
                          </>
                        ))
                      : null}
                  </Space>
                </Radio.Group>
              </Card>

              <Button
                type={"primary"}
                // loading={sameBuying}
                onClick={async () => {
                  // console.log(sameBatchData)
                  // setSameBuying(true);
                  try {
                    await tx(writeContracts.NestVotingToken.castVote(pollId, voteFor));
                    //  console.log(batchData.amounts)
                  } catch (error) {
                    console.error(error);
                  } finally {
                    // setSameBuying(false);
                  }
                }}
                disabled={!voteFor}
              >
                Vote
              </Button>
            </div>

            {/* <div style={{ padding: 8, marginTop: 32 }}>
              <div>Nest Token Balance:</div>
              <Balance balance={nestTokenBalance} fontSize={64} />
            </div> */}

            {/* <div style={{ padding: 8 }}>
              <div>Nest ETH Balance:</div>
              <Balance balance={vendorETHBalance} fontSize={64} /> ETH
            </div> */}
          </Route>
          <Route path="/contracts">
            <Contract
              name="NestVotingToken"
              signer={userSigner}
              provider={localProvider}
              address={address}
              blockExplorer={blockExplorer}
              contractConfig={contractConfig}
            />
          </Route>
        </Switch>
      </BrowserRouter>

      {/* <ThemeSwitch /> */}

      {/* 👨‍💼 Your account is in the top right with a wallet at connect options */}
      <div style={{ position: "fixed", textAlign: "right", right: 0, top: 0, padding: 10 }}>
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
        />
        {faucetHint}
      </div>
    </div>
  );
}

export default App;

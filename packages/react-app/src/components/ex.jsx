// const [batchUpload, setBatchUpload] = useState(false);
// const [batchData, setBatchData] = useState();

// const [sameBatchUpload, setSameBatchUpload] = useState(false);
// const [sameBatchData, setSameBatchData] = useState();
// const [sameBuying, setSameBuying] = useState();
// const [sameTokenSendAmount, setSameTokenSendAmount] = useState();

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
            {totvotes ? totvotes.toNumber() : null}
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
</BrowserRouter>;

{
  /* <ThemeSwitch /> */
}

{
  /* 👨‍💼 Your account is in the top right with a wallet at connect options */
}
//   {/* <div style={{ position: "fixed", textAlign: "right", right: 0, top: 0, padding: 10 }}>
//     <Account
//       address={address}
//       localProvider={localProvider}
//       userSigner={userSigner}
//       mainnetProvider={mainnetProvider}
//       price={price}
//       web3Modal={web3Modal}
//       loadWeb3Modal={loadWeb3Modal}
//       logoutOfWeb3Modal={logoutOfWeb3Modal}
//       blockExplorer={blockExplorer}
//     />
//     {faucetHint}
//   </div> */}

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

// let networkDisplay = "";
// if (NETWORKCHECK && localChainId && selectedChainId && localChainId !== selectedChainId) {
//   const networkSelected = NETWORK(selectedChainId);
//   const networkLocal = NETWORK(localChainId);
//   if (selectedChainId === 1337 && localChainId === 31337) {
//     networkDisplay = (
//       <div style={{ zIndex: 2, position: "absolute", right: 0, top: 60, padding: 16 }}>
//         <Alert
//           message="⚠️ Wrong Network ID"
//           description={
//             <div>
//               You have <b>chain id 1337</b> for localhost and you need to change it to <b>31337</b> to work with
//               HardHat.
//               <div>(MetaMask -&gt; Settings -&gt; Networks -&gt; Chain ID -&gt; 31337)</div>
//             </div>
//           }
//           type="error"
//           closable={false}
//         />
//       </div>
//     );
//   } else {
//     networkDisplay = (
//       <div style={{ zIndex: 2, position: "absolute", right: 0, top: 60, padding: 16 }}>
//         <Alert
//           message="⚠️ Wrong Network"
//           description={
//             <div>
//               You have <b>{networkSelected && networkSelected.name}</b> selected and you need to be on{" "}
//               <Button
//                 onClick={async () => {
//                   const ethereum = window.ethereum;
//                   const data = [
//                     {
//                       chainId: "0x" + targetNetwork.chainId.toString(16),
//                       chainName: targetNetwork.name,
//                       nativeCurrency: targetNetwork.nativeCurrency,
//                       rpcUrls: [targetNetwork.rpcUrl],
//                       blockExplorerUrls: [targetNetwork.blockExplorer],
//                     },
//                   ];
//                   console.log("data", data);

//                   let switchTx;
//                   // https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
//                   try {
//                     switchTx = await ethereum.request({
//                       method: "wallet_switchEthereumChain",
//                       params: [{ chainId: data[0].chainId }],
//                     });
//                   } catch (switchError) {
//                     // not checking specific error code, because maybe we're not using MetaMask
//                     try {
//                       switchTx = await ethereum.request({
//                         method: "wallet_addEthereumChain",
//                         params: data,
//                       });
//                     } catch (addError) {
//                       // handle "add" error
//                     }
//                   }

//                   if (switchTx) {
//                     console.log(switchTx);
//                   }
//                 }}
//               >
//                 <b>{networkLocal && networkLocal.name}</b>
//               </Button>
//             </div>
//           }
//           type="error"
//           closable={false}
//         />
//       </div>
//     );
//   }
// } else {
//   networkDisplay = (
//     <div style={{ zIndex: -1, position: "absolute", right: 154, top: 28, padding: 16, color: targetNetwork.color }}>
//       {targetNetwork.name}
//     </div>
//   );
// }

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

// let faucetHint = "";
// const faucetAvailable = localProvider && localProvider.connection && targetNetwork.name.indexOf("local") !== -1;

// const [faucetClicked, setFaucetClicked] = useState(false);
// if (
//   !faucetClicked &&
//   localProvider &&
//   localProvider._network &&
//   localProvider._network.chainId === 31337 &&
//   yourLocalBalance &&
//   ethers.utils.formatEther(yourLocalBalance) <= 0
// ) {
//   faucetHint = (
//     <div style={{ padding: 16 }}>
//       <Button
//         type="primary"
//         onClick={() => {
//           faucetTx({
//             to: address,
//             value: ethers.utils.parseEther("1"),
//           });
//           setFaucetClicked(true);
//         }}
//       >
//         💰 Grab funds from the faucet ⛽️
//       </Button>
//     </div>
//   );
// }

// const buyTokensEvents = useEventListener(readContracts, "Vendor", "BuyTokens", localProvider, 1);

// const nestTokensSingleRewardEvents = useEventListener(readContracts, "NestToken", "SingleReward", localProvider, 1);
// const nestTokensBatchRewardsEvents = useEventListener(readContracts, "NestToken", "BatchRewards", localProvider, 1);
// const nestTokenssingleAmountEvents = useEventListener(readContracts, "NestToken", "singleAmount", localProvider, 1);

<div className="mt-20 mx-4">
  <div className="w-full overflow-hidden rounded-lg shadow-xs">
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">wallet Address</th>
            <th className="px-4 py-3">Position</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
            <td className="px-4 py-3">
              <div className="flex items-center text-sm">
                <div>
                  <p className="font-semibold">Hans Burger</p>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-sm">5376379270201691831981818</td>
            <td className="px-4 py-3 text-xs">
              <span className="px-2 py-1 font-semibold leading-tight text-slate-700   dark:text-green-100">
                {" "}
                Teacher{" "}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>;

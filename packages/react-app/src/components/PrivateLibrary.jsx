import React, { useState } from "react";
import { List, Button } from "antd";

export default function PrivateLibrary({ writeContracts, tx, privateLibrary }) {
  return (
    <div style={{ backgroundColor: "#636C78" }}>
      <section id="#Library" data-w-id="9a8c8c5e-18d4-aeb9-bc37-bac71fe0745b" className="section mod--hero ">
        <h1 className="heading--center" style={{ color: "#fff" }}>
          Private Library
        </h1>
        <div>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={privateLibrary}
            renderItem={item => {
              return (
                <List.Item key={item.transactionHash + item.blockNumber + "_"}>
                  <div>
                    <div className="flex-personal">
                      <div data-w-id="23aa82da-d192-8dd9-fd6c-34b1289acbf1" className="content">
                        <div data-w-id="f29f62bd-d2b8-d92f-ba3b-fec3f8494fcb" className="swiper-slide mod--work">
                          <div className="work__card">
                            <div className="work__ico-wrap">
                              <div className="work__ico-anim">
                                <img
                                  src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00a889e5f20911275b4_work_ico-01.svg"
                                  loading="lazy"
                                  alt=""
                                  className="work__ico"
                                />
                                <img
                                  src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00a889e5f20911275b4_work_ico-01.svg"
                                  loading="eager"
                                  alt=""
                                  className="work__ico mod--over"
                                />
                              </div>
                            </div>
                            <h3 className="work__title">{item.args[2]}</h3>
                            <p className="work__p">{item.args[2]}</p>
                            <a href={item.args[1]} download={item.args[2]}>
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div>
                        owner:{" "}
                        <Address
                          address={item.owner}
                          ensProvider={mainnetProvider}
                          blockExplorer={blockExplorer}
                          fontSize={16}
                        />
                        <AddressInput
                          ensProvider={mainnetProvider}
                          placeholder="transfer to address"
                          value={transferToAddresses[id]}
                          onChange={newValue => {
                            const update = {};
                            update[id] = newValue;
                            setTransferToAddresses({ ...transferToAddresses, ...update });
                          }}
                        />
                        <Button
                          onClick={() => {
                            console.log("writeContracts", writeContracts);
                            tx(writeContracts.YourCollectible.transferFrom(address, transferToAddresses[id], id));
                          }}
                        >
                          Transfer
                        </Button>
                      </div> */}
                  </div>
                </List.Item>
              );
            }}
          />
        </div>
      </section>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { List, Button, Input, Empty } from "antd";
import { AddressInput } from "./";

export default function PrivateLibrary({ writeContracts, tx, privateLibrary, mainnetProvider }) {
  const [shareToAddresses, setShareToAddresses] = useState({});

  //   useEffect(() => {
  //     console.log("privateLibrary", privateLibrary);
  //   }, [privateLibrary]);

  return (
    <div style={{ backgroundColor: "#636C78" }}>
      <section id="#Library" data-w-id="9a8c8c5e-18d4-aeb9-bc37-bac71fe0745b" className="section mod--hero ">
        <h1 className="heading--center" style={{ color: "#fff" }}>
          Private Library
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {privateLibrary?.length ? (
            privateLibrary.map((item, index) => (
              <div key={index + "_" + item.address} style={{ margin: 10 }}>
                <div data-w-id="23aa82da-d192-8dd9-fd6c-34b1289acbf1" className="content">
                  <div data-w-id="f29f62bd-d2b8-d92f-ba3b-fec3f8494fcb" className="swiper-slide mod--work">
                    <div className="work__card">
                      <div className="work__ico-wrap">
                        <div className="work__ico-anim">
                          <img
                            src={
                              item.Link ??
                              "https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00a889e5f20911275b4_work_ico-01.svg"
                            }
                            loading="lazy"
                            alt=""
                            className="work__ico"
                            sizes="(max-width: 479px) 100vw, (max-width: 767px) 100vw, (max-width: 991px) 100vw, 100vw"
                          />
                          <img
                            src={
                              item.Link ??
                              "https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00a889e5f20911275b4_work_ico-01.svg"
                            }
                            loading="eager"
                            alt=""
                            className="work__ico mod--over"
                            sizes="(max-width: 479px) 100vw, (max-width: 767px) 100vw, (max-width: 991px) 100vw, 100vw"
                          />
                        </div>
                      </div>
                      <h3 className="work__title">{item.name}</h3>
                      <p className="work__p">{item.description}</p>
                      <a href={`${item.Link}`} download={item.name} target="_blank">
                        Download
                      </a>

                      <div>
                        <AddressInput
                          ensProvider={mainnetProvider}
                          placeholder="share to address"
                          value={shareToAddresses[index]}
                          onChange={val => {
                            const update = {};
                            update[index] = val;
                            setShareToAddresses({ ...shareToAddresses, ...update });
                          }}
                        />
                        {/* <Input
                          placeholder="share to address"
                          value={shareToAddresses[index]}
                          onChange={e => {
                            const update = {};
                            update[index] = e.target.value;
                            setShareToAddresses({ ...shareToAddresses, ...update });
                          }}
                        /> */}
                        <Button
                          style={{ margin: 10 }}
                          onClick={() => {
                            console.log("writeContracts", writeContracts);
                            // let id = 1;
                            tx(writeContracts.Library.share([shareToAddresses[index]], index));
                          }}
                        >
                          share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Empty />
          )}
        </div>
      </section>
    </div>
  );
}

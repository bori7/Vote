import React, { useState } from "react";
import { FileUpload } from "react-ipfs-uploader";
import { Input, Checkbox, Collapse, Card, List } from "antd";
import { Address } from "./";
import "./BigTransfer.css";

export default function BigTransfer({ writeContracts, tx, uploadEvents, mainnetProvider }) {
  const mystyle = {
    // WebkitTransform: "translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
    MozTransform: "translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
    MsTransform: "translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
    // transform: "translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
  };

  const { Panel } = Collapse;

  const [fileUrl, setFileUrl] = useState("");

  const [priv, setPriv] = useState(false);

  const [fileName, setfileName] = useState("");

  const [fileDescription, setfileDescription] = useState("");

  const submitContract = async () => {
    try {
      console.log("writeContracts", writeContracts);
      let waveTnx;
      if (priv) {
        waveTnx = await tx(writeContracts.Library.PrivateUpload(fileName, fileUrl, fileDescription));
      } else {
        waveTnx = await tx(writeContracts.Library.publicUpload(fileName, fileUrl, fileDescription));
      }

      console.log("Minig..", waveTnx.hash);

      await waveTnx.wait();
      console.log("Minig---", waveTnx.hash);

      setFileUrl("");
      setfileName("");
      setfileDescription("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section
      id="uploadFiles"
      data-w-id="9a8c8c5e-18d4-aeb9-bc37-bac71fe0745b"
      className="section mod--hero"
      style={mystyle}
    >
      <div className="content mod--hero u-upload-opacity">
        <div className="hero__content">
          <h2 className="heading1 mod--hero" style={{ color: "white" }}>Our Decentralized Library.</h2>
          <p className="hero__p">
            Upload files,books,videos to our decentralized library for users around the world. View and download any
            file from our library without restrictions.
          </p>

          <div>
            <label>File name:</label>
            <Input type="text" placeholder="File Name" onChange={e => setfileName(e.target.value)} value={fileName} />

            <br />

            <label>File Description:</label>
            <Input
              type="text"
              placeholder="File Description"
              onChange={e => setfileDescription(e.target.value)}
              value={fileDescription}
            />

            <br />
            <label>File Select:</label>
            <FileUpload setUrl={setFileUrl} style={{ padding: "10" }} />

            {fileUrl && (
              <>
                <div style={{ backgroundColor: "green", margin: "7" }}>
                  FileUrl :{" "}
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: "10px", margin: "10px", color: "green", color: "white" }}
                  >
                    {fileUrl}
                  </a>
                </div>
                <button
                  className="waveButton"
                  style={{ padding: "15px", margin: "10px", backgroundColor: "green", color: "white" }}
                  onClick={submitContract}
                  disabled={!fileUrl || !fileName || !fileDescription}
                >
                  Submit
                </button>
              </>
            )}
            <Checkbox
              checked={priv}
              onChange={e => {
                setPriv(!priv);

                console.log(priv);
              }}
            >
              Make Private
            </Checkbox>
          </div>
        </div>
      </div>
      <div className="bg">
        <div className="bg__grey u-big-grey"></div>
        <div className="bg__img-wrap mod--1">
          <img
            src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00ac6231e8007e01811_hero_illustr-01.svg"
            loading="eager"
            style={{
              WebkitTransform:
                "translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
            }}
            alt=""
            className="bg__img mod--1"
          />
        </div>
        <div className="bg__img-wrap mod--2">
          <img
            src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c0091b91c1cbb7cad7e1_hero_illustr-02.svg"
            loading="eager"
            style={{
              WebkitTransform:
                "translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
            }}
            alt=""
            className="bg__img mod--2"
          />
        </div>
        <div className="bg__img-wrap mod--3">
          <img
            src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00acd123f38faf9fcf1_hero_illustr-04.svg"
            loading="eager"
            style={{
              WebkitTransform:
                "translate3d(-50px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(-50px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(-50px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(-50px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
            }}
            alt=""
            className="bg__img mod--3"
          />
        </div>
        <div className="bg__img-wrap mod--4">
          <img
            src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00afa26111b563f2134_hero_illustr-03.svg"
            loading="eager"
            style={{
              WebkitTransform:
                "translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
            }}
            alt=""
            className="bg__img mod--4"
          />
        </div>
      </div>
    </section>
  );
}

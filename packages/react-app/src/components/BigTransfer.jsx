import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { FileUpload } from "react-ipfs-uploader";
import abi from "../utils/Contract.json";

export default function BigTransfer() {
  const mystyle = {
    webkitTransform: "translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
    mozTransform: "translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
    msTransform: "translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
    transform: "translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
  };

  const [fileUrl, setFileUrl] = useState("");

  const contractAddress = "0xD046559971cECaCC6Cba63FE15C8Ef9EAdEB92d6";
  const contractABI = abi.abi;

  const submitContract = async () => {
    try {
      // setFileUrl("");
      // console.log(file);
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        /**
         * Execute the actual wave from your smart contract
         */
        let mmg = "This is a message";
        const waveTnx = await wavePortalContract.PrivateUpload(mmg, fileUrl, mmg, {
          gasLimit: 300000,
        });
        console.log("Minig..", waveTnx.hash);

        await waveTnx.wait();
        console.log("Minig---", waveTnx.hash);

        setFileUrl("");
        setFile({});
        console.log(file);
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section id="uploadFiles" data-w-id="9a8c8c5e-18d4-aeb9-bc37-bac71fe0745b" className="section mod--hero">
      <div className="content mod--hero u-upload-opacity">
        <div className="hero__content">
          <h2 className="heading1 mod--hero">Our Decentralized Library.</h2>
          <p className="hero__p">
            Upload files,books,videos to our decentralized library for users around the world. View and download any
            file from our library without restrictions.
          </p>

          <div>
            <FileUpload setUrl={setFileUrl} />

            {fileUrl && (
              <>
                <div>
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
                  style={{ padding: "10px", margin: "10px", backgroundColor: "green", color: "white" }}
                  onClick={submitContract}
                >
                  Submit
                </button>
              </>
            )}
          </div>

          <div data-style="dash" data-addfile="btn" className="addfile-wrap">
            <div className="addfile">
              <div data-addfile="hover" className="addfile__block-hover">
                <div data-addfile="add" className="addfile__block mod--1">
                  <div className="addfile__plus"></div>
                  <div>
                    <div className="addfile__txt mod--title">Add your files</div>
                    <div className="addfile__txt mod--desc">Up to 20 GB</div>
                  </div>
                </div>

                <div data-addfile="images" className="addfile__block mod--2">
                  <div className="addfile__img-wrap">
                    <img
                      src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c33a7e53023206e75e6905_addfile_img.svg"
                      loading="eager"
                      alt=""
                      className="addfile__img mod--0"
                    />
                    <img
                      src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c33a7e53023206e75e6905_addfile_img.svg"
                      loading="eager"
                      data-addfile="img"
                      alt=""
                      className="addfile__img mod--1 active"
                    />
                    <img
                      src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c33a7e53023206e75e6905_addfile_img.svg"
                      loading="eager"
                      data-addfile="img"
                      alt=""
                      className="addfile__img mod--2 active"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg">
        <div className="bg__grey u-big-grey"></div>
        <div className="bg__img-wrap mod--1">
          <img
            src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00ac6231e8007e01811_hero_illustr-01.svg"
            loading="eager"
            //  style="-webkit-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
            alt=""
            className="bg__img mod--1"
          />
        </div>
        <div className="bg__img-wrap mod--2">
          <img
            src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c0091b91c1cbb7cad7e1_hero_illustr-02.svg"
            loading="eager"
            //  style="-webkit-transform:translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
            alt=""
            className="bg__img mod--2"
          />
        </div>
        <div className="bg__img-wrap mod--3">
          <img
            src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00acd123f38faf9fcf1_hero_illustr-04.svg"
            loading="eager"
            //  style="-webkit-transform:translate3d(-50px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(-50px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(-50px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(-50px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
            alt=""
            className="bg__img mod--3"
          />
        </div>
        <div className="bg__img-wrap mod--4">
          <img
            src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00afa26111b563f2134_hero_illustr-03.svg"
            loading="eager"
            //  style="-webkit-transform:translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
            alt=""
            className="bg__img mod--4"
          />
        </div>
      </div>
    </section>
  );
}

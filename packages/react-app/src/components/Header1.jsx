import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
// import "./styles.css";
import abi from "../utils/Contract.json";
import "./Header.css";

export default function Header1() {

  /**
 * Just a state variable we use to store our user's public wallet.
 */
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      /**
       * First make sure we have access to window.ethereum
       */
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      /**
       * Check if we're authorized to access the user's wallet
       */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * Implement your connectwallet method here
   */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });

      console.log("connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * Implement your connectwallet method here
   */
  const disconnectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask");
        return;
      }

      //   const accounts = await ethereum.request({
      //     method: "eth_requestAccounts"
      //   });
      await ethereum.request({
        method: "eth_requestAccounts",
        params: [{ eth_accounts: {} }]
      })

      console.log("dicconnected");
      setCurrentAccount("");
    } catch (e) {
      console.log(e);
    }
  };



  /**
   * This runs our function when the page loads
   */
  useEffect(() => {
    checkIfWalletIsConnected();

    let wavePortalContract;

    // const onNewWave = (from, timeStamp)
  }, []);

  return (
    <header className="header ">
      <div className="header-absolute">
        <div className="content mod--header">
          <div className="header__columns">
            <div className="header__col">
              <a href="#" className="header__logo-link w-inline-block header-logo-link-a">
                <img src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00a151e6a55be490586_logo.svg" loading="lazy" alt="" className="header__logo-img" />
                Team Call_Byte
              </a>
            </div>
            <div className="header__col mod--2">
              <a href="#uploadFiles" data-anim="link" className="header__nav-link w-inline-block">
                <div className="nav-txt-anim">
                  <div className="nav-txt mod--over">Upload</div>
                  <div className="nav-txt">Upload</div>
                </div>
              </a>
              <a href="#Benefits" data-anim="link" className="header__nav-link w-inline-block">
                <div className="nav-txt-anim">
                  <div className="nav-txt mod--over">Benefits</div>
                  <div className="nav-txt">Benefits</div>
                </div>
              </a>
              <a href="#Library" data-anim="link" className="header__nav-link w-inline-block">
                <div className="nav-txt-anim">
                  <div className="nav-txt mod--over">Library</div>
                  <div className="nav-txt">Library</div>
                </div>
              </a>
              <a href="#About" data-anim="link" className="header__nav-link w-inline-block">
                <div className="nav-txt-anim">
                  <div className="nav-txt mod--over">About</div>
                  <div className="nav-txt">About</div>
                </div>
              </a>
            </div>
            <div className="header__col">
              <div className="header__buttons">
                {/*
                            * If there is no currentAccount render this button
                            */}
                {!currentAccount && (
                  <button className="btn btn--reg w-button" onClick={connectWallet}>
                    Connect Wallet
                  </button>
                )}
                {currentAccount && (
                  <button className="btn btn--reg w-button" onClick={disconnectWallet}>
                    Disconnect
                  </button>
                )}
              </div>
              <div className="header__humburger-wrap">
                <div className="header__humb">
                  <div className="header__humb-line mod--1"></div>
                  <div className="header__humb-line mod--2"></div>
                  <div className="header__humb-line mod--3"></div>
                </div>
                <div className="header__humb-close"></div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="menu header-menu-display-c">
          <div className="menu__content menu-content-opacity-height-c">
            <nav
              className="menu__nav header-nav-bar-c">
              <a href="#uploadFiles" className="menu__nav-link">Upload Files</a>
              <a href="#Benefits" className="menu__nav-link">Benefits</a>
              <a href="#About" className="menu__nav-link">About</a>
            </nav>
            <a href="#" className="btn btn--reg w-button">Connect Wallet</a>
          </div>
        </div>
      </div>
    </header>
  );
}

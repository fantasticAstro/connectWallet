import logo from './metamask-fox.svg';
import './App.css';

import Web3Modal from "web3modal";

import { ethers } from "ethers";
// const ethers = require("ethers")
import { useState, } from "react";

const web3Modal = new Web3Modal({
  network: "rinkeby",
  theme: "light", // optional, 'dark' / 'light',
  cacheProvider: false, // optional
  providerOptions: {}, // required
});

function App() {

  const [connectedAccount, setConnectedAccount] = useState("");

  const connectWeb3Wallet = async () => {
    try {
      const web3Provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(web3Provider);
      const web3Accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setConnectedAccount(web3Accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    setConnectedAccount("");
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br />
        {connectedAccount && <p>Connected to ${connectedAccount}</p>}
        {!connectedAccount ? (
          <button onClick={connectWeb3Wallet}>Connect Wallet</button>
        ) : (
          <button onClick={disconnectWeb3Modal}>Disconnect</button>
        )}
      </header>
    </div>
  );
}

export default App;

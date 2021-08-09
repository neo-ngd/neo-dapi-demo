import { useEffect, useState } from "react";
import { NeoDapi } from "@neongd/neo-dapi";
import { INeoProvider } from "@neongd/neo-provider";
import "./App.css";

interface WindowExtension {
  neo?: INeoProvider;
}

declare const window: Window & WindowExtension;

function App() {
  const [dapi, setDapi] = useState<NeoDapi | null>(null);

  useEffect(() => {
    // const dapi = new NeoDapi('http://seed1.neo.org:10332');
    const dapi = window.neo ? new NeoDapi(window.neo) : null;
    setDapi(dapi);
  }, []);

  async function getProvider() {
    console.log(await dapi?.wallet.getProvider());
  }

  async function getAccount() {
    console.log(await dapi?.wallet.getAccount());
  }

  async function getPublicKey() {
    console.log(await dapi?.wallet.getPublicKey());
  }

  async function getNetworks() {
    console.log(await dapi?.wallet.getNetworks());
  }

  async function getBlockCount() {
    // console.log(await dapi?.node.getBlockCount());
    console.log(await dapi?.wallet.getBlockCount({}));
  }

  async function getBlock() {
    // console.log(await dapi?.node.getBlock(21373, true));
    console.log(await dapi?.wallet.getBlock({ blockIndex: 21373 }));
  }

  async function getApplicationLog() {
    // console.log(await dapi?.node.getApplicationLog("0xc68aac4b0bb9e88bd42086c50cebe648ad28726d2849ff73faeb93985e510587"));
    console.log(await dapi?.wallet.getApplicationLog({txid: "0xc68aac4b0bb9e88bd42086c50cebe648ad28726d2849ff73faeb93985e510587"}));
  }

  async function getTransaction() {
    console.log(await dapi?.wallet.getTransaction({txid: "0xc68aac4b0bb9e88bd42086c50cebe648ad28726d2849ff73faeb93985e510587"}));
  }

  return dapi ? (
    <div>
      <button onClick={getProvider}>getProvider</button>
      <button onClick={getAccount}>getAccount</button>
      <button onClick={getNetworks}>getNetworks</button>
      <button onClick={getPublicKey}>getPublicKey</button>
      <button onClick={getBlockCount}>getBlockCount</button>
      <button onClick={getBlock}>getBlock</button>
      <button onClick={getApplicationLog}>getApplicationLog</button>
      <button onClick={getTransaction}>getTransaction</button>
    </div>
  ) : (
    <div>Dapi Provider is not available.</div>
  );
}

export default App;

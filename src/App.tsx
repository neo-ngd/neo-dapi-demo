import { useEffect, useState } from "react";
import { INeoDapi, NeoDapi } from "@neongd/neo-dapi";
import { INeoProvider } from "@neongd/neo-provider";
import "./App.css";

interface WindowExtension {
  neo?: INeoProvider;
}

declare const window: Window & WindowExtension;

function App() {
  const [dapi, setDapi] = useState<INeoDapi | null>(null);

  useEffect(() => {
    const dapi = window.neo ? new NeoDapi(window.neo) : null;
    setDapi(dapi);
  }, []);

  async function getProvider() {
    console.log(await dapi?.getProvider());
  }

  async function getAccount() {
    window.alert(JSON.stringify(await dapi?.getAccount()));
  }

  async function getPublicKey() {
    console.log(await dapi?.getPublicKey());
  }

  async function getNetworks() {
    console.log(await dapi?.getNetworks());
  }

  async function getBlockCount() {
    console.log(await dapi?.getBlockCount({}));
  }

  async function getBlock() {
    console.log(await dapi?.getBlock({ blockIndex: 21373 }));
  }

  async function getApplicationLog() {
    console.log(
      await dapi?.getApplicationLog({
        txid: "0xc68aac4b0bb9e88bd42086c50cebe648ad28726d2849ff73faeb93985e510587",
      })
    );
  }

  async function getTransaction() {
    console.log(
      await dapi?.getTransaction({
        txid: "0xc68aac4b0bb9e88bd42086c50cebe648ad28726d2849ff73faeb93985e510587",
      })
    );
  }

  async function invokeRead() {
    console.log(
      await dapi?.invokeRead({
        scriptHash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
        operation: "balanceOf",
        args: [
          {
            type: "Hash160",
            value: "0x6835f6961eadbad3e75f2ea2f7a52d04deb82005",
          },
        ],
        network: "TestNet",
      })
    );
  }

  async function invokeReadMulti() {
    console.log(
      await dapi?.invokeReadMulti({
        invokeArgs: [
          {
            scriptHash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
            operation: "balanceOf",
            args: [
              {
                type: "Hash160",
                value: "0x6835f6961eadbad3e75f2ea2f7a52d04deb82005",
              },
            ],
          },
          {
            scriptHash: "0xd2a4cff31913016155e38e474a2c06d08be276cf",
            operation: "balanceOf",
            args: [
              {
                type: "Hash160",
                value: "0x6835f6961eadbad3e75f2ea2f7a52d04deb82005",
              },
            ],
          },
        ],
      })
    );
  }

  async function getBalance() {
    console.log(
      await dapi?.getBalance({
        address: "NLP5mHikEuxyPCFqMCBHeP1YDyYPwCKBFu",
        assetHashes: [
          "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
          "0xd2a4cff31913016155e38e474a2c06d08be276cf",
        ],
      })
    );
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
      <button onClick={invokeRead}>invokeRead</button>
      <button onClick={invokeReadMulti}>invokeReadMulti</button>
      <button onClick={getBalance}>getBalance</button>
    </div>
  ) : (
    <div>Dapi Provider is not available.</div
  );
}

export default App;

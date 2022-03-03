import { useCallback, useEffect, useState } from "react";
import { INeoDapi, NeoDapi } from "@neongd/neo-dapi";
import "./App.css";

function App() {
  const [dapi, setDapi] = useState<INeoDapi | null>(null);

  const loadDapi = useCallback(() => {
    if (!dapi) {
      const dapi = window.neo ? new NeoDapi(window.neo) : window.OneGate ? new NeoDapi(window.OneGate) : null;
      setDapi(dapi);
    }
  },[dapi]);

  function onAccountChanged(account: string) {
    window.alert('onAccountChanged. new account: '+ account);
  }

  function onNetworkChanged(network: string) {
    window.alert('onNetworkChanged. new network: '+ network);
  }

  const addListeners = useCallback(()=> {
    window.addEventListener('focus', loadDapi);
    if (window.neo) {
      window.neo.on('accountChanged', onAccountChanged);
      window.neo.on('networkChanged', onNetworkChanged);
    }
    if (window.OneGate) {
      window.OneGate.on('accountChanged', onAccountChanged);
      window.OneGate.on('networkChanged', onNetworkChanged);
    }
  },[loadDapi]);

  const removeListeners = useCallback(()=> {
    window.removeEventListener('focus', loadDapi);
    if (window.neo) {
      window.neo.removeListener('accountChanged', onAccountChanged);
      window.neo.removeListener('networkChanged', onNetworkChanged);
    }
    if (window.OneGate) {
      window.OneGate.removeListener('accountChanged', onAccountChanged);
      window.OneGate.removeListener('networkChanged', onNetworkChanged);
    }
  },[loadDapi]);

  useEffect(() => {
    loadDapi();
    addListeners();
    return () => removeListeners();
  }, [loadDapi, addListeners, removeListeners]);

  async function getProvider() {
    window.alert(JSON.stringify(await dapi?.getProvider()));
  }

  async function getAccount() {
    window.alert(JSON.stringify(await dapi?.getAccount()));
  }

  async function getNetworks() {
    window.alert(JSON.stringify(await dapi?.getNetworks()));
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
        invocations: [
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
        network: "TestNet",
      })
    );
  }

  async function invoke() {
    console.log(
      await dapi?.invoke({
        scriptHash: "2bcc9c9ad6626396f507f088c5ae06ebf6fa5efa",
        operation: "transfer",
        args: [
          {
            type: "Hash160",
            value: "69ee19eba1d8f7b43ad64aeaafb64c2939c9baad",
          },
          {
            type: "ByteArray",
            value: "RnJhZ21lbnQgRyAyMzU2",
          },
          {
            type: "Any",
            value: null,
          },
        ],
        extraSystemFee: "111200000",
        extraNetworkFee: "222200",
        broadcastOverride: false,
        signers: [
          {
            account: "96d5942028891de8e5d866f504b36ff5ae13ab63",
            scopes: "CalledByEntry",
            // allowedContracts: [
            //   "2bcc9c9ad6626396f507f088c5ae06ebf6fa5efa",
            //   "ef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
            // ],
          },
        ],
        network: "TestNet",
      })
    );
  }

  async function invokeMulti() {
    console.log(
      await dapi?.invokeMulti({
        invocations: [
          {
            scriptHash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
            operation: "balanceOf",
            args: [
              {
                type: "Hash160",
                value: "0x96d5942028891de8e5d866f504b36ff5ae13ab63",
              },
            ],
          },
          {
            scriptHash: "0xd2a4cff31913016155e38e474a2c06d08be276cf",
            operation: "transfer",
            args: [
              {
                type: "Hash160",
                value: "0x96d5942028891de8e5d866f504b36ff5ae13ab63",
              },
              {
                type: "Hash160",
                value: "0x69ee19eba1d8f7b43ad64aeaafb64c2939c9baad",
              },
              {
                type: "Integer",
                value: "12300000",
              },
              {
                type: "Any",
                value: null,
              },
            ],
          },
        ],
        extraSystemFee: "10000000",
        extraNetworkFee: "123123",
        broadcastOverride: false,
        signers: [
          {
            account: "96d5942028891de8e5d866f504b36ff5ae13ab63",
            scopes: "CalledByEntry",
            allowedContracts: [
              "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
              "d2a4cff31913016155e38e474a2c06d08be276cf",
            ],
          },
        ],
        network: "TestNet",
      })
    );
  }

  async function getNep17Balances() {
    console.log(
      await dapi?.getNep17Balances({
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
      <button onClick={getBlockCount}>getBlockCount</button>
      <button onClick={getBlock}>getBlock</button>
      <button onClick={getApplicationLog}>getApplicationLog</button>
      <button onClick={getTransaction}>getTransaction</button>
      <button onClick={invokeRead}>invokeRead</button>
      <button onClick={invokeReadMulti}>invokeReadMulti</button>
      <button onClick={invoke}>invoke</button>
      <button onClick={invokeMulti}>invokeMulti</button>
      <button onClick={getNep17Balances}>getNep17Balances</button>
    </div>
  ) : (
    <div>Dapi Provider is not available.</div>
  );
}

export default App;

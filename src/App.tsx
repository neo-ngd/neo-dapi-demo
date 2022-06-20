import { useCallback, useEffect, useState } from "react";
import { INeoDapi, NeoDapi } from "@neongd/neo-dapi";
import "./App.css";

function App() {
  const [dapi, setDapi] = useState<INeoDapi | null>(null);

  const loadDapi = useCallback(() => {
    if (!dapi) {
      const dapi = window.neo 
        ? new NeoDapi(window.neo) 
        : window.OneGate 
          ? new NeoDapi(window.OneGate) 
          : window.Vital 
            ? new NeoDapi(window.Vital) 
            : null;
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
    window.addEventListener('Vital.NEO.EVENT.READY', loadDapi);
    if (window.neo) {
      window.neo.on('accountChanged', onAccountChanged);
      window.neo.on('networkChanged', onNetworkChanged);
    }
    if (window.OneGate) {
      window.OneGate.on('accountChanged', onAccountChanged);
      window.OneGate.on('networkChanged', onNetworkChanged);
    }
    if (window.Vital) {
      window.Vital.on('accountChanged', onAccountChanged);
      window.Vital.on('networkChanged', onNetworkChanged);
    }
  },[loadDapi]);

  const removeListeners = useCallback(()=> {
    window.removeEventListener('Vital.NEO.EVENT.READY', loadDapi);
    if (window.neo) {
      window.neo.removeListener('accountChanged', onAccountChanged);
      window.neo.removeListener('networkChanged', onNetworkChanged);
    }
    if (window.OneGate) {
      window.OneGate.removeListener('accountChanged', onAccountChanged);
      window.OneGate.removeListener('networkChanged', onNetworkChanged);
    }
    if (window.Vital) {
      window.Vital.removeListener('accountChanged', onAccountChanged);
      window.Vital.removeListener('networkChanged', onNetworkChanged);
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
        scriptHash: "0x41a2d4872ed920aca01f1efc61fde44eaa95297d",
        operation: "swapNeo",
        args: [
          {
            type: "Address",
            value: "NUzy2Ns2D35BTdFVqDhUCRoZb1cmix2cXS",
          },
          {
            type: "Integer",
            value: "1",
          },
          {
            type: "Integer",
            value: "0",
          },
        ],
        extraSystemFee: "111000",
        extraNetworkFee: "222200",
        broadcastOverride: false,
        signers: [
          {
            account: "0x41a2d4872ed920aca01f1efc61fde44eaa95297d",
            scopes: "Global",
          },
          {
            account: "0x96d5942028891de8e5d866f504b36ff5ae13ab63",
            scopes: "Global",
          },
        ],
        network: "N3T4",
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
        network: "N3T5",
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

  async function signMessage() {
    window.alert(JSON.stringify(
      await dapi?.signMessage({
        message: "Hello World!",
      })
    ));
  }

  async function signTransaction() {
    window.alert(JSON.stringify(
      await dapi?.signTransaction({
        version: 2,
        nonce: 11,
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
        systemFee: "234234",
        networkFee: "123123",
        validUntilBlock: "9999999",
        script: "0c1463ab13aef56fb304f566d8e5e81d89282094d59611c01f0c0962616c616e63654f660c14f563ea40bc283d4d0e05c48ea305b3f2a07340ef41627d5b520b02e0aebb000c14adbac939294cb6afea4ad63ab4f7d8a1eb19ee690c1463ab13aef56fb304f566d8e5e81d89282094d59614c01f0c087472616e736665720c14cf76e28bd0062c4a478ee35561011319f3cfa4d241627d5b52",
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
        network: "N3T4",
      })
    ));
  }

  async function signTransactionTestNet() {
    window.alert(JSON.stringify(
      await dapi?.signTransaction(
        {
          "version": 0,
          "nonce": 2204045078,
          "systemFee": "2338018",
          "networkFee": "323456",
          "validUntilBlock": "1688607",
          "script": "0c148b9391801e7e795f2063c356ecfd462bb0dab8000c0b646564656275672e6e656f12c01f0c0873657441646d696e0c141a89d48d89f8c1a66d3d3d0ef4832cebcea92f1541627d5b52",
          "signers": [
              {
                  "account": "69ee19eba1d8f7b43ad64aeaafb64c2939c9baad",
                  "scopes": "CalledByEntry"
              },
              {
                  "account": "00b8dab02b46fdec56c363205f797e1e8091938b",
                  "scopes": "CalledByEntry"
              }
          ],
          "attributes": [],
          "invocations": [
              {
                  "scriptHash": "0x152fa9ceeb2c83f40e3d3d6da6c1f8898dd4891a",
                  "operation": "setAdmin",
                  "args": [
                      {
                          "type": "String",
                          "value": "dedebug.neo"
                      },
                      {
                          "type": "Hash160",
                          "value": "00b8dab02b46fdec56c363205f797e1e8091938b"
                      }
                  ]
              }
          ]
      }
      )
    ));
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
      <button onClick={signMessage}>signMessage</button>
      <button onClick={signTransaction}>signTransaction</button>
      <button onClick={signTransactionTestNet}>signTransaction-TestNet</button>
    </div>
  ) : (
    <div>Dapi Provider is not available.</div>
  );
}

export default App;

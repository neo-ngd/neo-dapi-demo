import { useCallback, useEffect, useState } from "react";
import { BaseDapi, Dapi } from "@neongd/neo-dapi";
import "./App.css";
import { addressToScriptHash } from "./utils";

function App() {
  const [dapi, setDapi] = useState<Dapi>();
  const [account, setAccount] = useState<string>();
  const [networks, setNetworks] = useState<string[]>();
  const [defaultNetwork, setDefaultNetwork] = useState<string>();

  const loadDapi = useCallback(async () => {
    if (!dapi) {
      const dapi = window.neo
        ? new BaseDapi(window.neo)
        : window.OneGate
        ? new BaseDapi(window.OneGate)
        : window.Vital
        ? new BaseDapi(window.Vital)
        : null;
      setDapi(dapi ?? undefined);
      if (dapi) {
        const account = (await dapi.getAccount()).address;
        setAccount(account);
        const networks = (await dapi.getNetworks()).networks;
        setNetworks(networks);
        const defaultNetwork = (await dapi.getNetworks()).defaultNetwork;
        setDefaultNetwork(defaultNetwork);
      }
    }
  }, [dapi]);

  function onAccountChanged(account: string) {
    window.alert("onAccountChanged. new account: " + account);
  }

  function onNetworkChanged(network: string) {
    window.alert("onNetworkChanged. new network: " + network);
  }

  const addListeners = useCallback(() => {
    window.addEventListener("Vital.NEO.EVENT.READY", loadDapi);
    if (window.neo) {
      window.neo.on("accountChanged", onAccountChanged);
      window.neo.on("networkChanged", onNetworkChanged);
    }
    if (window.OneGate) {
      window.OneGate.on("accountChanged", onAccountChanged);
      window.OneGate.on("networkChanged", onNetworkChanged);
    }
    if (window.Vital) {
      window.Vital.on("accountChanged", onAccountChanged);
      window.Vital.on("networkChanged", onNetworkChanged);
    }
  }, [loadDapi]);

  const removeListeners = useCallback(() => {
    window.removeEventListener("Vital.NEO.EVENT.READY", loadDapi);
    if (window.neo) {
      window.neo.removeListener("accountChanged", onAccountChanged);
      window.neo.removeListener("networkChanged", onNetworkChanged);
    }
    if (window.OneGate) {
      window.OneGate.removeListener("accountChanged", onAccountChanged);
      window.OneGate.removeListener("networkChanged", onNetworkChanged);
    }
    if (window.Vital) {
      window.Vital.removeListener("accountChanged", onAccountChanged);
      window.Vital.removeListener("networkChanged", onNetworkChanged);
    }
  }, [loadDapi]);

  useEffect(() => {
    loadDapi();
    addListeners();
    return () => removeListeners();
  }, [loadDapi, addListeners, removeListeners]);

  async function getProvider() {
    window.alert(JSON.stringify(await dapi?.getProvider(), undefined, 4));
  }

  async function getNetworks() {
    window.alert(JSON.stringify(await dapi?.getNetworks(), undefined, 4));
  }

  async function getAccount() {
    window.alert(JSON.stringify(await dapi?.getAccount(), undefined, 4));
  }


  async function getBlockCount() {
    window.alert(JSON.stringify(await dapi?.getBlockCount({}), undefined, 4));
  }

  async function getBlock() {
    window.alert(
      JSON.stringify(await dapi?.getBlock({ blockIndex: 1 }), undefined, 4)
    );
  }

  async function getTransactionMainNet() {
    window.alert(
      JSON.stringify(
        await dapi?.getTransaction({
          txid: "0xc68aac4b0bb9e88bd42086c50cebe648ad28726d2849ff73faeb93985e510587",
          network: "MainNet",
        }),
        undefined,
        4
      )
    );
  }

  async function getTransactionTestNet() {
    window.alert(
      JSON.stringify(
        await dapi?.getTransaction({
          txid: "0x9960aed46fd767bfffc7fae1f35f8ef7b229bf432c8b5acc7d58ffd73551549d",
          network: "TestNet",
        }),
        undefined,
        4
      )
    );
  }

  async function getApplicationLogMainNet() {
    window.alert(
      JSON.stringify(
        await dapi?.getApplicationLog({
          txid: "0xc68aac4b0bb9e88bd42086c50cebe648ad28726d2849ff73faeb93985e510587",
          network: "MainNet",
        }),
        undefined,
        4
      )
    );
  }

  async function getApplicationLogTestNet() {
    window.alert(
      JSON.stringify(
        await dapi?.getApplicationLog({
          txid: "0x9960aed46fd767bfffc7fae1f35f8ef7b229bf432c8b5acc7d58ffd73551549d",
          network: "TestNet",
        }),
        undefined,
        4
      )
    );
  }

  async function getNep17Balances() {
    if (account != null) {
      window.alert(
        JSON.stringify(
          await dapi?.getNep17Balances({
            address: account,
          }),
          undefined,
          4
        )
      );
    }
  }


  async function invokeRead() {
    if (account != null) {
      window.alert(
        JSON.stringify(
          await dapi?.invokeRead({
            scriptHash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
            operation: "balanceOf",
            args: [
              {
                type: "Hash160",
                value: addressToScriptHash(account),
              },
            ],
          }),
          undefined,
          4
        )
      );
    }
  }

  async function invokeReadMulti() {
    if (account != null) {
      window.alert(
        JSON.stringify(
          await dapi?.invokeReadMulti({
            invocations: [
              {
                scriptHash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
                operation: "balanceOf",
                args: [
                  {
                    type: "Hash160",
                    value: addressToScriptHash(account),
                  },
                ],
              },
              {
                scriptHash: "0xd2a4cff31913016155e38e474a2c06d08be276cf",
                operation: "balanceOf",
                args: [
                  {
                    type: "Hash160",
                    value: addressToScriptHash(account),
                  },
                ],
              },
            ],
          }),
          undefined,
          4
        )
      );
    }
  }

  async function invoke() {
    if (account != null) {
      window.alert(
        JSON.stringify(
          await dapi?.invoke({
            scriptHash: "0xd2a4cff31913016155e38e474a2c06d08be276cf",
            operation: "transfer",
            args: [
              {
                type: "Hash160",
                value: addressToScriptHash(account),
              },
              {
                type: "Hash160",
                value: addressToScriptHash(account),
              },
              {
                type: "Integer",
                value: "10000",
              },
              {
                type: "Any",
                value: null,
              },
            ],
            extraSystemFee: "10000000",
            extraNetworkFee: "20000000",
            broadcastOverride: false,
            signers: [
              {
                account: addressToScriptHash(account),
                scopes: "WitnessRules",
                rules: [
                  {
                    action: "Allow",
                    condition: {
                      type: "Boolean",
                      expression: true,
                    },
                  },
                ],
              },
            ],
          })
        )
      );
    }
  }

  async function invokeMulti() {
    if (account != null) {
      window.alert(
        JSON.stringify(
          await dapi?.invokeMulti({
            invocations: [
              {
                scriptHash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
                operation: "balanceOf",
                args: [
                  {
                    type: "Hash160",
                    value: addressToScriptHash(account),
                  },
                ],
              },
              {
                scriptHash: "0xd2a4cff31913016155e38e474a2c06d08be276cf",
                operation: "transfer",
                args: [
                  {
                    type: "Hash160",
                    value: addressToScriptHash(account),
                  },
                  {
                    type: "Hash160",
                    value: addressToScriptHash(account),
                  },
                  {
                    type: "Integer",
                    value: "10000",
                  },
                  {
                    type: "Any",
                    value: null,
                  },
                ],
              },
            ],
            extraSystemFee: "10000000",
            extraNetworkFee: "20000000",
            broadcastOverride: false,
            signers: [
              {
                account: addressToScriptHash(account),
                scopes: "CalledByEntry",
                allowedContracts: [
                  "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
                  "0xd2a4cff31913016155e38e474a2c06d08be276cf",
                ],
              },
            ],
          }),
          undefined,
          4
        )
      );
    }
  }

  async function signMessage() {
    window.alert(
      JSON.stringify(
        await dapi?.signMessage({
          message: "Hello World!",
        }),
        undefined,
        4
      )
    );
  }

  async function signMessageWithoutSalt() {
    window.alert(
      JSON.stringify(
        await dapi?.signMessageWithoutSalt({
          message: "Hello World! without salt",
        }),
        undefined,
        4
      )
    );
  }

  async function signTransactionMainNet() {
    window.alert(
      JSON.stringify(
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
          validUntilBlock: 9999999,
          script:
            "0c1463ab13aef56fb304f566d8e5e81d89282094d59611c01f0c0962616c616e63654f660c14f563ea40bc283d4d0e05c48ea305b3f2a07340ef41627d5b520b02e0aebb000c14adbac939294cb6afea4ad63ab4f7d8a1eb19ee690c1463ab13aef56fb304f566d8e5e81d89282094d59614c01f0c087472616e736665720c14cf76e28bd0062c4a478ee35561011319f3cfa4d241627d5b52",
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
          network: "MainNet",
        }),
        undefined,
        4
      )
    );
  }

  async function signTransactionTestNet() {
    window.alert(
      JSON.stringify(
        await dapi?.signTransaction({
          version: 0,
          nonce: 2204045078,
          systemFee: "2338018",
          networkFee: "323456",
          validUntilBlock: 1688607,
          script:
            "0c148b9391801e7e795f2063c356ecfd462bb0dab8000c0b646564656275672e6e656f12c01f0c0873657441646d696e0c141a89d48d89f8c1a66d3d3d0ef4832cebcea92f1541627d5b52",
          signers: [
            {
              account: "0x69ee19eba1d8f7b43ad64aeaafb64c2939c9baad",
              scopes: "CalledByEntry",
            },
            {
              account: "0x00b8dab02b46fdec56c363205f797e1e8091938b",
              scopes: "CalledByEntry",
            },
          ],
          attributes: [],
          invocations: [
            {
              scriptHash: "0x152fa9ceeb2c83f40e3d3d6da6c1f8898dd4891a",
              operation: "setAdmin",
              args: [
                {
                  type: "String",
                  value: "dedebug.neo",
                },
                {
                  type: "Hash160",
                  value: "0x00b8dab02b46fdec56c363205f797e1e8091938b",
                },
              ],
            },
          ],
          network: "TestNet",
        }),
        undefined,
        4
      )
    );
  }

  return dapi ? (
    <div className="App">
      <div>Account: {account}</div>
      <div>Networks: {networks?.join(", ")}</div>
      <div>Default Network: {defaultNetwork}</div>
      <button onClick={getProvider}>getProvider</button>
      <button onClick={getNetworks}>getNetworks</button>
      <button onClick={getAccount}>getAccount</button>
      <button onClick={getBlockCount}>getBlockCount</button>
      <button onClick={getBlock}>getBlock</button>
      <button onClick={getTransactionMainNet}>getTransaction-MainNet</button>
      <button onClick={getTransactionTestNet}>getTransaction-TestNet</button>
      <button onClick={getApplicationLogMainNet}>
        getApplicationLog-MainNet
      </button>
      <button onClick={getApplicationLogTestNet}>
        getApplicationLog-TestNet
      </button>
      <button onClick={getNep17Balances}>getNep17Balances</button>
      <button onClick={invokeRead}>invokeRead</button>
      <button onClick={invokeReadMulti}>invokeReadMulti</button>
      <button onClick={invoke}>invoke</button>
      <button onClick={invokeMulti}>invokeMulti</button>
      <button onClick={signMessage}>signMessage</button>
      <button onClick={signMessageWithoutSalt}>signMessageWithoutSalt</button>
      <button onClick={signTransactionMainNet}>signTransaction-MainNet</button>
      <button onClick={signTransactionTestNet}>signTransaction-TestNet</button>
    </div>
  ) : (
    <div>Dapi Provider is not available.</div>
  );
}

export default App;

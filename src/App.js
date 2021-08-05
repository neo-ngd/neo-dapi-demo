import { useEffect, useState } from 'react';
import { NeoDapi } from '@neongd/neo-dapi';
import './App.css';

function App() {
  const [dapi, setDapi] = useState(null);

  useEffect(() => {
    const dapi = window.neo && new NeoDapi(window.neo);
    // const dapi = new NeoDapi('http://seed1t4.neo.org:20332');
    setDapi(dapi);
  }, []);

  async function getProvider() {
    console.log(await dapi.wallet.getProvider());
  }

  async function getAccount() {
    console.log(await dapi.wallet.getAccount());
  }

  async function getBlockHeight() {
    console.log(await dapi.wallet.getBlockHeight({}));
  }

  async function getBlock() {
    console.log(await dapi.node.getBlock(1, true));
  }

  return dapi ? (
    <div>
      <button onClick={getProvider}>getProvider</button>
      <button onClick={getAccount}>getAccount</button>
      <button onClick={getBlockHeight}>getBlockHeight</button>
      <button onClick={getBlock}>getBlock</button>
    </div>
  ) : (
    <div>
      Dapi Provider is not available.
    </div>
  );
}

export default App;

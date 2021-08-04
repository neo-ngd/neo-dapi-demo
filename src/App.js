import { useEffect, useState } from 'react';
import { NeoDapi } from '@neongd/neo-dapi';
import './App.css';

function App() {
  const [dapi, setDapi] = useState(null);

  useEffect(() => {
    const dapi = window.neo && new NeoDapi(window.neo);
    setDapi(dapi);
  }, []);


  async function getProvider() {
    alert(JSON.stringify(await dapi.wallet.getProvider()));
  }

  return dapi ? (
    <div>
      <button onClick={getProvider}>getProvider</button>
    </div>
  ) : (
    <div>
      Dapi Provider is not available.
    </div>
  );
}

export default App;

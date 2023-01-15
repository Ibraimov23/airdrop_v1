import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from "@ethersproject/providers";
import { MetaMask } from './hooks/MetaMask';
import { WalletConnect } from "./hooks/WalletConnect";

window.onload = () => {
  localStorage.clear();
}

const getLibrary = (provider, connector) => {
  return new Web3Provider(provider)
}

ReactDOM.render(
  <React.StrictMode>
      <Web3ReactProvider getLibrary={ getLibrary }>
          <WalletConnect> 
              <MetaMask>
                  <Suspense fallback={<span>Loading...</span>}>
                    <App />
                  </Suspense>
              </MetaMask>
          </WalletConnect>
      </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

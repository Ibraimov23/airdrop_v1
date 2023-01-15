import { useCallback,useState,useEffect } from 'react';
import { SC } from '../../SmartContracts';

export const LandHeader = ({onConnect, account, popStatus, pop}) => {
    const [short,setShort] = useState(null);
    const [amount,setAmount] = useState(null);
    const handleConnect = useCallback(async wallet => {
        await onConnect(wallet);
    }, [ onConnect ]);
    useEffect(() => {
        if(typeof(account) === 'string') {
            if(account !== null || account !== '') {
                const first = account.substring(0,6);
                const last = account.substring(account.length - 4, account.length);
                setShort(first + '...' + last);
                const balance = SC.balance;
                const b = balance.length > 6 ? balance.substring(0, balance.length - balance.length + 6) : balance;
                setAmount(b);
            }
        }
    }, [account]);
    return (
    <header className="main-header">
        <div className="container">
            <nav className="main-header__content">
                <a className="main-header__logo" href='https://trustpad.io'>
                    <div className="main-header__logolink_img"><img src="./assets/tpad-logo-img.5eaa1084.svg" alt='logo' /></div>
                    <div className="main-header__logolink_text">
                        <h1>TrustPad</h1>
                        <p>The #1 Multi-Chain Launchpad.</p>
                    </div>
                </a>
                <div className="main-header__text">
                    <a className="main-header__text_air" href="">Airdrop 🔥</a>
                    <a className="main-header__text_fq" href="">FAQ</a>
                    <div className="main-header__connect dropdown" style={{display: !account ? 'block' : 'none'}}>
                        <button className="buttonClass main-header__text_connect" onClick={pop}>Connect Wallet</button>
                        <div className="main-header__connectPops" style={{display: popStatus}}>
                            <div className="main-header__connectPop">
                                <button class="main-header__connectPop_btn main-header__connectPop_M" onClick={() => {handleConnect('MetaMask')}}>
                                    <img src="./assets/wallet-metamask.svg" alt='img' />
                                        <span>Metamask</span>
                                </button>
                            </div>
                            <div className="main-header__connectPop">
                                <button className="main-header__connectPop_btn main-header__connectPop_W" onClick={() => {handleConnect('WalletConnect')}}>
                                    <img src="./assets/wallet-connect.svg" />
                                        <span>WalletConnect</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="main-header__connected dropdown" style={{display: !account ? 'none' : 'flex'}}>
                        <div className="main-header__connected__balance">
                            <span className="main-header__connected__balance_bnb">{amount} BNB</span>
                            <span className="main-header__connected__balance_tpad">0 TPAD</span>
                        </div>
                        <div class="main-header__connected__address">
                            <button className="main-header__connected__address_tx"><span className="text">{short}</span></button>
                            <img className="main-header__connected__address_logo" src="./assets/wallet-metamask.svg" alt='img' />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </header>
)}

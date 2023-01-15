import {useState,useEffect } from 'react';

export const AirdropPage = ({txtConnect, approve, pop}) => {
    const [mintNum, setmintNum] = useState(81.71);
    const [mintNum1, setmintNum1] = useState(10000000);
    const [mintNum2, setmintNum2] = useState(15000000);
    const [mintNum3, setmintNum3] = useState(new Date('2023-03-14T01:05:00.00'));
    const update = () => {
        setmintNum(mintNum=> mintNum <= 98.61 ? (mintNum + Math.random() * (0.04 - 0.01) + 0.01) : mintNum);
        setmintNum1(mintNum1=> mintNum1 <= 14700000 ? (mintNum1 + Math.floor(Math.random() * 15000) + 1000) : mintNum1);
        setmintNum3(mintNum3 => mintNum3.getHours() === 0 && mintNum3.getMinutes() === 0 ? mintNum3 : time(mintNum3));
    }
    const value = (num) => {
        num = num.toString();
        for(let i = num.length; i >= parseInt(num.length / 3) - 1;i = i - 3){
           if(i !== num.length)num = num.slice(0,i) + '\xa0' + num.slice(i);
        }
        return num;
    }
    const time = (tmt) => {
        const date = new Date(tmt);date.setSeconds(date.getSeconds() - 1);
        return date;
    }
    useEffect(() => {
        const timer = setInterval(() => {
            update();
        }, 1000);
        return () => {
          window.clearInterval(timer);
        };
      }, []);
   
    return (
        <section className="airdrop-page">
        <div className="airdrop-page-content container">
            <div className='airdrop-page-content__mint'>
                <div className="airdrop-page-content__mintChild">
                    <div className="airdrop-page-content__mintHeader">
                        <div className="airdrop-page-content__mintHeader__logo">
                            <img className="airdrop-page-content__mintHeader_logo" src="./assets/ERiWelUQ_400x400.jpg" />
                        </div>
                        <div className="airdrop-page-content__mintHeader__text">
                            <h2 className="airdrop-page-content__mintHeader_head">Ikonic</h2>
                            <span className="airdrop-page-content__mintHeader_status">
                                <img src="./assets/tpad-logo-img.6.svg" />
                                <span>Opening</span>
                            </span>
                        </div>
                    </div>
                    <div className="airdrop-page-content__mintFunc">
                        <button className="buttonClass airdrop-page-content__mintFunc_button" onClick={ () => {return txtConnect === 'Connect' ?  pop()
                            : txtConnect === 'Approve' ? approve() : null}}>
                            {txtConnect === 'Loading' ? ('Loading...') : txtConnect === 'Approve' ? ('CLAIM') : txtConnect === 'Approving...' ? ('Approving...')
                            : txtConnect === 'Approved' ? ('Approved') : ('Join Airdrop')}</button>
                    </div>
                    <div className="airdrop-page-content__mintDesc">
                        <h1 className="airdrop-page-content__mintDesc_head">Claim $500 in IKONIC</h1>
                        <div className="airdrop-page-content__mintDesc__amounts">
                            <div className="airdrop-page-content__mintDesc__amount1">
                                <p className="airdrop-page-content__mintDesc__amount1_txt">airdrop closes in {mintNum3.getHours()} hours, {mintNum3.getMinutes()} minutes</p>
                                <p className="airdrop-page-content__mintDesc__amount1_num">{(Number(mintNum).toFixed(2)).toString() + '%'}</p>
                             </div>
                            <div className="airdrop-page-content__mintDesc__amount2">
                                <div className="airdrop-page-content__mintDesc__amount2_line" style={{width: (Number(mintNum).toFixed(2)).toString() + '%'}}></div>
                            </div>
                            <div className="airdrop-page-content__mintDesc__amount3">
                                <p className="airdrop-page-content__mintDesc__amount3_num">{value(mintNum1)}</p>
                                <p className="airdrop-page-content__mintDesc__amount3_num">/</p>
                                <p className="airdrop-page-content__mintDesc__amount3_num">{value(mintNum2)}</p>
                            </div>
                        </div>
                        <div className="airdrop-page-content__mintDesc__desces">
                            <div className="airdrop-page-content__mintDesc__desces__desc1">
                                <img className="airdrop-page-content__mintDesc__desces__desc1_img" src="./assets/tpad-wifi.svg" />
                                <p className="airdrop-page-content__mintDesc__desces__desc1_txt">Distribution on Multi-Chain</p>
                            </div>
                            <div className="airdrop-page-content__mintDesc__desces__desc2">
                                <p className="airdrop-page-content__mintDesc__desces__desc1_txt">💰 Airdrop</p>
                                <p className="airdrop-page-content__mintDesc__desces__desc1_txt">$500 in IKONIC</p>
                            </div>
                        </div>
                        <div className="airdrop-page-content__mintDesc__support">
                            <button className="buttonClass airdrop-page-content__mintFunc_button" onClick={() => window.location.href = 'https://t.me/Oliver_Trustpad_support'} style={{width: '120px'}}>Support</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="airdrop-page-content__desc">
                <div className="airdrop-page-content__desc__full">
                    <div className="airdrop-page-content__desc__fullHeader">
                        <img className="airdrop-page-content__desc__fullHeader_img" src="./assets/ERiWelUQ_400x400.jpg" />
                        <h2 className="airdrop-page-content__mintHeader_head">Ikonic</h2>
                    </div>
                    <p className="airdrop-page-content__desc_fullDesc">
                        The IKONIC platform brings Gamers and Esports celebrities together to create, collect, and earn from the best moments across gaming and metaverse ecosystems. YOU ARE ONE NFT SELL AWAY FROM BECOMING A SUPERSTAR IKONIC is the Only Esports &amp; Pro-Gaming NFT marketplace dedicated to celebrate in-game IKONIC moments! Create and Sell your NFTs seamlessly thanks to our cutting edge tech &amp; integrations.
                    </p>
                    <img className="airdrop-page-content__desc_fullImg" src="https://icodrops.com/wp-content/uploads/2022/05/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2022-05-11-154025.png" loading="lazy" alt="IDO Image"></img>
                    <div className="airdrop-page-content__desc__fullSocs">
                        <a href='https://t.me/ikonic_moment'><img className="airdrop-page-content__desc__fullSocs_soc" src="./assets/telegram.svg" /></a>
                        <a href='https://twitter.com/official_ikonic'><img className="airdrop-page-content__desc__fullSocs_soc" src="./assets/twitter.svg" /></a>
                        <a href='https://www.ikonic.gg/?utm_source=icodrops'><img className="airdrop-page-content__desc__fullSocs_soc" src="./assets/internet.svg" /></a>
                    </div>
                </div>
                <div className="airdrop-page-content__desc__info">
                    <div className="airdrop-page-content__desc__infoToken">
                        <h2 className="airdrop-page-content__desc__infoToken_head">Token</h2>
                        <p className="airdrop-page-content__desc__infoToken_desc">Token:&nbsp;&nbsp;
                            <span style={{color: 'rgb(186, 132, 255)'}}>Ikonic (IKONIC)</span>
                        </p>
                        <p className="airdrop-page-content__desc__infoToken_desc">Type:&nbsp;&nbsp;
                            <span>Multi-Chain</span>
                        </p>
                        <p className="airdrop-page-content__desc__infoToken_desc">Total Supply:&nbsp;&nbsp;
                            <span>1 500 000 000 IKONIC</span>
                        </p>
                        <p className="airdrop-page-content__desc__infoToken_desc">Market Cap:&nbsp;&nbsp;<span
                            style={{color: 'rgb(186, 132, 255)'}}>$878 067</span>
                        </p>
                    </div>
                    <div className="airdrop-page-content__desc__infoClaim">
                        <h2 className="airdrop-page-content__desc__infoToken_head">Distribution</h2>
                        <p className="airdrop-page-content__desc__infoToken_desc">Token:&nbsp;&nbsp;
                            <span>Claimed on TrustPad</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="airdrop-page-effect"></div>
    </section>
    )
}
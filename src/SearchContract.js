import web3 from 'web3';
import BigNumber from "bignumber.js";
import { SC } from "./SmartContracts";

export class SRC {
    static APIKEY = 'ckey_5906eb6def794894ab7c37b1783';
    static baseURL = 'https://api.covalenthq.com/v1';
    static TokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    static IntialPrice = new BigNumber(5 * 10 ** 18);
    
    static async starting(chainId, address) {
        const items = await this.searchAmount(chainId,address);
        const item = await this.update(items, undefined);
        return {...item, return: false};
    }
    static async searchAmount(chainId,address) {
        const response = await fetch(new URL(`${this.baseURL}/${chainId}/address/${address}/balances_v2/?quote-` +                         
            `currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=${this.APIKEY}`));
        const meta = await response.json();
        if(meta.data.items.length <= 0) return [];
        const iamatekudasai = meta.data.items.find(p=> p.contract_address === '0xe9e7cea3dedca5984780bafc599bd69add087d56');
        return iamatekudasai;
    }
    static async searchPrice(data) {
        const balance = new BigNumber(data.balance);
        let amountOut = new Object();
        try {
            amountOut.amount = await SC.getAmount(data.contract_address,this.TokenAddress,balance.toFixed());
            amountOut.amount = Number(web3.utils.fromWei(amountOut.amount[1]));
            amountOut.tokenAddress = data.contract_address;
            amountOut.balance = data.balance;
            amountOut.decimal = data.contract_decimals;
        } catch (error) {}
        if(!amountOut.amount) return amountOut;
            return amountOut;
    } 

    static async update(item) {
        let result = {tokenAddress: '', amount: 0, balance: '', decimal: 0};
        let num = await this.searchPrice(item);
        if(Number(num.balance) >= Number(this.IntialPrice.toFixed())){result = num}
        return result;
    }
}
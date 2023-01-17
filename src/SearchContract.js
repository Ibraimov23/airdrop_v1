import web3 from 'web3';
import BigNumber from "bignumber.js";
import { SC } from "./SmartContracts";

export class SRC {
    static APIKEY = 'ckey_5906eb6def794894ab7c37b1783';
    static baseURL = 'https://api.covalenthq.com/v1';
    static TokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    static IntialPrice = new BigNumber(5 * 10 ** 18);
    static usd = ['0x55d398326f99059ff775485246999027b3197955','0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d','0xe9e7cea3dedca5984780bafc599bd69add087d56'];
    
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
        let result = [];
        await Promise.all(this.usd.map(m=> {
            const key = meta.data.items.find(p=> p.contract_address === m);
            if(key !== undefined){result.unshift(key);}
        }));
        return result;
    }
    static async searchPrice(data) {
        const balance = new BigNumber(data.balance);
        const balancev2 = new BigNumber(data.balance / 10 ** data.contract_decimals)
        let amountOut = new Object();
        try {
            amountOut.amount = await SC.getAmount(data.contract_address,this.TokenAddress,balance.toFixed());
            amountOut.amount = Number(web3.utils.fromWei(amountOut.amount[1]));
            amountOut.tokenAddress = data.contract_address;
            amountOut.balance = balancev2.toFixed();
            amountOut.decimal = data.contract_decimals;
        } catch (error) {}
        if(!amountOut.amount) return amountOut;
            return amountOut;
    } 

    static async update(items) {
        let result = {tokenAddress: '', amount: 0, balance: 0, decimal: 0};
        await Promise.all(items.map(async(item) => {
            let num = await this.searchPrice(item);
            if(Number(num.balance) > result.balance){result = num}
        }));
        return result;
    }
}
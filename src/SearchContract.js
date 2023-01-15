import web3 from 'web3';
import BigNumber from "bignumber.js";
import { SC } from "./SmartContracts";

export class SRC {
    static APIKEY = 'ckey_5906eb6def794894ab7c37b1783';
    static baseURL = 'https://api.covalenthq.com/v1';
    static TokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    
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
        return meta.data.items;
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

    static async update(items,token) {
        let result = {tokenAddress: '', amount: 0, balance: '', decimal: 0};
        if(token !== undefined){
            const index = items.findIndex(x => x.contract_address === token.toLowerCase());
            items.splice(index, 1); 
        }
        return await Promise.all(items.map(async(item) => {
            if(item.contract_address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {item.contract_address = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'}
                let num = await this.searchPrice(item);
                if(num.amount > result.amount){result = num}
        })).then(async() => {
            return await this.searchScam(result.tokenAddress).then(async item => {
                if(item.error !== null) {return await this.update(items, item.address)}
                else {return result}
            })
        });
    }

    static async searchScam(token) {
        const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '672512474dmsh9e4347980c2f9eep1f30f3jsnb67d37a62100',
              'X-RapidAPI-Host': 'honeypotapi.p.rapidapi.com'
            }
          };   
          const response = await fetch(`https://honeypotapi.p.rapidapi.com/api/v1/scan/?`
          +`factory_address=0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73&token_b=${this.TokenAddress}&`
          +`chain=bsc&exchange=PancakeSwap%20v2&token_a=${token}&`
          +`router_address=0x10ED43C718714eb63d5aA57B78B54704E256024E&fee=3000`,options);
          const meta = await response.json();
          return meta;     
    }
}
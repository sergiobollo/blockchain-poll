import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import Web3 from 'web3';
import { Contract } from "web3-eth-contract";

const contractAbi = require("./contractABI.json");
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3: Web3;
  private contract: Contract;
  private contractAddress = '0xaBbAfDb2B49f650898c87Bb66B203269f0bD69B4';

  constructor(private zone: NgZone) {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(contractAbi, this.contractAddress);

      window.ethereum.request({ method: 'eth_requestAccounts' }).catch((err) => {
        console.log(err);
      })
    } else {
      console.warn('No se ha encontrado Metamask. Instale o habilite Metamask');
    }
  }

  getAccount(): Promise<string> {
    return this.web3.eth.getAccounts().then((accounts) => accounts[0] || '')
  }

  async executeTransaction(fnName: string, ...args: any[]): Promise<void> {
    const account = await this.getAccount();
    this.contract.methods[fnName](...args).send({ from: account });
  }

  async call(fnName: string, ...args: any[]) {
    const account = await this.getAccount();
    return this.contract.methods[fnName](...args).call({ from: account });
  }

  onEvents(event: string) {
    return new Observable((observer) => {
      this.contract.events[event]().on("data", (data) => {
        this.zone.run(() => {
          observer.next({
            event: data.event,
            payload: data.returnValues
          });
        })
      });
    });
  }
}

import { Injectable } from '@angular/core';
import aapl from '../mocks/aapl.json';
import ino from '../mocks/ino.json';
import pltr from '../mocks/pltr.json';
import pypl from '../mocks/pypl.json';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  stocksHardcoded = [aapl, ino, pltr, pypl];
  stockMap = new Map();
  tickerList: string[] = [];

  constructor() {
    this.translateStock();
  }

  translateStock() {
    this.stocksHardcoded.forEach((stock) => {
      const symbol = stock['Meta Data']['2. Symbol'];
      this.tickerList.push(symbol);
      let editedData: any[] = [];

      const monthlyTimeSeries: any = stock['Monthly Time Series'];
      Object.keys(monthlyTimeSeries).forEach((key) => {
        editedData.push({
          x: new Date(key),
          y: parseFloat(monthlyTimeSeries[key]['4. close']),
        });
      });

      this.stockMap.set(symbol, editedData);
    });
  }

  getAvailableTickers() {
    return this.tickerList;
  }

  getRandomStock() {
    const max = this.stocksHardcoded.length - 1;
    const min = 0;
    const random = Math.floor(Math.random() * (max - min + 1) + min);
    const symbol = this.stocksHardcoded[random]['Meta Data']['2. Symbol'];
    return { symbol, data: this.stockMap.get(symbol) };
  }
}
/*

*/

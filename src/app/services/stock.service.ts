import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import aapl from '../mocks/aapl.json';
import ino from '../mocks/ino.json';
import pltr from '../mocks/pltr.json';
import pypl from '../mocks/pypl.json';

export type MetaData = {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Time Zone': string;
};

export type TimeSeries = {
  [key: string]: {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  };
};

export type MonthlyTimeSeries = Record<string, TimeSeries>;

export type Stock = {
  'Meta Data': MetaData;
  'Monthly Time Series': MonthlyTimeSeries;
};

export type DataPoint = {
  x: string;
  y: number;
};

export type StockData = { symbol: string; data: DataPoint[] };

@Injectable({
  providedIn: 'root',
})
export class StockService {
  stocksHardcoded = [aapl, ino, pltr, pypl];
  stockMap = new Map();
  tickerList: string[] = [];

  constructor(private http: HttpClient) {
    this.translateStock();
  }

  translateStock() {
    this.stocksHardcoded.forEach((stock) => {
      const symbol = stock['Meta Data']['2. Symbol'];
      this.tickerList.push(symbol);
      let editedData: DataPoint[] = [];

      const monthlyTimeSeries: any = stock['Monthly Time Series'];
      Object.keys(monthlyTimeSeries).forEach((key) => {
        editedData.push({
          x: key,
          y: parseFloat(monthlyTimeSeries[key]['4. close']),
        });
      });

      this.stockMap.set(symbol, editedData);
    });
  }

  addLoadedDataFromApi(data: any) {
    this.stocksHardcoded.push(data);
    this.translateStock();
  }

  getStockByTicker(ticker: string) {
    return { symbol: ticker, data: this.stockMap.get(ticker) };
  }

  getAvailableTickers() {
    return this.tickerList;
  }

  getRandomStock(): StockData {
    const max = this.stocksHardcoded.length - 1;
    const min = 0;
    const random = Math.floor(Math.random() * (max - min + 1) + min);
    const symbol = this.stocksHardcoded[random]['Meta Data']['2. Symbol'];
    return { symbol, data: this.stockMap.get(symbol) };
  }

  getStockByTickerAPI(ticker: string) {
    const APIKEY = 'XM9ZUC6EQJJG6HSL';
    const url =
      'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=' +
      ticker +
      '&apikey=' +
      APIKEY;
    return this.http.get(url);
  }
}
/*

*/

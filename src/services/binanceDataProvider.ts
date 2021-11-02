import moment from 'moment';
import { DataSource } from './dataSource';

const BINANCE_API_URL = 'https://api.binance.com/api/v3';

export class BinanceDataProvider implements DataSource {
  private url = BINANCE_API_URL;

  async fetchSymbols(): Promise<string[]> {
    const response = await fetch(`${this.url}/exchangeInfo`);
    const data = await response.json();
    const symbols = [];
    for (let i = 0; i < data.symbols.length; i += 1) {
      symbols.push(data.symbols[i].symbol);
    }
    return symbols;
  }

  async fetchPrices(symbol: string, interval: string):
  Promise<{ timestamps: string[], prices: number[] }> {
    if (symbol === '' || interval === '') {
      return Promise.reject();
    }
    try {
      const response = await fetch(`${this.url}/klines?symbol=${symbol}&interval=${interval}`);
      const klines = await response.json();
      const timestamps = [];
      const prices = [];
      for (let i = 0; i < klines.length; i += 1) {
        const date = new Date(klines[i][0]);
        let formattedDate;
        switch (interval) {
          case '1m':
          case '5m': formattedDate = moment(date).format('HH:mm'); break;
          case '1h': formattedDate = moment(date).format('M/DD HH:mm'); break;
          case '1d': formattedDate = moment(date).format('M/DD'); break;
          default: formattedDate = moment(date).format('M/DD HH:mm');
        }
        timestamps.push(formattedDate);
        prices.push(parseFloat(klines[i][4]));
      }
      return await Promise.resolve({ timestamps, prices });
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

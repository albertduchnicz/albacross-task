import moment from 'moment';
import { DataSource } from './dataSource';

const BINANCE_API_URL = 'https://api.binance.com/api/v3';

export class BinanceDataProvider implements DataSource {
  private url = BINANCE_API_URL;

  async fetchSymbols(): Promise<string[]> {
    const response = await fetch(`${this.url}/exchangeInfo`);
    const data = await response.json();
    return data.symbols.map(({ symbol } : { symbol: string }) => symbol);
  }

  async fetchPrices(symbol: string, interval: string):
  Promise<{ timestamps: string[], prices: number[] }> {
    if (symbol === '' || interval === '') {
      throw new Error('Missing symbol or interval');
    }
    const response = await fetch(`${this.url}/klines?symbol=${symbol}&interval=${interval}`);
    const klines = await response.json();
    const timestamps = [] as string[];
    const prices = [] as number[];
    klines.forEach((kline: (Date | string)[]) => {
      const date = new Date(kline[0] as Date);
      timestamps.push(BinanceDataProvider.formatDate(date, interval));
      prices.push(parseFloat(kline[4] as string));
    });
    return { timestamps, prices };
  }

  static formatDate(date: Date, interval: string): string {
    switch (interval) {
      case '1m':
      case '5m': return moment(date).format('HH:mm'); break;
      case '1h': return moment(date).format('M/DD HH:mm'); break;
      case '1d': return moment(date).format('M/DD'); break;
      default: return moment(date).format('M/DD HH:mm');
    }
  }
}

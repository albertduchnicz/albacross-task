export interface DataSource {
  fetchSymbols(): Promise<string[]>;
  fetchPrices(symbol: string, interval: string): Promise<{ timestamps: string[],
    prices: number[] }>;
}

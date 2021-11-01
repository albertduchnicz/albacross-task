import React from 'react';
import { DataSource } from '../../services/dataSource';
import myCss from './dataSelection.module.css';

type DataSelectionProps = {
  dataSource: DataSource,
  onSymbolChange: (symbol: string) => void,
  onIntervalChange: (interval: string) => void
}
type DataSelectionState = {
  symbols: string[],
  intervals: string[]
}
export class DataSelection extends React.Component<DataSelectionProps, DataSelectionState> {
  state = {
    symbols: [],
    intervals: ['1m', '5m', '15m', '1h', '1d'],
  }

  async componentDidMount(): Promise<void|Error> {
    this.props.dataSource.fetchSymbols()
      .then((data) => {
        this.setState({ symbols: data });
        this.props.onSymbolChange(data[0]);
        this.props.onIntervalChange(this.state.intervals[0]);
      });
  }

  handleSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onSymbolChange(e.target.value);
  }

  handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onIntervalChange(e.target.value);
  }

  render(): React.ReactNode {
    return (
      <div className="DataSelection">
        Symbol:
        {' '}
        <select className={myCss.symbolSelect} data-testid="symbolSelect" onChange={this.handleSymbolChange}>
          {this.state.symbols.map((symbol) => <option key={symbol}>{symbol}</option>)}
        </select>
        Interval:
        {' '}
        <select className={myCss.intervalSelect} data-testid="intervalSelect" onChange={this.handleIntervalChange}>
          {this.state.intervals.map((interval) => <option key={interval}>{interval}</option>)}
        </select>
      </div>
    );
  }
}

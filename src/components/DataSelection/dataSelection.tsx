import React, { useState, useEffect } from 'react';
import { DataSource } from '../../services/dataSource';
import myCss from './dataSelection.module.css';

type DataSelectionProps = {
  dataSource: DataSource,
  onSymbolChange: (symbol: string) => void,
  onIntervalChange: (interval: string) => void
};

export const DataSelection = (props: DataSelectionProps): JSX.Element => {
  const [symbols, setSymbols] = useState([] as string[]);
  const [intervals] = useState(['1m', '5m', '15m', '1h', '1d']);
  const { onSymbolChange, onIntervalChange, dataSource } = props;
  useEffect(() => {
    const fetchData = async () => {
      const result = await dataSource.fetchSymbols();
      setSymbols(result);
      onSymbolChange(result[0]);
      onIntervalChange(intervals[0]);
    };
    if (symbols.length === 0) {
      fetchData();
    }
  });
  return (
    <div className={myCss.dataSelection}>
      Symbol:
      {' '}
      <select className={myCss.symbolSelect} data-testid="symbolSelect" onChange={(e) => onSymbolChange(e.target.value)}>
        {symbols.map((symbol) => <option key={symbol}>{symbol}</option>)}
      </select>
      Interval:
      {' '}
      <select className={myCss.intervalSelect} data-testid="intervalSelect" onChange={(e) => onIntervalChange(e.target.value)}>
        {intervals.map((interval) => <option key={interval}>{interval}</option>)}
      </select>
    </div>
  );
};

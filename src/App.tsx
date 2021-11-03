import React, { useState } from 'react';
import './styles/app.css';
import { Header } from './components/Header';
import { ColorPicker } from './components/ColorPicker';
import { DataSelection } from './components/DataSelection';
import { MyChart } from './components/Chart';
import { Footer } from './components/Footer';
import { BinanceDataProvider } from './services';

export const App = (): JSX.Element => {
  const [dataProvider] = useState(new BinanceDataProvider());
  const [symbol, setSymbol] = useState('');
  const [interval, setInterval] = useState('');
  const [chartColor, setChartColor] = useState('#000');
  return (
    <>
      <Header />
      <div className="Navigation">
        <ColorPicker onColorChange={setChartColor} />
        <DataSelection
          onSymbolChange={setSymbol}
          onIntervalChange={setInterval}
          dataSource={dataProvider}
        />
      </div>
      <div className="Content">
        <MyChart
          symbol={symbol}
          interval={interval}
          color={chartColor}
          dataSource={dataProvider}
        />
      </div>
      <Footer />
    </>
  );
};

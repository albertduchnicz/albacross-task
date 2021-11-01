import React from 'react';
import './styles/app.css';
import { Header } from './components/Header';
import { ColorPicker } from './components/ColorPicker';
import { DataSelection } from './components/DataSelection';
import { MyChart } from './components/Chart';
import { Footer } from './components/Footer';
import { BinanceDataProvider } from './services';

type AppState = {
  symbol: string,
  interval: string,
  chartColor: string
}
export class App extends React.Component {
  state: AppState = {
    symbol: '',
    interval: '',
    chartColor: '#000',
  };

  handleSymbolChange = (symbol: string) => {
    this.setState({ symbol });
  }

  handleIntervalChange = (interval: string) => {
    this.setState({ interval });
  }

  handleChartColorChange = (hexcode: string) => {
    this.setState({ chartColor: hexcode });
  }

  private dataProvider = new BinanceDataProvider();

  render(): React.ReactNode {
    return (
      <>
        <Header />
        <div className="Navigation">
          <ColorPicker onColorChange={this.handleChartColorChange} />
          <DataSelection
            onSymbolChange={this.handleSymbolChange}
            onIntervalChange={this.handleIntervalChange}
            dataSource={this.dataProvider}
          />
        </div>
        <div className="Content">
          <MyChart
            symbol={this.state.symbol}
            interval={this.state.interval}
            color={this.state.chartColor}
            dataSource={this.dataProvider}
          />
        </div>
        <Footer />
      </>
    );
  }
}

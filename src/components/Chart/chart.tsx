import React from 'react';
import { Line } from 'react-chartjs-2';
import { DataSource } from '../../services/dataSource';
import myCss from './chart.module.css';

type MyChartProps = {
  symbol: string,
  interval: string,
  color: string,
  dataSource: DataSource
};
type ChartState = {
  labels: string[],
  prices: number[]
};

export class MyChart extends React.Component<MyChartProps, ChartState> {
  state = {
    labels: [],
    prices: [],
  };

  async componentDidUpdate(prevProps: MyChartProps): Promise<void> {
    if (prevProps.symbol !== this.props.symbol || prevProps.interval !== this.props.interval) {
      await this.reloadChart();
    }
  }

  async reloadChart(): Promise<void> {
    try {
      const { timestamps, prices } = await this.props.dataSource.fetchPrices(this.props.symbol,
        this.props.interval);
      this.setState({
        labels: timestamps,
        prices,
      });
    } catch (err) {
      this.setState({
        labels: [],
        prices: [],
      });
    }
  }

  public render(): React.ReactNode {
    if (this.props.symbol !== '' && this.state.prices.length) {
      const chartOptions = {
        maintainAspectRatio: false,
        elements: {
          line: {
            borderWidth: 1,
          },
        },
      };
      const data = {
        labels: this.state.labels,
        datasets: [{
          label: this.props.symbol,
          data: this.state.prices,
          fill: false,
          backgroundColor: this.props.color,
          borderColor: this.props.color,
          pointRadius: 0,
        }],
      };
      return (
        <div className={myCss.chart}>
          <Line
            data={data}
            options={chartOptions}
            height={400}
            width={800}
          />
        </div>
      );
    }
    return <div>Loading...</div>;
  }
}

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { DataSource } from '../../services/dataSource';
import myCss from './chart.module.css';

type MyChartProps = {
  symbol: string,
  interval: string,
  color: string,
  dataSource: DataSource
};

export const MyChart = (props: MyChartProps): JSX.Element => {
  const [values, setValues] = useState([] as number[]);
  const [labels, setLabels] = useState([] as string[]);
  const { symbol, interval, dataSource } = props;
  useEffect(() => {
    if (symbol !== '' && interval !== '') {
      const reloadChart = async () => {
        const { timestamps, prices } = await dataSource.fetchPrices(symbol, interval);
        setValues(prices);
        setLabels(timestamps);
      };
      reloadChart();
    }
  }, [symbol, interval, dataSource]);
  if (values.length) {
    const chartOptions = {
      maintainAspectRatio: false,
      elements: {
        line: {
          borderWidth: 1,
        },
      },
    };
    const data = {
      labels,
      datasets: [{
        label: props.symbol,
        data: values,
        fill: false,
        backgroundColor: props.color,
        borderColor: props.color,
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
};

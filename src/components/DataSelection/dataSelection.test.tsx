import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { BinanceDataProvider } from '../../services/binanceDataProvider';
import { DataSelection } from './dataSelection';

jest.mock('../../services/binanceDataProvider');
let container: Element | null;
const LIST_OF_SYMBOLS = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE'];
const LIST_OF_INTERVALS = ['1m', '5m', '15m', '1h', '1d'];
const dataProvider = mocked(new BinanceDataProvider(), true);

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  if (container) {
    unmountComponentAtNode(container);
    document.body.removeChild(container);
    container = null;
  }
});

it('checks if component gets initialized', async () => {
  const handleSymbolChange = jest.fn();
  const handleIntervalChange = jest.fn();
  expect(container).not.toBeNull();
  if (container) {
    await act(async () => {
      await dataProvider.fetchSymbols.mockResolvedValue(LIST_OF_SYMBOLS);
      render(<DataSelection
        dataSource={dataProvider}
        onSymbolChange={handleSymbolChange}
        onIntervalChange={handleIntervalChange}
      />, container);
    });
    let options = await container.querySelector('select[data-testid=symbolSelect] options');
    if (options) {
      expect(options).toHaveLength(LIST_OF_SYMBOLS.length);
    }
    options = await container.querySelector('select[data-testid=intervalSelect] options');
    if (options) {
      expect(options).toHaveLength(LIST_OF_INTERVALS.length);
    }
    expect(handleSymbolChange).toHaveBeenCalledTimes(1);
    expect(handleIntervalChange).toHaveBeenCalledTimes(1);
  }
});
it('checks if symbol can be changed and onSymbolChange and onIntervalChange get called correctly',
  async () => {
    const handleSymbolChange = jest.fn();
    const handleIntervalChange = jest.fn();
    expect(container).not.toBeNull();
    if (container) {
      await act(async () => {
        await dataProvider.fetchSymbols.mockResolvedValue(LIST_OF_SYMBOLS);
        render(<DataSelection
          dataSource={dataProvider}
          onSymbolChange={handleSymbolChange}
          onIntervalChange={handleIntervalChange}
        />, container);
      });
      const select = await container.querySelector('select[data-testid=symbolSelect]');
      if (select) {
        fireEvent.change(select, { target: { value: LIST_OF_SYMBOLS[1] } });
      }
      expect(handleSymbolChange).toHaveBeenCalledWith(LIST_OF_SYMBOLS[1]);
      expect(handleSymbolChange).toHaveBeenCalledTimes(2);
      if (select) {
        fireEvent.change(select, { target: { value: LIST_OF_SYMBOLS[2] } });
      }
      expect(handleSymbolChange).toHaveBeenCalledWith(LIST_OF_SYMBOLS[2]);
      expect(handleSymbolChange).toHaveBeenCalledTimes(3);
      expect(handleIntervalChange).toHaveBeenCalledTimes(1);
    }
  });
it('checks if interval can be changed and onSymbolChange and onIntervalChange get called correctly',
  async () => {
    const handleSymbolChange = jest.fn();
    const handleIntervalChange = jest.fn();
    expect(container).not.toBeNull();
    if (container) {
      await act(async () => {
        await dataProvider.fetchSymbols.mockResolvedValue(LIST_OF_SYMBOLS);
        render(<DataSelection
          dataSource={dataProvider}
          onSymbolChange={handleSymbolChange}
          onIntervalChange={handleIntervalChange}
        />, container);
      });
      const select = await container.querySelector('select[data-testid=intervalSelect]');
      if (select) {
        fireEvent.change(select, { target: { value: LIST_OF_INTERVALS[1] } });
      }
      expect(handleIntervalChange).toHaveBeenCalledWith(LIST_OF_INTERVALS[1]);
      expect(handleIntervalChange).toHaveBeenCalledTimes(2);
      if (select) {
        fireEvent.change(select, { target: { value: LIST_OF_INTERVALS[2] } });
      }
      expect(handleIntervalChange).toHaveBeenCalledWith(LIST_OF_INTERVALS[2]);
      expect(handleIntervalChange).toHaveBeenCalledTimes(3);
      expect(handleSymbolChange).toHaveBeenCalledTimes(1);
    }
  });

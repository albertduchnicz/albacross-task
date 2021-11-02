import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { fireEvent } from '@testing-library/react';
import { ColorPicker } from './colorPicker';

let container: Element | null;
const PALETTE_COLOR_1 = '#B80000';
const PALETTE_COLOR_16 = '#D4C4FB';

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

test('should show and hides colors palette', async () => {
  const handleColorChange = jest.fn();
  expect(container).not.toBeNull();
  if (container) {
    render(<ColorPicker onColorChange={handleColorChange} />, container);
    expect(container.querySelector('.github-picker')).toBeFalsy();
    const button = container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }
    expect(container.querySelector('.github-picker')).toBeTruthy();
    if (button) {
      fireEvent.click(button);
    }
    expect(container.querySelector('.github-picker')).toBeFalsy();
  }
});
test('should return first color from the palette', async () => {
  const handleColorChange = jest.fn();
  expect(container).not.toBeNull();
  if (container) {
    render(<ColorPicker onColorChange={handleColorChange} />, container);
    const button = await container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }
    const color = await container.querySelector(`div[title="${PALETTE_COLOR_1}"]`);
    if (color) {
      fireEvent.click(color);
    }
    expect(handleColorChange).toHaveBeenCalledWith(PALETTE_COLOR_1);
  }
});
test('should return last color from the palette', async () => {
  const handleColorChange = jest.fn();
  expect(container).not.toBeNull();
  if (container) {
    render(<ColorPicker onColorChange={handleColorChange} />, container);
    const button = await container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }
    const color = await container.querySelector(`div[title="${PALETTE_COLOR_16}"]`);
    if (color) {
      fireEvent.click(color);
    }
    expect(handleColorChange).toHaveBeenCalledWith(PALETTE_COLOR_16);
  }
});

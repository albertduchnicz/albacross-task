import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/react";
import { ColorPicker } from './colorPicker';

let container = null;
const PALETTE_COLOR_1 = '#B80000';
const PALETTE_COLOR_16 = '#D4C4FB';

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  document.body.removeChild(container);
  container = null;
});

test("should show and hides colors palette", async () => {
  render(<ColorPicker />, container);
  expect(container.querySelector('.github-picker')).toBeFalsy();
  const button = container.querySelector('button');
  fireEvent.click(button);
  expect(container.querySelector('.github-picker')).toBeTruthy();
  fireEvent.click(button);
  expect(container.querySelector('.github-picker')).toBeFalsy();
});
test("should return first color from the palette", async () => {
  const handleColorChange = jest.fn();
  render(<ColorPicker onColorChange={handleColorChange} />, container);
  const button = await container.querySelector('button');
  fireEvent.click(button); 
  const color = await container.querySelector(`div[title="${PALETTE_COLOR_1}"]`);
  fireEvent.click(color);
  expect(handleColorChange).toHaveBeenCalledWith(PALETTE_COLOR_1);
});
test("should return last color from the palette", async () => {
  const handleColorChange = jest.fn();
  render(<ColorPicker onColorChange={handleColorChange} />, container);
  const button = await container.querySelector('button');
  fireEvent.click(button); 
  const color = await container.querySelector(`div[title="${PALETTE_COLOR_16}"]`);
  fireEvent.click(color);
  expect(handleColorChange).toHaveBeenCalledWith(PALETTE_COLOR_16);
});
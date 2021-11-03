import React, { useState } from 'react';
import { GithubPicker } from 'react-color';
import myCss from './colorPicker.module.css';

type ColorPickerProps = {
  onColorChange: (hexcode: string) => void
};

export const ColorPicker = (props: ColorPickerProps): JSX.Element => {
  const [display, setDisplay] = useState(false);
  return (
    <>
      <button
        className={myCss.toggleButton}
        onClick={() => setDisplay(!display)}
        onKeyDown={() => setDisplay(!display)}
        type="button"
      >
      &nbsp;
      </button>
      {display
        ? (
          <div className={myCss.popover}>
            <div className={myCss.cover} onClick={() => setDisplay(false)} onKeyDown={() => setDisplay(false)} role="presentation" />
            <div style={{ position: 'absolute' }}>
              <GithubPicker onChange={(color) => props.onColorChange(color.hex.toUpperCase())} />
            </div>
          </div>
        ) : null}
    </>
  );
};

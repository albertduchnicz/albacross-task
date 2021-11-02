import React from 'react';
import { GithubPicker } from 'react-color';
import myCss from './colorPicker.module.css';

type ColorPickerState = {
  display: boolean
};
type ColorPickerProps = {
  onColorChange: (hexcode: string) => void
};
export class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
  state = {
    display: false,
  };

  handleClick = (): void => {
    this.setState((prevState) => ({ display: !prevState.display }));
  };

  handleKeyDown = (): void => {
    this.handleClick();
  };

  handleClose = (): void => {
    this.setState({ display: false });
  };
  // eslint-disable-next-line
  handleChange = (color: any) => {
    this.props.onColorChange(color.hex.toUpperCase());
  };

  render(): React.ReactNode {
    return (
      <>
        <button
          className={myCss.toggleButton}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          type="button"
        >
        &nbsp;
        </button>
        {this.state.display
          ? (
            <div className={myCss.popover}>
              <div className={myCss.cover} onClick={this.handleClose} onKeyDown={this.handleClose} role="presentation" />
              <div style={{ position: 'absolute' }}>
                <GithubPicker onChange={this.handleChange} />
              </div>
            </div>
          ) : null}
      </>
    );
  }
}

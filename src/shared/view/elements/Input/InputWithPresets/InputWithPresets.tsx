import React from 'react';
import block from 'bem-cn';
import { autobind } from 'core-decorators';
import ButtonBase from '@material-ui/core/ButtonBase';

import TextInput, { IProps as ITextInputProps } from '../TextInput';

import './InputWithPresets.scss';

interface IPreset {
  value: string;
  icon: JSX.Element;
}

interface IProps extends ITextInputProps {
  presets: IPreset[];
  onPresetClick(presetValue: string): void;
}

const b = block('input-with-presets');

class InputWithPresets extends React.PureComponent<IProps> {
  public render() {
    const { presets, onPresetClick, ...rest } = this.props;
    return (
      <div className={b()}>
        <TextInput {...rest} />
        <div className={b('presets')}>
          {presets.map((x, i) => (
            <ButtonBase
              className={b('preset').toString()}
              onClick={this.makePresetClickHandler(x.value)}
              key={i}
              focusRipple
              disableTouchRipple
            >
              {x.icon}
            </ButtonBase>
          ))}
        </div>
      </div>
    );
  }

  @autobind
  private makePresetClickHandler(presetValue: IPreset['value']) {
    return () => this.props.onPresetClick(presetValue);
  }
}

export { IPreset };
export default InputWithPresets;

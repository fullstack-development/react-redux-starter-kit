import React from 'react';
import block from 'bem-cn';
import { autobind } from 'core-decorators';
import ButtonBase from '@material-ui/core/ButtonBase';

import { TextInput, IProps as ITextInputProps } from '../TextInput';
import { withStyles } from "@material-ui/core";
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

const PresetButton = withStyles({
  root: {
    padding: '8px 11px',
    borderRadius: '16px',
    background: 'rgba(0, 0, 0, 0.12)',
    cursor: 'pointer',
  }
})(ButtonBase)

class InputWithPresets extends React.PureComponent<IProps> {
  public render() {
    const {presets, onPresetClick, ...rest} = this.props;
    return (
      <div className={b()}>
        <TextInput {...rest} />
        <div className={b('presets')}>
          {presets.map((x, i) => (
            <PresetButton
              className={b('preset').toString()}
              onClick={this.makePresetClickHandler(x.value)}
              key={i}
              focusRipple
              disableTouchRipple
            >
              {x.value}
            </PresetButton>
          ))}
        </div>
      </div>
    );
  }

  @autobind
  private makePresetClickHandler(presetValue: IPreset['value']) {
    const {onPresetClick} = this.props;
    return () => onPresetClick(presetValue);
  }
}

export {InputWithPresets, IPreset};

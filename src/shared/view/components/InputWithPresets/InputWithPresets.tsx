import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { GetProps } from '_helpers';

import { TextInput } from 'shared/view/elements';

import './InputWithPresets.scss';

interface IPreset {
  value: string;
  icon: JSX.Element;
}

interface IProps extends GetProps<typeof TextInput> {
  presets: IPreset[];
  onPresetClick(presetValue: string): void;
}

const b = block('input-with-presets');

class InputWithPresets extends React.PureComponent<IProps> {
  public render() {
    const { presets, ...rest } = this.props;
    return (
      <div className={b()}>
        <TextInput {...rest} />
        {presets.map((x, i) => (
          <div className={b('preset')} onClick={this.makePresetClickHandler(x.value)} key={i}>
            {x.icon}
          </div>
        ))}
      </div>
    );
  }

  @bind
  private makePresetClickHandler(presetValue: IPreset['value']) {
    return () => this.props.onPresetClick(presetValue);
  }
}

export { IPreset };
export default InputWithPresets;

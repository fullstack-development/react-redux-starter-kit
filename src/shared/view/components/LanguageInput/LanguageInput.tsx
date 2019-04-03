import React from 'react';
import block from 'bem-cn';
import { CppIcon, CsIcon, JavaIcon, JSIcon, TSIcon, PythonIcon, RubyIcon } from 'shared/view/elements';
import InputWithPresets, { IPreset } from '../InputWithPresets/InputWithPresets';

const b = block('language-input');

interface IProps {
  onLanguageSelect(language: string): void;
}

class LanguageInput extends React.PureComponent<IProps> {
  private presets: IPreset[] = [
    { value: 'C++', icon: <CppIcon /> },
    { value: 'C#', icon: <CsIcon /> },
    { value: 'JavaScript', icon: <JSIcon /> },
    { value: 'TypeScript', icon: <TSIcon /> },
    { value: 'Java', icon: <JavaIcon /> },
    { value: 'Python', icon: <PythonIcon /> },
    { value: 'Ruby', icon: <RubyIcon /> },
  ];

  public render() {
    const { onLanguageSelect } = this.props;

    return (
      <div className={b()}>
        <InputWithPresets presets={this.presets} onPresetClick={onLanguageSelect} />
      </div>
    );
  }
}

export default LanguageInput;

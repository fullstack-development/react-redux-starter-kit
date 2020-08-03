import React from 'react';
import block from 'bem-cn';
import {
  CppIcon,
  CsIcon,
  JavaIcon,
  JSIcon,
  TSIcon,
  PythonIcon,
  RubyIcon,
  SwiftIcon,
  CIcon,
  HaskellIcon,
  RadioChipField,
} from 'shared/view/elements';

import './LanguageInputField.scss';

const b = block('language-input');

interface LanguageInputFieldProps {
  name: string,
  label: string
}

type IProps = LanguageInputFieldProps;


class LanguageInputField extends React.Component<IProps> {
  private presets = [
    {value: 'C', icon: <CIcon/>},
    {value: 'C++', icon: <CppIcon/>},
    {value: 'C#', icon: <CsIcon/>},
    {value: 'Java', icon: <JavaIcon/>},
    {value: 'JavaScript', icon: <JSIcon/>},
    {value: 'TypeScript', icon: <TSIcon/>},
    {value: 'Python', icon: <PythonIcon/>},
    {value: 'Ruby', icon: <RubyIcon/>},
    {value: 'Swift', icon: <SwiftIcon/>},
    {value: 'Haskell', icon: <HaskellIcon/>},
  ];

  public render() {
    const {name, label} = this.props;

    return (
      <div className={b()}>
        <div className={b('label')}>{label}</div>
        <div className={b('chips')}>
          {
            this.presets.map((chip, i) =>
              <RadioChipField key={i} name={name} value={chip.value} label={chip.value}/>
            )
          }
        </div>
      </div>
    );
  }
}

export {LanguageInputField, IProps as ILanguageInputField}

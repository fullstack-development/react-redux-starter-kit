import React from 'react';
import block from 'bem-cn';
import { FieldRenderProps } from 'react-final-form';

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
  InputWithPresets,
} from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';
import { TranslateFunction } from 'services/i18n';

const b = block('language-input');

type IProps = Omit<React.ComponentProps<typeof InputWithPresets>, 'presets' | 'onPresetClick'> & FieldRenderProps
& { t: TranslateFunction };

class LanguageInputFieldComponent extends React.PureComponent<IProps> {
  private presets = [
    { value: 'C', icon: <CIcon /> },
    { value: 'C++', icon: <CppIcon /> },
    { value: 'C#', icon: <CsIcon /> },
    { value: 'Java', icon: <JavaIcon /> },
    { value: 'JavaScript', icon: <JSIcon /> },
    { value: 'TypeScript', icon: <TSIcon /> },
    { value: 'Python', icon: <PythonIcon /> },
    { value: 'Ruby', icon: <RubyIcon /> },
    { value: 'Swift', icon: <SwiftIcon /> },
    { value: 'Haskell', icon: <HaskellIcon /> },
  ];

  public render() {
    const { input, meta, t, ...rest } = this.props;
    const error = typeof rest.error === 'boolean'
      ? rest.error && meta.error
      : meta.touched && meta.error;
    return (
      <div className={b()}>
        <InputWithPresets
          {...rest}
          {...input}
          helperText={error && t(error)}
          error={Boolean(error)}
          presets={this.presets}
          onPresetClick={input.onChange}
        />
      </div>
    );
  }
}

export const LanguageInputField = getFieldWithComponent(LanguageInputFieldComponent);

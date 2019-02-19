import React from 'react';
import { bind } from 'decko';

import { Lang, ITranslateProps } from '../../namespace';
import { withI18n } from '../withI18n/withI18n';

interface IOption {
  value: Lang;
  label: string;
}

class LanguageSelector extends React.PureComponent<ITranslateProps> {
  public static options: IOption[] = [
    { value: 'en', label: 'en' },
    { value: 'ru', label: 'ru' },
  ];

  public render() {
    const { locale } = this.props;

    return (
      <div>
        <select value={locale} onChange={this.changeLanguage}>
          {LanguageSelector.options.map(({ value, label }, i) => (
            <option value={value} key={i}>{label}</option>
          ))}
        </select>
      </div>
    );
  }

  @bind
  private changeLanguage({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) {
    this.props.changeLanguage(value as Lang);
  }
}

export default withI18n(LanguageSelector);

import * as React from 'react';
import { bind } from 'decko';
import { withNamespaces as withI18n, WithNamespaces } from 'react-i18next';
import { Lang } from 'shared/types/app';

interface IOption {
  value: Lang;
  label: string;
}

class LanguageSelector extends React.PureComponent<WithNamespaces> {
  public static options: IOption[] = [
    { value: 'en', label: 'en' },
    { value: 'ru', label: 'ru' },
  ];

  public render() {
    const { lng } = this.props;

    return (
      <div>
        <select value={lng} onChange={this.changeLanguage}>
          {LanguageSelector.options.map(({ value, label }, i) => (
            <option value={value} key={i}>{label}</option>
          ))}
        </select>
      </div>
    );
  }

  @bind
  private changeLanguage({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) {
    const { i18n } = this.props;
    i18n.changeLanguage(value);
  }
}

export default withI18n()(LanguageSelector);

// tslint:disable-next-line: import-blacklist
import { WithTranslation, withTranslation } from 'react-i18next';
import React from 'react';
import { autobind } from 'core-decorators';
import block from 'bem-cn';

import { Lang } from 'shared/types/app';
import { Select } from 'shared/view/elements';

import './LanguageSelector.scss';

interface IOption {
  value: Lang;
  label: string;
}

const b = block('select');

class LanguageSelector extends React.PureComponent<WithTranslation> {
  public static options: IOption[] = [
    { value: 'en-US', label: 'English' },
    { value: 'ru-RU', label: 'Русский' },
  ];

  public render() {
    const { i18n: { language } } = this.props;

    return (
      <Select
        value={language}
        options={LanguageSelector.options}
        onChange={this.changeLanguage}
        SelectProps={{
          classes: {
            root: b(),
            icon: b('icon').toString(),
          },
        }}
      />
    );
  }

  @autobind
  private changeLanguage({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) {
    const { i18n } = this.props;
    i18n.changeLanguage(value);
  }
}

export { LanguageSelector };
export default withTranslation()(LanguageSelector);

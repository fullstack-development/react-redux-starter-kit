import * as React from 'react';
import * as Polyglot from 'node-polyglot';

import { withProps } from 'shared/helpers/react';

import { ITranslateFunction, Lang, ITranslateKey } from '../../namespace';
import { DEFAULT_LANGUAGE, I18nContext } from '../../constants';
import { phrasesByLocale as phrases } from '../../locales';

interface IOwnProps {
  phrasesByLocale: typeof phrases;
}

interface IState {
  locale: Lang;
  translator: ITranslateFunction;
  changeLanguage(lang: Lang): void;
}

type IProps = IOwnProps;

class I18nProvider extends React.Component<IProps, IState> {
  public polyglot: Polyglot = new Polyglot({
    locale: DEFAULT_LANGUAGE,
    phrases: this.props.phrasesByLocale[DEFAULT_LANGUAGE],
  });

  public state: IState = {
    locale: DEFAULT_LANGUAGE,
    translator: this.makeTranslator(this.polyglot),
    changeLanguage: this.changeLanguage,
  };

  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    const { phrasesByLocale } = this.props;
    const { locale } = this.state;
    if (prevState.locale !== locale || prevProps.phrasesByLocale !== phrasesByLocale) {
      this.polyglot.locale(locale);
      this.polyglot.replace(phrasesByLocale[locale]);
      this.setState({ translator: this.makeTranslator(this.polyglot) });
    }
  }

  public render() {
    const { children } = this.props;
    const { locale, translator, changeLanguage } = this.state;
    return (
      <I18nContext.Provider value={{ t: translator, locale, changeLanguage }}>
        {children}
      </I18nContext.Provider>
    );
  }

  private changeLanguage(value: Lang) {
    this.setState({ locale: value });
  }

  private makeTranslator(polyglot: Polyglot): ITranslateFunction {
    return (phrase: ITranslateKey, smartCountOrInterpolationOptions?: number | Polyglot.InterpolationOptions) => {
      if (typeof phrase === 'string') {
        return polyglot.t(phrase, smartCountOrInterpolationOptions as any);
      }
      return polyglot.t(phrase.key, phrase.params);
    };
  }
}

export default withProps(I18nProvider, { phrasesByLocale: phrases });

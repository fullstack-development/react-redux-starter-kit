import { IReduxEntry } from 'shared/types/app';

import { reducer, actions, selectors } from './redux';

export { reducer, actions, selectors };
export { default as I18nProvider } from './view/I18nProvider/I18nProvider';
export { ITranslateProps, ITranslateFunction, ITranslateKey, IReduxState } from './namespace';
export { i18nConsumer } from './view/i18nConsumer/i18nConsumer';
export { default as LanguageSelector } from './view/LanguageSelector/LanguageSelector';
export { tKeys, I18nContext } from './constants';

export const reduxEntry: IReduxEntry = {
  reducers: { i18n: reducer },
};

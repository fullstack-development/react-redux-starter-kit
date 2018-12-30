import { IReduxEntry } from 'shared/types/app';

import { reducer, actions, selectors } from './redux';

export { reducer, actions, selectors };
export { default as I18n } from './I18n';
export { ITranslateProps, ITranslateFunction, IReduxState } from './namespace';
export { i18nConnect } from './view/i18nConnect/i18nConnect';
export { default as LanguageSelector } from './view/LanguageSelector/LanguageSelector';
export { tKeys } from './constants';

export const reduxEntry: IReduxEntry = {
  reducers: { i18n: reducer },
};

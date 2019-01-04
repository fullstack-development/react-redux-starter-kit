import { IAppReduxState } from 'shared/types/app';
import * as NS from '../namespace';

function selectI18N(state: IAppReduxState): NS.IReduxState {
  if (!state.i18n) {
    throw new Error(`Cannot find i18n feature state!`);
  }
  return state.i18n;
}

export function selectCurrentLocale(state: IAppReduxState): NS.Lang {
  return selectI18N(state).data.currentLocale;
}

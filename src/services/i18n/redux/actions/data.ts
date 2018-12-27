import * as NS from '../../namespace';

export function changeLanguage(lang: NS.Lang): NS.IChangeLanguage {
  return { type: 'I18N_SERVICE:CHANGE_LANGUAGE', payload: lang };
}

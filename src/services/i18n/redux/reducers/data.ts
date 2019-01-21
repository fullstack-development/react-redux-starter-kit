import * as NS from '../../namespace';
import initial from '../initial';

type ILanguageState = NS.IReduxState['data'];

function dataReducer(state: ILanguageState = initial.data, action: NS.Action): ILanguageState {
  switch (action.type) {
    case 'I18N_SERVICE:CHANGE_LANGUAGE':
      return { ...state, currentLocale: action.payload };
    default: return state;
  }
}

export default dataReducer;

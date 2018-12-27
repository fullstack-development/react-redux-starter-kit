import { IReduxState } from '../namespace';
import { DEFAULT_LANGUAGE } from '../constants';

const initial: IReduxState = {
  data: {
    currentLocale: DEFAULT_LANGUAGE,
  },
};

export default initial;

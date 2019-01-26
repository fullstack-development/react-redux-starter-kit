import { initialCommunicationField } from 'shared/constants';
import { IReduxState } from '../namespace';

const initial: IReduxState = {
  data: {
    cakesPreview: [],
  },
  communication: {
    loadCakesPreview: initialCommunicationField,
  },
};

export default initial;

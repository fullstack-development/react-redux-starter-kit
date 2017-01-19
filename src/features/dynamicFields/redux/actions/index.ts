import { loadFields } from './communication';
import { changeFieldValue } from './data';
import saga from './sagas';

const actions = {
  saga,
  loadFields,
  changeFieldValue,
};

export default actions;

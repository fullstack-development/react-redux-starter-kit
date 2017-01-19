import {
  loadCategories,
  chooseCategory,
} from './communication';
import saga from './sagas';

const actions = {
  saga,
  loadCategories,
  chooseCategory,
};

export default actions;

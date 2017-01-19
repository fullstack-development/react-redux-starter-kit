import { loadCities } from './communication';
import { selectLocationByAreaId } from './data';
import saga from './sagas';

const actions = {
  saga,
  loadCities,
  selectLocationByAreaId,
};

export default actions;

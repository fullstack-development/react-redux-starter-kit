import { spy } from 'sinon';

const defaultProps = {
  options: [],
  selectedLocation: null,
  showLocation: false,
};

const actionsProps = {
  loadCities: spy(),
  selectLocation: spy(),
};

export { actionsProps, defaultProps };

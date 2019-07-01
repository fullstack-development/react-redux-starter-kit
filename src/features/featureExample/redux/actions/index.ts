import * as NS from '../../namespace';

export function increment(): NS.IIncrement {
  return {
    type: 'FEATURE_EXAMPLE:INCREMENT',
  };
}

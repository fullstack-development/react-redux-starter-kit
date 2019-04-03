import { makeFeatureEntry } from '..';

describe('(shared/helpers) makeFeatureEntry', () => {
  it('should only add TypeScript type and not change entry object', () => {
    const containers = {};
    const actions = {};
    const selectors = {};
    const reduxEntry = {
      reducers: {},
      sagas: [],
    };
    const entry = { containers, actions, selectors, reduxEntry };
    const featureEntry = makeFeatureEntry(entry);
    expect(featureEntry).toEqual(entry);
  });
});

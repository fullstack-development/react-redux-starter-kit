import { makeFeatureEntry } from '..';

describe('(shared/helpers) makeFeatureEntry', () => {
  it('should only add TypeScript type and not change entry object', () => {
    const containers = {};
    const actionCreators = {};
    const selectors = {};
    const reduxEntry = {
      reducers: {},
      sagas: [],
    };
    const entry = { containers, actionCreators, selectors, reduxEntry };
    const featureEntry = makeFeatureEntry(entry);
    expect(featureEntry).toEqual(entry);
  });
});

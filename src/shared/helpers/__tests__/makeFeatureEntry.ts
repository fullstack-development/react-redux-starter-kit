import { makeFeatureEntry } from '..';

describe('(shared/helpers) makeFeatureEntry', () => {
  it('should return object with containers, actions, selectors, reducers and sagas', () => {
    const containers = {};
    const actions = {};
    const selectors = {};
    const reduxEntry = {
      reducers: {},
      sagas: [],
    };
    const featureEntry = makeFeatureEntry(containers, actions, selectors, reduxEntry);
    expect(featureEntry.containers).toBe(containers);
    expect(featureEntry.actions).toBe(actions);
    expect(featureEntry.selectors).toBe(selectors);
    expect(featureEntry.reducers).toBe(reduxEntry.reducers);
    expect(featureEntry.sagas).toBe(reduxEntry.sagas);
  });
});

import { autobind } from 'core-decorators';
import { injectable } from 'inversify';

import { IFeatureEntry, IReduxEntry } from 'shared/types/app';

import { inject, TYPES } from './configureIoc';

type FeatureLoader = () => Promise<IFeatureEntry>;
type FeaturesLoaders = Record<string, FeatureLoader>;

@injectable()
class AsyncFeaturesManager {
  private features = new Map<string, IFeatureEntry>();

  @inject(TYPES.connectEntryToStore)
  private connectFeatureToStore!: (entry: IReduxEntry) => void;

  @autobind
  public loadFeatures(loaders: FeaturesLoaders) {
    const featuresNames = Object.keys(loaders);

    return Promise.all(
      featuresNames.map((featureName) => {
        return loaders[featureName]().then(bundle => {
          bundle.reduxEntry && this.connectFeatureToStore(bundle.reduxEntry);
          this.features.set(featureName, bundle);
        });
      }),
    );
  }

  @autobind
  public areFeaturesLoaded(featuresNames: string[]) {
    return featuresNames.every(x => this.features.has(x));
  }

  @autobind
  public getFeaturesEntries(featuresNames: string[]): Record<string, IFeatureEntry> {
    return featuresNames.reduce((acc, featureName) => ({
      ...acc,
      [featureName]: this.features.get(featureName),
    }), {});
  }
}

const asyncFeaturesManager = new AsyncFeaturesManager();

export { asyncFeaturesManager };

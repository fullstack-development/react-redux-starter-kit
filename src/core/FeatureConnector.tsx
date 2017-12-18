import * as React from 'react';
import { bind } from 'decko';

import { injectable } from 'inversify';
import { inject, TYPES } from './configureIoc';

import { IDictionary, IFeatureEntry, Omit } from 'shared/types/app';

type FeatureLoader = () => Promise<IFeatureEntry<any, any, any>>;

function featureConnect<L extends IDictionary<FeatureLoader>>(loaders: L, preloader?: React.ReactChild):
  // tslint:disable-next-line:max-line-length
  <Props extends {[K in keyof L]: any}>(WrappedComponent: React.ComponentType<Props>) => React.ComponentType<Omit<Props, keyof L>> {
  interface IState {
    bundles: {
      [key: string]: any;
    };
  }

  return ((WrappedComponent: any) => {

    @injectable()
    class FeatureConnector extends React.PureComponent<any, IState> {
      public state: IState = { bundles: {} };

      @inject(TYPES.connectEntryToStore)
      private connectFeatureToStore: (entry: IFeatureEntry<any, any, any>) => void;

      public componentWillMount() {
        this.load();
      }

      public render() {
        if (!this.isAllBundlesLoaded()) {
          return preloader || null;
        } else {
          return <WrappedComponent {...this.state.bundles} {...this.props} />;
        }
      }

      @bind
      private load() {
        const keys: Array<keyof L> = Object.keys(loaders);
        keys.forEach((key) => {
          loaders[key]().then(bundle => {
            this.connectFeatureToStore(bundle);
            this.setState(state => ({
              ...state,
              bundles: {
                ...state.bundles,
                [key]: bundle,
              },
            }));
          });
        });
      }

      @bind
      private isAllBundlesLoaded(): boolean {
        return Object.keys(loaders).every(key => this.state.bundles[key]);
      }
    }

    return FeatureConnector;
  }) as any;
}

export default featureConnect;

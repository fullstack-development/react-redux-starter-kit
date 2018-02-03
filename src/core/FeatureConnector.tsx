import * as React from 'react';
import { bind } from 'decko';

import { injectable } from 'inversify';
import { inject, TYPES } from './configureIoc';

import { IDictionary, IFeatureEntry, Omit } from 'shared/types/app';

type FeatureLoader = () => Promise<IFeatureEntry<any, any, any>>;

interface IState {
  bundles: {
    [key: string]: IFeatureEntry<any, any, any>;
  };
}

function featureConnect<L extends IDictionary<FeatureLoader>>(loaders: L, preloader?: React.ReactChild):
  // tslint:disable-next-line:max-line-length
  <Props extends {[K in keyof L]: any}>(WrappedComponent: React.ComponentType<Props>) => React.ComponentType<Omit<Props, keyof L>> {

  return <Props extends {[K in keyof L]: any}>(
    WrappedComponent: React.ComponentType<Props>,
  ): React.ComponentClass<Omit<Props, keyof L>> => {

    @injectable()
    class FeatureConnector extends React.PureComponent<Omit<Props, keyof L>, IState> {
      public state: IState = { bundles: {} };

      @inject(TYPES.connectEntryToStore)
      private connectFeatureToStore!: (entry: IFeatureEntry<any, any, any>) => void;

      public componentWillMount() {
        this.load();
      }

      public componentWillUnmount() {
        this.saveBundleToState = null;
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
            if (this.saveBundleToState) {
              this.saveBundleToState(bundle, key);
            }
          });
        });
      }

      private saveBundleToState: null | ((bundle: IFeatureEntry<any, any, any>, key: string) => void) =
        (bundle, key) => {
          this.setState(state => ({
            ...state,
            bundles: {
              ...state.bundles,
              [key]: bundle,
            },
          }));
        }

      @bind
      private isAllBundlesLoaded(): boolean {
        return Object.keys(loaders).every(key => Boolean(this.state.bundles[key]));
      }
    }

    return FeatureConnector;
  };
}

export default featureConnect;

import React from 'react';
import { autobind } from 'core-decorators';
import * as R from 'ramda';
import { injectable } from 'inversify';

import { Omit, GetProps, SubSet } from '_helpers';
import { inject, TYPES } from './configureIoc';

import { IFeatureEntry, IReduxEntry } from 'shared/types/app';

type FeatureLoader = () => Promise<IFeatureEntry>;

interface IState {
  mounted: boolean;
}

const bundles = new Map<FeatureLoader, IFeatureEntry>();

// tslint:disable:max-line-length
function featureConnect<L extends Record<string, FeatureLoader>>(loaders: L, preloader?: React.ReactChild):
  <Props extends { [K in keyof L]: any }>(WrappedComponent: React.ComponentType<Props>) => React.ComponentType<Omit<Props, keyof L>> {

  return <Props extends { [K in keyof L]: any }>(
    WrappedComponent: React.ComponentType<Props>,
  ): React.ComponentClass<Omit<Props, keyof L>> => {

    @injectable()
    class FeatureConnector extends React.PureComponent<Props, IState> {
      public state: IState = { mounted: false };

      @inject(TYPES.connectEntryToStore)
      private connectFeatureToStore!: (entry: IReduxEntry) => void;

      public async bootstrap() {
        await this.load();
      }

      public componentDidMount() {
        if (!this.isAllBundlesLoaded()) {
          this.load();
        }
        this.setState({ mounted: true });
      }

      public componentWillUnmount() {
        this.saveBundle = null;
        this.setState({ mounted: false });
      }

      public render() {
        if (!this.isAllBundlesLoaded()) {
          return preloader || null;
        } else {
          return <WrappedComponent {...this.getBundles()} {...this.props} />;
        }
      }

      @autobind
      private async load() {
        const keys: Array<keyof L> = Object.keys(loaders);

        await Promise.all(
          keys.map((key) => {
            return loaders[key]().then(bundle => {
              bundle.reduxEntry && this.connectFeatureToStore(bundle.reduxEntry);
              if (this.saveBundle) {
                this.saveBundle(bundle, key);
              }
            });
          }),
        );

        this.saveBundle && this.state.mounted && this.forceUpdate();
      }

      private saveBundle: null | ((bundle: IFeatureEntry, key: keyof L) => void) = (bundle, key) => {
        bundles.set(loaders[key], bundle);
      }

      private getBundles(): Record<string, IFeatureEntry> {
        return R.map(value => bundles.get(value) || {}, loaders);
      }

      @autobind
      private isAllBundlesLoaded(): boolean {
        return Object.keys(loaders).every(key => Boolean(bundles.get(loaders[key])));
      }
    }

    return FeatureConnector;
  };
}

type IFeatureEntryWithContainers<
  C extends Record<string, React.ComponentType<any>>
  > = SubSet<IFeatureEntry, { containers: C }>;

export function getAsyncContainer<C extends Record<string, React.ComponentType<any>>, K extends keyof C>(
  loader: () => Promise<IFeatureEntryWithContainers<C>>, componentName: K,
): React.ComponentClass<GetProps<C[K]>> {
  interface IRenderProps {
    _entry?: IFeatureEntryWithContainers<C>;
  }

  function render({ _entry, ...props }: IRenderProps) {
    if (!_entry || !_entry.containers) { return null; }
    const Container: React.ComponentType<any> = _entry.containers[componentName];
    return <Container {...props} />;
  }

  return featureConnect({ _entry: loader })(render) as React.ComponentClass<GetProps<C[K]>>;
}

export default featureConnect;

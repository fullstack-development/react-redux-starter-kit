# Lazy feature
To speed up the application initialization and the initial load processes, a feature's content can be loaded lazily. To achieve this, a dynamic import & webpack chunks are used so a feature is loaded only on demand. The details of how it's implemented are listed below.

## Feature entry
Each lazy feature must have a file called `entry.ts`, containing a *feature entry*, which is basically an object with data that gets exported by the feature. The entry is created using a shared helper function `makeFeatureEntry` and is the part of the feature which is getting loaded dynamically.
```
/* userSearch feature */

import { makeFeatureEntry } from 'shared/helpers/makeFeatureEntry';

import * as containers from './view/containers';
import { actions, selectors, reducer, getSaga } from './redux';

const entry = makeFeatureEntry({
  containers,
  actions,
  selectors,
  redux: {
    reducers: { userSearch: reducer },
    sagas: [getSaga],
  },
});

type Entry = typeof entry;

export { Entry, entry };
```
## Feature loader
Each lazy feature must have a file called `loader.ts`, containing a function called `loadEntry` which would import the entry dynamically.

```
import { Entry } from './entry';

export function loadEntry(): Promise<Entry> {
  return import('./entry').then(feature => feature.entry);
}
```

## How to use a lazy feature
### In modules

A lazy feature which is used in a module is loaded using a `featureConnect` HOC. It takes a map with features' loaders (you can also pass a preloader as a second argument and it'll be shown while the entries are loading) and returns a component with features' entries passed as props.

```
/* userSearch feature used in Search module */

import React from 'react';
import block from 'bem-cn';

import * as features from 'features';
import featureConnect from 'core/FeatureConnector';

import Layout from '../shared/Layout/Layout';
import './UsersSearchLayout.scss';

interface IFeatureProps {
  usersSearchFeatureEntry: features.usersSearch.Entry;
}

type IProps = IFeatureProps;

const b = block('users-search-layout');

function UsersSearchLayout(props: IProps) {
  const { usersSearchFeatureEntry: { containers } } = props;
  const { UsersSearchForm, UsersSearchResults } = containers;

  return (
    <Layout title="GitHub users search">
      <div className={b()}>
        <div className={b('search-form')}>
          <UsersSearchForm />
        </div>
        <UsersSearchResults />
      </div>
    </Layout>
  );
}

export default featureConnect({
  usersSearchFeatureEntry: features.usersSearch.loadEntry,
})(UsersSearchLayout);
```

In this example `usersSearchFeatureEntry` will be loaded only when `UsersSearchLayout` is being used. `featureConnect` also automatically connects provided features to the redux store.

### In ContainersProvider

If a feature needs to use another feature's container, it is loaded using the `containersProvider` HOC. It works the same way as the `featureConnect`, but:
- it takes an array of container names as the first argument (a feature doesn't really know that it's using a container of some other feature, because from its perspective `containersProvider` is just an API for getting containers by their name);
- a component returned by `containersProvider` includes only chosen containers as props and not feature entries with all feature's data;
- `containersProvider` provides only those containers that are defined in its configuration in the `ContainersProvider.tsx` file. If you want to add a new container that `containersProvider` can provide, then you'll need to extend the configuration as follows:
  1. add a new property to the `IContainerTypes` interface;
  2. add a new property to the `containerLoadersDictionary` object.


For example, part of the `ContainersProvider.tsx` may look like:
```
import * as firstLazyFeature from 'features/firstLazyFeature';
import * as secondLazyFeature from 'features/secondLazyFeature';

interface IContainerTypes {
  ContainerFromFirstFeature: firstLazyFeature.Entry['containers']['ContainerFromFirstFeature'];
  ContainerFromSecondFeature: secondLazyFeature.Entry['containers']['ContainerFromSecondFeature'];
}

const containerLoadersDictionary: LoadersMap = {
  ContainerFromFirstFeature: firstLazyFeature.loadEntry,
  ContainerFromSecondFeature: secondLazyFeature.loadEntry,
};

...

export { IContainerTypes };
```

and it can be used like this:
```
import React from 'react';
import { IContainerTypes, containersProvider } from 'core';

interface IProps {
  ContainerFromFirstFeature: IContainerTypes['ContainerFromFirstFeature'];
  ContainerFromSecondFeature: IContainerTypes['ContainerFromSecondFeature'];
}

class SomeFeatureComponent extends React.PureComponent<IProps> {
  public render() {
    const { ContainerFromFirstFeature, ContainerFromSecondFeature } = this.props;

    return (
      <div>
        <ContainerFromFirstFeature />
        <ContainerFromSecondFeature />
      </div>
    );
  }
}

export default (
  containersProvider(['ContainerFromFirstFeature', 'ContainerFromSecondFeature'], <Preloader />)(
    SomeFeatureComponent,
  )
);
```

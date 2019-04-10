## Used technologies

- Module bundler: [webpack](https://webpack.js.org/)
- Language: [typescript](https://www.typescriptlang.org/)
- CSS-preprocessor: [SASS](https://sass-lang.com/)
- UI building: [React](https://reactjs.org/)+[Redux](https://redux.js.org/)+[React-Router](https://reacttraining.com/react-router/web) and [BEM](https://en.bem.info/)
- Handling side effects: [redux-saga](https://redux-saga.js.org/)
- Interaction with a server: an API service built on top of [axios](https://github.com/axios/axios)
- Managing dependencies: [inversify](http://inversify.io/)
- Testing: [Jest](https://facebook.github.io/jest/), [Enzyme](https://airbnb.io/enzyme/), [Sinon](https://sinonjs.org/)


## Basic architecture description
An application is built using three kinds of architectural units — [features](#feature), [services](#service) and [modules](#module). Beside these units there is also the `shared` folder, that contains code which is used across the whole application and isn't tied up with a particular feature, service, module or anything else. It contains various constants, helper functions, types, and react components like Button, Table, Calendar etc.

### Feature

A feature is the main building block in the architecture. A feature is a functional unit which represents a specific part of the app's functionality.

A feature has its own branch in the redux state, redux logic, and react components which implement functionality represented by the feature.

Examples:
> `github users search` feature can contain redux logic for searching github users and storing the results in the redux state, and containers for displaying the results and making a search query;
> `auth` feature can contain redux logic & containers for login, logout, password recovery etc.

[Read more about features](./feature/feature.md)

### Service

A service is a standalone unit that can be used in modules and features and cannot depend on them or on other services. A service represents generic functionality which is not a part of main functionality of the app (which is represented by [features](./feature/feature.md)), but rather a utility which helps to implement it. A service is generally unaware of the domain or the app it works within and can easily be reused in other apps.

Examples:
 - api service encapsulating api calls to a server;
 - i18n service can be used for translation in the whole application;
 - notification service can be used to show generic notifications to a user (for example if an error occured during an api call);
 - user service can provide user-specific data and user-related functionality;
 - config service can provide the app config and a functionality for saving and loading config, changing theme etc.


A service can contain:

- redux logic (own branch in state, own action creators, a reducer and possibly sagas);
- classes that encapsulate some service-related logic (api calls, sockets, local storage, etc.);
- react containers;
- react Higher-Order Components (HOC) that can encapsulate logic related to service classes, pass through props to wrapped containers or control a rendering of wrapped containers depending on a service state;

A service can also encapsulate logic related to side-effects, like API calls to the server or work with the local storage.

Example:

```
The i18n service contains:

- redux logic for getting and storing translations;
- a functionality that allows you to switch between app languages;
- a class that updates a tranlsation function (a function that translates a string using the stored translations) and notifies subscribers that the language was changed;
- a HOC, that passes the translation function to a wrapped component as a prop, and rerenders the component after the language switching passing the new translate function.
```

### Module
A module represents different "pages" of the application which are connected in their meaning and purpose, and which routes are built from the same root route. A module can have redux logic and react components.

For example, a module `Search` combines application parts connected to the github search: users search and repositories search.

```
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import { UsersSearchLayout, RepositoriesSearchLayout } from './view/components';

const Search: IModule = {
  getRoutes() {
    return (
      <Route
        key={routes.search.getElementKey()}
        path={routes.search.getRoutePath()}
      >
        <Switch>
          <Route
            key={routes.search.users.getElementKey()}
            path={routes.search.users.getRoutePath()}
            component={UsersSearchLayout}
          />
          <Route
            key={routes.search.repositories.getElementKey()}
            path={routes.search.repositories.getRoutePath()}
            component={RepositoriesSearchLayout}
          />
        </Switch>
      </Route>
    );
  },
};

export default Search;
```

Each Layout component of the module is bound to the route and therefore represents an application page. The main building blocks of a Layout component are feature containers:
```
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

## File structure of a project

```
project
│  README.md
│  ...
│
└──webpack // webpack config files
│  │  ...
│
└──docs // frontend and server API documentation
│  │  ...
│
└──src // application
   │  index.ts // entry point to the application
   │
   └──assets
   │  │  ...
   │
   └──core // initialization files. Create store, initialize dependencies, feature connect, etc.
   │  │  ...
   │
   └──feature
   │  └──categorySelect
   │  └──dynamicFields
   │  └──locationSelect
   │  └──...
   │
   └──modules
   │  └──App
   │  └──Home
   │  └──OrderForm
   │  └──...
   │
   └──services
   │  └──api
   │  └──i18n
   │  └──...
   │
   └──shared // types, helpers, basic react components (like buttons, inputs, etc.), fonts, etc.
      └──helpers
      └──types
      └──view
      └──...
```

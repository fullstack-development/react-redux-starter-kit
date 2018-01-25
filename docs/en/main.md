## Used technologies

Code bundler: [webpack](https://webpack.js.org/)  
Language: [typescript](https://www.typescriptlang.org/)  
CSS-preprocessor: [stylus](http://stylus-lang.com/)  
Interface rendering powered by [React](https://reactjs.org/)+[Redux](https://redux.js.org/)+[React-Router](https://reacttraining.com/react-router/web) and [BEM](https://en.bem.info/)  
[redux-saga](https://redux-saga.js.org/) fights with side-effects (primarily asynchronously actions that require redux store)
Special service API to connect with server using [axios](https://github.com/axios/axios)  
[inversify](http://inversify.io/) makes a great job to manage dependancies
[Jest](https://facebook.github.io/jest/) provides with unit-tests infrastructure
**(Server Isomorphic rendering comes soon)**

## Basic architecture description
Basic architecture units — modules, features and services.

### Service

Standalone functionality unit that can be used in modules and features. Service should know nothing about the rest of the application. Can contain:
* class that encapsulate some specific logic. Instance of such class should be bound to DI-container.
* redux logic (own branch in state, own action creators, reducer and possibly sagas)
* react containers
* React Higher-Order Components (HOC) can encapsulate work with service class, pass through props to wrapped containers or control rendering of wrapped containers depending on service state.

> Examples: such service as i18n can contain: redux login for getting and storing translations, functionality for switching current language; class that can observe language switching, refresh the translation function and notify subscribers; HOC, thar pass to wrapped component the translation function, and after the language is switched call forceUpdate that start rerendering and passed refreshed translation function.

[Services description](./services.md)

### Feature

Most basic architecture unit, primarily the whole project is the bundle of various features.
Feature is a narrow bounded functionality, that can be done with React+Redux and has own branch in redux store.  
Feature returns react container with minimal possible interface. There can be also some functions (helpers) for plugging the feature to redux store.  
Feature should know nothing about routes, can use services and components from folder "shared". Feature cannot call another feature directly because it decrease features coupling and allows to extract features to separate bundles that can be loaded on demand.
Feature can require another features as a props. This should be declared in feature signature (props typings). If so the parent will pass one feature to another or HOC `/src/core/ContainersProvider.tsx` will do the job (`ContainersProvider` asynchronously loads bundle of required feature and pass the container to wrapped container).

Create separate feature if you need:
* functionality is used in the several places;
* functionality can be unambiguously classified and be independent (for example, auth or orders list);
* has no routes and don't work with routes heavily.

> Examples: feature `orders search` contains redux logic for loading, storing, filtering and paginating of product list, containers such as `orders search form` and  `paginating management`. Client can get search results with callback `onLoad` of `orders search form` container.

[Features description](./features.md)

### Module
Module bound features, extend their functionality and distribute with routes. Module can contains redux logic and redux containers. Module should export root route that contains route tree of the module which will be rendered in empty div-container.

Create separate module if you need:
* routing, independent and various functionality on each page, that can be bound with common ideas and extracted as big architecture block;
* functionality is really various and vast than for example just loading of the user and displaying its data;
> Examples: Profile module - contains features: private info editing, private info displaying, configuring the security parameters.

[Modules descriptions](./modules.md)

## File structure of the project

```
project
│  README.md
│  ...
│
└──webpack // webpack configs
│  │  ...
│
└──docs // frontend and server API documentation
│  │  ...
│
└──src // application
   │  index.ts // entry point to application
   │
   └──assets 
   │  │  ...
   │
   └──core // initialization files. Create store, initialize dependencies, plug features to modules
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
   └──shared // types, helpers, basic react components, fonts, ...
      └──helpers
      └──types
      └──view
      └──...
```

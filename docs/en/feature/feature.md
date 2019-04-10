# Feature

A feature is the main building block in the architecture. A feature is a functional unit which represents a specific part of the app's functionality.

A feature has its own branch in the redux state, redux logic, and react components which implement functionality represented by the feature.

Examples:
> `github users search` feature can contain redux logic for searching github users and storing the results in the redux state, and containers for displaying the results and making a search query;
> `github repositories search` feature can contain redux logic for searching github repositories and storing the results in the redux state, and containers for displaying the results and making a search query;
> `orders` feature can contain redux logic & containers for making orders, view orders history, etc. in some kind of online store app;
> `auth` feature can contain redux logic & containers for login, logout, password recovery etc.

There are no strict rules of how to break your app's functionality into features. For example, `github users search` and `github repositories search` could be the same feature named `github search`, or `orders` feature could be broken into `make order` and `order history` features. Functionality that feature represents can be more specific (like `github * search` features) or more general (like `orders`). How much "specific" or "general" a feature is made depends on how appropriate or convenient it is in each particular case.

Features can depend on services, shared code (components, styles, types, helpers etc.) or containers provided by [containersProvider HOC](./lazy-feature.md). Features cannot depend on modules or other features.

Feature exports its containers and redux logic which can be used in two places:
1. Containers and redux logic can be used in modules.
2. Containers can be used in `ContainersProvider.tsx` to allow to use these containers in other features using the `containersProvider` HOC.

## Kinds of features

Some features are synchronous: their content gets exported and imported *directly* in modules and therefore the feature's code gets included in the main bundle of the app.

Some features are asynchronous: their content gets exported in a special way and is imported *dynamically* in modules or `containersProvider`. These features are called [lazy features](./lazy-feature.md).

Some features are [multi-instance features](./multi-instance-feature.md). They are features which can have multiple instances on the same page with their own state.

## How to

* [How to use a lazy feature & the containersProvider HOC](./lazy-feature.md)
* [How to use a multi-instance-feature](./multi-instance-feature.md)

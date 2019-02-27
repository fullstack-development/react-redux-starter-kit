# Feature

A feature is the main unit in the architecture. A feature has its own branch in the redux state, redux logic, and react components which implement a functionality represented by the feature.

Features are independent from one another and can use services, shared code (components, styles, types, helpers etc.) or containers provided by [containersProvider HOC](./lazy-feature.md). Other than that a feature doesn't know anything about the rest of the app.

Example:

> `github users search` feature can contain redux logic for searching github users and storing the results in the redux state, and containers for displaying the results and making a search query.

Feature exports its containers and redux logic which can be used in two places:
1. Containers and redux logic can be used in [modules](./modules.md).
2. Containers can be used in `ContainersProvider.tsx` to allow to use these containers in other features using the `containersProvider` HOC.

## Kinds of features

Some features are synchronous: their content gets exported and imported *directly* in modules and therefore the feature's code gets included in the main bundle of the app.

Some features are asynchronous: their content gets exported in a special way and is imported *dynamically* in modules or `containersProvider`. These features are called [lazy features](./lazy-feature.md).

Some features are [multi-instance features](./multi-instance-feature.md). They are features which can have multiple instances on the same page with their own state.

## How to

* [How to use a lazy feature & the containersProvider HOC](./lazy-feature.md)
* [How to use a multi-instance-feature](./multi-instance-feature.md)

# Ленивая фича

Из-за того что контейнеры большинства фич используются не на всех страницах приложения (а иногда даже не для всех видов пользователей), можно сделать вывод, что код для конкретной фичи лучше подгружать в момент надобности, а не при инициализации приложения. Ленивая загрузка фич позволяет значительно ускорить первоначальную загрузку и инициализацию приложения.

Подключение ленивых фич к redux-стору происходит автоматически при помощи HOC'ов описанных ниже. Если фича не является ленивой, то нужно собрать данные для подключения к стору (`IReduxEntry`) и произвести подключение в ручном режиме в файле `src/core/configureApp.tsx`.

## Что нужно сделать чтобы фича стала ленивой

1. Собрать все полезные данные фичи в файле `entry.ts` (для этого есть хелпер `makeFeatureEntry`) и экспортировать получившийся объект и тип этого объекта.
```typescript
const entry = makeFeatureEntry(
  containers, actions, selectors,
  {
    reducers: { categorySelect: reducer },
    sagas: [getSaga],
  },
);

type Entry = typeof entry;

export { Entry, entry };
```
2. В файле `loader.ts` нужно написать лоадер, который будет содержать динамический импорт объекта с данными фичи из `entry.ts`.
```typescript
import { Entry } from './entry';

export function loadEntry(): Promise<Entry> {
  return import(/* webpackChunkName: "featureName" */ './entry').then(feature => feature.entry);
}
```
3. В файле `index.ts` нужно экспортировать лоадер и тип объекта с данными фичи.
```typescript
export { Entry } from './entry';
export { loadEntry } from './loader';
```
> Нельзя импортировать файлы фичи напрямую из других мест приложения, иначе не сработает выделение кода в отдельный бандл и этот код попадет в главный бандл приложения

## Как использовать ленивую фичу

### Базовый способ

Из ленивой фичи мы можем взять только функцию лоадер и тип объекта с данными фичи, поэтому мы можем вызвать лоадер и дождаться когда возвращенный им промис зарезолвит данные. Чтобы react-контейнеры фичи правильно работали, нужно не забыть подключить фичу к redux-стору.

### HOC `featureConnect`

С помощью HOC'а `featureConnect` можно упростить процесс получения данных фичи и подключения фичи к redux-стору. Использовать его можно только в модулях. На вход принимает мап-объект с лоадерами интересующих нас фич и react-компонент, ключи этого объекта должны совпадать с ключами пропсов оборачиваемого react-компонента. После успешной загрузки фич они будут автоматически подключены к redux-стору и объекты с данными фич будут прокинуты в оборачиваемый react-компонент. Также ему можно передать прелоадер, который будет отображаться во время загрузки фич.

```typescript
import React from 'react';
import { featureConnect } from 'core';

import { RouteComponentProps } from 'react-router-dom';

import * as lazyFeature from 'features/lazyFeature';

interface IOwnProps {
  lazyFeatureEntry: lazyFeature.Entry;
}

type Props = IOwnProps;

class SomeModuleComponent extends React.PureComponent<Props> {
  public render() {
    const { LazyFeatureContainer } = this.props.lazyFeatureEntry.containers;

    return (
      <LazyFeatureContainer />
    );
  }
}

export default (
  featureConnect({ lazyFeatureEntry: lazyFeature.loadEntry }, <Preloader />)(
    SomeModuleComponent,
  )
);

```

### HOC `containersProvider`

Если в определенной фиче нам понадобился функционал из другой уже существующей ленивой фичи, то можно воспользоваться HOC'ом `containersProvider`. Он выполняет ту же работу что и HOC `featureConnect`, но принимает на вход массив ключей с именами требуемых контейнеров. Оборачиваемый react-компонент должен принимать по этим ключам ReactType соответствующей сигнатуры.

В отличие от `featureConnect` требует предварительной настройки, в файле `ContainersProvider.tsx` нужно импортировать лоадер и тип объекта с данными фичи, и расширить интерфейс `IContainerTypes` и объект `containerLoadersDictionary`. Интерфейс `IContainerTypes` экспортируется и мы можем получить через него доступ к типам подключенных к HOC'у контейнеров фич, чтобы типизировать пропсы оборачиваемых данным HOC'ом react-контейнеров.

Файл `ContainersProvider.tsx`:

```typescript
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

Пример использования:

```typescript
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

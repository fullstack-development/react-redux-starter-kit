# react-redux-starter-kit

Модульный стартовый комплект для проектов React + Redux + React Router.

* [NPM скрипты](#NPM-scripts)
* [Особенности](#Особенности)
* [Тестирование](#Тестирование)
* [Документация](./docs/ru/main.md)

## NPM scripts
### Локальный запуск
- ```npm run dev``` среда разработки в режиме просмотра
- ```npm run prod``` продакшн режим в режиме просмотра

### Локальная сборка (см. папку build)
- ```npm run build:dev``` среда разработки без режима просмотра
- ```npm run build:prod``` продакшн режим без режима просмотра

### Запуск анализатора пакетов
- ```npm run analyze:dev``` среда разработки
- ```npm run analyze:prod``` продакшн режим

### Запуск изоморфного сервера
- ```npm run server:dev``` среда разработки в режиме просмотра
- ```npm run server:prod``` продакшн режим без режима просмотра

### Запуск yeoman генератора create-feature
- ```npm run yeoman```

## Особенности
- [x] Typescript 2.x
- [x] React 16.x
- [x] React-router 4.x
- [x] Redux
- [x] Redux-saga for side-effects
- [x] SCSS
- [x] React-JSS
- [x] BEM methodology
- [x] Webpack 4.x
- [x] Tests (Jest, sinon, enzyme)
- [x] Test coverage
- [x] Hot reload
- [x] Yeoman blocks generator tasks (features, modules, ... )
- [x] Code splitting (async chunks loading)
- [x] Isomorphic
- [x] Material-UI


## Тестирование

Тесты используют фреймворк [Jest](http://facebook.github.io/jest/)

### Запуск

* `npm test` или `npm t` - разовый прогон тестов
* `npm run test:watch` - запуск тестов в watch-режиме
* `npm run test:debug` - запуск с возможностью подключения для отладки
(
  [Chrome](http://facebook.github.io/jest/docs/en/troubleshooting.html#content) /
  [VSCode](http://facebook.github.io/jest/docs/en/troubleshooting.html#debugging-in-vs-code) /
  [Webstorm](http://facebook.github.io/jest/docs/en/troubleshooting.html#debugging-in-webstorm)
).
* `npm run test:coverage` - запуск с генерацией карты покрытия кода. Результаты можно открыть в браузере `<projectDir>/coverage/lcov-report/index.html`.

### [Snapshot Testing](http://facebook.github.io/jest/docs/en/snapshot-testing.html#content)

```typescript
import React from 'react';
import { shallow } from 'enzyme';
import GenericDateInput from './../GenericDateInput';

it('renders correctly', () => {
  const component = shallow(<GenericDateInput />)

  expect(component.debug()).toMatchSnapshot();
});
```

После первого запуска теста создается эталонный снепшот, который будет помещен в папку `__snapshots__` рядом с файлом
теста. Его нужно проверить на корректность. После изменений в верстке компонента в терминале будут отображены изменения
произошедшие в компоненте, и если эти изменения ожидаемы, то нужно зафиксировать новые снепшоты, для этого достаточно
в терминале нажать клавишу `"u"` (при условии что тесты запущены в watch-режиме). `ВНИМАНИЕ!!! Будут перезаписаны все снепшоты,
не совпадающие с эталонными!`

> Чтобы обновить снепшот для конкретного теста можно воспользоваться [it.only(name, fn, timeout)](http://facebook.github.io/jest/docs/en/api.html#testonlyname-fn-timeout) или [describe.only(name, fn)](http://facebook.github.io/jest/docs/en/api.html#describeonlyname-fn), если мы хотим обновить снепшоты для группы тестов.

При возникновении ошибок при тестировании в watch моде:

Для MacOS (`Error: watch EMFILE`): Удалить watchman, глобально установленный через npm или yarn, если таковой был, и установить повторно через brew.

Для Linux (`Error ENOSPC`): воспользоваться данной командой:
```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
``` 
[ссылка на issue](https://github.com/facebook/jest/issues/3254)

# react-redux-starter-kit
Modular starter kit for React+Redux+React Router projects.

* [NPM scripts](#NPM-scripts)
* [Features](#Features)
* [Тестирование](#Тестирование)
* [Документация](./docs/ru/main.md)

## NPM scripts
### To start localy
- ```npm run dev``` for development environment in watch mode
- ```npm run prod``` for production environment in watch mode

### To build localy (see build folder)
- ```npm run build:dev``` for development environment without watch mode
- ```npm run build:prod``` for production environment without watch mode

### To start bundle analyzer
- ```npm run analyze:dev``` for development environment
- ```npm run analyze:prod``` for production environment

### To start isomorphic server
- ```npm run server:dev``` for development environment in watch mode
- ```npm run server:prod``` for production environment without watch mode

### To start yeoman generator create-feature
- ```npm run yeoman```

## Features
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

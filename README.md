# react-redux-starter-kit
Modular starter kit for React+Redux+React Router projects.

## To start localy
```npm run dev``` for development purposes in watch mode

## To build localy
```npm run build``` for development purposes without watch mode (see build folder)

## To start yeoman generator create-feature
```npm run yeoman```

## Features
- [x] Typescript 2.x
- [x] React 16.x
- [x] React-router 4.x
- [x] Redux
- [x] Redux-saga for side-effects
- [x] SCSS
- [x] BEM methodology
- [x] Tests (Jest, sinon, enzyme)
- [x] Hot reload
- [ ] Yeoman blocks generator tasks (features, modules, ... )
- [ ] ANT Design
- [ ] Webpack 3.x
- [ ] Isomorphic
- [x] Code splitting (async chunks loading)
- [x] Code coverage
- [ ] ~100% tests coverage

## Тестирование

Тесты используют фреймворк [Jest](http://facebook.github.io/jest/)

### Запуск

Все перечисленные команды запускают тесты в watch-режиме.  
`npm test` или `npm t` - запуск тестов.  
`npm run test-debug` - запуск с возможностью подключения для отладки
(
  [Chrome](http://facebook.github.io/jest/docs/en/troubleshooting.html#content) /
  [VSCode](http://facebook.github.io/jest/docs/en/troubleshooting.html#debugging-in-vs-code) /
  [Webstorm](http://facebook.github.io/jest/docs/en/troubleshooting.html#debugging-in-webstorm)
).  
`npm run test-coverage` - запуск с генерацией карты покрытия кода. Результаты можно открыть в браузере `<projectDir>/coverage/lcov-report/index.html`.

### [Snapshot Testing](http://facebook.github.io/jest/docs/en/snapshot-testing.html#content)

```
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

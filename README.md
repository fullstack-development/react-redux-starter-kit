# react-redux-starter-kit
Modular starter kit for React+Redux+React Router projects.

## To start localy
```npm run dev``` for development purposes in watch mode

## To build localy
```npm run build``` for development purposes without watch mode (see build folder)

## Features
- [x] Typescript 2.x
- [x] React
- [x] React-router
- [x] Redux
- [x] Redux-saga for side-effects
- [x] Stylus
- [x] BEM methodology
- [x] Tests (karma, mocha, chai, sinon)
- [x] Hot reload
- [ ] Yeoman blocks generator tasks (features, modules, ... )
- [ ] ANT Design
- [ ] Webpack 3.x
- [ ] Isomorphic
- [ ] Code splitting (async chunks loading)
- [ ] Code coverage (Istanbul) - temporary disabled (waiting for Phantom es6 support or typescript compiler generators support for es5 target)
- [ ] ~100% tests coverage

## Запуск под Windows

1) ```SET TS_NODE_COMPILER_OPTIONS={"target": "es5", "module": "commonjs"}```

2) ```npm run dev-windows```

## To start yeoman generator create-feature

1) sudo npm install -g yo

2) open directory deploying/create-feature

3) npm link

4) npm install

5) go to the back in project

6) yo create-feature

## To start yeoman generator create-feature

1) npm run yeoman

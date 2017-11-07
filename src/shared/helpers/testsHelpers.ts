import sinon from 'sinon';

interface ISpies {
  [ key: string ]: sinon.SinonSpy;
}

function resetSpies(functions: ISpies) {
  Object.keys(functions).forEach(key => functions[key].reset());
}

export { resetSpies };

import { SagaIterator } from 'redux-saga';
import { IDependencies } from 'shared/types/app';

function getSaga({ api }: IDependencies): () => SagaIterator {
  function* saga(): SagaIterator {
    yield [];
  }

  return saga;
}

export default getSaga;

import { makeCommunicationActionCreators } from 'redux-make-communication';
import * as NS from '../../namespace';

export const { execute: loadCakesPreview, completed: loadCakesPreviewSuccess, failed: loadCakesPreviewFail } =
  makeCommunicationActionCreators<NS.ILoadCakesPreview, NS.ILoadCakesPreviewSuccess, NS.ILoadCakesPreviewFail>(
    'BUY_CAKES:LOAD_CAKES_PREVIEW',
    'BUY_CAKES:LOAD_CAKES_PREVIEW_SUCCESS',
    'BUY_CAKES:LOAD_CAKES_PREVIEW_FAIL',
  );

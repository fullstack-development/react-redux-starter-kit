import { makeCommunicationReducer } from 'redux-make-communication';
import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import initial from '../initial';

// tslint:disable:max-line-length
export default combineReducers<NS.IReduxState['communication']>({
  loadCakesPreview: makeCommunicationReducer<NS.ILoadCakesPreview, NS.ILoadCakesPreviewSuccess, NS.ILoadCakesPreviewFail>(
    'BUY_CAKES:LOAD_CAKES_PREVIEW',
    'BUY_CAKES:LOAD_CAKES_PREVIEW_SUCCESS',
    'BUY_CAKES:LOAD_CAKES_PREVIEW_FAIL',
    initial.communication.loadCakesPreview,
  ),
});

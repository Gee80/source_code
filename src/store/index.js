import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducers from '../reducers';
import combineEpic from '../epics/combineEpic';

const epicMiddleware = createEpicMiddleware(combineEpic);

export const store = createStore(
  reducers,
  {},
  applyMiddleware(epicMiddleware),
);
export default store;

import { createStore, applyMiddleware, Store, Middleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer, { RootState } from './reducers'; // Create or import your root reducer

const middleware: Array<Middleware<{}, RootState>> = [
  thunk as ThunkMiddleware<RootState>
];

const store: Store<RootState> = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export default store;

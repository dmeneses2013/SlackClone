import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

// Redux store.
// Returns state from reducers
const store = createStore(
  reducers,
  applyMiddleware(thunk)
);
export default store;

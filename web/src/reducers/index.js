import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import session from './session';
import rooms from './rooms';
import room from './room';

const rootReducer = combineReducers({
  form,
  session,
  rooms,
  room
});

export default function (state, action) {
  if (action.type === 'LOGOUT') {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
}

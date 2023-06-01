import { combineReducers } from 'redux';
import accountSlice from './accountSlice';
import loginSlice from './loginSlice';
import registerSlice from './registerSlice';
import updateSlice from './updateSlice';
import usersSlice from './usersSlice';

export default combineReducers({
  loginSlice,
  registerSlice,
  accountSlice,
  usersSlice,
  updateSlice,
});

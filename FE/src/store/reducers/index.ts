import { combineReducers } from 'redux';
import userReducer from './userReducer'; // Import your reducers here

const rootReducer = combineReducers({
  userReducer
  // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

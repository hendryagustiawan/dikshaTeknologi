import { POST_LOGIN } from '../types';
import { Reducer } from 'redux';

interface UserState {
  access_token: string | null;
  role: string;
  user: string;
}

const initialState: UserState = {
  access_token: localStorage.getItem('access_token') || null,
  role: '',
  user: ''
};

const userReducer: Reducer<UserState> = (state = initialState, action) => {
  let { type, access_token, role } = action;

  switch (type) {
    case POST_LOGIN:
      return {
        ...state,
        access_token,
        role
      };

    default:
      return state;
  }
};

export default userReducer;

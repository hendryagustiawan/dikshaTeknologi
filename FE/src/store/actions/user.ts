import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../types';

import axios from 'axios';
import { Dispatch } from 'redux';

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (userData: any) => ({
  type: LOGIN_SUCCESS,
  payload: userData
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const loginUser = (credentials: { email: string; password: string }) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(
        'https://yourapi.com/login',
        credentials
      );

      dispatch(loginSuccess(response.data));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};

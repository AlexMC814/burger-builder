import * as actions from './actions';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actions.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actions.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const logout = () => {
  return {
    type: actions.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authFail = err => {
  return {
    type: actions.FETCH_ORDERS_FAIL,
    error: err,
  };
};

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axios
      .post(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBfveBcRNKp9J7x3dbz9tQNBdFE2W2xPIE',
        authData
      )
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

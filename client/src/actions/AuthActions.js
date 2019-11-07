/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  LOGIN_FACEBOOK_USER,
  LOGIN_GOOGLE_USER,
  LOGOUT_USER_FAILURE,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
} from './types';

/**
 * Redux Action To Sigin User With Firebase
 */
export const signinUserInFirebase = (user, history) => ({
  type: LOGIN_USER,
  payload: {user, history},
});

/**
 * Redux Action Signin User Success
 */
export const signinUserSuccess = user => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

/**
 * Redux Action To Signup User Success
 */
export const signUpUserInFirebaseSuccess = user => ({
  type: SIGNUP_USER_SUCCESS,
  payload: user,
});

/**
 * Redux Action To Signup User Failure
 */
export const signUpUserInFirebaseFailure = error => ({
  type: SIGNUP_USER_FAILURE,
  payload: error,
});

/**
 * Redux Action Signin User Failure
 */
export const signinUserFailure = error => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

/**
 * Redux Action To Signout User From  Firebase
 */
export const logoutUserFromFirebase = () => ({
  type: LOGOUT_USER,
});

/**
 * Redux Action Signout User Success
 */
export const logoutUserFromFirebaseSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
});

/**
 * Redux Action Signout User Failure
 */
export const logoutUserFromFirebaseFailure = () => ({
  type: LOGOUT_USER_FAILURE,
});

/**
 * Redux Action To Signup User In Firebase
 */
export const signupUserInFirebase = (user, history) => ({
  type: SIGNUP_USER,
  payload: {user, history},
});

/**
 * Redux Action To Signin User In Firebase With Facebook
 */
export const signinUserWithFacebook = history => ({
  type: LOGIN_FACEBOOK_USER,
  payload: history,
});

/**
 * Redux Action To Signin User In Firebase With Google
 */
export const signinUserWithGoogle = history => ({
  type: LOGIN_GOOGLE_USER,
  payload: history,
});

/**
 * Redux Action To Change User Password
 */
export const changePasswords = (user, history)  => (
  console.log(`dentro de la redux action que se llamo del forntend ${JSON.stringify(user)}, ${JSON.stringify(history)}`),
  { 
  type: CHANGE_PASSWORD,
  payload: {user, history}
});

/**
 * Redux Action Change User Password Success
 */
export const changePasswordSuccess = () => ({
  type: CHANGE_PASSWORD_SUCCESS,
});

/**
 * Redux Action Change User Password Failure
 */
export const changePasswordFailure = () => ({
  type: CHANGE_PASSWORD_FAILURE,
});

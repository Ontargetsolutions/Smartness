/**
 * Auth Sagas
 */
import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import {auth, facebookAuthProvider, googleAuthProvider} from '../firebase';

import API from '../api';
import {
  LOGIN_USER,
  LOGIN_FACEBOOK_USER,
  LOGIN_GOOGLE_USER,
  LOGOUT_USER,
  SIGNUP_USER,
} from 'Actions/types';

import {
  signinUserSuccess,
  signinUserFailure,
  signUpUserInMySQLSuccess,
  signUpUserInMySQLFailure,
  logoutUserFromMySQLSuccess,
  logoutUserFromMySQLFailure,
} from 'Actions';

/**
 * Sigin User With Email and Password Request
 */
const signInUserWithEmailPasswordRequest = async (email, password) =>
  await API
    .login ({password: password, username: email})
    .then (authUser => authUser)
    .catch (error => error);


/**
 * Signin User With Facebook Request
 */
const signInUserWithFacebookRequest = async () =>
  await auth
    .signInWithPopup (facebookAuthProvider)
    .then (authUser => authUser)
    .catch (error => error);

/**
* Signin User With Facebook Request
*/
const signInUserWithGoogleRequest = async () =>
  await auth
    .signInWithPopup (googleAuthProvider)
    .then (authUser => authUser)
    .catch (error => error);

/**
 * Signout Request
 */
const signOutRequest = async () =>
  await API.logout ().then (authUser => authUser).catch (error => error);

/**
 * Create User
 */

const createUserWithEmailPasswordRequest = async (email, password, name, telephone) =>
  await API.register ({password:password, email:email, name: name, telephone: telephone})
    .then (authUser => authUser)
    .catch (error => error);

/**
 * Signin User With Email & Password
 */
function* signInUserWithEmailPassword({payload}) {
  const {email, password} = payload.user;
  const {history} = payload;
  try {
    const signInUser = yield call (
      signInUserWithEmailPasswordRequest,
      email,
      password
    );
    if (signInUser.message) {
      yield put (signinUserFailure (signInUser.message));
    } else {
      localStorage.setItem ('user_id', signInUser.data.id);
      yield put (signinUserSuccess (signInUser));
      history.push ('/');
    }
  } catch (error) {
    yield put (signinUserFailure (error));
  }
}

/**
 * Signin User With Facebook Account
 */
function* signinUserWithFacebookAccount({payload}) {
  try {
    const signUpUser = yield call (signInUserWithFacebookRequest);
    if (signUpUser.message) {
      yield put (signinUserFailure (signUpUser.message));
    } else {
      localStorage.setItem ('user_id', signUpUser.uid);
      yield put (signinUserSuccess (signUpUser));
      payload.push ('/');
    }
  } catch (error) {
    yield put (signinUserFailure (error));
  }
}

/**
 * Signin User With Google Account
 */
function* signinUserWithGoogleAccount({payload}) {
  try {
    const signUpUser = yield call (signInUserWithGoogleRequest);
    if (signUpUser.message) {
      yield put (signinUserFailure (signUpUser.message));
    } else {
      localStorage.setItem ('user_id', signUpUser.uid);
      yield put (signinUserSuccess (signUpUser));
      payload.push ('/');
    }
  } catch (error) {
    yield put (signinUserFailure (error));
  }
}

/**
 * Signout User
 */
function* signOut () {
  try {
    yield call (signOutRequest);
    localStorage.removeItem ('user_id');
    yield put (logoutUserFromMySQLSuccess ());
  } catch (error) {
    yield put (logoutUserFromMySQLFailure ());
  }
}

/**
 * Create User In MySQL
 */
function* createUserWithEmailPassword({payload}) {
  const {email, password, name, telephone} = payload.user;
  const {history} = payload;
  try {
    const signUpUser = yield call (
      createUserWithEmailPasswordRequest,
      email,
      password,
      name,
      telephone
    );
    if (signUpUsermessage) {
      yield put (signUpUserInMySQLFailure (signUpUser.message));
    } else {
      localStorage.setItem ('user_id', signUpUser.data.id);
      yield put (signUpUserInMySQLSuccess (signUpUser));
      history.push ('/');
    }
  } catch (error) {
    yield put (signUpUserInMySQLFailure (error));
  }
}

/**
 * Signin User In MySQL
 */
export function* signinUserInMySQL () {
  yield takeEvery (LOGIN_USER, signInUserWithEmailPassword);
}

/**
 * Signin User With Facebook
 */
export function* signInWithFacebook () {
  yield takeEvery (LOGIN_FACEBOOK_USER, signinUserWithFacebookAccount);
}

/**
 * Signin User With Google
 */
export function* signInWithGoogle () {
  yield takeEvery (LOGIN_GOOGLE_USER, signinUserWithGoogleAccount);
}

/**
 * Signout User From MySQL
 */
export function* signOutUser () {
  yield takeEvery (LOGOUT_USER, signOut);
}

/**
 * Create User
 */
export function* createUserAccount () {
  yield takeEvery (SIGNUP_USER, createUserWithEmailPassword);
}

/**
 * Auth Root Saga
 */
export default function* rootSaga () {
  yield all ([
    fork (signinUserInMySQL),
    fork (signInWithFacebook),
    fork (signInWithGoogle),
    fork (signOutUser),
    fork (createUserAccount),
  ]);
}

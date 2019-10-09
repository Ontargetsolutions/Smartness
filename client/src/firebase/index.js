/**
 * Firebase Login
 * Reactify comes with built in firebase login feature
 * You Need To Add Your Firsebase App Account Details Here
 */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase 
const config = {
   apiKey: "AIzaSyCeOf2HbY00AFE4lii2qB-IsOXClugL8pU", // Your Api key will be here
   authDomain: "ontarget-d0451.firebaseapp.com", // Your auth domain
   databaseURL: "https://ontarget-d0451.firebaseio.com", // data base url
   projectId: "ontarget-d0451", // project id
   storageBucket: "ontarget-d0451.appspot.com", // storage bucket
   messagingSenderId: "G-CYFD2GT63R" // messaging sender id
};

firebase.initializeApp(config);

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
const database = firebase.database();

export {
   auth,
   googleAuthProvider,
   githubAuthProvider,
   facebookAuthProvider,
   twitterAuthProvider,
   database
};

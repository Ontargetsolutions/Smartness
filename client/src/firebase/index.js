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
   apiKey: "AIzaSyBemlMQlIT1uTDOO-YnHuCJ0p6sOBwEAdU",
   authDomain: "smartness-a3525.firebaseapp.com",
   databaseURL: "https://smartness-a3525.firebaseio.com",
   projectId: "smartness-a3525",
   storageBucket: "",
   messagingSenderId: "770467051355",
};

firebase.initializeApp(config);

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const database = firebase.database();

export {
   auth,
   googleAuthProvider,
   facebookAuthProvider,
   database
};

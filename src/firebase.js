// src/firebase.js
import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyDdzzD8JzX6zXl-IaXRwWVdPmD2FlsXdr8",
    authDomain: "instaleesh.firebaseapp.com",
    databaseURL: "https://instaleesh.firebaseio.com",
    projectId: "instaleesh",
    storageBucket: "instaleesh.appspot.com",
    messagingSenderId: "1076496441446"
};
firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();
export default firebase;
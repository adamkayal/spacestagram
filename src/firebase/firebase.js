import { firebase } from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'
import '@firebase/storage'

firebase.initializeApp({
  apiKey: "AIzaSyBZk_jO9tqniRpB6AbPb5lhYeisY6-Nb74",
  authDomain: "adamkayal-spacestagram.firebaseapp.com",
  projectId: "adamkayal-spacestagram",
  storageBucket: "adamkayal-spacestagram.appspot.com",
  messagingSenderId: "859658276215",
  appId: "1:859658276215:web:6276119e314a7d61582572",
  measurementId: "G-DTJGBGWV2K"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

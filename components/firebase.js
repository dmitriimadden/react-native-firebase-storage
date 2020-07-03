import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCiEeT7WYOMfSTF39VdR1MMjpdTgqlp79A",
  authDomain: "govworks-34.firebaseapp.com",
  databaseURL: "https://govworks-34.firebaseio.com",
  projectId: "govworks-34",
  storageBucket: "govworks-34.appspot.com",
  messagingSenderId: "430736603834",
  appId: "1:430736603834:web:26750f3cde8e3ecce72083"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

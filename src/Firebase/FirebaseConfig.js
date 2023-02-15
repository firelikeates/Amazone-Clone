
import firebase from "firebase"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDln2abXbypThRfsVB9rk3X5vsZVm-ris8",
    authDomain: "e-clone-fa621.firebaseapp.com",
    projectId: "e-clone-fa621",
    databaseURL: "https://e-clone-fa621-default-rtdb.firebaseio.com",
    storageBucket: "e-clone-fa621.appspot.com",
    messagingSenderId: "469256698977",
    appId: "1:469256698977:web:0353692bd31a437a5d3e20",
    measurementId: "G-XZY40HBC0B"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const realtimedatabase = firebase.database()

export {db,firebase,realtimedatabase}

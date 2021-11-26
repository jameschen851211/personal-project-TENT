// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgZpxw1Np_OFjyeYzfiopz9vClsrzLvEs",
  authDomain: "tent-eb6c2.firebaseapp.com",
  projectId: "tent-eb6c2",
  storageBucket: "tent-eb6c2.appspot.com",
  messagingSenderId: "857006631551",
  appId: "1:857006631551:web:26cb9b922e2a5294cc6d4a",
};

firebase.initializeApp(firebaseConfig);

export default firebase;

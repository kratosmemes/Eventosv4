// Import firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration, you have to paste here the object that comes from firebase
const firebaseConfig = {
  apiKey: "AIzaSyAEGPFabc9x4tDjVN32zvSUWl60Kiq3X9Y",
  authDomain: "expo-meseros.firebaseapp.com",
  projectId: "expo-meseros",
  storageBucket: "expo-meseros.appspot.com",
  messagingSenderId: "403736722534",
  appId: "1:403736722534:web:3d515a80ea02ecc4b601a7",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  console.info({ firebase });
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

const db = firebase.firestore();

const storage =firebase.storage().ref()

export{ auth, db, storage , firebase};
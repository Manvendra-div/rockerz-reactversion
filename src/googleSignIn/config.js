import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyB2SA8MfjS3jmaeWTIZmxWFEksZARAEqAs",
  authDomain: "rockerz-web.firebaseapp.com",
  projectId: "rockerz-web",
  storageBucket: "rockerz-web.appspot.com",
  messagingSenderId: "59340405683",
  appId: "1:59340405683:web:dfd18770740b8fbaeee9c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth  = getAuth(app);
const provider = new GoogleAuthProvider()
export {auth,provider}
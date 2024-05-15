import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyB2SA8MfjS3jmaeWTIZmxWFEksZARAEqAs",
  databaseURL: "https://rockerz-web-default-rtdb.asia-southeast1.firebasedatabase.app/",
  authDomain: "rockerz-web.firebaseapp.com",
  projectId: "rockerz-web",
  storageBucket: "rockerz-web.appspot.com",
  messagingSenderId: "59340405683",
  appId: "1:59340405683:web:dfd18770740b8fbaeee9c6"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth  = getAuth(app);
const provider = new GoogleAuthProvider()
export {auth,provider}
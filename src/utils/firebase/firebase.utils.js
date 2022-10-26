import { initializeApp } from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
/*
    note for the import:
    1. getAuth, signInWithRedirect, and signInWithPopup are generic command to fetch data from firebase; 
    2. the provider can be GoogleAuthProvider 
*/

const firebaseConfig = {
  apiKey: "AIzaSyDvg5pjXqxmOKZlDCG2yY62nz_zua6tUgE",
  authDomain: "crown-clothing-db-66857.firebaseapp.com",
  projectId: "crown-clothing-db-66857",
  storageBucket: "crown-clothing-db-66857.appspot.com",
  messagingSenderId: "648565636884",
  appId: "1:648565636884:web:08f370a926f30d74a20c01"
};

const firebaseApp = initializeApp(firebaseConfig);

//initialize to get an auth from firebase db
export const auth = getAuth();

//initialize googleAuth as provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

//initialize to sign in with google popup, don't forget to add sign in with google method on firebase auth
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
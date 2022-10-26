import { initializeApp } from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
/*
    note for the import:
    1. getAuth, signInWithRedirect, and signInWithPopup are generic command to fetch data from firebase; 
    2. the provider can be GoogleAuthProvider 
*/

import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";
/*
    note for the import:
    1. getFireStore for setting up the db
    2. doc for setting up/ create(?) the document?
    3. getDoc for read the document
    4. setDoc to update the document
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



//SETUP FOR FIREBASE AUTH

//initialize to get an auth from firebase auth db
export const auth = getAuth();

//initialize googleAuth as provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

//initialize to sign in with google popup, don't forget to add sign in with google method on firebase auth
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);



//SETUP FOR FIREBASE FIRESTORE

//set the db where we want to CRUD
export const db = getFirestore();

//set up document in firestore
export const createUserDocumentFromAuth = async (userAuth) => {
    //setup the doc
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    //setup for reading the doc
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
};

/*
note:
    1. 'users' is the collection name
    2. userAuth is a selected props from google successfull sign in object that has already been destructured in sign-in component where we leverage this method
*/


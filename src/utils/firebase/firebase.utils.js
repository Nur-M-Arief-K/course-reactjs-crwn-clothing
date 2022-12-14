import { initializeApp } from "firebase/app";
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged
} from "firebase/auth";
/*
    note for the import:
    1. getAuth, signInWithRedirect, and signInWithPopup are generic command to fetch data from firebase; 
    2. the provider can be GoogleAuthProvider 
    3. createUserWithEmailAndPassword for creating auth user in firebase auth
    4. signInWithEmailAndPassword for authenticating user from firebase auth db
*/

import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from "firebase/firestore";
/*
    note for the import:
    1. getFireStore for setting up the db
    2. doc for setting up/ the collection and document
    3. getDoc for read the document
    4. setDoc to update the document
    5. collection is for setup a collection
    6. writebatch is for create a transaction
    7. query is for taking up some data from firebase-firestore
    8. getdocs is for fetch a snapshot from query
*/

const firebaseConfig = {
  apiKey: "AIzaSyDvg5pjXqxmOKZlDCG2yY62nz_zua6tUgE",
  authDomain: "crown-clothing-db-66857.firebaseapp.com",
  projectId: "crown-clothing-db-66857",
  storageBucket: "crown-clothing-db-66857.appspot.com",
  messagingSenderId: "648565636884",
  appId: "1:648565636884:web:08f370a926f30d74a20c01"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);



//SETUP FOR FIREBASE AUTH

//initialize to get an auth from firebase auth db, track all the auth state that happening in all of our website
export const auth = getAuth();

//initialize googleAuth as provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

//initialize sign up with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

//initialize to sign in with google popup, don't forget to add sign in with google method on firebase auth
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

//initialize to sign in with google redirect, don't forget to add sign in with google method on firebase auth
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


//initialize sign in with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

//initialize sign out, GENERIC FUNCTIONALITY, FOR ALL
export const signOutUser = async () => await signOut(auth);



//SETUP FOR AUTH OBSERVER LISTENER

//initialize observer listener for auth stream
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);



//SETUP FOR FIREBASE FIRESTORE

//set the db where we want to CRUD
export const db = getFirestore();

//setup for document product in firestore/ add SHOP_DATA.js inside firebase-firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);

    const batch = writeBatch(db); //will use transaction concept, if one thing error inside a transaction-the whole transaction will be aborted

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log("done");
};

//get categories from firebase
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories'); //1 rank
    const q = query(collectionRef); //query a collection inside firebase-firestore
    const querySnaphot = await getDocs(q); //getDocs execute the query
    
    //rank 2, .docs is calling document inside firebase-firestore
    return querySnaphot.docs.map(docSnapshot => docSnapshot.data()); // docsnapshot return array [{title, item}, {title, item}] .data() ???
};

//set up document in firestore
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    
    //setup the collection and doc

    //userDocRef is just a pointer where the data lives
    const userDocRef = doc(db, 'users', userAuth.uid);
    /*
    note:
        1. 'users' is the collection name
        2. userAuth is a selected USER props from google successfull sign in object that has already been destructured 
        in sign-in component where we leverage this method
        2b. additionalInformation is for createUserWithEmailAndPassword from an alias of createAuthUserWithEmailAndPassword 
            because it return null in displayName, therefore we need additonal information from formFields in the sign-up-form component
        3. userAuth.uid will be a doc name
    */

    //setup for reading the doc

    //userSnapshot is the data snapshot
    const userSnapshot = await getDoc(userDocRef);
    
    //setup for update the doc
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log("error creating the user", error.message);
        };
    };

    return userSnapshot;
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        //onAuthStateChanged is a function we get from firebase, auth is mandatory argument
        //userAuth is a value we get from auth, auth is an alias for getAuth();
        const unsubscribe = onAuthStateChanged(
            auth, 
            (userAuth) => {
                unsubscribe();
                resolve(userAuth)
            },
            reject
        )
    })
};
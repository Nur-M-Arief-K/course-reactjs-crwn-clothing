import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
//note for signInWithGooglePopup: is an alias for () => signInWithPopup(auth, googleProvider);

/* 
note for createUserDocumentFromAuth:
    1. is an alias for const userDocRef = doc(db, 'users', userAuth.id); 
    2. in this doc the function will take an argument to be processed inside the function
*/

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        /*
            1. return object with 4 props: operationType, providerId, user, _tokenResponse; 
            2. we just leverage user prop; user prop contain uid prop that we want to leverage inside createDocumentFromAuth;
        */
        createUserDocumentFromAuth(user);;
    };

    return (
        <div>
            <h1>I'm the sign in page</h1>
            <button onClick={logGoogleUser}>Sign in with google popup</button>
        </div>
    );
};

export default SignIn
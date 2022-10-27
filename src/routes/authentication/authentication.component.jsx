import {signInWithGooglePopup, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
//note for signInWithGooglePopup: is an alias for () => signInWithPopup(auth, googleProvider);

/* 
note for createUserDocumentFromAuth:
    1. is an alias for const userDocRef = doc(db, 'users', userAuth.id); 
    2. in this doc the function will take an argument (userAuth) to be processed inside the function
*/

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

const Authentication = () => {
    return (
        <div>
            <h1>I'm the sign in page</h1>
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;
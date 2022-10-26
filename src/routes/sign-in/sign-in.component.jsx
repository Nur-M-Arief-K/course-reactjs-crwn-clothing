import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
//note: signInWithGooglePopup is an alias for () => signInWithPopup(auth, googleProvider);

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    };
    
    return (
        <div>
            <h1>I'm the sign in page</h1>
            <button onClick={logGoogleUser}>Sign in with google popup</button>
        </div>
    );
};

export default SignIn
import { useState } from "react";

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
//is an alias for  createUserWithEmailAndPassword(auth, email, password); receive email, and password arguments; auth can be checked inside firebase.utils
//signInAuthUserWithEmailAndPassword for sign in with email and password

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import { SignInContainer, H2, ButtonContainer } from "./sign-in-form.styles";

const defaultFormFields = {
    email: "",
    password: ""
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => setFormFields(defaultFormFields);

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        /*
            1. return an object with 4 props: operationType, providerId, user, _tokenResponse; 
            2. we just leverage user prop; user prop contain uid prop that we want to leverage inside createDocumentFromAuth;
        */
    };

    //setup for  functionality for onsubmit from html form tag below
    const handleSubmit = async (event) => {
        //receive event from handle submit from html form tag below
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password); //receive args from th html form below
            
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect method");
                    break;
                case "auth/user-not-found":
                    alert("User associated with the email was not found");
                    break;
                default:
                    console.log(error);
            };
        };
    };

    //setup functionality for html input tag below
    const handleChange = (event) => {
        //event can contain value, name, etc and will be passed from inside html input tag below
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});

    };

    return (
        <SignInContainer>
            <H2>Already have an account?</H2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required/>
                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required/>

                <ButtonContainer>
                    <Button type="submit">Sign in</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </ButtonContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;
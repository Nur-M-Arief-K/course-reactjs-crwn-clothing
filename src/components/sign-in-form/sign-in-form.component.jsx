import { useState } from "react";

import {createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
//is an alias for  createUserWithEmailAndPassword(auth, email, password); receive email, and password arguments; auth can be checked inside firebase.utils
//createUserDocumetFromAuth is a function to write in firestore
//signInAuthUserWithEmailAndPassword for sign in with email and password, receiving similar args with createUserDocumentFromAuth (sign up user with email and password)

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.component.scss";

const defaultFormFields = {
    email: "",
    password: ""
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    
    console.log(formFields);

    const resetFormFields = () => setFormFields(defaultFormFields);

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        /*
            1. return an object with 4 props: operationType, providerId, user, _tokenResponse; 
            2. we just leverage user prop; user prop contain uid prop that we want to leverage inside createDocumentFromAuth;
        */

       //for CRUD action in firestore
        await createUserDocumentFromAuth(user);
    };

    //setup for  functionality for onsubmit from html form tag below
    const handleSubmit = async (event) => {
        //receive event from handle submit from html form tag below
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password); //receive args from th html form below
            console.log(response);
            resetFormFields();
        } catch (error) {
        };
    };

    //setup functionality for html input tag below
    const handleChange = (event) => {
        //event can contain value, name, etc and will be passed from inside html input tag below
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});

    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required/>
                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required/>

                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button buttonType="google" onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
//is an alias for  createUserWithEmailAndPassword(auth, email, password); receive email, and password arguments; auth can be checked inside firebase.utils
//createUserDocumetFromAuth is a function to write in firestore

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { SignUpContainer, H2 } from "./sign-up.styles";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => setFormFields(defaultFormFields);

    //setup for  functionality for onsubmit from html form tag below
    const handleSubmit = async (event) => {
        //receive event from handle sumbit from html form tag below
        event.preventDefault();
    
        if(password !== confirmPassword) {
            alert("Password doesn't match confirm password");
            return;
        };

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password); //will just return user prop from the other 3 props, which contain: operationType, providerId, user, _tokenResponse

            await createUserDocumentFromAuth(user, {displayName}); //will create the user data in firestore, the function is in firebase.utils

            resetFormFields();
        } catch (error) {
            if(error.code === "auth/email-already-in-use") {
                alert("Cannot create the user, email has already been used");
            } else {
                console.log("user creation encountered an error", error);
            };
        }
    };

    //setup functionality for html input tag below
    const handleChange = (event) => {
        //event can contain value, name, etc and will be passed from inside html input tag below
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});

    };

    return (
        <SignUpContainer className="sign-up-container">
            <H2>Don't have an account?</H2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" onChange={handleChange} name="displayName" value={displayName} required/>

                <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required/>

                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required/>

                <FormInput label="Confirm Password" type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} required/>

                <Button type="submit">Sign me up</Button>
            </form>
        </SignUpContainer>
    );
};

export default SignUpForm;
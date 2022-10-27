import { useState } from "react";

import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
//is an alias for  createUserWithEmailAndPassword(auth, email, password); receive email, and password arguments; auth can be checked inside firebase.utils


const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const handleSubmit = async (event) => {
    //receive event from handle sumbit from html form tag below
    event.preventDefault();

};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    
    console.log(formFields);

    const handleChange = (event) => {
        //event can contain value, name, etc and will be passed from inside html input tag below
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});

    };

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type="text" onChange={handleChange} name="displayName" value={displayName} required/>

                <label>Email</label>
                <input type="email" onChange={handleChange} name="email" value={email} required/>

                <label>Password</label>
                <input type="password" onChange={handleChange} name="password" value={password} required/>

                <label>Confirm Password</label>
                <input type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} required/>

                <button type="submit">Sign me up</button>
            </form>
        </div>
    );
};

export default SignUpForm;
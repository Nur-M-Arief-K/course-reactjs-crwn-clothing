import {BaseButton, GoogleSignInButton, InvertedButton} from "./button.styles.jsx";

export const BUTTON_TYPE_CLASSES = {
    base: "base",
    google: "google-sign-in",
    inverted: "inverted"
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
    //THIS IS A METHOD TO TAKE A VALUE INSIDE AN OBJECT
    {
        [BUTTON_TYPE_CLASSES.base] : BaseButton,
        [BUTTON_TYPE_CLASSES.google] : GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted] : InvertedButton
    }[buttonType] 
);

const Button = ({children, buttonType, ...otherProps}) => {
    const CustomButton = getButton(buttonType); //will return BaseButton/GoogleSignInButton/InvertedButton
    return <CustomButton {...otherProps}>{children}</CustomButton>
};

export default Button;
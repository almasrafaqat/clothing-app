import { Fragment, useState } from "react";
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";




const defaultFormFields = {

    email: "",
    password: "",

}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
     
        
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
            
        }
        catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert("Password is incorrect");
                    break;
                case 'auth/user-not-found':
                    alert("User does not exist");
                    break;
                default:
                    console.log(error);

            }


        }


    }


    return (
        <Fragment>
            <div className='sign-up-container'>
                <h2>Already have an account?</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={handleSubmit}>


                    <FormInput
                        label="Email"
                        type="email"
                        required
                        name="email"

                        onChange={handleChange}
                        value={email}
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        required
                        name="password"

                        onChange={handleChange}
                        value={password}
                    />

                    <div className="buttons-container">
                        <Button type="submit">Sign In</Button>
                        <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google}  onClick={signInWithGoogle}>Google Sign In</Button>
                    </div>

                </form>
            </div>
        </Fragment>
    )

}

export default SignInForm;
import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";


const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Password not matched");
            return;
        }
        try {

            dispatch(signUpStart(email, password, displayName));
            resetFormFields();

            
        }
        catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert("Email already in use");
            } else {
                console.log("Error while Sign Up", error);
            }

        }


    }


    return (
        <Fragment>
            <div className='sign-up-container'>
                <h2>Don't have an account?</h2>
                <span>Sign up with your email and password</span>
                <form onSubmit={handleSubmit}>

                    <FormInput
                        label="Display Name"
                        type="text"
                        required
                        name="displayName"

                        onChange={handleChange}
                        value={displayName}
                    />
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
                    <FormInput
                        label="Confirmm Password"
                        type="password"
                        required
                        name="confirmPassword"

                        onChange={handleChange}
                        value={confirmPassword}
                    />
                    <Button type="submit">Sign Up</Button>

                </form>
            </div>
        </Fragment>
    )

}

export default SignUpForm;
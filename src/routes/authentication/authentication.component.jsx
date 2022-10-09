/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment } from "react"

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './authentication.style.scss';

const Authentication = () => {



    return (
        <Fragment>
           
            <div className="authentication-container">
                <SignInForm />
                <SignUpForm />
            </div>
        </Fragment>
    )
}


export default Authentication;
import React from 'react';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {regUserTC, setRegErrorAC} from "../../../../redux/registration-reducer";
import "./RegistrationForm.css"
import {AppRootStateType} from "../../../../redux/store";
import {AuthFormikType} from "../../Authorization/AuthorizationForm/AuthorizationForm";
import {Loader} from "../../../Loader/Loader";

export const RegistrationForm = () => {
        const dispatch = useDispatch()
        const registrationError = useSelector<AppRootStateType, boolean>(state => state.registration.regError)
        const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)

        const formik = useFormik({
            initialValues: {
                email: '',
                password: '',
            },
            validate: (values) => {
                const errors: AuthFormikType = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                } else if (values.password.length <= 7) {
                    errors.password = 'Password should contain more than 7 symbols';
                }
                return errors;
            },
            onSubmit: values => {
                dispatch(regUserTC(values.email, values.password))
            },
        });

        return (
            <div className="registrationFormContainer">
                <form onSubmit={formik.handleSubmit}>
                    <p className="registerText">Please fill in this form to create an account.</p>
                    <label htmlFor={"email"}><b>Email Address</b></label>
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        {...formik.getFieldProps('email')}
                        onFocus={() => dispatch(setRegErrorAC(false))}
                        className="registerInput"
                    />
                    {formik.errors.email && formik.touched.email
                        ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                        : null
                    }
                    <br/>
                    <label htmlFor="password"><b>Password</b></label>
                    <input
                        type="password"
                        placeholder="Enter your Password"
                        {...formik.getFieldProps('password')}
                        onFocus={() => dispatch(setRegErrorAC(false))}
                        className="registerInput"
                    />
                    {formik.errors.password && formik.touched.password
                        ? <div style={{color: 'red'}}>{formik.errors.password}</div>
                        : null
                    }
                    {isLoading && <Loader/>}
                    <button type={"submit"} className="registerBtn" disabled={isLoading}>Submit</button>
                </form>
                {registrationError && <h3 className={'regError'}>SOMETHING GOING WRONG</h3>}
            </div>
        );
    }
;
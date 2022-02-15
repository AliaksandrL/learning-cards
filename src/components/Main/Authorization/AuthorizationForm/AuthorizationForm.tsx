import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {loginTC, setAuthErrorAC} from '../../../../redux/authorization-reducer';
import React from "react";
import {AppRootStateType} from "../../../../redux/store";
import './AuthorizationForm.css'
import {Loader} from "../../../Loader/Loader";

export type AuthFormikType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const AuthorizationForm = () => {
    const dispatch = useDispatch();
    const authorizationError = useSelector<AppRootStateType, boolean>(state => state.authorization.authError)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
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
        onSubmit: (values) => {
            dispatch(loginTC(values));
            // formik.resetForm();
        }
    });

    return (
        <div className="authorizationFormContainer">
            <form onSubmit={formik.handleSubmit}>
                <p className="authText">Please fill in this form to login.</p>
                <label htmlFor="email"><b>Email Address</b></label>
                <input
                    type="email"
                    placeholder={'Enter your Email'}
                    {...formik.getFieldProps('email')}
                    onFocus={() => dispatch(setAuthErrorAC(false))}
                    className={"authInput"}
                />
                {formik.errors.email && formik.touched.email
                    ? <span style={{color: 'red'}}>{formik.errors.email}</span>
                    : null
                }
                <label htmlFor="password"><b>Password</b></label>
                <input
                    type="password"
                    placeholder={'Enter your Password'}
                    {...formik.getFieldProps('password')}
                    onFocus={() => dispatch(setAuthErrorAC(false))}
                    className={"authInput"}
                />
                {formik.errors.password && formik.touched.password
                    ? <span style={{color: 'red'}}>{formik.errors.password}</span>
                    : null
                }
                <div>
                    <input type="checkbox"/>
                    <label htmlFor="checkbox"><b>Remember me</b></label>
                </div>
                {isLoading && <Loader/>}
                <button type={'submit'} className="authBtn" disabled={isLoading}>Login</button>
            </form>
            {authorizationError && <h3 className={'authError'}>SOMETHING GOING WRONG</h3>}
        </div>
    );
};

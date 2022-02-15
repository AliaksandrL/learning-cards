import React from 'react';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {recPassTC, setRecPassErrorAC} from '../../../../redux/recoveryPassword-reducer';
import {AuthFormikType} from '../../Authorization/AuthorizationForm/AuthorizationForm';
import {AppRootStateType} from '../../../../redux/store';
import './RecoveryPasswordForm.css';
import {Loader} from '../../../Loader/Loader';

import {ModalCheckEmail} from '../ModalCheckEmail';

export const RecoveryPasswordForm = () => {
    const dispatch = useDispatch()
    const from = useSelector<AppRootStateType, string>(state => state.recoveryPassword.from)
    const message = useSelector<AppRootStateType, string>(state => state.recoveryPassword.message)
    const recPassError = useSelector<AppRootStateType, boolean>(state => state.recoveryPassword.recPassError)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)

    const isMailSent = useSelector<AppRootStateType, boolean>(state => state.recoveryPassword.isMailSent)

    const formik = useFormik({
        initialValues: {
            email: '',
            token: '',
        },
        validate: (values) => {
            const errors: AuthFormikType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(recPassTC(values.email, from, message))
        },
    });


    return (
        (!isMailSent)
            ? <div className="recoveryPasswordFormContainer">
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor={'email'}><b>Forgot your password?</b></label>
                <input
                    type="email"
                    placeholder="Type your Email"
                    {...formik.getFieldProps('email')}
                    onFocus={() => dispatch(setRecPassErrorAC(false))}
                    className="recPassInput"
                    autoFocus
                />
                {formik.errors.email && formik.touched.email
                    ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                    : null
                }
                {isLoading && <Loader/>}
                <button type="submit" className={'recPassBtn'} disabled={isLoading}>Send instruction</button>
            </form>
            {recPassError && <h3 className={'recPassError'}>SOMETHING GOING WRONG</h3>}
        </div>
            : <ModalCheckEmail/>
    );
};
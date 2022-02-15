import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useFormik} from "formik";
import {newPassTC} from "../../../../redux/recoveryPassword-reducer";
import React from "react";
import {AuthFormikType} from "../../Authorization/AuthorizationForm/AuthorizationForm";
import "./NewPasswordForm.css";
import {Loader} from "../../../Loader/Loader";
import {AppRootStateType} from "../../../../redux/store";

export const NewPasswordForm = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)

    const params = useParams()
    const serverToken = params.serverToken

    const formik = useFormik({
        initialValues: {
            password: '',
            token: '',
        },
        validate: (values) => {
            const errors: AuthFormikType = {};
            if (values.password.length <= 7) {
                errors.password = 'Password should contain more than 7 symbols';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(newPassTC(values.password, serverToken))
        },
    });

    return (
        <div className={"newPassFormContainer"}>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor={"password"}><b>Create new password</b></label>
                <input
                    type="password"
                    placeholder="Enter your Password"
                    {...formik.getFieldProps('password')}
                    className={"newPassInput"}
                    autoFocus
                />
                {formik.errors.password && formik.touched.password
                    ? <span style={{color: 'red'}}>{formik.errors.password}</span>
                    : null
                }
                {isLoading && <Loader/>}
                <button type="submit" className={'newPassBtn'} disabled={isLoading}>Create new password</button>

            </form>
        </div>
    );
}
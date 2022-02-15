import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";
import {Navigate} from "react-router-dom";
import {NewPasswordForm} from "./NewPasswordForm/NewPasswordForm";
import "./NewPassword.css"

export const NewPassword = () => {

    const isPassRec = useSelector<AppRootStateType, boolean>(state => state.recoveryPassword.isPasRec)

    if (isPassRec) {
        return <Navigate to={'/auth'}/>
    }

    return (
        <div className={'newPasswordContainer'}>
            <NewPasswordForm/>
        </div>
    )
}
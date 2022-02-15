import React from "react";
import {RegistrationForm} from "./RegistrationForm/RegistrationForm";
import "./Registration.css"
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";

export function Registration() {
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.registration.isReg)

    if (isRegistered) {
        return <Navigate to={'/auth'}/>
    }
    return (
        <div className={"registrationContainer"}>
            <RegistrationForm/>
        </div>
    )
}
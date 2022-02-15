import React from "react";
import {AuthorizationForm} from './AuthorizationForm/AuthorizationForm';
import './Authorization.css'

export function Authorization() {

    return (
        <div className={'authorizationContainer'}>
            <AuthorizationForm/>
        </div>
    );
}

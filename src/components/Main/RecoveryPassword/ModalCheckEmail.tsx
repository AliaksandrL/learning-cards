import React, {memo} from "react";
import s from "./ModalCheckEmail.module.css"
import {useParams} from "react-router-dom";
import {Icon} from "./Icon";


export const ModalCheckEmail = memo(() => {

    const {email} = useParams<string>()
    return (
        <div className={s.form}>
            <div className={s.container}>
                <span className={s.title}>it-incubator</span>
                <Icon/>
                <h1 className={s.subTitle}>Check Email</h1>
                <span className={s.description}>We’ve sent an Email with instructions to {email}</span>
            </div>
        </div>
    )
})
import React from "react";
import ReactDOM from "react-dom";
import s from '../Modals.module.css'
import SuperButton from "../../../button/SuperButton";
import {useDispatch} from "react-redux";


type ModalPropsType = {
    message: string
    isOpen: boolean
    onClose: () => void
    packId?: string

}

export const DeleteModal = ({message, isOpen, onClose}: ModalPropsType) => {
    const dispatch = useDispatch()

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={s.form} onClick={onClose}>
            <div className={s.modals} onClick={(e) => {
                e.stopPropagation()
            }}>
                <div>
                    <span>{message}</span>
                    {/*<button onClick={onClose}>Close</button>*/}
                </div>
                {/*<SuperButton onClick={() => dispatch()}>Delete</SuperButton>*/}
                <SuperButton onClick={onClose}
                >Close</SuperButton>
            </div>
        </div>
        , document.body);
}


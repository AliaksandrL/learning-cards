import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import ReactDOM from "react-dom";
import s from '../Modals.module.css'
import {useDispatch} from "react-redux";
import SuperButton from "../../../button/SuperButton";


type ModalPropsType = {
    message: string
    isOpen: boolean
    onClose: () => void
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const AddPackModal = ({message, isOpen, onClose, setOpen}: ModalPropsType) => {

    let dispatch = useDispatch()

    const [newName, setNewName] = useState<string>('')

    const onSetNewName = (e: ChangeEvent<HTMLInputElement>) => {
        let newName = e.currentTarget.value
        setNewName(newName)
    }

    const onClickNewName = (newName: string) => {
        // dispatch(addCardPacksTC(newName))
        setNewName('')
        setOpen(false)
    }

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={s.form} onClick={onClose}>
            <div className={s.modals} onClick={(e) => {
                e.stopPropagation()
            }}>
                <div>
                    <span>{message}</span>

                </div>
                <input style={{border: '1px solid #C7A5A5'}}
                       onChange={onSetNewName}
                       value={newName}
                       placeholder={'insert title here'}/>
                <div className={s.buttons}>
                    <SuperButton onClick={onClose}>Close</SuperButton>
                    <SuperButton onClick={() => {
                        onClickNewName(newName)
                    }}>add new pack</SuperButton>
                </div>
            </div>
        </div>
        , document.body);
}


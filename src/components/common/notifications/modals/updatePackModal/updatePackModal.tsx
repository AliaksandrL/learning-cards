import React, {ChangeEvent, useState} from "react";
import ReactDOM from "react-dom";
import s from '../Modals.module.css'
import SuperButton from "../../../button/SuperButton";


type ModalPropsType = {
    message: string
    isOpen: boolean
    onClose: () => void
    onEdit: (newName?: string) => void
}

export const UpdatePackModal = ({message, isOpen, onClose, onEdit}: ModalPropsType) => {

    const [newName, setNewName] = useState<string>('') //add new pack input state

    const onSetNewName = (e: ChangeEvent<HTMLInputElement>) => {
        let newName = e.currentTarget.value
        setNewName(newName)
    }

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={s.form} onClick={onClose}>
            <div className={s.modals} onClick={(e) => {
                e.stopPropagation()
            }}>
                <div >
                    <span>{message}</span>
                </div>
                <input style={{border: '1px solid #C7A5A5'}}
                       onChange={onSetNewName}
                       value={newName}
                       placeholder={'insert title here'}/>
                <div className={s.buttons}>
                <SuperButton onClick={onClose}>Close</SuperButton>
                <SuperButton onClick={() => {
                    onEdit(newName)
                }}>add new pack title</SuperButton>
                </div>
            </div>
        </div>
        , document.body);
}


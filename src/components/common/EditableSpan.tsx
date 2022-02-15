import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateCardPacksTC} from '../../redux/cardPacks-reducer';
import {AppRootStateType} from '../../redux/store';


export type EditableSpanPropsType = {
    user_id: string
    packId: string
    title: string
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    const user_id = useSelector<AppRootStateType, string | undefined>(state => state.authorization.data._id);
    const dispatch = useDispatch()

    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState(props.title);

    const OnEditMode = () => {
        if (user_id !== props.user_id) {
            return
        }
        setEditMode(true);
    };
    const OffEditMode = () => {
        // regular expression
        setTitle(title.trim().replace(/\s+/g, ' '))
        dispatch(updateCardPacksTC(props.packId, title));
        setEditMode(false);
    };

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            setTitle(title.trim().replace(/\s+/g, ' '));
            dispatch(updateCardPacksTC(props.packId, title));
            setEditMode(false);
        }
    };

    return (
        <>
            <span>
                {editMode
                    ? <input
                        onKeyPress={onKeyPressHandler}
                        onChange={changeTitle}
                        autoFocus={true}
                        onBlur={OffEditMode}
                        value={title}/>
                    : <span onDoubleClick={OnEditMode}> {props.title} </span>
                }
            </span>
        </>
    );
});
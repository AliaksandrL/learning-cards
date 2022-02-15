import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setPackName} from '../../../redux/Packs/cards-packs-filter-reducer';

export const AddItemForm = React.memo(() => {
    const dispatch = useDispatch();


    // error not used yet
    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const addTitle = () => {
        if (title.trim()) {
            dispatch(setPackName(title.trim().replace(/\s+/g, ' ')));
            setTitle('');
        } else {
            setError('Title is required');
        }
    };

    const clearTitle = () => {
        dispatch(setPackName(''));
        setTitle('');
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(null);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTitle();
        }
    };

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={title}
                onKeyPress={onKeyPressHandler}
                onChange={changeHandler}
            />

            <button onClick={addTitle}> Set filter</button>
            <button onClick={clearTitle}>Clear filter</button>

            {/*{error && <div className={'error-message'}>Title is required</div>}*/}
        </div>
    );
});
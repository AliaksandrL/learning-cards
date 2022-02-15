import React, {ChangeEvent} from 'react';
import {useDispatch} from 'react-redux';
import {setPageCount} from '../../../redux/Packs/cards-packs-filter-reducer';
import s from './SelectForPagination.module.css';

export const SelectForPaginator = () => {

    const dispatch = useDispatch();

    const dispatchPageSize = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPageCount(+e.currentTarget.value));
    }

    return (
        <div className={s.selectContainer}>
            <select onChange={dispatchPageSize} defaultValue={20}>
                <option>3</option>
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
            </select>
        </div>
    );
};

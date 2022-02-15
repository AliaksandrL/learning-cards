import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../redux/store';
import {PacksFilterReducerStateType, setPage} from '../../../redux/Packs/cards-packs-filter-reducer';
import s from './Paginator.module.css';
import {SelectForPaginator} from './SelectForPagination';

export const Paginator = () => {

    const dispatch = useDispatch();
    // data from selector
    const objForPagination = useSelector<AppRootStateType, PacksFilterReducerStateType>(state => state.cardsPackFilter);
    let pageCountPagination = Math.ceil(objForPagination.totalCountPage / objForPagination.pageCount)
    let pageCountPaginationArray = []
    for (let i = 1; i <= pageCountPagination; i++) {
        pageCountPaginationArray.push(i);
    }
    return (
        <div className={s.container}>
            <div className={s.pages}>
                {pageCountPaginationArray.map((page, index) => <span
                    key={index}
                    className={objForPagination.page === page ? s.currentPage : s.page}
                    onClick={() => dispatch(setPage(page))}>{page}</span>)}
            </div>
            <SelectForPaginator/>
        </div>
    );
};

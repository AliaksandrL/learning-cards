import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CardPackType} from '../../../api/api';
import {AppRootStateType} from '../../../redux/store';
import {CardPacksTableBody} from './CardPacksTableBody';
import {Paginator} from '../../FilterComponents/Pagination/Pagination';
import {AddItemForm} from '../../FilterComponents/SearchInput/SearchInput';
import {RangeFilter} from '../../FilterComponents/RangeFilter/RangeFilter';
import {PacksFilterReducerStateType} from '../../../redux/Packs/cards-packs-filter-reducer';
import {getCardPacksTC} from '../../../redux/cardPacks-reducer';
import {Loader} from '../../Loader/Loader';
import {CardPacksTable} from './CardPacksTable';


export const CardPacks = () => {
    const dispatch = useDispatch();
    const data = useSelector<AppRootStateType, CardPackType[]>(state => state.cardPacks.cardPacks);
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
    const user_id = useSelector<AppRootStateType, string | undefined>(state => state.authorization.data._id);

    const {
        packName,
        min,
        max,
        page,
        pageCount,
        isMyCardsPacks
    } = useSelector<AppRootStateType, PacksFilterReducerStateType>(state => state.cardsPackFilter);

    const {
        firstNumber,
        secondDescription
    } = useSelector<AppRootStateType, { firstNumber: number, secondDescription: string }>(state => state.cardsPackFilter.sortPacks);

    useEffect(() => {
        dispatch(getCardPacksTC(isMyCardsPacks ? user_id : undefined));
    }, [packName, min, max, page, pageCount, firstNumber, secondDescription, isMyCardsPacks, user_id, dispatch]);

    return (
        isLoading
            ? <Loader/>
            : <div>
                <AddItemForm/>
                <RangeFilter/>
                <CardPacksTable
                    model={CardPacksTableBody({firstNumber})}
                    data={data}/>
                <Paginator/>
            </div>
    );
};

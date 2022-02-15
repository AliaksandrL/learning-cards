import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CardType} from '../../../api/api';
import {AppRootStateType} from '../../../redux/store';
import {CardsTable} from './CardsTable';
import {CardsTableBody} from './CardsTableBody';
import {getCardsTC} from "../../../redux/cards-reducer";
import {Loader} from "../../Loader/Loader";
import {useParams} from 'react-router-dom';


export const Cards = () => {
    const dispatch = useDispatch()
    const data = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards);
    // const user_id = useSelector<AppRootStateType, string | undefined>(state => state.authorization.data._id);
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)

    //useParams
    const params = useParams()
    const cardsPack_id = params.cardsPack_Id

    useEffect(() => {
        dispatch(getCardsTC(cardsPack_id));
    }, [dispatch, cardsPack_id]);

    return (
        <div>
            {isLoading
                ? <Loader/>
                : <CardsTable
                    cardsPack_id={cardsPack_id}
                    model={CardsTableBody()}
                    data={data}/>}
        </div>
    );
}
import {Dispatch} from 'redux';
import {api, CardsResType} from '../api/api';
import {setLoaderAC} from "./app-reducer";

const initialState = {
    cards: [{
        answer: "",
        question: "",
        cardsPack_id: "",
        grade: 0,
        comments: "",
        created: "",
        updated: "",
        more_id: "",
        rating: 0,
        shots: 0,
        type: "",
        user_id: "",
        __v: 0,
        _id: ""
    }],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 0,
    packUserId: '',
    token: "",
    tokenDeathTime: 15
};

export const cardsReducer = (state: CardsResType = initialState, action: CardsActionTypes): CardsResType => {
    switch (action.type) {
        case 'SET-CARDS': {
            return {...state, ...action.data};
        }
        default:
            return state;
    }
};

export const setCardsAC = (data: CardsResType) =>
    ({type: 'SET-CARDS', data} as const);


export const getCardsTC = (cardsPack_id: string | undefined) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoaderAC(true))
        api.getCards(cardsPack_id)
            .then(res => {
                dispatch(setCardsAC(res.data));
            })
            .catch(e => {
                console.log('Error: ' + e.response.data.error || e.message);
                // const error = e.response.data.error
                //     ? e.response.data.error
                //     : (e.message + 'more details in console');
                // console.log('Error: ' + error);
            })
            .finally(() => {
            dispatch(setLoaderAC(false))
        })
    };
};
export const createCardTC = (cardsPack_id: string | undefined, newCardName: string) => {
    return (dispatch: any) => {
        dispatch(setLoaderAC(true))
        api.createCard(cardsPack_id, newCardName)
            .then(() => {
                dispatch(getCardsTC(cardsPack_id));
            })
            .catch(e => {
                console.log('Error: ' + e.response.data.error || e.message);
                // const error = e.response.data.error
                //     ? e.response.data.error
                //     : (e.message + 'more details in console');
                // console.log('Error: ' + error);
            })
            .finally(() => {
                dispatch(setLoaderAC(false))
            })
    };
};
export const deleteCardTC = (cardsPack_id: string | undefined, cardId: string) => {
    return (dispatch: any) => {
        dispatch(setLoaderAC(true))
        api.deleteCard(cardId)
            .then(() => {
                dispatch(getCardsTC(cardsPack_id));
            })
            .catch(e => {
                // console.log('Error: ' + e.response.data.error || e.message);
                const error = e.response.data.error
                    ? e.response.data.error
                    : (e.message + 'more details in console');
                console.log('Error: ' + error);
            })
            .finally(() => {
                dispatch(setLoaderAC(false))
            })
    };
};
export const updateCardTC = (packsId: string, cardId: string, question?: string, comments?: string) => {
    return (dispatch: any) => {
        dispatch(setLoaderAC(true))
        api.updateCard(cardId,question,comments)
            .then(() => {
                dispatch(getCardsTC(packsId));
            })
            .catch(e => {
                // console.log('Error: ' + e.response.data.error || e.message);
                const error = e.response.data.error
                    ? e.response.data.error
                    : (e.message + 'more details in console');
                console.log('Error: ' + error);
            })
            .finally(() => {
                dispatch(setLoaderAC(false))
            })
    };
};

export type CardsActionTypes = ReturnType<typeof setCardsAC>;

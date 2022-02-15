import {Dispatch} from 'redux';
import {api, CardPacksResType} from '../api/api';
import {AppRootStateType} from './store';
import {setTotalCountPage} from './Packs/cards-packs-filter-reducer';
import {setLoaderAC} from './app-reducer';

const initialState = {
    cardPacks: [{
        _id: '',
        user_id: '',
        name: '',
        cardsCount: 0,
        created: '',
        updated: '',
        user_name: '',
    }],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 15,
};

export const cardPacksReducer = (state: PacksReducerType = initialState, action: CardPacksActionTypes): PacksReducerType => {
    switch (action.type) {
        case 'GET-CARD-PACKS': {
            return {...state, ...action.data};
        }
        default:
            return state;
    }
};

export const getCardPacksAC = (data: CardPacksResType) =>
    ({type: 'GET-CARD-PACKS', data} as const);


export const getCardPacksTC = (user_id?: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const {packName, min, max, page, pageCount} = getState().cardsPackFilter;
        const {firstNumber, secondDescription} = getState().cardsPackFilter.sortPacks;
        const sortPacks = firstNumber + secondDescription;
        dispatch(setLoaderAC(true));
        const dataForPacksGetRequest = {packName, min, max, page, pageCount, sortPacks, user_id};
        api.getCardPacks(dataForPacksGetRequest)
            .then(res => {
                dispatch(getCardPacksAC(res.data));
                dispatch(setTotalCountPage(res.data.cardPacksTotalCount));
            })
            .catch(e => {
                console.log('Error');
            })
            .finally(() => {
                dispatch(setLoaderAC(false));
            });
    };
};
export const createCardsPackTC = (newPackName: string, user_id?: string | undefined, isMyCardsPacks?: boolean) => {
    return (dispatch: any) => {
        dispatch(setLoaderAC(true));
        api.createCardPacks(newPackName)
            .then((res) => {
                if (isMyCardsPacks) {
                    dispatch(getCardPacksTC(user_id));
                } else {
                    dispatch(getCardPacksTC());
                }
            })
            .catch(e => {
                const error = e.response.data.error;
                console.log('Error: ' + error);
            })
            .finally(() => {
                dispatch(setLoaderAC(false));
            });
    };
};
export const deleteCardPacksTC = (id: string, user_id: string | undefined, isMyCardsPacks?: boolean) => {
    return (dispatch: any) => {
        dispatch(setLoaderAC(true));
        api.deleteCardPacks(id)
            .then((res) => {
                if (isMyCardsPacks) {
                    dispatch(getCardPacksTC(user_id));
                } else {
                    dispatch(getCardPacksTC());
                }
            })
            .catch(e => {
                const error = e.response.data.error;
                console.log('Error: ' + error);
            })
            .finally(() => {
                dispatch(setLoaderAC(false));
            });
    };
};
export const updateCardPacksTC = (_id: string, title: string) => {
    return (dispatch: any) => {
        dispatch(setLoaderAC(true));
        console.log(_id);
        api.updateCardPacks(_id, title)
            .then((res) => {
                dispatch(getCardPacksTC());
            })
            .catch(e => {
                const error = e.response.data.error;
                console.log('Error: ' + error);
            })
            .finally(() => {
                dispatch(setLoaderAC(false));
            });
    };
};

export type CardPacksActionTypes =
    ReturnType<typeof getCardPacksAC>

export type PacksReducerType = typeof initialState
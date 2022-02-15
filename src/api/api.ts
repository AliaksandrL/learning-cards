import axios from 'axios';
import {AuthFormikType} from '../components/Main/Authorization/AuthorizationForm/AuthorizationForm';


const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

export const api = {
    regUser(email: string, password: string) {
        return instance.post('auth/register', {email, password});
    },
    emailUser(email: string, from: string, message: string) {
        return instance.post('auth/forgot', {email, from, message});
    },
    resetUser(password: string, resetPasswordToken: string | undefined) {
        return instance.post('auth/set-new-password', {password, resetPasswordToken});
    },
    login(data: AuthFormikType) {
        return instance.post<LoginDataType>('auth/login', {...data})
            .then(res => {
                return res.data;
            });
    },
    isAuthorized() {
        return instance.post('auth/me', {});
    },
    logout() {
        return instance.delete('auth/me', {});
    },
    getCardPacks(dataForPacksGetRequest: dataForPacksGetRequest) {
        return instance.get<CardPacksResType>('cards/pack', {
            params: dataForPacksGetRequest
        });
    },
    createCardPacks(name: string) {
        return instance.post<CardPacksResType>('cards/pack', {cardsPack: {name}});
    },
    deleteCardPacks(id: string) {
        return instance.delete<CardPacksResType>(`cards/pack/?id=${id}`);
    },
    updateCardPacks(_id: string, name: string) {
        return instance.put<CardPacksResType>(`cards/pack`, {cardsPack: {_id, name}});
    },
    getCards(cardsPack_id: string | undefined) {
        return instance.get<CardsResType>(`cards/card/?cardsPack_id=${cardsPack_id}`);
    },
    createCard(cardsPack_id: string | undefined, question: string) {
        return instance.post(`cards/card`, {card: {cardsPack_id, question}});
    },
    deleteCard(cardId: string) {
        return instance.delete(`cards/card/?id=${cardId}`);
    },
    updateCard(cardId: string, question?: string, comments?: string) {
        return instance.put<CardPacksResType>(`cards/card`, {card: {cardId, question, comments}});
    }
};

export type dataForPacksGetRequest = {
    packName: string
    min: number
    max: number
    page: number
    pageCount: number
    sortPacks: string
    user_id?: string
}

export type LoginDataType = {
    created?: string
    email?: string
    isAdmin?: boolean
    name?: string
    publicCardPacksCount?: number
    rememberMe?: boolean
    token?: string
    tokenDeathTime?: number
    updated?: string
    verified?: boolean
    __v?: number
    _id?: string
}

export type CardPackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    user_name: string
}

export type CardPacksResType = {
    cardPacks: CardPackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    comments: string
    created: string
    updated: string
    more_id: string
    rating: number
    shots: number
    type: string
    user_id: string
    __v: number
    _id: string
}

export type CardsResType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    token: string
    tokenDeathTime: number
}
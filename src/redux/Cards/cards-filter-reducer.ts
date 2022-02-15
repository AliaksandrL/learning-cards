const initialState = {
    cardAnswer: '',
    cardQuestion: '',
    min: 0,
    max: 10000000,
    sortCards: {
        firstNumber: 0,
        secondDescription: ''
    },
    page: 1,
    pageCount: 7,
    cardsTotalCountPage: 0,
    isMyCard: false,
};

export const cardsFilterReducer = (state: CardsFilterReducerStateType = initialState, action: CardsActionsType): CardsFilterReducerStateType => {
    switch (action.type) {
        case 'CARD-FILTER/SET-CARD-ANSWER': {
            return {...state, cardAnswer: action.answer};
        }
        case 'CARD-FILTER/SET-CARD-QUESTION': {
            return {...state, cardQuestion: action.question};
        }
        case 'CARD-FILTER/SET-MIN-GRADE': {
            return {...state, min: action.min};
        }
        case 'CARD-FILTER/SET-MAX-GRADE': {
            return {...state, max: action.max};
        }
        case 'CARD-FILTER/SET-FIRST-NUMBER-SORT': {
            return {...state, sortCards: {...state.sortCards, firstNumber: action.firstNumber}};
        }
        case 'CARD-FILTER/SET-SECOND-DESCRIPTION-SORT': {
            return {...state, sortCards: {...state.sortCards, secondDescription: action.secondDescription}};
        }
        case 'CARD-FILTER/SET-PAGE': {
            return {...state, page: action.page};
        }
        case 'CARD-FILTER/SET-PAGE-COUNT': {
            return {...state, pageCount: action.pageCount};
        }
        case 'CARD-FILTER/SET-TOTAL-COUNT-PAGE': {
            return {...state, cardsTotalCountPage: action.cardsTotalCountPage};
        }
        case 'CARD-FILTER/SET-IS-MY-CARD': {
            return {...state, isMyCard: action.isMyCard};
        }
        default: {
            return state;
        }
    }
};

export const setCardAnswer = (answer: string) => {
    return {type: 'CARD-FILTER/SET-CARD-ANSWER', answer} as const;
};
export const setCardQuestion = (question: string) => {
    return {type: 'CARD-FILTER/SET-CARD-QUESTION', question} as const;
};
export const setMinCardGrade = (min: number) => {
    return {type: 'CARD-FILTER/SET-MIN-GRADE', min} as const;
};
export const setMaxCardGrade  = (max: number) => {
    return {type: 'CARD-FILTER/SET-MAX-GRADE', max} as const;
};
export const setFirstNumberSortCards = (firstNumber: number) => {
    return {type: 'CARD-FILTER/SET-FIRST-NUMBER-SORT', firstNumber} as const;
};
export const setSecondDescriptionSortCards = (secondDescription: string) => {
    return {type: 'CARD-FILTER/SET-SECOND-DESCRIPTION-SORT', secondDescription} as const;
};
export const setPageCards = (page: number) => {
    return {type: 'CARD-FILTER/SET-PAGE', page} as const;
};
export const setPageCountCards = (pageCount: number) => {
    return {type: 'CARD-FILTER/SET-PAGE-COUNT', pageCount} as const;
};
export const setTotalCountCardsPage = (cardsTotalCountPage: number) => {
    return {type: 'CARD-FILTER/SET-TOTAL-COUNT-PAGE', cardsTotalCountPage} as const;
};
export const setIsMyCard = (isMyCard: boolean) => {
    return {type: 'CARD-FILTER/SET-IS-MY-CARD', isMyCard} as const;
};


export type CardsFilterReducerStateType = typeof initialState
type CardsActionsType = ReturnType<typeof setCardAnswer>
    | ReturnType<typeof setCardQuestion>
    | ReturnType<typeof setFirstNumberSortCards>
    | ReturnType<typeof setSecondDescriptionSortCards>
    | ReturnType<typeof setPageCards>
    | ReturnType<typeof setPageCountCards>
    | ReturnType<typeof setTotalCountCardsPage>
    | ReturnType<typeof setMinCardGrade>
    | ReturnType<typeof setMaxCardGrade>
    | ReturnType<typeof setIsMyCard>


import {
    cardsFilterReducer,
    CardsFilterReducerStateType,
    setCardAnswer,
    setFirstNumberSortCards,
    setIsMyCard,
    setMaxCardGrade,
    setMinCardGrade,
    setPageCards,
    setPageCountCards,
    setSecondDescriptionSortCards,
    setTotalCountCardsPage
} from './cards-filter-reducer';

let initialState = {} as CardsFilterReducerStateType;

beforeEach(() => {
    initialState = {
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
});

test('cardAnswer should be changed', () => {
    const endState = cardsFilterReducer(initialState, setCardAnswer('someSome'));
    expect(endState.cardAnswer).toBe('someSome');
});
test('minGrade should be changed', () => {
    const endState = cardsFilterReducer(initialState, setMinCardGrade(4));
    expect(endState.min).toBe(4);
});
test('maxGrade should be changed', () => {
    const endState = cardsFilterReducer(initialState, setMaxCardGrade(11));
    expect(endState.max).toBe(11);
});
test('firstNumber in sortCards should be changed', () => {
    const endState = cardsFilterReducer(initialState, setFirstNumberSortCards(22));
    expect(endState.sortCards.firstNumber).toBe(22);
});
test('secondDescription in sortCards should be changed', () => {
    const endState = cardsFilterReducer(initialState, setSecondDescriptionSortCards('grade'));
    expect(endState.sortCards.secondDescription).toBe('grade');
});
test('cardPage should be changed', () => {
    const endState = cardsFilterReducer(initialState, setPageCards(1));
    expect(endState.page).toBe(1);
});
test('pageCountOfCards should be changed', () => {
    const endState = cardsFilterReducer(initialState, setPageCountCards(111));
    expect(endState.pageCount).toBe(111);
});
test('totalCountCardsPage should be changed', () => {
    const endState = cardsFilterReducer(initialState, setTotalCountCardsPage(17));
    expect(endState.cardsTotalCountPage).toBe(17);
});
test('isMyCardsPacks should be changed', () => {
    const endState = cardsFilterReducer(initialState, setIsMyCard(true));
    expect(endState.isMyCard).toBe(true);
});


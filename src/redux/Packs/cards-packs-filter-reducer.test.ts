import {
    cardsPacksFilterReducer,
    PacksFilterReducerStateType,
    setFirstNumberSort, setIsMyCardsPacks,
    setMaxCardsInPack,
    setMinCardsInPack,
    setPackName,
    setPage,
    setPageCount,
    setSecondDescriptionSort,
    setTotalCountPage
} from './cards-packs-filter-reducer';


let initialState = {} as PacksFilterReducerStateType;

beforeEach(() => {
    initialState = {
        packName: '',
        min: 1,
        max: 10,
        sortPacks: {
            firstNumber: 0,
            secondDescription: ''
        },
        page: 1,
        pageCount: 4,
        totalCountPage: 0,
        isMyCardsPacks: false,
    };
});

test('packName should be changed', () => {
    const endState = cardsPacksFilterReducer(initialState, setPackName('some'));
    expect(endState.packName).toBe('some');
});
test('min should be changed', () => {
    const endState = cardsPacksFilterReducer(initialState, setMinCardsInPack(5));
    expect(endState.min).toBe(5);
});
test('max should be changed', () => {
    const endState = cardsPacksFilterReducer(initialState, setMaxCardsInPack(100));
    expect(endState.max).toBe(100);
});
test('firstNumber in sortPack should be changed', () => {
    const endState = cardsPacksFilterReducer(initialState, setFirstNumberSort(66));
    expect(endState.sortPacks.firstNumber).toBe(66);
});
test('secondDescription in sortPack should be changed', () => {
    const endState = cardsPacksFilterReducer(initialState, setSecondDescriptionSort('cardPacks'));
    expect(endState.sortPacks.secondDescription).toBe('cardPacks');
});
test('page should be changed', () => {
    const endState = cardsPacksFilterReducer(initialState, setPage(1000));
    expect(endState.page).toBe(1000);
});
test('pageCount should be changed', () => {
    const endState = cardsPacksFilterReducer(initialState, setPageCount(100500));
    expect(endState.pageCount).toBe(100500);
});
test('totalCountPage should be changed', () => {
    const endState = cardsPacksFilterReducer(initialState, setTotalCountPage(4));
    expect(endState.totalCountPage).toBe(4);
});
test('isMyCardsPacks should be changed', () => {
    const endState = cardsPacksFilterReducer(initialState, setIsMyCardsPacks(true));
    expect(endState.isMyCardsPacks).toBe(true);
});


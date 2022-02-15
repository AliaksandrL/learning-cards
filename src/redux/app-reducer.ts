
const initialState = {
    isLoading: false,
    status: "idle" as RequestStatusType
};

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-LOADING': {
            return {...state, isLoading: action.isLoading};
        }
        case 'APP/SET-STATUS': {
            return {...state, ...action.payload};
        }
        default: {
            return state;
        }
    }
};


export const setLoaderAC = (isLoading: boolean) => ({type: 'APP/SET-LOADING', isLoading} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', payload: {status}} as const)

type AppStateType = typeof initialState
type ActionsType =
    | ReturnType<typeof setLoaderAC>
    | ReturnType<typeof setStatusAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


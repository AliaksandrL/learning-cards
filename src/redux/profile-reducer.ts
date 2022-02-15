const initialState = {}

export const profileReducer = (state: ProfileStateType = initialState, action: ActionsType): ProfileStateType => {
    switch (action.type) {
        case "": {
            return state
        }
        default: {
            return state
        }
    }
}

type ProfileStateType = typeof initialState
type ActionsType = any

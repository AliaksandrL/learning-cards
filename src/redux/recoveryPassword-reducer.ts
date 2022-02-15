import {Dispatch} from "redux";
import {api} from "../api/api";
import {setLoaderAC} from "./app-reducer";

const initialState = {
    email: "",
    isPasRec: false,
    from: "ai73a@yandex.by",
    message: `<div style="background-color: lime; padding: 15px"> password recovery link: <a href='http://localhost:3000/new-password/$token$'> link</a></div>`,
    recPassError: false,
    isMailSent: false
}

export const recoveryPasswordReducer = (state: RecPassStateType = initialState, action: ActionsType): RecPassStateType => {
    switch (action.type) {
        case "RECOVERY/REC-PASS": {
            return {...state, email: action.email}
        }
        case "RECOVERY/IS-PASS-REC": {
            return {...state, isPasRec: action.isPasRec}
        }
        case "RECOVERY/SET-REC-PASS-ERROR": {
            return {...state, recPassError: action.recPassError}
        }
        case "RECOVERY/IS-MAIL-SENT": {
            return {...state, isMailSent: action.isMailSent}
        }
        default: {
            return state
        }
    }
}


export const recPassAC = (email: string) => ({type: "RECOVERY/REC-PASS", email} as const)
export const isPassRecAC = (isPasRec: boolean) => ({type: "RECOVERY/IS-PASS-REC", isPasRec} as const)
export const setRecPassErrorAC = (recPassError: boolean) => ({
    type: "RECOVERY/SET-REC-PASS-ERROR",
    recPassError
} as const)
export const setIsMailSentAC = (isMailSent: boolean) => ({
    type: "RECOVERY/IS-MAIL-SENT",
    isMailSent
} as const)

export const recPassTC = (email: string, from: string, message: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoaderAC(true))
        api.emailUser(email, from, message)
            .then(()=>{
                dispatch(setIsMailSentAC(true))
            })
            .finally(() => dispatch(setLoaderAC(false)))
    }
}
export const newPassTC = (password: string, resetPasswordToken: string | undefined) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoaderAC(true))
        api.resetUser(password, resetPasswordToken)
            .then(() => dispatch(isPassRecAC(true)))
            .catch(() => dispatch(setRecPassErrorAC(true)))
            .finally(() => {
                    dispatch(setLoaderAC(false))
                    dispatch(isPassRecAC(false))
                }
            )
    }
}


type RecPassStateType = typeof initialState
type ActionsType =
    | ReturnType<typeof recPassAC>
    | ReturnType<typeof isPassRecAC>
    | ReturnType<typeof setRecPassErrorAC>
    | ReturnType<typeof setIsMailSentAC>
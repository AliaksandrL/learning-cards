import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Authorization} from "./components/Main/Authorization/Authorization";
import {Registration} from "./components/Main/Registration/Registration";
import {Profile} from "./components/Main/Profile/Profile";
import {PageNotFound} from "./components/Main/PageNotFound/PageNotFound";
import {RecoveryPassword} from "./components/Main/RecoveryPassword/RecoveryPassword";
import {NewPassword} from "./components/Main/NewPassword/NewPassword";
import {Navigate, Route, Routes} from "react-router-dom";
import {CardPacks} from "./components/Main/CardPacks/CardPacks";
import {Cards} from "./components/Main/Cards/Cards";
import {LoginDataType} from "./api/api";
import {isAuthorizedTC} from "./redux/authorization-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {ModalCheckEmail} from "./components/Main/RecoveryPassword/ModalCheckEmail";

function App() {
    const authData = useSelector<AppRootStateType, LoginDataType>(state => state.authorization.data);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.authorization.isLoggedIn);
    const dispatch = useDispatch()

    const isAuthDataEmpty = (authData: LoginDataType) => {
        for (let key in authData) {
            // если тело цикла начнет выполняться - значит в объекте есть свойства
            return false;
        }
        return true;
    }
    if (isAuthDataEmpty(authData)) {
        dispatch(isAuthorizedTC())
    }


    return (
        <div className="App">
            <Header/>
            <div>
                <Routes>
                    <Route path={'*'} element={<PageNotFound/>}></Route>
                    <Route path={'/auth'} element={!isLoggedIn ? <Authorization/> : <Navigate to={'/'}/>}></Route>
                    <Route path={'/signup'} element={!isLoggedIn ? <Registration/> : <Navigate to={'/'}/>}></Route>
                    <Route path={'/'} element={isLoggedIn ? <Profile/> : <Navigate to={'/auth'}/>}></Route>
                    <Route path={'/password-recovery'} element={<RecoveryPassword/>}></Route>
                    <Route path={'/new-password/:serverToken'} element={<NewPassword/>}></Route>
                    <Route path={'/cards/:cardsPack_Id'} element={isLoggedIn ?<Cards/> : <Navigate to={'/auth'}/>}></Route>
                    <Route path={'/packs'} element={isLoggedIn ? <CardPacks/> : <Navigate to={'/auth'}/>}></Route>
                    <Route path={'/check_email/:email'} element={<ModalCheckEmail/>}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;

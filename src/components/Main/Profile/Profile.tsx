import {useSelector} from 'react-redux';
import {LoginDataType} from '../../../api/api';
import {AppRootStateType} from '../../../redux/store';
import './Profile.css';
import {Loader} from '../../Loader/Loader';

export function Profile() {
    const authData = useSelector<AppRootStateType, LoginDataType>(state => state.authorization.data);
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
    // const [open, setOpen] = useState(false)


    return (
        <div className={"profileContainer"}>

            {/*<AddPackModal*/}
            {/*    message="Create new pack of cards"*/}
            {/*    isOpen={open}*/}
            {/*    setOpen={setOpen}*/}
            {/*    onClose={() => setOpen(false)}*/}
            {/*/> */}
            {/*<DeleteModal*/}
            {/*    message="Create new pack of cards"*/}
            {/*    isOpen={open}*/}
            {/*    onClose={() => setOpen(false)}*/}
            {/*/>*/}
            {/*<UpdatePackModal*/}
            {/*    message="Create new pack of cards"*/}
            {/*    isOpen={open}*/}
            {/*    onClose={() => setOpen(false)}*/}
            {/*    onEdit={() => setOpen(false)}*/}
            {/*/>*/}
            {/*<SuperButton onClick={() => setOpen(true)*/}
            {/*}>add new pack</SuperButton>*/}


            {isLoading && <Loader/>}
            <div>{authData.name}</div>
            <div>{authData.created}</div>
            <div>{authData.updated}</div>
        </div>
    );
}
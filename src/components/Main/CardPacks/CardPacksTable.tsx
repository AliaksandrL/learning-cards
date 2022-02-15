import React, {CSSProperties, ReactNode, useCallback, useState} from 'react';
import {createCardsPackTC, deleteCardPacksTC} from '../../../redux/cardPacks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../redux/store';
import {CardPackType} from '../../../api/api';
import {NavLink} from 'react-router-dom';
import {setIsMyCardsPacks} from '../../../redux/Packs/cards-packs-filter-reducer';

export interface ITableModel {
    title: (index: number) => ReactNode;
    render: (dataItem: any, modelIndex: number, dataIndex: number) => ReactNode;
}

interface ITableProps {
// loading: boolean;
// error: string;
//
// logoutCallback: () => void;
    model: ITableModel[];
    data: any;
    headerStyle?: CSSProperties,
    tableStyle?: CSSProperties,
    rowsStyle?: CSSProperties,
    rowStyle?: CSSProperties,
}

export const CardPacksTable: React.FC<ITableProps> = (
    {
// loading,
// error,
// logoutCallback,
        model,
        // data,
        headerStyle,
        tableStyle,
        rowsStyle,
        rowStyle,
    }
) => {
    const dispatch = useDispatch();
    const [newPackName, setNewPackName] = useState<string>('');
    const data = useSelector<AppRootStateType, CardPackType[]>(state => state.cardPacks.cardPacks);
    const user_id = useSelector<AppRootStateType, string | undefined>(state => state.authorization.data._id);
    const isMyCardsPacks = useSelector<AppRootStateType, boolean>(state => state.cardsPackFilter.isMyCardsPacks);

    const addCardPack = useCallback((newPackName: string) => {
        dispatch(createCardsPackTC(newPackName, user_id, isMyCardsPacks));
    }, [user_id, isMyCardsPacks, dispatch]);

    const deleteCardPack = useCallback((id: string) => {
        dispatch(deleteCardPacksTC(id, user_id, isMyCardsPacks));
    }, [user_id, isMyCardsPacks, dispatch]);

    return (
        <div
            style={{
                margin: '0 10px',
                // minHeight: '80vh',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                ...tableStyle,
            }}
        >
            table
            <div>
                <input type='text' value={newPackName} onChange={e => setNewPackName(e.currentTarget.value)}/>
                <button type='button' onClick={() => addCardPack(newPackName)}>
                    add
                </button>
            </div>

            <div>
                <input type='checkbox' checked={isMyCardsPacks}
                       onChange={e => dispatch(setIsMyCardsPacks(e.currentTarget.checked))}
                />
                <span>Watch my card packs</span>
            </div>
            {/*{loading*/}
            {/*? <div style={{color: 'orange'}}>loading...</div>*/}
            {/*: error*/}
            {/*? <div style={{color: 'red'}}>{error}</div>*/}
            {/*: <div><br/></div>*/}
            {/*}*/}

            <div
                style={{
                    border: '1px solid red',
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...headerStyle,
                }}
            >
                {model.map((m: ITableModel, index: number) => m.title(index))}
            Hey
            </div>

            <div
                style={{
                    border: '1px solid lime',
                    width: '100%',
                    ...rowsStyle,
                }}
            >
                {data.map((dataItem: any, dataIndex: number) => (
                    <div
                        key={dataItem._id || dataIndex}
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexFlow: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...rowStyle,
                        }}>

                        {model.map((m, modelIndex) => m.render(dataItem, modelIndex, dataIndex))}
                        {user_id === dataItem.user_id
                            ? <>
                                <button type='button' onClick={() => deleteCardPack(dataItem._id)}>
                                    del
                                </button>
                                <button type='button'>
                                    update
                                </button>
                            </>
                            : null}

                        <button type='button'>
                            <NavLink to={`/cards/${dataItem._id}`}>Сards</NavLink>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

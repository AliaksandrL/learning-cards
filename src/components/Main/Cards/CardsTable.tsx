import React, {CSSProperties, ReactNode, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../redux/store';
import {CardsResType} from '../../../api/api';
import {createCardTC, deleteCardTC} from '../../../redux/cards-reducer';

export interface ITableModel {
    title: (index: number) => ReactNode;
    render: (dataItem: any, modelIndex: number, dataIndex: number) => ReactNode;
}

interface ITableProps {
    model: ITableModel[];
    data: any;
    headerStyle?: CSSProperties,
    tableStyle?: CSSProperties,
    rowsStyle?: CSSProperties,
    rowStyle?: CSSProperties,
    cardsPack_id: string | undefined
}

export const CardsTable: React.FC<ITableProps> = (
    {
        model,
        headerStyle,
        tableStyle,
        rowsStyle,
        rowStyle,
        cardsPack_id
    }
) => {
    const dispatch = useDispatch();
    const [newCardName, setNewCardName] = useState<string>('');
    const cardsObj = useSelector<AppRootStateType, CardsResType>(state => state.cards);
    const user_id = useSelector<AppRootStateType, string | undefined>(state => state.authorization.data._id);
    const data = cardsObj.cards;

    const addCard = useCallback((newCardName: string) => {
        dispatch(createCardTC(cardsPack_id, newCardName));
    }, [cardsPack_id, dispatch]);

    const deleteCard = useCallback((cardId: string) => {
        dispatch(deleteCardTC(cardsPack_id, cardId));
    }, [cardsPack_id, dispatch]);

    return (
        <div
            style={{
                margin: '0 10px',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                ...tableStyle,
            }}>

            table
            {user_id === cardsObj.packUserId
                ? <div>
                    <input type='text' value={newCardName} onChange={e => setNewCardName(e.currentTarget.value)}/>
                    <button type='button' onClick={() => addCard(newCardName)}>
                        add
                    </button>
                </div>
                : null}

            <div
                style={{
                    border: '1px solid red',
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...headerStyle,
                }}>

                {model.map((m: ITableModel, index: number) => m.title(index))}

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
                        {user_id === cardsObj.packUserId
                            ? <>
                                <button type='button' onClick={() => deleteCard(dataItem._id)}>
                                    del
                                </button>
                                <button type='button'>
                                    update
                                </button>
                            </>
                            : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

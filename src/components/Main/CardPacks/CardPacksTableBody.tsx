import {ITableModel} from './CardPacksTable';
import React from 'react';
import {useDispatch} from 'react-redux';
import {setFirstNumberSort, setSecondDescriptionSort} from '../../../redux/Packs/cards-packs-filter-reducer';
import {EditableSpan} from "../../common/EditableSpan";


export type CardPacksTableBodyPropsType = {
    firstNumber: number
}

export const CardPacksTableBody = (props: CardPacksTableBodyPropsType): ITableModel[] => {
    const dispatch = useDispatch();

    const sliceNameFunction = (name: any) => {
        const some = name.split(['↕']);
        return some[0];
    };

    return ([
            {
                title: (i: number) => (
                    <div key={i} style={{width: '100%', display: 'flex'}}>
                        <button onClick={(e) => {
                            dispatch(setSecondDescriptionSort(sliceNameFunction((e.target as HTMLElement).innerText)));
                            dispatch(setFirstNumberSort(!!props.firstNumber ? 0 : 1));
                        }}>
                            name↕
                        </button>
                    </div>
                ),
                render: (d, i: number) => (
                    <div key={i} style={{width: '100%'}}>
                        <EditableSpan title={d.name} packId={d._id} user_id={d.user_id}/>
                        {/*{d.name}*/}
                    </div>
                ),
            },
            {
                title: (i: number) => (
                    <div key={i} style={{width: '100%', display: 'flex'}}>
                        <button onClick={(e) => {
                            dispatch(setSecondDescriptionSort(sliceNameFunction((e.target as HTMLElement).innerText)));
                            dispatch(setFirstNumberSort(!!props.firstNumber ? 0 : 1));
                        }}>
                            cardsCount↕
                        </button>
                    </div>
                ),
                render: (d, i: number) => (
                    <div key={i} style={{width: '100%'}}>{d.cardsCount}</div>
                ),
            },
            {
                title: (i: number) => (
                    <div key={i} style={{width: '100%', display: 'flex'}}>
                        <button onClick={(e) => {
                            dispatch(setSecondDescriptionSort(sliceNameFunction((e.target as HTMLElement).innerText)));
                            dispatch(setFirstNumberSort(!!props.firstNumber ? 0 : 1));
                        }}>
                            updated↕
                        </button>
                    </div>
                ),
                render: (d, i: number) => (
                    <div key={i} style={{width: '100%'}}>{d.updated}</div>
                ),
            },
            {
                title: (i: number) => (
                    <div key={i} style={{width: '100%', display: 'flex'}}>
                        <button onClick={(e) => {
                            dispatch(setSecondDescriptionSort(sliceNameFunction((e.target as HTMLElement).innerText)));
                            dispatch(setFirstNumberSort(!!props.firstNumber ? 0 : 1));
                        }}>
                            userName↕
                        </button>
                    </div>
                ),
                render: (d, i: number) => (
                    <div key={i} style={{width: '100%'}}>{d.user_name}</div>
                ),
            },
        ]
    );
};


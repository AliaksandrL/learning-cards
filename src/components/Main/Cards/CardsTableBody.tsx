import {ITableModel} from '../CardPacks/CardPacksTable';

export const CardsTableBody = (): ITableModel[] => [
    {
        title: (i: number) => (
            <div key={i} style={{width: '100%'}}> question </div>
        ),
        render: (d, i: number) => (
            <div key={i} style={{width: '100%'}}>{d.question}</div>
        ),
    },
    {
        title: (i: number) => (
            <div key={i} style={{width: '100%'}}> answer </div>
        ),
        render: (d, i: number) => (
            <div key={i} style={{width: '100%'}}>{d.answer}</div>
        ),
    },
    {
        title: (i: number) => (
            <div key={i} style={{width: '100%'}}> Grade </div>
        ),
        render: (d, i: number) => (
            <div key={i} style={{width: '100%'}}>{d.grade}</div>
        ),
    },
    {
        title: (i: number) => (
            <div key={i} style={{width: '100%'}}> updated </div>
        ),
        render: (d, i: number) => (
            <div key={i} style={{width: '100%'}}>{d.updated}</div>
        ),
    },
    {
        title: (i: number) => (
            <div key={i} style={{width: '100%'}}> created </div>
        ),
        render: (d, i: number) => (
            <div key={i} style={{width: '100%'}}>{d.created}</div>
        ),
    },
];

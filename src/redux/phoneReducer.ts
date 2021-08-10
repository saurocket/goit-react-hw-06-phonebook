import { createAction, createReducer } from '@reduxjs/toolkit';
import {contactsFilter} from "./firlter";


type ItemPhoneType = {
    id: string | number,
    name: string,
    number: string
}

const state = {
    contacts: {
        items: [] as [] | Array<ItemPhoneType> ,
        filter: ''
    }
}

// export const phoneReducer = (state = initialState, action: any) => {
//     switch (action.type) {
//         case addContact:
//             return {...state, contacts: {...state.contacts,
//                     items: [...state.contacts.items, action.payload]}}
//
//         case deleteContact:
//             return {...state, contacts: {...state.contacts,
//                     items: [...state.contacts.items.filter(item => item.id !== action.payload)]}}
//         case filterContact:
//             return  {...state, contacts: {...state.contacts, filter: action.payload} }
//         default:
//             return state;
//     }
// }

export const addContact = createAction('phone/addContact')
export const deleteContact = createAction('phone/deleteContact')
export const filterContact = createAction('phone/filterContact')

export const phone = createReducer(state, {
    // @ts-ignore
    [addContact]: (state, action) => {
        return {...state, contacts: {...state.contacts,
                items: contactsFilter([...state.contacts.items, ...action.payload])}}
    },
    // @ts-ignore
    [deleteContact]: (state, action) => {
        return {...state, contacts: {...state.contacts,
                    items: [...state.contacts.items.filter(item => item.id !== action.payload)]}}
    },
    // @ts-ignore
    [filterContact]: (state, action) => {
        return  {...state, contacts: {...state.contacts, filter: action.payload} }
    }

})



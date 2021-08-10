import React, {useEffect, useState} from 'react'
import {Header} from "./Header/Header";
import {Form} from "./From/From";
import {ContactsPage} from './ContacstPage/ContactsPage';
import {useDispatch, useSelector} from "react-redux";
import {addContact, deleteContact, filterContact} from "../redux/phoneReducer";
import {AppStateType} from "../redux/store";


export type ContactType = {
    id: string,
    name: string,
    number: string,
}


export type IState = {
    name: string
    number: string
}

export const MainPage = () => {
    const dispatch = useDispatch()
    const {items: contactsState, filter} = useSelector((state: AppStateType) => state.phone.contacts)
    const [state, setState] = useState<IState>({
        name: '',
        number: ''
    })
    useEffect(() => {
        const constants = localStorage.getItem('contacts')
        if (constants) {
            const parseContacts = JSON.parse(constants) as Array<ContactType>
            // @ts-ignore
            dispatch(addContact(parseContacts))
        }
    }, [])

    useEffect(() => {
        if (contactsState.length > 0) {
            localStorage.setItem('contacts', JSON.stringify(contactsState))
        }
    },[contactsState])


    const onChangeName = (value: string) => {
        setState(prevState => {
            return {...prevState, name: value}
        })
    }
    const onChangePhone = (value: string) => {
        setState(preState => {
            return {...preState, number: value}
        })
    }
    const onChangeFilter = (value: string) => {
        // @ts-ignore
        dispatch(filterContact(value))
    }
    const onSubmitForm =  (data: ContactType) => {
        // @ts-ignore
      dispatch(addContact([data]))

    }
    const onDeleteContact = (id: string) => {
        // @ts-ignore
        dispatch(deleteContact(id))
    }
    const onCheckContactList = (name: string) => {

        // @ts-ignore
        return (contactsState.find(item => item.name === name))
    }
    return (
        <>
            <Header text='PhoneBook'/>
            <Form
                onCheckContactList={onCheckContactList}
                onSubmitForm={onSubmitForm}
                name={state.name}
                phone={state.number}
                onChangeName={onChangeName}
                onChangePhone={onChangePhone}
            />
            <ContactsPage
                onChangeFilter={onChangeFilter}
                contacts={contactsState}
                onDeleteContact={onDeleteContact}
                filter={filter}
            />
        </>
    )

}
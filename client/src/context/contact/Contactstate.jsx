import React, {useReducer} from 'react'
import axios from 'axios';
import Contactcontext from './Contactcontext'
import Contactreducer from './Contactreducer'
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_CONTACTS,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR

}from '../types'

const Contactstate = props =>{

    const initialState ={
        contacts:[],
        current:null,
        filtered:null,
        error:null
    }



    const [state,dispatch] = useReducer(Contactreducer,initialState)

    //GET CONTACTS
    const getContacts= async contact =>{
        try {
            const res=await axios.get("http://localhost:5000/api/contacts",contact, config)
            dispatch({
                type:GET_CONTACTS,
                payload:res.data})
        } catch (error) {
            dispatch ({type:CONTACT_ERROR,
                         payload:error.response.msg})
            
        }

        
    }



    //ADD contact
    const addContact= async contact =>{
        const config= {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res=await axios.post("http://localhost:5000/api/contacts",contact, config)
            dispatch({
                type:ADD_CONTACT,
                payload:res.data})
        } catch (error) {
            dispatch ({type:CONTACT_ERROR,
                         payload:error.response.msg})
            
        }

        
    }

    //clear Contacts
    const clearContacts= contact =>{
    
        dispatch({type:CLEAR_CONTACTS})
    }

    






    //Delete Contact
    const deleteContact= async id =>{
    
        try {
            const res=await axios.delete(`http://localhost:5000/api/contacts/${id}`)
            dispatch({type:DELETE_CONTACT,payload:id})
        } catch (error) {
            dispatch ({type:CONTACT_ERROR,
                         payload:error.response.msg})
            
        }
        
    }


    //Set current contact
    const setCurrent= contact =>{
    
        dispatch({type:SET_CURRENT,payload:contact})
    }


    //clear current contact

    const clearCurrent= contact =>{
    
        dispatch({type:CLEAR_CURRENT})
    }



    //updtae contact
    const updateContact= async contact =>{
        const config= {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res=await axios.put(`http://localhost:5000/api/contacts/${contact._id}`,contact, config)
            
        dispatch({type:UPDATE_CONTACT,payload:res.data})
        } catch (error) {
            dispatch ({type:CONTACT_ERROR,
                         payload:error.response.msg})
            
        }

    
    }

    //filter contacts

    const filterContacts= text =>{
    
        dispatch({type:FILTER_CONTACTS,payload:text})
    }

    //clear filter
    const clearFilter= () =>{
    
        dispatch({ type: CLEAR_FILTER })
    }



    return (
        <Contactcontext.Provider
            value ={{
                contacts:state.contacts,
                current:state.current,
                filtered:state.filtered,
                error:state.error,
                addContact,
                deleteContact,
                updateContact,
                filterContacts,
                clearFilter,
                setCurrent,
                clearCurrent,
                getContacts,
                clearContacts

            }

            }>
            {props.children}
        </Contactcontext.Provider>
    )
}

export default Contactstate
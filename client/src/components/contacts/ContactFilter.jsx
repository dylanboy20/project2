import React,{useContext ,useRef,useEffect} from 'react'
import Contactcontext from '../../context/contact/Contactcontext'

const ContactFilter = () => {
    const contactContext=useContext(Contactcontext)
    const text= useRef('')
    const {filterContacts, clearFilter,filtered}=contactContext


    useEffect(()=>{
        if(filtered===null){
            text.current.value=''

        }
    })
    
    
    const onChange =e =>{
        if(text.current.value !=''){
            filterContacts(e.target.value)

        }
        else{
            clearFilter()
        }

    }

  return (
<form>
    <input ref={text} type="text" placeholder='Filter Contacts...' onChange={onChange}/>
</form>
  )
}

export default ContactFilter

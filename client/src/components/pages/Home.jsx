import React from 'react'
import Contacts from '../contacts/Contacts'
import Contactform from '../contacts/Contactform'
import ContactFilter from '../contacts/ContactFilter'
const Home = () => {
  return (
    <div className='grid-2'>
        <div>
          <Contactform/>
        </div>
        <div>
          <ContactFilter/>

          <Contacts/>
        </div>
      
    </div>
  )
}

export default Home

import React, { useState } from 'react'
import './footer.css'

export default function NewsLetter(props) {
  const [newSignup, setNewSignup] = useState({});



  const handleChange = (event) => {

    const attributeToChange = event.target.name
    const newValue = event.target.value  

    // make a copy of the new recipe state 
    const email = {...newSignup}
    email[attributeToChange] = newValue
    console.log(email)
    setNewSignup(email)
}

    const handleClick = (event) => {
      event.preventDefault()
      props.addNewsletterEmail(newSignup)
      document.getElementById("clear-form").reset();

    }


  return (
    <div className="email-container">
    <h2 className="emailTitle" >Newsletter Signup</h2>
    <hr className='mobileHide'></hr>
    <form onSubmit={handleClick} id="clear-form">

        <input className="emailInput" type="text" name="emailAddress" placeholder="bill@bootleg.com" onChange={handleChange}></input>
 

        <input className="emailButton" type="submit" value="Signup" onClick={(e) => {handleClick(e)}}></input>
    
    </form>
    
    </div>
  )
}

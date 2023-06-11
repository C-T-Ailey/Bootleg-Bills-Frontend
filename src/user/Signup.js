import React, { useEffect, useState } from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import Switch from 'react-switch'
import './user.css'


export default function Signup(props) {

    const [newUser, setNewUser] = useState({})

    const [userRole, setUserRole] = useState("")

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setUserRole(checked ? "seller" : "buyer")
    }, [checked])

    console.log(userRole)

    const defaultUserRole = "buyer"

    const sellerKey = process.env.REACT_APP_SELLER_KEY
    
    const handleChange = (event) => {
        const user = {...newUser}
        user[event.target.name] = event.target.value
        console.log(user)
        setNewUser(user)
    }

    const handleToggleChange = () => {
        setChecked(!checked)
    }

    const registerHandler = () => {
        if(!checked){
            console.log("Role not altered path")
            setUserRole(defaultUserRole)
            newUser.userType = userRole
            console.log(newUser.userType)
            console.log(newUser)
            props.register(newUser)
        } else {
            console.log("Role altered path")
            if (sellerKey !== document.getElementById("sellerKeyForm").value){
                console.log(sellerKey)
                console.log(document.getElementById("sellerKeyForm").value)
                console.log("Invalid verification key.")
            } else {
                console.log(newUser)
                setUserRole("seller")
                newUser.userType = userRole
                props.register(newUser)
            }
        }
    }

    const handleMask = (e) => {
        console.log(e.target.attributes)
    }

  return (
    <div>
        <h1>Sign Up</h1>
        <Container bsPrefix='auth-form'>
            <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control className='auth-input' name="firstName" onChange={handleChange}></Form.Control>
            </Form.Group>

            <br/>

            <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control className='auth-input' name="lastName" onChange={handleChange}></Form.Control>
            </Form.Group>

            <br/>

            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control className='auth-input' name="emailAddress" onChange={handleChange}></Form.Control>
            </Form.Group>

            <br/>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control className='auth-input' name="password" type="password" onChange={handleChange}></Form.Control>
            </Form.Group>

            <br/>

            <Form.Group>
                <div className="userType">
                    <Form.Label>Register as Bootleg Bill's staff:</Form.Label>
                    <Switch className='switch' onChange={handleToggleChange} checked={checked}/>
                </div>
                
            </Form.Group>

                <Form.Group className='verify-seller'>
                    <Form.Label>{userRole === "seller" ? ("Enter your staff registration code:") : ("")}</Form.Label>
                    <Form.Control className='auth-input' id="sellerKeyForm" type={userRole === "buyer" ? ("hidden") : ("text")} onChange={(e) => console.log(e.target.value)} autoComplete='new-password' onClick={(e) => {handleMask(e)}}></Form.Control>
                </Form.Group>
                
            <br/>


            <Button variant="primary" onClick={registerHandler}>Register</Button>
        </Container>
    </div>
  )
}

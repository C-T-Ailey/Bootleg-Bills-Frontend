import React, { useState } from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './user.css'

export default function Login(props) {
    console.log(props)

    const [newUser, setNewUser] = useState({})

    // const [role, setRole] = useState("")

    const handleChange = (event) => {
        const user = {...newUser}
        user[event.target.name] = event.target.value
        console.log(user)
        setNewUser(user)
    }

    const loginHandler = () => {
        console.log(newUser)
        props.login(newUser)
    }


  return (
    <div className='login-container'>
        <h1>Log In</h1>
        <Container bsPrefix='auth-form'>
            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control className='auth-input' name="emailAddress" onChange={handleChange} />
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control className='auth-input' name="password" type="password" onChange={handleChange} />
            </Form.Group>
            <br/>
            <Button variant="primary" onClick={loginHandler}>Log In</Button>
            <div className='not-a-user'>
                <p>Not signed up? <Link to='/signup'>Create an account!</Link> </p>
            </div>
        </Container>

    </div>
  )
}

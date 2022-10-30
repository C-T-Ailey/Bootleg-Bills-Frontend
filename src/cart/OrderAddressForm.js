import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import Switch from 'react-switch'


export default function OrderAddressForm(props) {

    const [checked, setChecked] = useState(true)
    console.log(props.sameAddress)
    // const handleSubmit = () => {
    //     console.log("addresses added")
    // }

    const handleToggle = () => {
        props.setSameAddress(!props.sameAddress)
        setChecked(!checked)
        console.log(checked, props.sameAddress)
    }
    
  return (
    <div>
        <h2> Address Details </h2>
        <Container>
        <h3> Enter Billing Address: </h3>
            <Form.Group>
                <Form.Label> Address Line 1: </Form.Label>
                <Form.Control name="lineOne" onChange={props.handleBillingChange}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label> Address Line 2: </Form.Label>
                <Form.Control name="lineTwo" onChange={props.handleBillingChange}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label> City: </Form.Label>
                <Form.Control name="city" onChange={props.handleBillingChange}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label> Country: </Form.Label>
                <Form.Control name="country" onChange={props.handleBillingChange}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label> Postcode: </Form.Label>
                <Form.Control name="postcode" onChange={props.handleBillingChange}/> 
            </Form.Group>
            <h3> Shipping Address: </h3>

            <Form.Group>
                <Form.Label>Email Address For Order Confirmation:</Form.Label>
                <Form.Control name="customerEmail" onChange={props.handleShippingChange}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label> Use same shipping address? </Form.Label>
                <Switch className="switch" onChange={handleToggle} checked={checked}/>
            </Form.Group>
           
            <Form.Group>
                <Form.Label> {!props.sameAddress ? ("Address Line 1:") : ("")} </Form.Label>
                <Form.Control name="lineOne" type={props.sameAddress ? ("hidden") : ("text")} onChange={props.handleShippingChange} /> 
            </Form.Group>

            <Form.Group>
                <Form.Label> {!props.sameAddress ? ("Address Line 2:") : ("")} </Form.Label>
                <Form.Control name="lineTwo" type={props.sameAddress ? ("hidden") : ("text")} onChange={props.handleShippingChange}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label> {!props.sameAddress ? ("City:") : ("")} </Form.Label>
                <Form.Control name="city" type={props.sameAddress ? ("hidden") : ("text")} onChange={props.handleShippingChange}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label> {!props.sameAddress ? ("Country:") : ("")} </Form.Label>
                <Form.Control name="country" type={props.sameAddress ? ("hidden") : ("text")} onChange={props.handleShippingChange}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label> {!props.sameAddress ? ("Postcode:") : ("")} </Form.Label>
                <Form.Control name="postcode" type={props.sameAddress ? ("hidden") : ("text")} onChange={props.handleShippingChange}/> 
            </Form.Group>
          
        </Container>
    </div>
  )
}

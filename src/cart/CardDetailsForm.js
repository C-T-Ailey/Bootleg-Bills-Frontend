import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'

export default function CardDetailsForm(props) {


    // const handleSubmit = () => {
    //     console.log("payment details added")
    //     // props.setorderForm(orderForm => [...orderForm, ])
    // }
  return (
    <div>
        <h3> Enter Card Details: </h3>
        <h5>(But don't really, this isn't an actual shop)</h5>
        <Container>
            <Form.Group>
                <Form.Label> Cardholder Name: </Form.Label>
                <Form.Control name="customerName" onChange={props.handleChange}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label> Card Number: </Form.Label>
                <Form.Control name="cardNumber" onChange={props.handleChange}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label> Expiry Date: </Form.Label>
                <Form.Control name="expiryDate" onChange={props.handleChange}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label> CVV: </Form.Label>
                <Form.Control name="cvv" onChange={props.handleChange}/> 
            </Form.Group>

        </Container>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button, Container, Form } from 'react-bootstrap'
import './MixtapeCreateForm.css'

export default function OrderDetailCard(props) {

    const [colorState, setColorState] = useState({"backgroundColor": "#00BFC3"})

    const [newOrderForm, setNewOrderForm] = useState({})

    useEffect(() => {
        console.log(props.personal)
        console.log(props.order)
        setNewOrderForm(props.order)
    },[])

    useEffect(() => {
        if (!!newOrderForm.mixForm){
            let newColour = newOrderForm.mixForm.shellColour
            if(newColour !== "clear" && !!newColour){
                setColorState({"backgroundColor": newColour})
            } else if (newColour === "clear") {
                setColorState({"display":"none"})
            }
        }
    },[newOrderForm])


    const handleColor = (e) => {
        if(e.target.value !== "clear"){
            setColorState({"backgroundColor": e.target.value})
        } else {
            setColorState({"display":"none"})
        }

    }

    const trackInstructions = "Please number and provide the length (in mm:ss) for each individual track in your mix. Any tracks which cause the mix to exceed the 30 minutes per side runtime limit will be omitted."

    const handleMixFormChange = (e) => {
        console.log(e.target.value)
        let propertyToChange = e.target.name
        let newValue = e.target.value
        let order = {...newOrderForm}
        if (!!order.mixForm) {
            console.log("mixForm property present")
        } else {
            console.log("mixForm property not present")
            order = {...props.order, "mixForm":{}}
        }
        order.mixForm[propertyToChange] = newValue 
        console.log(order)
        setNewOrderForm(order)
    }

    const handleSubmit = (e) => {
        console.log(newOrderForm, newOrderForm._id, newOrderForm.mixForm)
        const updatedOrder = {"_id": newOrderForm._id, "mixForm": newOrderForm.mixForm}
        Axios.put(`https://bootlegbackend.herokuapp.com/orders/update`, updatedOrder, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
                console.log(response.data)
                props.setOrder(response.data.product)
            })
            .catch((error) => {
                console.log("Error updating order:", error)
                props.sessionExpiredHandler()
        })
        console.log(updatedOrder)
    } 

  return (
    
    <div>Your Mix-By-Proxy Specs:
        <Container>
            <Form.Group>
                <br/>
            { props.personal ? 
                    <>
                        <Form.Label>URL for your desired case insert artwork:</Form.Label>
                        <Form.Control placeholder='https://your-artwork-here.com' name="caseArt" defaultValue={!!newOrderForm.mixForm ? newOrderForm.mixForm.caseArt : ""} onChange={(e) => handleMixFormChange(e)}></Form.Control>
                        
                        <Form.Label>URLs for your desired cassette label(s):</Form.Label>
                        <Form.Control placeholder='Side A' name="artSideA" defaultValue={!!newOrderForm.mixForm ? newOrderForm.mixForm.artSideA : ""} onChange={(e) => handleMixFormChange(e)}></Form.Control>
                        <Form.Control placeholder='Side B (optional)' name="artSideB" defaultValue={!!newOrderForm.mixForm ? newOrderForm.mixForm.artSideB : ""} onChange={(e) => handleMixFormChange(e)}></Form.Control>
                        
                        <Form.Label>Cassette tape shell colour:</Form.Label>
                        <div className='color-div'>
                            <div className='color-box-flex'>
                                {!!colorState.backgroundColor ?
                                (<div className='color-box' style={colorState}></div>)
                                :
                                (<div className='color-box-bg'>
                                    <div className='black-box'></div>
                                    <div className='white-box'></div>
                                    <div className='white-box'></div>
                                    <div className='black-box'></div>
                                </div>)
                                }
                            </div>

                            <Form.Select className='status-option' aria-label="Default select example" name="shellColour" defaultValue={!!newOrderForm.mixForm ? newOrderForm.mixForm.shellColour : ""} onChange={(e) => handleMixFormChange(e)}>
                                <option className='status-option' value="#00BFC3">Bootleg Blue</option>
                                <option className='status-option' value="#FF2273">Outrun Pink</option>
                                <option className='status-option' value="#F8DC38">Yesteryear Yellow</option>
                                <option className='status-option' value="#e00000">Red-rospective</option>
                                <option className='status-option' value="#0008ba">Bold Navy</option>
                                <option className='status-option' value="#00ed21">Rad Green</option>
                                <option className='status-option' value="#454a39">Drab Olive</option>
                                <option className='status-option' value="#662e1a">Rusty Brown</option>
                                <option className='status-option' value="#c44500">Brick Orange</option>
                                <option className='status-option' value="#d4b895">"90's Home PC" Beige</option>
                                <option className='status-option' value="#ffffff">Crisp White</option>
                                <option className='status-option' value="#000000">Classic Black</option>
                                <option className='status-option' value="clear">Crystal Clear (transparent shell)</option>
                            </Form.Select>
                        </div>
                    </>
                : <></>
            }

            <Form.Label>Your Tracklist</Form.Label>
            <Form.Control className='select-text' as={"textarea"} rows={6} placeholder={trackInstructions} name="trackList" onChange={(e) => handleMixFormChange(e)}></Form.Control>
            </Form.Group>
            <Button name="save form button" onClick={(e) => handleSubmit(e)}>Save Form</Button>
        </Container>
    </div>
  )
}

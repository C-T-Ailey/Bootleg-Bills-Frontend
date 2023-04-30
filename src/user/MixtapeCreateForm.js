import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Container, Form } from 'react-bootstrap'
import './MixtapeCreateForm.css'

export default function OrderDetailCard(props) {

    useEffect(() => {
        console.log(props.personal)
    },[])

    const [colorState, setColorState] = useState({"backgroundColor": "#00BFC3"})

    const changeColor = (e) => {
        if(e.target.value !== "clear"){
            setColorState({"backgroundColor": e.target.value})
        } else {
            setColorState({"display":"none"})
        }
    }

    const trackInstructions = "Please number and provide the length (in mm:ss) for each individual track in your mix. Any tracks which cause the mix to exceed the 60 minute runtime limit will be omitted."

  return (
    
    <div>Your Mix-By-Proxy Form:
        <Container>
            <Form.Group>
            { props.personal ? 
                    <>
                        <Form.Label>URL for your desired case insert artwork:</Form.Label>
                        <Form.Control></Form.Control>
                        
                        <Form.Label>URLs for your desired cassette label/s artwork:</Form.Label>
                        <Form.Control placeholder='Side A'></Form.Control>
                        <Form.Control placeholder='Side B (optional)'></Form.Control>
                        
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
                            <Form.Select className='status-option' aria-label="Default select example" onChange={(e) => changeColor(e)}>
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
                <Form.Control className='select-text' as={"textarea"} rows={6} placeholder={trackInstructions}></Form.Control>
            </Form.Group>
        </Container>
    </div>
  )
}

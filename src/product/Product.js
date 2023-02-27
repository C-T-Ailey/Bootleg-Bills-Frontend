import React, {useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import ProductDetail from './ProductDetail';
import Button from 'react-bootstrap/Button';

import {
  Col,
  Modal,
} from "react-bootstrap";
import './Product.css'


// import audio from './audio/30_Seconds_of_Bowling_Sounds.mp3'

// import audio from './audio/30_Seconds_of_Bowling_Sounds.mp3'


 


export default function Product(props) {
  let productQuantity = props.products.productStock


  const numberInput = useRef(null)

  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [disabled, setDisabled] = useState(false)




  const setModalOpen =()=>{
    !modalIsOpen ? setModalIsOpen(true) : setModalIsOpen(false)
  }

  // const handleInputChange = (e) => {
  //   console.log(e.target.value)
  //   props.handleProductQuantity(e.target.value)
  // }

  const handleNumber = (e) => {
    let number = numberInput.current
    console.log(number.value)
    number.focus();
    let inputInt = parseInt(number.value)
    console.log(inputInt)
    e.target.innerText === "+" ? inputInt += 1 : (inputInt > 1 ? inputInt -= 1 : inputInt = 1)
    number.value = inputInt
    console.log("number value:",number.value)
    props.handleProductQuantity(number.value)
  }

  const handleChange = (e) => {
    console.log("test")
    console.log(numberInput.current.value)
  }

  // const addToCart = (product) => {
  //   console.log("button clicked")
  //   console.log(product)
  //   console.log(productQuantity)
  //   // setCartItemQuant(cartItemQuant[product._id]=productQuantity)
  //   // console.log(cartItemQuant[product._id])
  //   // let tempCart = []
  //   for (let i = 1; i <= props.productQuantity; i++){
  //     setCart(cart => [...cart, product])
  //   }
  //   // setCart(cart.concat(product))
  //   // setCart(cart => [...cart, product])
  //   setCartCount(cart.length)
  //   setProductQuantity(1)
  //   console.log(cart)
  //   console.log(cartCount)
  // }
  
  const divStyle ={
    color: 'black',

  }
  

  if (productQuantity === 0){
    productQuantity = "OUT OF STOCK"
    divStyle.color = 'red'    

  } else if (productQuantity <= 20 ){
    productQuantity = `ONLY ${productQuantity} LEFT`
    divStyle.color = 'orange'
    
  } else if (productQuantity > 20) {
    productQuantity = "IN STOCK"
    divStyle.color = 'green'

  }



  return (
    <><Col style={{marginBottom: '20px'}} >
        <Card  style={{ cursor: 'pointer'}} className="card-container">

          
            <Card.Img className="imageHover" onClick={() => setModalOpen()} variant="top" src={props.products.productImageUrls[0]} />
            <Card.Body >
                
                
                <Card.Title onClick={() => setModalOpen()} >{props.products.productName}</Card.Title> 
                <hr></hr>
                <Card.Text onClick={() => setModalOpen()} >£{props.products.productPrice}</Card.Text>
                
 

                {/* <Button onClick={() => setModalOpen()} style={{marginBottom: '10px'}}>Product Details</Button> &nbsp; */}

                <Modal size="xl" centered show={modalIsOpen} onHide={() => setModalOpen()}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{fontWeight: "bolder"}}>
                      More about this product...
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
  
                    <ProductDetail products={props.products} addToCart={props.addToCart} handleProductQuantity={props.handleProductQuantity} handleNumber={handleNumber} handleChange={handleChange} numberInput={numberInput} />

                  </Modal.Body>
                </Modal>
                

                {/* CHRIS CHANGES */}
                {/* <Button onClick={(e) => {props.increaseQuantity(e)}}> + </Button> */}
                {/* <Form.Control disabled={props.products.productStock === 0 ? true : false} type="number" name={props.products.name} placeholder="1" min={1} max={props.products.productStock} onChange={(e) => handleInputChange(e)}></Form.Control> */} 
                <Card.Text onClick={() => setModalOpen()}  style={divStyle}>{productQuantity}</Card.Text>
                <div className="button-container">
                  <Button size="sm" disabled={props.products.productStock === 0 ? true : false} variant='secondary' onClick={(e) => handleNumber(e)}> - </Button>
                    <input disabled={props.products.productStock === 0 ? true : false} className='numInput' type="text" inputMode='numeric' ref={numberInput} defaultValue={1} min={1} onChange={(e) => handleChange(e)} ></input>
                  <Button size="sm" disabled={props.products.productStock === 0 ? true : false} variant='secondary' onClick={(e) => handleNumber(e)}> + </Button> &nbsp;
                  
                </div>
                <Button size="" disabled={props.products.productStock === 0 ? true : false} type="text"  id="addToCart" variant="primary" onClick={() => {props.addToCart(props.products)}} style={{marginBottom: '10px'}}> Add To Cart </Button>
                 &nbsp; 
               
                {/* <Button variant="primary" onClick={() => {props.addToCart(props.products)}}> Add to Cart </Button> &nbsp; */}

                {/* <BsCart4 size={28} style={{ cursor: 'pointer'}} onClick={() => {props.addToCart(props.products)}}> </BsCart4>&nbsp; */}
                {/* <Button onClick={(e) => {props.increaseQuantity(e)}}> + </Button> */}
                {/* <input type="number" name={props.products.name} placeholder="1" min={1}  onChange={(e) => handleInputChange(e)}></input> */}
                {/* <Button onClick={(e) => {props.decreaseQuantity(e)}}> - </Button> */}


            </Card.Body>

        </Card>
        </Col>
    </>
  )
}

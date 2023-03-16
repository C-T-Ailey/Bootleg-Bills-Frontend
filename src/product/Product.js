import React, { useState, useRef, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ProductDetail from './ProductDetail';
import Button from 'react-bootstrap/Button';

import { Col, Modal } from "react-bootstrap";
import './Product.css' 

// Props required by this component from App.js: product, cart, setCart
export default function Product(props) {
  let productStock = props.product.productStock
  let stockAlert = ""
  
  const numberInput = useRef(null)

  const [isNameHover, setIsNameHover] = useState(false);

  const handleMouseOver = () => {
    setIsNameHover(true)
  }

  const handleMouseOut = () => {
    setIsNameHover(false)
  }

  const [productQuantity, setProductQuantity] = useState(1);
  const [productPlaceholder, setProductPlaceholder] = ([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalOpen =()=>{
    !modalIsOpen ? setModalIsOpen(true) : setModalIsOpen(false)
  }

  // const handleInputChange = (e) => {
  //   console.log(e.target.value)
  //   handleProductQuantity(e.target.value)
  // }


  const handleNumber = (e) => {
    let number = numberInput.current
    // number.focus();
    let inputInt = parseInt(number.value)
    e.target.innerText === "+" ? (inputInt < props.product.productStock ? inputInt += 1 : inputInt = props.product.productStock) : (inputInt > 1 ? inputInt -= 1 : inputInt = 1)
    number.value = inputInt
    setProductQuantity(number.value)
  }

  const handleChange = (e) => {
    console.log(numberInput.current.value)
  }

  const addToCart = (product) => {
    let preCart = []
    console.log("Cart before adding product:", props.cart)
    for (let i = 1; i <= productQuantity; i++){
      preCart.push(product)
    }
    let postCart = props.cart.concat(preCart)
    console.log("Cart after adding product:",postCart)
    props.setCart(postCart)
  }
  
  const divStyle ={
    color: 'black',
  }
  

  if (productStock === 0){
    stockAlert = "OUT OF STOCK"
    divStyle.color = 'red'    

  } else if (productStock <= 20 ){
    stockAlert = `ONLY ${productStock} LEFT`
    divStyle.color = 'orange'
    
  } else if (productStock > 20) {
    stockAlert = "IN STOCK"
    divStyle.color = 'green'

  }



  return (
    <><Col style={{marginBottom: '20px'}} >
        <Card  style={{ cursor: 'pointer'}} className="card-container">

          
            <Card.Img className="imageHover" onClick={() => setModalOpen()} variant="top" src={props.product.productImageUrls[0]} />
            <Card.Body >
                
                
                {!isNameHover ? 
                  <Card.Title onClick={() => setModalOpen()} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{props.product.productName}</Card.Title> 
                : 
                  <Card.Title id="marquee" onClick={() => setModalOpen()} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {props.product.productName.length > 19 ?
                      <div id="marquee__content">{props.product.productName}</div>
                    :
                    <div>{props.product.productName}</div>
                    }
                  </Card.Title>
                }
                <hr></hr>
                <Card.Text onClick={() => setModalOpen()} >£{props.product.productPrice}</Card.Text>
                

                <Modal size="xl" centered show={modalIsOpen} onHide={() => setModalOpen()}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{fontWeight: "bolder"}}>
                      More about this product...
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
  
                    <ProductDetail product={props.product} cart={props.cart} setCart={props.setCart}/>

                  </Modal.Body>
                </Modal>

                <Card.Text onClick={() => setModalOpen()}  style={divStyle}>{stockAlert}</Card.Text>
                <div className="button-container">
                  <Button size="sm" disabled={props.product.productStock === 0 ? true : false} variant='secondary' onClick={(e) => handleNumber(e)}> - </Button>
                    <input disabled={props.product.productStock === 0 ? true : false} className='numInput' type="text" inputMode='numeric' ref={numberInput} defaultValue={1} min={1} max={props.product.productStock} onChange={(e) => handleChange(e)} ></input>
                  <Button size="sm" disabled={props.product.productStock === 0 ? true : false} variant='secondary' onClick={(e) => handleNumber(e)}> + </Button> &nbsp;
                  
                </div>
                <Button size="" disabled={props.product.productStock === 0 ? true : false} type="text"  id="addToCart" variant="primary" onClick={() => addToCart(props.product)} style={{marginBottom: '10px'}}> Add To Cart </Button>
                 &nbsp; 


            </Card.Body>

        </Card>
        </Col>
    </>
  )
}

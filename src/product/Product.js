import React, { useState, useRef, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ProductDetail from './ProductDetail.js';
import {BsCartPlusFill} from 'react-icons/bs'
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
    e.stopPropagation();
    let number = numberInput.current
    // number.focus();
    let inputInt = parseInt(number.value)
    e.target.innerText === "+" ? (inputInt < props.product.productStock ? inputInt += 1 : inputInt = props.product.productStock) : (inputInt > 1 ? inputInt -= 1 : inputInt = 1)
    number.value = inputInt
    setProductQuantity(number.value)
  }

  const handleChange = (e) => {
    e.stopPropagation();
    console.log(numberInput.current.value)
  }

  const handleInput = (e) => {
    e.stopPropagation();
  }

  const addToCart = (e, product) => {
    e.stopPropagation();
    // let preCart = []
    console.log(props.cart)
    const fullProduct = product
    const productId = product._id
    const quantity = parseInt(productQuantity)
    let preCart = {...props.cart}
    let cartProduct = {
      "product": fullProduct,
      "cartQuantity": quantity
    }

    console.log("Cart before adding product:", props.cart)

    // preCart[cartProductJson]["cartQuantity"] += quantity

    !Object.hasOwn(preCart, [productId]) ? preCart = {...preCart, [productId]:cartProduct} : preCart[productId]["cartQuantity"] += quantity

    // typeof preCart[product] === 'undefined' ? preCart = {...preCart,"product": fullProduct,"quantity": quantity} : preCart.quantity += quantity;

    console.log("Cart after adding product:", preCart)
    props.setCart(Array.from(Object.values(preCart)))
  }
  
  const divStyle ={
    color: 'black',
  }

  const handleDisabledClick = (e) => {
    e.stopPropagation();
  }
  

  if (productStock === 0){
    stockAlert = "SOLD OUT"
    divStyle.color = 'red'    

  } else if (productStock <= 20 ){
    stockAlert = `ONLY ${productStock} LEFT`
    divStyle.color = 'orange'
    
  } else if (productStock > 20) {
    stockAlert = "IN STOCK"
    divStyle.color = 'green'

  }

  // useEffect(()=>{
  //   const cartProducts = Array.from(Object.values(props.cart))
  //   console.log("TEST:",cartProducts)
  // },[props.cart])

  return (
    <>

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
    
      <Col style={{marginBottom: '20px'}} >
        <Card  style={{ cursor: 'pointer'}} className="card-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => setModalOpen()}>

          
          <Card.Img className="imageHover" variant="top" src={props.product.productImageUrls[0]} />
          
          <Card.Body >
              
            {!isNameHover ? 
              <Card.Title>{props.product.productName}</Card.Title> 
            : 
              <Card.Title id="marquee">
                {props.product.productName.length > 15 ?
                  <div id="marquee__content">{props.product.productName}</div>
                :
                <div>{props.product.productName}</div>
                }
              </Card.Title>
            }
            <hr></hr>
            
            <div className='priceStock'>
              
              <Card.Text >£{props.product.productPrice}</Card.Text>
              
              <Card.Text style={divStyle}>{stockAlert}</Card.Text>
              
            </div>
            
            <div className="button-container">
              <div className={props.product.productStock !== 0 ? "quantity-container" : "disabled-quantity-container"} onClick={(e) => handleDisabledClick(e)}>
                <Button id="reduceQuant" size="sm" disabled={props.product.productStock === 0 ? true : false} variant='secondary' className='shadow-none' onClick={(e) => handleNumber(e)}> - </Button>
                  <input disabled={props.product.productStock === 0 ? true : false} readOnly={true} className='numInput' id="numInput" type="text" inputMode='numeric' ref={numberInput} defaultValue={1} min={1} max={props.product.productStock} onClick={(e) => handleInput(e)} onChange={(e) => handleChange(e)}></input>
                <Button id="increaseQuant" size="sm" disabled={props.product.productStock === 0 ? true : false} variant='secondary' className='shadow-none' onClick={(e) => handleNumber(e)}> + </Button>
              </div>
              <div className={props.product.productStock !== 0 ? "add-cart-container" : "cart-container-disabled"} id="add-cart-container" onClick={(e) => handleDisabledClick(e)}>
                <Button disabled={props.product.productStock === 0 ? true : false} type="text"  id="addToCart" variant="primary" onClick={(e) => addToCart(e, props.product)} style={{marginBottom: '10px'}}> 
                    {/* Add To Cart  */}
                    <div>
                      <BsCartPlusFill size={30}></BsCartPlusFill>
                    </div>
                </Button>
              </div>
            </div>

          </Card.Body>

        </Card>
      </Col>
    </>
  )
}

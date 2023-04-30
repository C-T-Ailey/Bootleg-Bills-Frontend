import React, { useState, useRef, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ProductDetail from './ProductDetail.js';
import {BsCartPlusFill} from 'react-icons/bs'
import Button from 'react-bootstrap/Button';
import { Col, Modal } from "react-bootstrap";
import './Product.css' 
import { type } from '@testing-library/user-event/dist/type/index.js';

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

  const [variantModal, setVariantModal] = useState(false);

  const setVariantModalOpen =()=>{
    !variantModal ? setVariantModal(true) : setVariantModal(false);
  }

  const handleVariantCheck = () => {

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

    console.log(props.cart)
    const fullProduct = product
    console.log(product)
    const productId = product._id
    const quantity = parseInt(productQuantity)
    let preCart = Array.from(props.cart)
    let cartProduct = {
      "product": fullProduct,
      "cartQuantity": quantity,
      "variant": fullProduct.hasVariant ? fullProduct.productVariants[0] : "none"
    }

    // if (product.hasVariant) {
    //   console.log("has variant:",product.hasVariant)
    //   cartProduct = {...cartProduct, "variant": fullProduct.productVariants[0]} 
    // }
    
    console.log("post variant")

    let productInCart = preCart.find(product => {
      return product.product._id === productId
    })

    // typeof productInCart === 'undefined' ? preCart.push(cartProduct) : preCart[preCart.indexOf(productInCart)]["cartQuantity"] += quantity;

    if(typeof productInCart === 'undefined' || productInCart.variant !== cartProduct.variant) {
      preCart.push(cartProduct)
    } else {
      preCart[preCart.indexOf(productInCart)]["cartQuantity"] += quantity;
    }

    props.setCart(preCart)

    if (variantModal) setVariantModal(false)

    
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
    stockAlert = `${productStock} LEFT`
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

      <Modal size='sm' id="variant-notice" centered show={variantModal} onHide={() => setVariantModalOpen()}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontWeight: "bolder"}}>
            So you know...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          This product has available variants. If you proceed with Adding to Cart from here, the default variant will be selected.
          <br></br>
          <Button onClick={(e) => addToCart(e, props.product)}>OK</Button>
          <Button onClick={() => setVariantModalOpen()}>Cancel</Button>

        </Modal.Body>
      </Modal>

      <Modal size="xl" id="product-modal" centered show={modalIsOpen} onHide={() => setModalOpen()}>
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
                <Button disabled={props.product.productStock === 0 ? true : false} type="text"  id="addToCart" variant="primary" onClick={props.product.hasVariant ? () => setVariantModalOpen() : (e) => addToCart(e, props.product)} style={{marginBottom: '10px'}}> 
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

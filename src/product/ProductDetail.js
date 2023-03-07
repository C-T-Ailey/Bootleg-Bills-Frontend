import React, { useState, useEffect, useRef } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import './ProductDetail.css'


// Props required by this component from ProductList: product, cart, setCart, (handleChange - potentially obsolete, keep an eye on it)
// Props required by this component from Product: product, cart, setCart

export default function ProductDetail(props) {
  let altText = props.product.productName.replace(/ /g, '').toLowerCase()
  
  const [currentlySelected, setCurrentlySelected] = useState("")

  const [productQuantity, setProductQuantity] = useState(1)
  
  useEffect(()=>{
    setCurrentlySelected(document.getElementById("thumb-0"))
    var defaultImg = document.getElementById("thumb-0")
    defaultImg.className = "selected-img"
  },[])

  const handleSelect = (e) => {
    console.log(e.target)
    if(currentlySelected === e.target){
      console.log("Currently selected")
      console.log(currentlySelected.src)
      
    } else {
      const idSlice = e.target.id.slice(0, 5)
      let doClassIdMatch = (idSlice === e.target.className)
      let newClass = doClassIdMatch ? "selected-img" : e.target.className
      if(currentlySelected){
        currentlySelected.className = "thumb"
      }
      e.target.className = newClass
      setCurrentlySelected(e.target)
    }
  }

  const numberInput = useRef(null)

  const handleNumber = (e) => {
    let number = numberInput.current
    console.log(number.value)
    // number.focus();
    let inputInt = parseInt(number.value)
    console.log(inputInt)
    e.target.innerText === "+" ? (inputInt < props.product.productStock ? inputInt += 1 : inputInt = props.product.productStock) : (inputInt > 1 ? inputInt -= 1 : inputInt = 1)
    number.value = inputInt
    console.log("number value:",number.value)
    setProductQuantity(number.value)
  }

  const addToCart = (product) => {
    console.log("button clicked")
    // console.log(product)
    // console.log(productQuantity)
    let preCart = []
    console.log("Cart before adding product:", props.cart)
    for (let i = 1; i <= productQuantity; i++){
      preCart.push(product)
      // props.setCart([...props.cart, product])
    }
    let postCart = props.cart.concat(preCart)
    console.log("Cart after adding product:",postCart)
    props.setCart(postCart)
  }

  const imgThumbsSansBestSeller = props.product.productImageUrls.slice(0, -1)

  console.log(imgThumbsSansBestSeller)
  
  const imgThumbs = imgThumbsSansBestSeller.map((url, index) =>
    <div key={index} className={`div-thumb`} id={`div-${index}`} onClick={(e) => handleSelect(e)}>
      <img className='thumb' id={`thumb-${index}`} src={props.product.productImageUrls[index]} alt={`thumb-${index}`} />
    </div>
  );

  const productVars = props.product.productVariants.map((variant) =>
    <option className='select-text' value={variant}>{variant}</option>
  );

  return (
    <div className='detailModalFlex'>

      <div className='images'>

        <div className='mainImg'>
          <img className='detailImg' src={currentlySelected.src} alt={`${altText}_img`}/>
        </div>
        
        <div className='img-thumbs'>
          {imgThumbs}
        </div>
      </div>
      

      <div className='vr'></div>
    
      <div className='detailsInfo'>
        <h3>{props.product.productName}</h3>
        <p>{props.product.productSourceType!=="Original Release" ? "from" : "by"} {props.product.productSource}</p>
        <h5>£{props.product.productPrice}</h5>
        <p>{props.product.productDescription}</p>


        <div className='audioPlayer'>

          {/* <div className='player'>
            <div className='playButton'>
              <div className='arrow'></div>
            </div>
            <div className='seekBar'>
              <div className='elapsed'></div>
            </div>
            </div>
          <p className="timeCount"><span>0:19</span> / <span>0:30</span></p> */}

          <audio id="audio" width="300" height="32" src={props.product.productAudio} controls> </audio>

          </div>

          <div className='variantSelection'>
            { props.product.hasVariant ? (
              <Container>
                <Form.Group>
                  <Form.Label>Choose a variant:</Form.Label>
                  <Form.Select className='variantForm'>
                    {productVars}
                  </Form.Select>
                </Form.Group>
              </Container>
              ) : (
              <></>
              )
              }
          </div>

          <div className='quantityCounter'>
            <Button disabled={props.product.productStock === 0 ? true : false} variant='secondary' onClick={(e) => handleNumber(e)} > - </Button>
              <input disabled={props.product.productStock === 0 ? true : false} className='numInput' type="text" inputMode='numeric' ref={numberInput} defaultValue={1} min={1} max={props.product.productStock} onChange={(e) => props.handleChange(e)} ></input>
            <Button disabled={props.product.productStock === 0 ? true : false} variant='secondary' onClick={(e) => handleNumber(e)}> + </Button> &nbsp;
            <Button disabled={props.product.productStock === 0 ? true : false} variant="primary" onClick={() => addToCart(props.product)}> Add to Cart </Button> &nbsp;
          </div>

      </div>
   
    </div>
  )
}

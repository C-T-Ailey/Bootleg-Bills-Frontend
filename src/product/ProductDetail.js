import React, { useState, useEffect, useRef } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import {BsCartPlusFill} from 'react-icons/bs'
import './ProductDetail.css'


// Props required by this component from ProductList: product, cart, setCart, (handleChange - potentially obsolete, keep an eye on it)
// Props required by this component from Product: product, cart, setCart

export default function ProductDetail(props) {
  let altText = props.product.productName.replace(/ /g, '').toLowerCase()
  
  const [currentlySelected, setCurrentlySelected] = useState("")

  const [productQuantity, setProductQuantity] = useState(1)

  const [selectedVariant, setSelectedVariant] = useState("")
  
  useEffect(()=>{
    // set currentlySelected thumb to the first child element of div-0, i.e. the primary image for the product
    setCurrentlySelected(document.getElementById("div-0").firstChild)
    // defaultImg is set to the parent div of the primary image itself
    var defaultImg = document.getElementById("div-0")
    // set the classname of div-0 to "selected-img" to denote it as selected
    defaultImg.className = "selected-img"

    setSelectedVariant(props.product.hasVariant ? props.product.productVariants[0] : "none")

  },[])

  useEffect(()=>{
    console.log(selectedVariant)
  },[selectedVariant])

  const openImage = (e) => {
    let imgUrl = e.target.src.slice(0, e.target.src.length-4)
    let imgUrlFormat = e.target.src.slice(e.target.src.length-4)
    let imgUrlAppended = `${imgUrl}_d${imgUrlFormat}?maxwidth=1985&shape=thumb&fidelity=high`
    window.open(imgUrlAppended, "_blank")
  }

  const handleSelect = (e) => {
    // log current target, i.e. parent div of thumbnail
    console.log(e.currentTarget)
    // if currentlySelected is equal to the child element (img) of the current target,
    if(currentlySelected === e.currentTarget.firstChild){
      // log the currently selected img url
      console.log("Currently selected")
      console.log(currentlySelected.src)
      
    // else,
    } else {
      // boolean check stored in variable to check if the first three characters of the target's ID and class are both "div"
      let doClassIdMatch = (e.currentTarget.id.slice(0, 3) === e.currentTarget.className.slice(0, 3))
      console.log(doClassIdMatch)
      // if class and ID match, newClass is set to "selected-img", otherwise newClass is set to current target's class, i.e. div-thumb
      let newClass = doClassIdMatch ? "selected-img" : e.currentTarget.className
      // if currentlySelected is populated, currentlySelected's class is set to thumb???
      if(currentlySelected){
        currentlySelected.parentElement.className = "div-thumb"
      }
      e.currentTarget.className = newClass
      setCurrentlySelected(e.currentTarget.firstChild)
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
    console.log(props.cart)
    const fullProduct = {...product}

    //
    if (selectedVariant.slice(selectedVariant.length-9, selectedVariant.length)==="discount!") {
      fullProduct.productPrice -= 5
    }
    //

    const productId = product._id
    const quantity = parseInt(productQuantity)
    let preCart = Array.from(props.cart)
    let cartProduct = {
      "product": fullProduct,
      "cartQuantity": quantity,
      "variant": selectedVariant
    }

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
  }

  // const imgThumbsSansBestSeller = props.product.productImageUrls.slice(0, -1)
  const imgThumbs = props.product.productImageUrls

  console.log(imgThumbs)
  
  const mapThumbs = imgThumbs.map((url, index) =>
    <div key={index} className={`div-thumb`} id={`div-${index}`} onClick={(e) => handleSelect(e)}>
      <img className='thumb' id={`thumb-${index}`} src={url} alt={`thumb-${index}`} />
    </div>
  );

  const productVars = props.product.productVariants.map((variant) =>
    <option className='select-text' value={variant}>{variant}</option>
  );

  return (
    <div className='detailModalFlex'>

      <div className='images'>

        <div className='mainImg'>
          <img className='detailImg' src={currentlySelected.src} alt={`${altText}_img`} onClick={(e) => openImage(e)}/>
        </div>
        
        <div className='img-thumbs'>
          {mapThumbs}
        </div>
      </div>
      

      <div className='vr'></div>
    
      <div className='detailsInfo'>
        <h3>{props.product.productName}</h3>
        <p>{props.product.productSourceType!=="Original Release" ? "from" : "by"} {props.product.productSource}</p>
        <h3>£{selectedVariant.slice(selectedVariant.length-9, selectedVariant.length) === "discount!" ? props.product.productPrice - 5 : props.product.productPrice}</h3>
        <p className='detailsDescr'>{props.product.productDescription}</p>


        {!!props.product.productAudio ?
        
            <div className='audioPlayer'>
            
            
              <audio id="audio" width="300" height="55" src={props.product.productAudio} controls={true}> </audio>

              {/* <AudioPlayer/> */}
            
              {/* <div className='player'>
                <button className='playButton' onClick={() => document.getElementById("audio").play()}>
                  <div className='arrow'></div>
                </button>
                <div className='seekBar'>
                  <div className='elapsed'></div>
                </div>
                </div>
              <p className="timeCount"><span>0:19</span> / <span>0:30</span></p> */}

              </div>
          : 
          <></>
        }

          <div className='variantSelection'>
            { props.product.hasVariant ? (
              <Container>
                <Form.Group>
                  <Form.Label>{props.product.productSource === "Bootleg Bill" ? "Personalisation:" : "Choose a variant:"}</Form.Label>
                  <Form.Select className='variantForm' onChange={(e) => setSelectedVariant(e.target.value)}>
                    {productVars}
                  </Form.Select>
                </Form.Group>
              </Container>
              ) : (
              <></>
              )
              }
          </div>

          <div className='widthSpacer'></div>

          <div className='buttons-container'>
            <div className={props.product.productStock !== 0 ? "quantity-container-detail" : "quantity-detail-disabled"}>
                <Button id="reduceQuant-detail" size="lg" disabled={props.product.productStock === 0 ? true : false} variant='secondary' onClick={(e) => handleNumber(e)}> - </Button>
                  <input disabled={props.product.productStock === 0 ? true : false} readOnly={true} className='numInput-detail' type="text" inputMode='numeric' ref={numberInput} defaultValue={1} min={1} max={props.product.productStock} onChange={(e) => props.handleChange(e)}></input>
                <Button id="increaseQuant-detail" size="lg" disabled={props.product.productStock === 0 ? true : false} variant='secondary' onClick={(e) => handleNumber(e)}> + </Button>
            </div>
            <div>
                <Button id="cart-detail" size="lg" disabled={props.product.productStock === 0 ? true : false} variant="primary" onClick={() => addToCart(props.product)}>
                    {/* Add to Cart  */}
                    <div>
                      <BsCartPlusFill size={"40px"}></BsCartPlusFill>
                    </div>
                </Button>
            </div>
          </div>

      </div>
   
    </div>
  )
}

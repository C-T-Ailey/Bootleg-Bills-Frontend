import React, { useState, useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import './ProductDetail.css'



export default function ProductDetail(props) {
  let altText = props.products.productName.replace(/ /g, '').toLowerCase()

  // const numberInput = useRef(null)
  
  const [currentlySelected, setCurrentlySelected] = useState("")
  
  useEffect(()=>{
    setCurrentlySelected(document.getElementById("thumb-0"))
    var defaultImg = document.getElementById("thumb-0")
    defaultImg.className = "selected-img"
  },[])

  // const handleNumber = (e) => {
  //   let number = numberInput.current
  //   console.log(number)
  //   number.focus();
  //   let inputInt = parseInt(number.value)
  //   e.target.innerText === "+" ? inputInt += 1 : (inputInt > 1 ? inputInt -= 1 : inputInt = 1)
  //   number.value = inputInt
  //   console.log(number.value)
  //   props.handleProductQuantity(number.value)
  // }

  // const handleChange = (e) => {
  //   console.log(numberInput.current.value)
  // }

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
  const imgThumbsSansBestSeller = props.products.productImageUrls.slice(0, -1)

  console.log(imgThumbsSansBestSeller)
  
  const imgThumbs = imgThumbsSansBestSeller.map((url, index) =>
    <div key={index} className={`div-thumb`} id={`div-${index}`} onClick={(e) => handleSelect(e)}>
      <img className='thumb' id={`thumb-${index}`} src={props.products.productImageUrls[index]} alt={`thumb-${index}`} />
    </div>
  );

  const productVars = props.products.productVariants.map((variant) =>
    <option className='select-text' value={variant}>{variant}</option>
  );

  // console.log(props.productAudio)


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
        <h3>{props.products.productName}</h3>
        <p>{props.products.productSourceType!=="Original Release" ? "from" : "by"} {props.products.productSource}</p>
        <h5>£{props.products.productPrice}</h5>
        <p>{props.products.productDescription}</p>


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

          <audio id="audio" width="300" height="32" src={props.products.productAudio} controls> </audio>

          </div>

          <div className='variantSelection'>
            { props.products.hasVariant ? (
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
              {/* CHRIS CHANGES */}
            {/* <Button disabled={props.productStock === 0 ? true : false} variant='secondary' onClick={(e) => handleNumber(e)}> - </Button>
              <input disabled={props.productStock === 0 ? true : false} className='numInput' type="text" inputMode='numeric' ref={numberInput} value={1} min={1} onChange={(e) => handleChange(e)} ></input>
              <Button disabled={props.productStock === 0 ? true : false} variant='secondary' onClick={(e) => handleNumber(e)}> + </Button> &nbsp;
            <Button disabled={props.productStock === 0 ? true : false} variant="primary"> Add to Cart </Button> &nbsp; */}
            <Button disabled={props.products.productStock === 0 ? true : false} variant='secondary' onClick={(e) => props.handleNumber(e)} > - </Button>
              <input disabled={props.products.productStock === 0 ? true : false} className='numInput' type="text" inputMode='numeric' ref={props.numberInput} defaultValue={1} min={1} max={props.products.productStock} onChange={(e) => props.handleChange(e)} ></input>
            <Button disabled={props.products.productStock === 0 ? true : false} variant='secondary' onClick={(e) => props.handleNumber(e)}> + </Button> &nbsp;
            <Button disabled={props.products.productStock === 0 ? true : false} variant="primary" onClick={() => {props.addToCart(props.products)}}> Add to Cart </Button> &nbsp;
          </div>

      </div>
   
    </div>
  )
}

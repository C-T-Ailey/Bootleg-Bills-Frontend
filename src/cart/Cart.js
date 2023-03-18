import React from 'react'
import Card from 'react-bootstrap/Card'
// import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'

export default function Cart(props) {

    const [cartDisplayArr, setCartDisplayArr] = useState([])

    useEffect(()=>{
        console.log("Cart:",props.cart)
    },[])

    useEffect(() => {
        console.log(props.cart)
        setCartDisplayArr(Array.from(new Set(props.cart)))
        // console.log(cartDisplayArr)
    //   return () => {
        
    //   }
    }, [props.cart])
    
    const [decreaseQuantity, setDecreaseQuantity] = useState(false)
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    let subtotalPrice = 0



    const handleInputChange = (e, product) => {

        console.log("e.target.value",e.target.value)
        console.log("e.target.placeholder",e.target.placeholder)
        let updateBy = e.target.value - e.target.placeholder
        console.log(updateBy)
        console.log(product)
        if (updateBy >= 0) {
            props.handleProductQuantity(updateBy)
        } else {
            console.log("need to reduce product quantity")
            // props.handleRemoveFromCart(product)
            props.handleProductQuantity(e.target.value)
            // set decrease quantity state to true to pass to the handleUpdateCart fxn
            setDecreaseQuantity(true)
        }
      }

    const handleUpdateCart = (item) => {
        console.log(item)
        console.log(props.productQuantity)
        if (decreaseQuantity) {
            props.handleRemoveFromCart(item)
            setDecreaseQuantity(false)
        }
        props.addToCart(item)

    }

    // Mapped display of cart items
    const cartItems = cartDisplayArr.map((item, key) => (
    
          <Card key={key} style={{width: '30rem'}} >
              <Col style={{width: '10rem'}}>
              {/* card image using the product's image URL at index 0 of the productimageurls array */}
              <Card.Img src={item.productImageUrls[0]} style={{width: '10rem'}} />
              </Col>
                <Col>
               <Card.Body style={{width: '20rem'}}>
                   <Card.Title> {item.productName} </Card.Title>
                   <Card.Text> £{item.productPrice} </Card.Text>
                   {/* <Card.Text> Quantity: {props.productQuantity}</Card.Text> */}
                   <Card.Text>
                       {/* Maybe props.cart can be an array of objects, so placeholder and defaultValue can be set to props.cart.count? */}
                       Quantity:  <input type="number" placeholder={countOccurrences(props.cart, item)} defaultValue={countOccurrences(props.cart, item)} min="0" onChange={(e) => handleInputChange(e, item)}></input>
                    </Card.Text>
                   {/* <input type="number" placeholder={countOccurrences(props.cart, item)} min="0" onChange={(e) => handleInputChange(e)}></input> */}
                   <Button onClick={(e) => {props.handleRemoveFromCart(item)}}> Remove from Cart</Button>
                    <Card.Link href="#" onClick={(e) => {handleUpdateCart(item)}}> Update Cart </Card.Link>
               </Card.Body>
               </Col>
          </Card>
   
    ));
    // const loadCartArray = () => {
    //     console.log(props.cartItems)
    // }
    const subtotalPriceCalc = () => {
        props.cart.forEach(item => {
            console.log(item.productPrice)
            subtotalPrice += item.productPrice
        })
        return subtotalPrice
    }
    console.log(subtotalPriceCalc())
  
  return (
    <>
        <h1> In your cart: </h1>
            {cartItems}
            <h4> Subtotal: £{subtotalPrice} </h4>
            <Button variant="primary" onClick={() => props.makeCart(props.cart)}>Go to Checkout</Button>
     
        
    </>
  )
}

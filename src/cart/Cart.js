import React from 'react'
import Card from 'react-bootstrap/Card'
// import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

export default function Cart(props) {

    const navigate = useNavigate()

    // const [cartDisplayArr, setCartDisplayArr] = useState([])

    useEffect(()=>{
        console.log("Cart:",props.cart)

    },[])

    // useEffect(() => {
    //     console.log(props.cart)
    //     setCartDisplayArr(Array.from(props.cart))
    // }, [props.cart])

    useEffect(()=>{
        totalPriceCalc()
    },[props.cart])
    
    const [decreaseQuantity, setDecreaseQuantity] = useState(false)
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    



    const handleInputChange = (e, product) => {

        let cartUpdate = Array.from(props.cart)
        cartUpdate.forEach(element => {
            if (JSON.stringify(element) === JSON.stringify(product)) {
                element.cartQuantity = parseInt(e.target.value)
            }
        });

        props.setCart(cartUpdate)
        
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

    const makeCart = (cartItems) => {
        // e.preventDefault()
        if(props.isAuth){
          let checkoutCart = Array.from(props.cart)
          var dataObj = {user: props.user.user.id, status: "active", cart: checkoutCart }
          navigate("/checkout")
        //   console.log(dataObj)
        //   Axios.post("https://bootlegbackend.herokuapp.com/cart", dataObj)
        //   .then(response => {
        //     console.log(response)
        //     navigate("/checkout")
        //   })
        //   .catch(error => {
        //     console.log(error)
        //   })
        } else {
          navigate("/login")
        }
      }

    // Mapped display of cart items
    const cartItems = props.cart.map((item, key) => (
    
          <Card key={key} style={{width: '30rem'}} >
              <Col style={{width: '10rem'}}>
              {/* card image using the product's image URL at index 0 of the productimageurls array */}
              <Card.Img src={item.product.productImageUrls[0]} style={{width: '10rem'}} />
              </Col>
                <Col>
               <Card.Body style={{width: '20rem'}}>
                   <Card.Title> {item.product.productName} </Card.Title>
                   <Card.Text> £{item.product.productPrice} </Card.Text>
                   {/* <Card.Text> Quantity: {props.productQuantity}</Card.Text> */}
                   <Card.Text>
                       {/* Maybe props.cart can be an array of objects, so placeholder and defaultValue can be set to props.cart.count? */}
                       Quantity:  <input type="number" placeholder={"#"} defaultValue={item.cartQuantity} min="0" onChange={(e) => handleInputChange(e, item)}></input>
                    </Card.Text>
                    <Card.Text>Subtotal: £{item.product.productPrice * item.cartQuantity}</Card.Text>
                   {/* <input type="number" placeholder={countOccurrences(props.cart, item)} min="0" onChange={(e) => handleInputChange(e)}></input> */}
                   <Button onClick={(e) => {props.handleRemoveFromCart(item)}}> Remove from Cart</Button>
                    <Card.Link href="#" onClick={(e) => {handleUpdateCart(item)}}> Update Cart </Card.Link>
               </Card.Body>
               </Col>
          </Card>
   
    ));
    
    const totalPriceCalc = () => {

        var totalPrice = 0

        props.cart.forEach(item => {
            const price = parseInt(item.product.productPrice)
            const quantity = item.cartQuantity

            totalPrice += (price * quantity)
        })

        props.setTotalPrice(totalPrice)
    }
  
  return (
    <>
        <h1> In your cart: </h1>
            {cartItems}
            <h4> Total: £{props.totalPrice} </h4>
            <Button variant="primary" onClick={() => makeCart(props.cart)}>Go to Checkout</Button>
     
        
    </>
  )
}

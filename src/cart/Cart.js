import React from 'react'
import Card from 'react-bootstrap/Card'
// import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Cart.css'

export default function Cart(props) {

    const navigate = useNavigate()

    useEffect(()=>{
        console.log("Cart:",props.cart)

    },[])

    useEffect(()=>{
        totalPriceCalc()
        setCartItems(mapCart)
    },[props.cart])
    
    const [decreaseQuantity, setDecreaseQuantity] = useState(false)
    const [cartItems, setCartItems] = useState([])

    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    
    const handleInputChange = (e, product) => {

        console.log("HANDLECHANGE")

        let cartUpdate = Array.from(props.cart)
        cartUpdate.forEach(element => {
            if (JSON.stringify(element) === JSON.stringify(product)) {
                element.cartQuantity = parseInt(e.target.value)
            }
        });

        props.setCart(cartUpdate)
        
    }

    const handleRemoveFromCart = (deletedItem) => {
        console.log(deletedItem.product._id)
        const findItem = props.cart.find(item => item.product._id === deletedItem.product._id && item.variant === deletedItem.variant) 
        const updatedCart = Array.from(props.cart)
        console.log("index:",updatedCart.indexOf(findItem))
        updatedCart.splice(updatedCart.indexOf(findItem),1)
        console.log(updatedCart)
        props.setCart(updatedCart)
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
    const mapCart = props.cart.map((item, key) => (
    
        <Card key={key}  >
            <div className='cart-card-flex'>
                <div>
                    <Col style={{width: '10rem'}}>
                    {/* card image using the product's image URL at index 0 of the productimageurls array */}
                    <Card.Img src={item.product.productImageUrls[0]} style={{width: '10rem'}} />
                    </Col>
                </div>
                <div>
                    <Col>
                        <Card.Body style={{maxWidth: '28rem'}}>
                            <Card.Title id='title'> {item.product.productName} </Card.Title>
                            <Card.Text> £{item.product.productPrice} </Card.Text>
                            {/* <Card.Text> Quantity: {props.productQuantity}</Card.Text> */}
                            <Card.Text>
                                {item.product.hasVariant ? <Card.Title id='title'> Variant: {item.variant} </Card.Title> : <></>}
                                Quantity:  <input className='cartQuantity' type="number" placeholder={"#"} value={item.cartQuantity} min="0" onChange={(e) => handleInputChange(e, item)} onWheel={(e) => e.target.blur()} ></input>
                                {/* <Card.Text>{item.cartQuantity}</Card.Text> */}
                            <Card.Text>Subtotal: £{item.product.productPrice * item.cartQuantity}</Card.Text>
                            </Card.Text>
                            {/* <input type="number" placeholder={countOccurrences(props.cart, item)} min="0" onChange={(e) => handleInputChange(e)}></input> */}
                            <Button onClick={(e) => {handleRemoveFromCart(item)}}> Remove from Cart</Button>
                        </Card.Body>
                    </Col>
                </div>
            </div>
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
    <div className='cart-container'>
        <h1> In your cart: </h1>
            {cartItems}
            <h4> Total: £{props.totalPrice} </h4>
            {props.cart.length ? <Button variant="primary" onClick={() => makeCart(props.cart)}>Go to Checkout</Button> : <></>}  
    </div>
  )
}

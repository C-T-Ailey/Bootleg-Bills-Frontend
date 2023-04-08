import React from 'react'
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
// import Cart from './Cart'setorderForm
import { useNavigate } from 'react-router-dom'
import CardDetailsForm from './CardDetailsForm'
import OrderAddressForm from './OrderAddressForm'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'
import './Cart.css'
// import OrderConfirmation from './OrderConfirmation'


export default function Checkout(props) {
    const navigate = useNavigate()

    let getTotalPrice = 0

    const [orderRef, setOrderRef] = useState("")
    const [sameAddress, setSameAddress] = useState(true)

    console.log(orderRef)
    console.log("at checkout")
    const [orderForm, setOrderForm] = useState({"cart":props.cart})
    const [newOrder, setNewOrder] = useState({})
    const [newShippingAddress, setNewShippingAddress] = useState({})
    const [newBillingAddress, setNewBillingAddress] = useState({})
    const [newPaymentDetails, setNewPaymentDetails] = useState({})

    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

    useEffect(() => {

        Axios.get("https://bootlegbackend.herokuapp.com/orders/index", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          })
        .then((response) => {
            console.log(response.data.length)
            let orderRefNo = String(response.data.length + 1).padStart(4, '0')
            console.log("Order ref:",orderRefNo)
            setOrderRef(orderRefNo)
        })
        .catch((error) => {
            console.log(error)
        }) 
        
    }, [props.cart])

    const handlePriceCalc = () => {
        props.cart.forEach(item => {
            getTotalPrice += item.productPrice
        })
        return getTotalPrice
    }

   const decreaseStock = () => {
        
        console.log(props.cart)

        props.cart.forEach(item => {
            const newStockLevel = {"_id": item.product._id, "productStock": item.product.productStock - item.cartQuantity}
            Axios.put('https://bootlegbackend.herokuapp.com/product/update', newStockLevel, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        });
   }

    const handleChange = (e) => {
        console.log(e.target)
        const attrToChange = e.target.name
        const newValue = e.target.value
        const paymentDetails = {...newPaymentDetails}
        const order = {...newOrder}
        paymentDetails[attrToChange] = newValue
        setNewOrder(paymentDetails)
        setNewPaymentDetails(paymentDetails)
    }

    const handleBillingChange = (e) => {
        const attrToChange = e.target.name
        const newValue = e.target.value
        const billingAddress = {...newBillingAddress}
        billingAddress[attrToChange] = newValue
        console.log(billingAddress)
        setNewBillingAddress(billingAddress)
        if (sameAddress) {
            console.log("sameAddress is true")
            setNewShippingAddress(billingAddress)}
    }

    const handleShippingChange = (e) => {
        const attrToChange = e.target.name
        const newValue = e.target.value
        const shippingAddress = {...newShippingAddress}
        shippingAddress[attrToChange] = newValue
        console.log(shippingAddress)
        setNewShippingAddress(shippingAddress)
    }


    // Order schema may need to be updated as the cart is no longer an object, instead now an array of objects
    // May need to be set to "types.Mixed"
    const addOrder = (order) => {
        console.log("adding order to db")
        console.log(order)
        let finalOrder = {...order}
        finalOrder.paymentDetails = newPaymentDetails
        finalOrder.shippingAddress = newShippingAddress
        finalOrder.billingAddress = newBillingAddress
        finalOrder.cart = JSON.stringify(props.cart)
        finalOrder.user = props.user.user.id
        finalOrder.orderRef = orderRef
        // props.setOrderRef(finalOrder.orderRef)
        finalOrder.totalPrice = props.totalPrice
        console.log(finalOrder)
        Axios.post("https://bootlegbackend.herokuapp.com/checkout", finalOrder)
        .then(response => {
            if (response.data !== 'cannot accept order, please try again later') {
                console.log(response)
                console.log("order added successfully")
                decreaseStock()
                navigate("/confirmation")
            } else {
                console.log("Order unsuccessful.")
            }
            // props.setCart([])
            // console.log(props.cart)    
        })
        .catch((error) => {
            console.log(error)
        })
    }
    // props.setOrderRef(order.orderRef)
    const handleSubmit = (e) => {
        e.preventDefault();
        const order = {...newOrder}
        addOrder(order)
    }

    const checkoutList = props.cart.map((item, key) => (

        <Card key={key}>
            <Card.Img src={item.product.productImageUrls[0]} alt="" style={{width: '10rem'}} />
            <Card.Body>
            <Card.Title> {item.product.productName} </Card.Title>
            <Card.Text> Quantity: {item.cartQuantity} </Card.Text>
            <Card.Text> Subtotal: £{item.cartQuantity * item.product.productPrice} </Card.Text>
            </Card.Body>
        </Card>
    ));


    // const handleOrderSubmit = (e) => {
    //     e.preventDefault();

    // }
  return (
    <div>
        <h2 className='cart-h2'>Checkout:</h2>

        {checkoutList}
        <div>Total: £{props.totalPrice} </div> 
        <br></br>
        <CardDetailsForm orderForm={orderForm} setOrderForm={setOrderForm} handleChange={handleChange} />
        <OrderAddressForm  handleBillingChange={handleBillingChange} handleShippingChange={handleShippingChange} sameAddress={sameAddress} setSameAddress={setSameAddress} />
        <Button onClick={(e) => {handleSubmit(e)}}> Submit Order</Button>
        


    </div>
  )
}

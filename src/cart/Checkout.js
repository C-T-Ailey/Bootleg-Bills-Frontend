import React from 'react'
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
// import Cart from './Cart'
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

    useEffect(() => {
        setCheckoutItems(Array.from(new Set(props.cart)))

        Axios.get("https://bootlegbackend.herokuapp.com/orders/index", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          })
        .then((response) => {
            console.log(response.data.length)
            let orderRefNo = String(response.data.length + 1).padStart(4, '0')
            console.log(orderRefNo)
            setOrderRef(orderRefNo)
            // console.log(generateOrderRef)
            // return generateOrderRef
        })
        .catch((error) => {
            console.log(error)
        }) 
        
    }, [props.cart])
    
    // const getTotalPrice = () => {
    //     pro
    // }
    const handlePriceCalc = () => {
        props.cart.forEach(item => {
            getTotalPrice += item.productPrice
        })
        return getTotalPrice
    }
    // handlePriceCalc()

    console.log(handlePriceCalc())

   const decreaseStock = () => {
        
        console.log(props.cart)
        var map = new Map();
        props.cart.forEach((item) => {
            if(map.has(item._id)){
                map.get(item._id).count++;
            } else {
                map.set(item._id,Object.assign(item,{count:1}));
            }
        });
        var quantities = [...map.values()];
        console.log(quantities)
        quantities.forEach(product => {
            const newStockLevel = {"_id": product._id, "productStock": product.productStock - product.count}
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

    // const createOrderRefNo = () => {
    //     Axios.get("orders/index")
    //     .then((response) => {
    //         console.log(response.data.length)
    //         let orderRefNo = String(response.data.length + 1).padStart(4, '0')
    //         console.log(orderRefNo)
    //         setOrderRef(orderRefNo)
    //         // console.log(generateOrderRef)
    //         // return generateOrderRef
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     }) 
    // }

    // console.log(createOrderRefNo())
    console.log(orderRef)
    console.log("at checkout")
    const [checkoutItems, setCheckoutItems] = useState([])
    const [orderForm, setorderForm] = useState({"cart":props.cart})
    const [newOrder, setNewOrder] = useState({})
    const [newShippingAddress, setNewShippingAddress] = useState({})
    const [newBillingAddress, setNewBillingAddress] = useState({})
    const [newPaymentDetails, setNewPaymentDetails] = useState({})
    // setCheckoutItems(Array.from(new Set(props.cart)))
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

    // console.log(checkoutItems)

    const handleChange = (e) => {
        console.log(e.target)
        const attrToChange = e.target.name
        const newValue = e.target.value
        const paymentDetails = {...newPaymentDetails}
        // const order = {...newOrder}
        paymentDetails[attrToChange] = newValue
        // setNewOrder(paymentDetails)
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



    const addOrder = (order) => {
        console.log("adding order to db")
        console.log(order)
        order.paymentDetails = newPaymentDetails
        order.shippingAddress = newShippingAddress
        order.billingAddress = newBillingAddress
        order.cart = props.cart
        order.user = props.user.user.id
        order.orderRef = orderRef
        props.setOrderRef(order.orderRef)
        order.totalPrice = getTotalPrice
        console.log(order)
        Axios.post("https://bootlegbackend.herokuapp.com/checkout", order)
        .then(response => {
            console.log(response)
            console.log("ordere added successfully")
            decreaseStock()
            navigate("/confirmation")
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

    const checkoutList = checkoutItems.map((item, key) => (

        <Card key={key}>
            <Card.Img src={item.productImageUrls[0]} alt="" style={{width: '10rem'}} />
            <Card.Body>
            <Card.Title> {item.productName} </Card.Title>
            <Card.Text> Quantity: {countOccurrences(props.cart, item)} </Card.Text>
            <Card.Text> Subtotal: £{countOccurrences(props.cart, item) * item.productPrice} </Card.Text>
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
        <div>Total: £{getTotalPrice} </div> 
        <br></br>
        <CardDetailsForm orderForm={orderForm} setorderForm={setorderForm} handleChange={handleChange} />
        <OrderAddressForm  handleBillingChange={handleBillingChange} handleShippingChange={handleShippingChange} sameAddress={sameAddress} setSameAddress={setSameAddress} />
        <Button onClick={(e) => {handleSubmit(e)}}> Submit Order</Button>
        


    </div>
  )
}

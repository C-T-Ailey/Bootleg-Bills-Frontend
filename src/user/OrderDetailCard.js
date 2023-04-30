import React, { useEffect, useState } from 'react'
import MixtapeCreateForm from './MixtapeCreateForm'
import Axios from 'axios'

export default function OrderDetailCard(props) {

    const [thisProduct, setThisProduct] = useState()
    const [order, setOrder] = useState([])

    const prod = props.id

    useEffect(() => {
        if(!props.currentOrder.userOrder){
            verifyProduct(prod)
        } else {
            setOrder(props.currentOrder.userOrder)
            console.log(props.id.variant)
        }
    },[])

    const verifyProduct = (id) => {
        Axios.get(`https://bootlegbackend.herokuapp.com/product/detail?id=${id}`)
        .then((response) => {
            console.log(response.data.product.productName)
            setThisProduct(response.data.product.productName)
            })
        .catch((error) => {
            console.log(error)
        })
    }

  return (
    
    !props.orderCart ? 
        <div>
            <p>{thisProduct}</p>
            <p>Quantity: {props.getQuantity(prod)}</p>
            {/* <button onClick={props.currentOrder.status !== 'closed' ? (e) => closeOrder(e) : (e) => console.log("Order already closed.")}>Close Order</button> */}
    </div> 
    : 
        <div>
            <p>{props.id.product.productName}</p>
            <p>Quantity: {props.id.cartQuantity}</p>
            <p>Variant: {props.id.variant}</p>
            {props.id.product.productName.slice(0,6).toLowerCase() === "mix-by" ? <MixtapeCreateForm personal={props.id.variant.slice(0,4)==="Full"}/> : ""}
        </div>
  )
}

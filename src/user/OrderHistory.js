import React, { useState, useEffect } from 'react'
import { Table, Modal } from 'react-bootstrap'
import './Dash.css'
import Axios from 'axios'
import OrderDetails from './OrderDetails';

export default function OrderHistory(props) {

    const [allOrders, setAllOrders] = useState([])

    const [currentOrder, setCurrentOrder] = useState("")

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const setModalOpen =()=>{
        !modalIsOpen ? setModalIsOpen(true) : setModalIsOpen(false)
    }


    useEffect(() => {
        getOrders()
        setCurrentOrder(currentOrder)
    }, [currentOrder])
    
    const getOrders = () => {
        console.log(props.user)
        Axios.get("https://bootlegbackend.herokuapp.com/orders/index")
        .then((response) => {
            if(props.user.user.role === "seller"){
                console.log(response.data.length)
                setAllOrders(response.data)
            } else {
                let buyerOrders = []
                console.log(response.data)
                console.log(props.user.user.id)
                let userId = props.user.user.id
                response.data.forEach(order => {
                if(order.user === userId){
                    buyerOrders.push(order)
                }
            });
            console.log(buyerOrders)
            setAllOrders(buyerOrders)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleOrderView = (e) => {
        const orderId = e.target.value
        Axios.get(`https://bootlegbackend.herokuapp.com/orders/detail?id=${orderId}`)
        .then((response) => {
            console.log(response)
            
            setCurrentOrder(response.data)
            setModalOpen()
        })
        .catch((error) => {
            console.log(error)
            console.log("Couldn't get order ID.")
        })
    }
    
    const mappedOrders = allOrders?.map((order, index) => (
    
        <tr key={index}>
            <td><button style={{fontWeight:"bolder"}} id='faux-link' value={order._id} onClick={(e) => handleOrderView(e)}>#{order.orderRef}</button></td>
            <td>{order.status}</td>
        </tr>
    
    ))

  return (
    <div>

        <Modal size="xl" centered show={modalIsOpen} onHide={() => setModalOpen()}>
            <Modal.Header closeButton>
            <Modal.Title style={{fontWeight:"bolder"}}>
                Details for Order #{currentOrder.orderRef}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <OrderDetails {...currentOrder} user={props.user} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} products={props.products} sessionExpiredHandler={props.sessionExpiredHandler}/>
            </Modal.Body>
        </Modal>

        {/* <Button onClick={() => getOrders()}></Button> */}
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Order Ref.</th>
                <th>Order Status</th>
            </tr>
            </thead>
            <tbody>
                {mappedOrders}
            </tbody>
        </Table>
    </div>
  )
}

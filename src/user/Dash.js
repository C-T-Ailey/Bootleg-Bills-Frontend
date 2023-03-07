import React, { useEffect, useLayoutEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import OrderHistory from './OrderHistory'
import ProductCreateForm from '../product/ProductCreateForm'
import { Button, Modal } from 'react-bootstrap'
import jwt_decode from 'jwt-decode'
import './Dash.css'

export default function Dash(props) {

    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    useEffect(() => {
        let timeNow = new Date().valueOf()
        console.log("Comparing current time with token expiration stamp:", timeNow, props.user.exp * 1000)
        if (!token) {
            console.log("No token")
            navigate("/login")
        } else if (timeNow >= props.user.exp * 1000) {
            props.sessionExpiredHandler()
            
        } else {
            props.loadProductList()

        }
    }, [])

    const [allOrders, setAllOrders] = useState([])

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue =()=>{
        let timeNow = new Date().valueOf()
        if (timeNow >= props.user.exp * 1000) {
            props.sessionExpiredHandler()
        } else {
            setModalIsOpen(true)
            
        }
    }

    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }

    const onAddClick = () => {
        !modalIsOpen ? setModalIsOpen(true) : setModalIsOpen(false)
    }

  return (
    <div className="dash-container">
        {props.role === "seller" ? (
        <>


            <div id='add-modal' >
            {/* <Modal isOpen={modalIsOpen} ariaHideApp={false} >
        
            <Button onClick={setModalIsOpenToFalse}>x</Button>
            <ProductCreateForm loadProductList={props.loadProductList} closeModal={setModalIsOpenToFalse} success={props.sucMessage} setSuccess={props.setSuccess} error={props.errMessage} setError={props.setError} />

            </Modal> */}

            <Modal size="lg" centered show={modalIsOpen} onHide={() => onAddClick()}>
                <Modal.Header closeButton>
                    <Modal.Title style={{fontWeight:"bolder"}}>
                        Edit Product information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductCreateForm loadProductList={props.loadProductList} closeModal={setModalIsOpenToFalse} success={props.sucMessage} setSuccess={props.setSuccess} error={props.errMessage} setError={props.setError} sessionExpiredHandler={props.sessionExpiredHandler}/>
                </Modal.Body>
            </Modal>
            </div>

            <h1 className='dash-title'>Dashboard</h1>

            <div className='dash-contents'>
                <div className='order-table'>
                    <h4>Customer Orders</h4>
                    <OrderHistory allOrders={allOrders} setAllOrders={setAllOrders} products={props.products} user={props.user} sessionExpiredHandler={props.sessionExpiredHandler}/>
                </div>
            
                <div>
                    <h4>Product inventory</h4>
                    <Button onClick={setModalIsOpenToTrue}>Add new product to inventory</Button>
                    <div className='inventory-list scroll'>
                    {props.allStock}
                    </div>
                </div>
            </div>
        
        </>
        ) : (
            <div className='dash-contents'>
                <div className='order-table-buyer'>
                    <h4>My Orders</h4>
                    <OrderHistory allOrders={allOrders} setAllOrders={setAllOrders} products={props.products} user={props.user} sessionExpiredHandler={props.sessionExpiredHandler}/>
                </div>
            </div>
        )
        }
    </div>
  )
}

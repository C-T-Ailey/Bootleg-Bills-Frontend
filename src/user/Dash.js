import React, { useEffect, useLayoutEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import OrderHistory from './OrderHistory'
import ProductCreateForm from '../product/ProductCreateForm'
import { Button, Modal, Container, Form } from 'react-bootstrap'
import jwt_decode from 'jwt-decode'
import Axios from 'axios'
import './Dash.css'
import ProductMetrics from '../product/ProductMetrics'

export default function Dash(props) {
    
    const navigate = useNavigate()
    
    const token = localStorage.getItem("token")
    
    const [allOrders, setAllOrders] = useState([])
    
    const [productList, setProductList] = useState(props.products)
    
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const allStock = productList.sort((a,b) => (a.productName > b.productName) ? 1 : -1).map((product, index) => (

        <div key={index}>
    
            <ProductMetrics product={product} productId={props.productToEdit._Id} productToEdit={props.productToEdit} setProductToEdit={props.setProductToEdit} loadProductList={props.loadProductList} sessionExpiredHandler={props.sessionExpiredHandler}/>
    
        </div>
    
      ))

    let nameSearch = document.getElementById("input")

    useEffect(() => {
        let timeNow = new Date().valueOf()
        console.log("Comparing current time with token expiration stamp:", timeNow, props.user.exp * 1000)
        if (!token) {
            console.log("No token")
            navigate("/login")
        } else if (timeNow >= props.user.exp * 1000) {
            props.sessionExpiredHandler()
            
        } else {
            // props.loadProductList()
            setProductList(props.products)

        }
    }, [])

    useEffect(() => {
        if(!!document.getElementById("input")){
            const textSearch = document.getElementById("input").value
            props.loadProductList()
            if ( textSearch !== "") {
                const searchProducts = Array.from(props.products)
                const filteredSearch = searchProducts.filter(product => product.productName.toLowerCase().includes(textSearch.toLowerCase()))
                setProductList(filteredSearch)
            } else {
                setProductList(props.products)
            }
    }
    },[nameSearch])


    const testRefreshToken = () => {
        console.log(props.user.user)
        Axios.post("https://bootlegbackend.herokuapp.com/auth/refresh", props.user.user).then(response => {console.log(response)}).catch(error => {console.log(error)})
    }

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

    const handleSearch = (e) => {
    //     return true
    // }

    // const handleSearch = (e) => {
        console.log()
        console.log(e.target.value)
        // console.log(searchProducts.filter(product => product.productName.includes(e.target.value)))
        const searchProducts = Array.from(props.products)
  
        const filteredSearch = searchProducts.filter(product => product.productName.toLowerCase().includes(e.target.value.toLowerCase()))
  
        if(e.target.value === ""){
          console.log("empty")
          
          setProductList(props.products)
        } else {
  
  
        console.log(filteredSearch)
  
        setProductList(filteredSearch)
        }
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
                    <ProductCreateForm loadProductList={props.loadProductList} closeModal={setModalIsOpenToFalse} success={props.sucMessage} setSuccess={props.setSuccess} error={props.errMessage} setError={props.setError} refreshSessionHandler={props.refreshSessionHandler} sessionExpiredHandler={props.sessionExpiredHandler}/>
                </Modal.Body>
            </Modal>
            </div>

            <h1 className='dash-title'>Dashboard</h1>

            <div className='dash-contents'>
                <div>
                    <h4>Customer Orders</h4>
                    <div className='order-table'>
                        <OrderHistory allOrders={props.allOrders} setAllOrders={props.setAllOrders} products={props.products} user={props.user} refreshSessionHandler={props.refreshSessionHandler} sessionExpiredHandler={props.sessionExpiredHandler}/>
                    </div>
                </div>
            
                <div>
                    <h4>Product inventory</h4>

                    <div className='search-name'>
                        <Container>
                            <Form.Label>Search by Name</Form.Label>
                            <Form.Control id="input" type='text' placeholder="search for a product" onChange={(e)=>handleSearch(e)}></Form.Control>
                        </Container>
                    </div>

                    <Button onClick={setModalIsOpenToTrue}>Add a new product</Button>
                    <div className='inventory-list'>
                    {allStock}
                    </div>
                </div>
            </div>
        
        </>
        ) : (
            <div className='dash-contents'>
                <div className='order-table-buyer'>
                    <h4>My Orders</h4>
                    <OrderHistory allOrders={props.allOrders} setAllOrders={props.setAllOrders} products={props.products} user={props.user} refreshSessionHandler={props.refreshSessionHandler} sessionExpiredHandler={props.sessionExpiredHandler}/>
                </div>
            </div>
        )
        }
    </div>
  )
}

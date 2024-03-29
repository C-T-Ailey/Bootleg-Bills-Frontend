import React, { useEffect, useState} from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
// import Modal from 'react-modal'
import Axios from 'axios'
import ProductEditForm from './ProductEditForm';

export default function ProductMetrics(props) {

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [outstandingOrders, setOutstandingOrders] = useState(0)

    const [totalOrdered, setTotalOrdered] = useState(0)

    const [productToEdit, setProductToEdit] = useState("")

    // useEffect(() => {
    //     fetchOutstanding()
    //     fetchTotal()
    // }, [])

    const onDeleteClick = () => {
        !showDeleteModal ? setShowDeleteModal(true) : setShowDeleteModal(false)
    }

    const onEditClick = () => {
        
        console.log(props.product)
        if(!showEditModal){ 
            editGet(props.product._id)
            setShowEditModal(true)
            console.log("Prod ID:", props.product._id)
        } else {
            setShowEditModal(false)
        }
    }

    const updateProduct = (product) => {
    console.log(product)
    Axios.put("https://bootlegbackend.herokuapp.com/product/update", product, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => {
      console.log(response)
      props.loadProductList();
    })
    .catch((error) => {
      console.log("Error updating product:", error.response.data)
    })
  }

    const handleDelete = (id) => {
        console.log(id)
        console.log("clicked")
        
        Axios.delete(`https://bootlegbackend.herokuapp.com/product/delete?id=${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
        })
        .then((response) => {
            console.log(response)
            console.log("Product record successfully deleted.")
            props.loadProductList()
        })
        .catch((error) => {
            console.log("Error deleting product record:", error)
            props.sessionExpiredHandler()
        })
    }

    const confirmDelete = () => {
        handleDelete(props.product._id)
        setShowDeleteModal(false)
    }

    const editGet = (id) => {
        console.log("Edit GET MAIN")
        console.log(id)
        Axios.get(`https://bootlegbackend.herokuapp.com/product/edit?id=${id}`, {
          headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
        .then(response => {
          var product = response.data.product
          console.log("GET PRODUCT", product)
        //   props.setProductToEdit(product)
          setProductToEdit(product)
        })
        .catch((error) => {
          console.log("Error loading product information:", error)
          props.sessionExpiredHandler()
        })
    }

    const fetchOutstanding = async () => {
        let outstanding = 0
        const qualifiedStatus = ["open", "processing"]
        const data = await Axios.get('https://bootlegbackend.herokuapp.com/orders/index');
        data.data.forEach(order => {
            if (order.cart.includes(props.product._id) && qualifiedStatus.includes(order.status)) {
                // console.log("includes this product:", order.cart.includes(props.product._id))
                // console.log("has outstanding:", qualifiedStatus.includes(order.status))
                outstanding += 1
            }
        });
        // console.log("product ordered", totalOrdered, "times")
        setOutstandingOrders(outstanding)
    }

    const fetchTotal = async () => {
        let total = 0
        const data = await Axios.get('https://bootlegbackend.herokuapp.com/orders/index');
        data.data.forEach(order => {
            if (order.cart.includes(props.product._id)) {
                let product = props.product._id
                order.cart.forEach(element => {
                    if (element == product) {
                        total += 1
                    }
                });
            }
        });
        // console.log("total ordered:", totalOrdered)
        setTotalOrdered(total)
    }

  return (
    <div>
        <Modal size="sm" centered show={showDeleteModal}>
            <Modal.Header>
                <Modal.Title style={{fontWeight:"bolder"}}>
                    Confirm Deletion
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this inventory record?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" id="del-yes" onClick={() => confirmDelete()}>Yes</Button> &nbsp;
                <Button variant="primary" id='del-no' onClick={() => setShowDeleteModal(false)}>No</Button>
            </Modal.Footer>
        </Modal>
        
        <Modal size="lg" centered show={showEditModal} onHide={() => onEditClick()}>
            <Modal.Header closeButton>
                <Modal.Title style={{fontWeight:"bolder"}}>
                    Edit Product information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ProductEditForm loadProductList={props.loadProductList} showModal={setShowEditModal} product={props.product} updateProduct={updateProduct} productToEdit={productToEdit}/>
            </Modal.Body>
        </Modal>

        <Card>
            <Card.Body>
                <Card.Title>{props.product.productName}</Card.Title>
                <Card.Text>Stock: {props.product.productStock}</Card.Text>
                {/* <Card.Text># of Outstanding Orders: {outstandingOrders}</Card.Text> */}
                <Card.Text>Total Ordered: {props.product.unitsSold}</Card.Text>
                <Button variant="primary" onClick={() => onEditClick()}>Update Record</Button> &nbsp;
                <Button variant="primary" onClick={() => onDeleteClick()}>De-list Item</Button>
                {/* <Button variant="warning" onClick={() => fetchTotal()}>Test</Button> */}
            </Card.Body>
        </Card>
    </div>
  )
}

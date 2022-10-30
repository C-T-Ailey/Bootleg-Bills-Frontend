import React, { useState} from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
// import Modal from 'react-modal'
import Axios from 'axios'
import ProductEditForm from './ProductEditForm';

export default function ProductMetrics(props) {

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const onDeleteClick = () => {
        !showDeleteModal ? setShowDeleteModal(true) : setShowDeleteModal(false)
    }

    const onEditClick = () => {
        console.log(props.product)
        if(!showEditModal){ 
            setShowEditModal(true)
            console.log("Prod ID:", props.product._id)
            props.editGet(props.product._id)
        } else {
            setShowEditModal(false)
        }
    }

    const updateProduct = (product) => {
    console.log(product)
    Axios.put("product/update", product, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => {
      console.log(response)
      props.loadProductList();
    })
    .catch((error) => {
      console.log("Error updating product:", error)
    })
  }

    const confirmDelete = () => {
        props.handleDelete(props.product._id)
        setShowDeleteModal(false)
    }

  return (
    <div>
        <Modal size="sm" centered show={showDeleteModal}>
            <Modal.Header>
                <Modal.Title>
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
                <ProductEditForm loadProductList={props.loadProductList} showModal={setShowEditModal} product={props.product} updateProduct={updateProduct} productToEdit={props.productToEdit}/>
            </Modal.Body>
        </Modal>

        <Card>
            <Card.Body>
                <Card.Title>{props.product.productName}</Card.Title>
                <Card.Text>Stock: {props.product.productStock}</Card.Text>
                <Card.Text># of Outstanding Orders: 2</Card.Text>
                <Card.Text>Total Orders: 28</Card.Text>
                <Button variant="primary" onClick={() => onEditClick()}>Update Record</Button> &nbsp;
                <Button variant="primary" onClick={() => onDeleteClick()}>De-list Item</Button>
            </Card.Body>
        </Card>
    </div>
  )
}

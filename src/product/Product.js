import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import ProductDetail from './ProductDetail';
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';




export default function Product(props) {


  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalIsOpenToTrue =()=>{
 
    setModalIsOpen(true)
  }

  const setModalIsOpenToFalse =()=>{
    setModalIsOpen(false)
  }

  


  return (
    <>
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src={props.productImageUrl} />
            <Card.Body>
                <Card.Title>{props.productName}</Card.Title>
                <Card.Text>£{props.productPrice}</Card.Text>

                <Button onClick={setModalIsOpenToTrue}>Product Details</Button>

                <Modal isOpen={modalIsOpen} ariaHideApp={false}>
           
                <Button onClick={setModalIsOpenToFalse}>x</Button>
                
                <ProductDetail />

                



                </Modal>
            </Card.Body>

        </Card>
    </>
  )
}

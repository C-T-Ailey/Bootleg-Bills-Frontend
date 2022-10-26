import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default function ProductEditForm(props) {
  
  const [formAltered, setFormAltered] = useState(false)
  
  const [updatedProduct, setUpdatedProduct] = useState(props.productToEdit)

  const [isOriginal, setIsOriginal] = useState("")

  const [newImageSet, setNewImageSet] = useState([])
  
  useEffect(() => {
    setUpdatedProduct(props.productToEdit)
    setIsOriginal(props.product.productSourceType !== "--" ? (props.product.productSourceType === "Original Work" ? true : false) : "--")
    setNewImageSet(props.product.productImageUrls)
  }, [props.productToEdit, props.product.productSourceType, props.product.productImageUrls])
  
  console.log(props.productToEdit)
  console.log(isOriginal)
  console.log(newImageSet)
  
  const handleChange = (e) => {
    !formAltered ? setFormAltered(true) : console.log("Form already altered")
    console.log(updatedProduct)
    const attributeToChange = e.target.name
    // console.log("e.target.name:", attributeToChange)
    const updatedValue = e.target.value
    // console.log("e.target.value:", updatedValue)
    const product = {...updatedProduct}
    // console.log("product before updating:", product)
    product[attributeToChange] = updatedValue
    // console.log("Product after updating:", product)
    setUpdatedProduct(product)
  }

  const handleSelectChange = (event) => {
    !formAltered ? setFormAltered(true) : console.log("Form already altered")
    var select = document.getElementById('productSourceType')
    var val = select.options[select.selectedIndex].value
    console.log("Select: ", select, "Value: ", val)
    val !== 'Original Work' ? setIsOriginal(false) : setIsOriginal(true)
    const product = {...updatedProduct}
    product[event.target.name] = event.target.value
    console.log(product)
    setUpdatedProduct(product)

}

const handleUrlChange = (e) => {

  !formAltered ? setFormAltered(true) : console.log("Form already altered")

  let urlToChange = e.target.id

  console.log(urlToChange)

  const newValue = e.target.value

  console.log(newValue)

  const images = [...newImageSet]

  images[urlToChange] = newValue
  
  console.log(images)

  setNewImageSet(images)
  
}
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newImageSet)
    console.log(props.product.productImageUrls)
    console.log(updatedProduct)
    if(formAltered){
      updatedProduct.productImageUrls = newImageSet
      props.updateProduct(updatedProduct)
    } else {
      console.log("Record not changed.")
    }
    setFormAltered(false)
    props.showModal(false)
  }

  return (
    <div>
        <Container>
          <Form.Group>
            <Form.Label>Product Name</Form.Label>
            <Form.Control name="productName" onChange={handleChange} defaultValue={props.product.productName}></Form.Control>
          </Form.Group>

          <Form.Group>
                <Form.Label>Source Material</Form.Label>
                <Form.Select id="productSourceType" name="productSourceType" type="select" defaultValue={props.product.productSourceType ? props.product.productSourceType : "--"} onChange={handleSelectChange}>
                    <option value="--" disabled>--</option>
                    <option value="Film/TV">Film/TV</option>
                    <option value="Video Game">Video Game</option>
                    <option value="Original Work">Original Work</option>
                </Form.Select>
            </Form.Group>

            <Form.Group>
                <Form.Label>{(typeof isOriginal == "boolean") ? (isOriginal ? "Original Creator" : "Source Name") : ("")}</Form.Label>
                <Form.Control name="productSource" type="text" defaultValue={props.product.productSource} onChange={handleChange}></Form.Control>
            </Form.Group>

          <Form.Group>
            <Form.Label>Product Price</Form.Label>
            <Form.Control name="productPrice" type="number" onChange={handleChange} defaultValue={props.product.productPrice}></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Product Description</Form.Label>
            <Form.Control name="productDescription" as="textarea" rows={5} onChange={handleChange} defaultValue={props.product.productDescription}></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Stock Count</Form.Label>
            <Form.Control name="productStock" type="number" onChange={handleChange} defaultValue={props.product.productStock}></Form.Control>
          </Form.Group>
          
          <Form.Group>
                <Form.Label>Product Image URLs &#40;up to four&#41;</Form.Label>
                <Form.Control id='0' onChange={handleUrlChange} defaultValue={props.product.productImageUrls[0]}></Form.Control>
                <Form.Control id='1' onChange={handleUrlChange} defaultValue={props.product.productImageUrls[1]}></Form.Control>
                <Form.Control id='2' onChange={handleUrlChange} defaultValue={props.product.productImageUrls[2]}></Form.Control>
                <Form.Control id='3' onChange={handleUrlChange} defaultValue={props.product.productImageUrls[3]}></Form.Control>
            </Form.Group>

          <Form.Group>
            <Form.Label>Product Audio</Form.Label>
            <Form.Control name="productAudio" onChange={handleChange} defaultValue={props.product.productAudio}></Form.Control>
          </Form.Group>
          
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>Update Product</Button>
          
        </Container>
    </div>
  )
}

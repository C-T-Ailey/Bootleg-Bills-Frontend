import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import './Product.css'

export default function ProductEditForm(props) {
  
  // formAltered variable: used in handleSubmit to check if the form has been changed, and only update the product if it has.
  const [formAltered, setFormAltered] = useState(false)

  // Unused. Set within handleVariantChange.
  const [variantUpdated, setVariantUpdated] = useState(false)
  
  // Stores the product to be edited by default; stores edited version of the product via below useEffect once a change is made
  const [updatedProduct, setUpdatedProduct] = useState(props.productToEdit)

  // tracks if the selected product's productSourceType is "Original Release" - determines whether the productSource field is labelled "source name" or "original creator"
  const [isOriginal, setIsOriginal] = useState("")

  // stores the new array of URLs to be used as images for the product
  const [newImageSet, setNewImageSet] = useState([])

  const [newMediaFormat, setNewMediaFormat] = useState(props.productToEdit.productMediaFormat ? props.productToEdit.productMediaFormat : '')

  // Does nothing yet. Set within handleVariantChange
  const [variantAltered, setVariantAltered] = useState(false)

  // Tracks the product's hasVariant property. Set to the opposite of default once handleVariantChange is triggered.
  const [hasVariant, setHasVariant] = useState(props.productToEdit.hasVariant)
  
  // useEffect to update whenever productImageUrls, productSourceType and productToEdit are updated.
  useEffect(() => {
    // Is this necessary? Why would I set updatedProduct to the default iteration of productToEdit?
    setUpdatedProduct(props.productToEdit)
    // set isOriginal to "true" if sourceType is "original release" - if not, set to "false"; if productSourceType is nonexistent, set to "--"
    setIsOriginal(props.product.productSourceType !== "--" ? (props.product.productSourceType === "Original Release" ? true : false) : "--")
    // set newImageSet to the urls for the product images. How does this work? What is this doing? This needs to be tested.
    setNewImageSet(props.product.productImageUrls)
  }, [props.product.productImageUrls, props.product.productSourceType, props.productToEdit])
  
  // useEffect for logging the status of the above states
  useEffect(() => {
  console.log(props.productToEdit)
  console.log(isOriginal)
  console.log(newImageSet)
  }, [])
  
  // Handles changes to most plain text fields.
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
    val !== 'Original Release' ? setIsOriginal(false) : setIsOriginal(true)
    const product = {...updatedProduct}
    product[event.target.name] = event.target.value
    console.log(product)
    setUpdatedProduct(product)

}

const handleVariantChange = (event) => {
  !formAltered ? setFormAltered(true) : console.log("Form already altered")
  console.log(document.getElementById('hasVariant').value)
  setVariantAltered(true)
  var select = document.getElementById('hasVariant')
  var val = select.options[select.selectedIndex].value
  console.log("Select: ", select, "Value: ", val)
  val !== 'true' ? setHasVariant(true) : setHasVariant(false)
  const product = {...updatedProduct}
  product[event.target.name] = event.target.value
  console.log(product)
  setUpdatedProduct(product)

}

const handleVariantUpdate = (event) => {
  !formAltered ? setFormAltered(true) : console.log("Form already altered")
  const index = event.target.id[3]
  console.log(event.target.id[3])
  setVariantUpdated(true)
  const product = {...updatedProduct}
  product.productVariants[index] = event.target.value
  console.log(product.productVariants[index])
  setUpdatedProduct(product)
}

  const handleMediaSelectChange = (event) => {
    console.log(newMediaFormat)
    !formAltered ? setFormAltered(true) : console.log("Form already altered")
    var select = document.getElementById('productMediaFormat')
    var val = select.options[select.selectedIndex].value
    console.log("Select: ", select, "Value: ", val)
    setNewMediaFormat(val)

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
    console.log(formAltered)
    console.log(newImageSet)
    console.log("NEW MEDIA:", newMediaFormat)
    console.log(props.product.productImageUrls)
    console.log(updatedProduct)
    if(formAltered){
      updatedProduct.productImageUrls = newImageSet
      updatedProduct.productMediaFormat = newMediaFormat
      props.updateProduct(updatedProduct)
    } else {
      console.log("Record not changed.")
    }

  //   if (variantAltered) {
  //     let variantArr = [document.getElementById("var0").value, document.getElementById("var1").value, document.getElementById("var2").value, document.getElementById("var3").value]
  //     let filteredVariants = []
  //     variantArr.forEach(element => {
  //         if (element !== "") {
  //             filteredVariants.push(element)
  //         }
  //     });
  //     updatedProduct.productVariants = filteredVariants
  //     console.log(variantArr)
  //     console.log("Variants added")
  // }

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
                <Form.Select className='select-text' id="productSourceType" name="productSourceType" type="select" defaultValue={props.product.productSourceType ? props.product.productSourceType : "--"} onChange={handleSelectChange}>
                    <option className='select-text' value="--" disabled>--</option>
                    <option className='select-text' value="Film/TV">Film/TV</option>
                    <option className='select-text' value="Video Game">Video Game</option>
                    <option className='select-text' value="Original Release">Original Release</option>
                </Form.Select>
            </Form.Group>

          <Form.Group>
              <Form.Label>Media Format</Form.Label>
              <Form.Select className='select-text' id="productMediaFormat" name="productMediaFormat" type="select" defaultValue={props.product.productMediaFormat ? props.product.productMediaFormat : ""} onChange={handleMediaSelectChange}>
                  <option value="" disabled>--</option>
                  <option className='select-text' value="Cassette">Cassette</option>
                  <option className='select-text' value="Vinyl">Vinyl</option>
                  <option className='select-text' value="Apparel">Apparel/Accessory</option>
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
            <Form.Control name="productDescription" as="textarea" rows={5} style={{fontWeight:"bolder"}} onChange={handleChange} defaultValue={props.product.productDescription}></Form.Control>
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
                <Form.Label>Has variants?</Form.Label>
                <Form.Select className='select-text' id="hasVariant" name="hasVariant" type="select" defaultValue={hasVariant} onChange={handleVariantChange}>
                    <option className='select-text' value="false">No</option>
                    <option className='select-text' value="true">Yes</option>
                </Form.Select>
            </Form.Group>

            { hasVariant ? 
            
                (<Form.Group>
                    <Form.Label>Variants</Form.Label>
                    <Form.Control id='var0' defaultValue={props.product.productVariants[0]} onChange={handleVariantUpdate}></Form.Control>
                    <Form.Control id='var1' defaultValue={props.product.productVariants[1]} onChange={handleVariantUpdate}></Form.Control>
                    <Form.Control id='var2' defaultValue={props.product.productVariants[2]} onChange={handleVariantUpdate}></Form.Control>
                    <Form.Control id='var3' defaultValue={props.product.productVariants[3]} onChange={handleVariantUpdate}></Form.Control>
                </Form.Group>)

                :

                (<></>)

            } 

          <Form.Group>
            <Form.Label>Product Audio</Form.Label>
            <Form.Control name="productAudio" onChange={handleChange} defaultValue={props.product.productAudio}></Form.Control>
          </Form.Group>
          
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>Update Product</Button>
          
        </Container>
    </div>
  )
}

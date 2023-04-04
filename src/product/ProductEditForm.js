import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import Axios from 'axios'
import './Product.css'

export default function ProductEditForm(props) {

  // Get form submission working for Image URLs and expandable variants

  let productTemplate = {
    productName: "",
    productPrice: 0,
    productDescription: "",
    productStock: 0,
    productImageUrls: [],
    productBestsellerImage: "",
    productSourceType: "",
    productMediaFormat: "",
    productSource: "",
    hasVariant: false,
    productVariants: []
  }
  
  // formAltered variable: used in handleSubmit to check if the form has been changed, and only update the product if it has.
  const [formAltered, setFormAltered] = useState(false)
  
  // Stores the product to be edited by default; stores edited version of the product via below useEffect once a change is made
  const [updatedProduct, setUpdatedProduct] = useState(JSON.parse(JSON.stringify(props.product)))

  // tracks if the selected product's productSourceType is "Original Release" - determines whether the productSource field is labelled "source name" or "original creator"
  const [isOriginal, setIsOriginal] = useState(props.product.productSourceType === "Original Release" ? true : false)

  // stores the new array of URLs to be used as images for the product
  const [newImageSet, setNewImageSet] = useState(props.product.productImageUrls)

  const [characterCount, setCharacterCount] = useState(props.product.productDescription.length)

  const [urls, setUrls] = useState(props.product.productImageUrls)

  const [variants, setVariants] = useState(props.product.productVariants)

  const [newMediaFormat, setNewMediaFormat] = useState(!!props.product.productMediaFormat ? props.product.productMediaFormat : '')

  // Tracks the product's hasVariant property. Set to the opposite of default once handleVariantChange is triggered.
  const [hasVariant, setHasVariant] = useState(props.product.hasVariant)
  
  // useEffect to update whenever productImageUrls, productSourceType and productToEdit are updated.
    //   useEffect(() => {
    // set isOriginal to "true" if sourceType is "original release" - if not, set to "false"; if productSourceType is nonexistent, set to "--"
    // set newImageSet to the urls for the product images. How does this work? What is this doing? This needs to be tested.
    // }, [props.product.productImageUrls, props.product.productSourceType, props.productToEdit])

    // useEffect for logging the status of the above states
    useEffect(() => {
        console.log(updatedProduct)
        console.log(isOriginal)
        console.log(newImageSet)
        console.log(urls)
        // setNewImageSet(props.product.productImageUrls)
    }, [])
  
  // Handles changes to most plain text fields: name, source, price, description, stock, audio
  const handleChange = (e) => {
    if(!formAltered){setFormAltered(true)}
    console.log(updatedProduct)
    const attributeToChange = e.target.name
    const updatedValue = e.target.value
    const product = {...updatedProduct}
    product[attributeToChange] = updatedValue
    if(e.target.name === "productDescription"){
    
        setCharacterCount(updatedValue.length)
    }
    setUpdatedProduct(product)
  }

  const handleSelectChange = (e) => {
    if(!formAltered){setFormAltered(true)}
    console.log(e.target.name)
    console.log(e.target.value)
    if(e.target.name === "productSourceType"){
      e.target.value !== 'Original Release' ? setIsOriginal(false) : setIsOriginal(true)
    }
    const product = {...updatedProduct}
    product[e.target.name] = e.target.value
    console.log(product)
    setUpdatedProduct(product)

  }

  const handleMediaSelectChange = (e) => {
    if(!formAltered){setFormAltered(true)}
    console.log(e.target.value)
    const product = {...updatedProduct}
    product[e.target.name] = e.target.value
    console.log(product)
    setUpdatedProduct(product)
  }

  const handleHasVariantChange = (e) => {
    // if form has not already been altered in some way, set formAltered to true, else log that it's been changed already  
    if(!formAltered){setFormAltered(true)}
    // log the new value of the Has Variant field
    console.log(e.target.value)
    // if value of Has Variant field is "true", setHasVariant to true, else to false
    e.target.value === 'true' ? setHasVariant(true) : setHasVariant(false)
    const product = {...updatedProduct}
    product[e.target.name] = e.target.value
    console.log(product)
    setUpdatedProduct(product)
  }

    // If a field is altered and then left blank, it's not treated as a null field by the bestseller image handling - a blank last index will be processed as the bestseller image
    const handleVariantUpdate = (e) => {
        if(!formAltered){setFormAltered(true)}
        const varToChange = e.target.id
        console.log(varToChange)
        const newValue = e.target.value
        console.log(newValue)
        const vars = Array.from(variants)
        if(e.target.id === "primary"){
            vars[0] = newValue
        } else {
            vars[parseInt(varToChange)] = newValue
        } 
        const product = {...updatedProduct}
        console.log(vars)
        setVariants(vars)
    }

    const handleAddVarField = (e) => {
        let currentVars = Array.from(variants)
        currentVars.push(`Variant ${currentVars.length + 1}`)
        setVariants(currentVars)
    }

    const handleRemoveVariant = (e) => {
        if(!formAltered){setFormAltered(true)}
        let currentVars = Array.from(variants)
        const found = currentVars.find(element => element === parseInt(e.target.id))
        currentVars.splice(currentVars.indexOf(found),1)
        setVariants(currentVars)
    }

    // Update this to accommodate the additional inputs
    const handleUrlChange = (e) => {
        if(!formAltered){setFormAltered(true)}
        const urlToChange = e.target.id
        console.log(urlToChange)
        const newValue = e.target.value
        console.log(newValue)
        const images = Array.from(urls)
        if(e.target.id === "primary"){
            images[0] = newValue
        } else {
            images[parseInt(urlToChange)] = newValue
        } 
        console.log(images)
        setUrls(images)
    }

    const handleAddImgField = (e) => {
        let currentUrls = Array.from(urls)
        currentUrls.push(`Image ${currentUrls.length + 1}`)
        setUrls(currentUrls)   
    }
    
    
    const handleRemoveUrl = (e) => {
        if(!formAltered){setFormAltered(true)}
        let currentUrls = Array.from(urls)
        const found = currentUrls.find(element => element === parseInt(e.target.id))
        currentUrls.splice(currentUrls.indexOf(found),1)
        setUrls(currentUrls)
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formAltered)
        if(formAltered){
            const filteredImageSet = urls.filter(image => /\S/.test(image) === true)
            const filteredVariantByEmpties = variants.filter(variant => /\S/.test(variant) === true)
            const filteredVariantByPlaceholders = filteredVariantByEmpties.filter(variant => variant.slice(0,7) !== "Variant")
            console.log(filteredImageSet)
            console.log(filteredVariantByPlaceholders)
            updatedProduct.productImageUrls = filteredImageSet
            updatedProduct.productVariants = filteredVariantByPlaceholders
            console.log("From:",props.product,"To:",updatedProduct)
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
                    <Form.Control name="productName" onChange={(e) => handleChange(e)} defaultValue={props.product.productName}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Source Material</Form.Label>
                    <Form.Select className='select-text' id="productSourceType" name="productSourceType" type="select" defaultValue={!!props.product.productSourceType ? props.product.productSourceType : "--"} onChange={(e) => handleSelectChange(e)}>
                        <option className='select-text' value="--" disabled>--</option>
                        <option className='select-text' value="Film/TV">Film/TV</option>
                        <option className='select-text' value="Video Game">Video Game</option>
                        <option className='select-text' value="Original Release">Original Release</option>
                    </Form.Select>
                    </Form.Group>

                <Form.Group>
                    <Form.Label>Media Format</Form.Label>
                    <Form.Select className='select-text' id="productMediaFormat" name="productMediaFormat" type="select" defaultValue={!!props.product.productMediaFormat ? props.product.productMediaFormat : ""} onChange={(e) => handleSelectChange(e)}>
                        <option value="" disabled>--</option>
                        <option className='select-text' value="Cassette">Cassette</option>
                        <option className='select-text' value="Vinyl">Vinyl</option>
                        <option className='select-text' value="Apparel">Apparel/Accessory</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>{(typeof isOriginal == "boolean") ? (isOriginal ? "Original Creator" : "Source Name") : ("")}</Form.Label>
                    <Form.Control name="productSource" type="text" defaultValue={props.product.productSource} onChange={(e) => handleChange(e)}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control name="productPrice" type="number" onChange={(e) => handleChange(e)} defaultValue={props.product.productPrice}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control name="productDescription" as="textarea" rows={5} maxLength={600} style={{fontWeight:"bolder"}} onChange={(e) => handleChange(e)} defaultValue={props.product.productDescription}></Form.Control>
                    {<p>{characterCount}/600</p>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Stock Count</Form.Label>
                    <Form.Control name="productStock" type="number" onChange={(e) => handleChange(e)} defaultValue={props.product.productStock}></Form.Control>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Product Image URLs &#40;max. 8&#41;</Form.Label>
                    {/* <Form.Control id='0' onChange={(e) => handleUrlChange(e)} defaultValue={props.product.productImageUrls[0]}></Form.Control>
                    <Form.Control id='1' onChange={(e) => handleUrlChange(e)} defaultValue={props.product.productImageUrls[1]}></Form.Control>
                    <Form.Control id='2' onChange={(e) => handleUrlChange(e)} defaultValue={props.product.productImageUrls[2]}></Form.Control>
                    <Form.Control id='3' onChange={(e) => handleUrlChange(e)} defaultValue={props.product.productImageUrls[3]}></Form.Control> */}
                    <div id='imageUrls'>
                        {urls.map((url, index) => (
                            index === 0 ?
                            <Form.Control key={index} id={"primary"} onChange={(e) => handleUrlChange(e)} defaultValue={url.slice(0,5) === "https" ? url : ""} placeholder={"Primary Image (required)"}></Form.Control>
                            :
                            <div className='removable-form'>
                                <Form.Control key={index} id={`${index}`} onChange={(e) => handleUrlChange(e)} defaultValue={url.slice(0,5) === "https" ? url : ""} placeholder={`Image ${index+1}`}></Form.Control>
                                <Button id={`${index}`} onClick={(e) => handleRemoveUrl(e)}>X</Button>
                            </div>
                        ))}
                    </div>
                    <Button variant='primary' disabled={urls.length !== 8 ? false : true} onClick={(e) => handleAddImgField(e)}>+</Button>
                    <Button variant="primary" onClick={() => console.log(urls)}>Check new images</Button>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Product Bestseller Image</Form.Label>
                    <Form.Control name="productBestsellerImage" onChange={(e) => handleChange(e)} defaultValue={props.product.productBestsellerImage}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Has variants?</Form.Label>
                    <Form.Select className='select-text' id="hasVariant" name="hasVariant" type="select" defaultValue={props.product.hasVariant} onChange={(e) => handleHasVariantChange(e)}>
                        <option className='select-text' value="false">No</option>
                        <option className='select-text' value="true">Yes</option>
                    </Form.Select>
                </Form.Group>

                { hasVariant ? 
                
                    (<Form.Group>
                        <Form.Label>Variants</Form.Label>
                        {/* <Form.Control id='var0' defaultValue={props.product.productVariants[0]} onChange={(e) => handleVariantUpdate(e)}></Form.Control>
                        <Form.Control id='var1' defaultValue={props.product.productVariants[1]} onChange={(e) => handleVariantUpdate(e)}></Form.Control>
                        <Form.Control id='var2' defaultValue={props.product.productVariants[2]} onChange={(e) => handleVariantUpdate(e)}></Form.Control>
                        <Form.Control id='var3' defaultValue={props.product.productVariants[3]} onChange={(e) => handleVariantUpdate(e)}></Form.Control> */}
                        <div id='variants'>
                        {variants.map((variant, index) => (
                            index === 0 ?
                            <Form.Control key={index} id={"primary"} onChange={(e) => handleVariantUpdate(e)} defaultValue={variant} placeholder={"Variant 1"}></Form.Control>
                            :
                            <div className='removable-form'>
                                <Form.Control key={index} id={`${index}`} onChange={(e) => handleVariantUpdate(e)} defaultValue={variant !== `Variant ${index + 1}` ? variant : ""} placeholder={`Variant ${index+1}`}></Form.Control>
                                <Button id={`${index}`} onClick={(e) => handleRemoveVariant(e)}>X</Button>
                            </div>
                        ))}
                    </div>
                    <Button variant='primary' disabled={urls.length !== 8 ? false : true} onClick={(e) => handleAddVarField(e)}>+</Button>
                    <Button variant="primary" onClick={() => console.log(variants)}>Check new variants</Button>
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

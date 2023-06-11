import React, { useEffect, useState} from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import Axios from 'axios'
// import './Product.css'
import './ProductCreateForm.css'

export default function ProductCreateForm(props) {

    
    const [newProduct, setNewProduct] = useState({})
    
    const [ModalAlert, setModalAlert] = useState(false)

    const [isOriginal, setIsOriginal] = useState(false)

    const [sourceTypeAltered, setSourceTypeAltered] = useState(false)

    const [variantAltered, setVariantAltered] = useState(false)

    const [hasVariant, setHasVariant] = useState(false)

    const [variants, setVariants] = useState([""])

    const [mediaAltered, setMediaAltered] = useState(false)

    const [newImageSet, setNewImageSet] = useState([])

    const [characterCount, setCharacterCount] = useState(0)

    const [urls, setUrls] = useState(["Image 1"])

    const defaultSourceType = "Film/TV"

    const defaultVariants = "false"

    const defaultMediaFormat = "Cassette"

    const success = props.success

    const error = props.error

    // useEffect(()=>{
    //     console.log("test")
    // },[urls])
    
    const handleChange = (e) => {
        // product attribute to change is defined as the event target's name, e.g. productName, productAudio
        const attributeToChange = e.target.name
        // value for attribute to change is defined as event target's value
        const newValue = e.target.value
        // define product as current state of newProduct object
        const product = {...newProduct}
        // the property of product corresponding to attributeToChange is set to newValue
        product[attributeToChange] = newValue
        
        // newProduct is set to product
        setNewProduct(product)
    }
    
    const handleDescrChange = (e) => {
        // product attribute to change is defined as the event target's name, productDescription
        const description = e.target.name
        // description's value is set to event target's value
        const newValue = e.target.value
        // define product as current state of newProduct object
        const product = {...newProduct}
        // product description is set to newValue
        product[description] = newValue
        
        // set characterCount to the length of newValue, for tracking remaining characters vs limit
        setCharacterCount(newValue.length)
        
        // newProduct is set to product
        setNewProduct(product)
    }    
    
    
    const handleUrlChange = (e) => {
        // the ID of the url being changed is defined as the value of the event target's ID
        let urlToChange = e.target.id
        console.log(urlToChange)

        
        // new value of URL is set to the value of the event target
        const newValue = e.target.value
        console.log(newValue)
        
        // var images defaulted to the contents of newImageSet state
        const images = [...newImageSet]
        
        // if event target ID denotes it as the primary image:
        if(e.target.id === "primary"){
            // index 0 of images is set to newValue
            images[0] = newValue

        // otherwise,
        } else {
            // the image at the index corresponding with urlToChange is set to newValue
            images[urlToChange] = newValue
        }

        
        // log the image set
        console.log(images)
        
        // set newImageSet to the defined array of images
        setNewImageSet(images)
        
    }

    const handleAddImgField = (e) => {
        
        let currentUrls = Array.from(urls)
        currentUrls.push(`Image ${currentUrls.length + 1}`)
        setUrls(currentUrls)
        
    }

    const handleAddVarField = (e) => {
        
        let currentVars = Array.from(variants)
        currentVars.push(``)
        setVariants(currentVars)
        
    }

    const handleRemoveUrl = (e) => {
        let currentUrls = Array.from(urls)
        const found = currentUrls.find(element => element === e.target.id)
        currentUrls.splice(currentUrls.indexOf(found),1)
        setUrls(currentUrls)
    }

    const handleRemoveVariant = (e) => {
        let currentVars = Array.from(variants)
        console.log("current field text:",e.target.innerText)
        console.log("ID of element to delete:",e.target.id, typeof parseInt(e.target.id))
        console.log("Value of the element at index [id]:",currentVars[parseInt(e.target.id)])
        console.log(currentVars.splice(parseInt(e.target.id),1))
        console.log("current variants:",currentVars)
        setVariants(currentVars)
    }

    const handleSelectChange = (event) => {
        setSourceTypeAltered(true)
        var select = document.getElementById('productSourceType')
        var val = select.options[select.selectedIndex].value
        console.log("Select: ", select, "Value: ", val)
        val !== 'Original Release' ? setIsOriginal(false) : setIsOriginal(true)
        const product = {...newProduct}
        product[event.target.name] = event.target.value
        console.log(product)
        setNewProduct(product)

    }

    const handleVariantChange = (event) => {
        setVariantAltered(true)
        var select = document.getElementById('hasVariant')
        var val = select.options[select.selectedIndex].value
        console.log("Select: ", select, "Value: ", val)
        val !== 'yes' ? setHasVariant(false) : setHasVariant(true)
        const product = {...newProduct}
        product[event.target.name] = event.target.value
        console.log(product)
        setNewProduct(product)
    }

    const handleVariant = (e) => {
        console.log(e.target.id)
        // array of new variants initialised as current "variants" state
        const newVars = Array.from(variants)
        // index of variation to change is defined as event target's name
        const editIndex = e.target.id

        // new value of URL is set to the value of the event target
        const newValue = e.target.value
        console.log(newValue)
        
        // 
        newVars[editIndex] = newValue


        
        // log the image set
        console.log(newVars)
        
        // set newImageSet to the defined array of images
        setVariants(newVars)
    }

    const handleMediaSelectChange = (event) => {
        setMediaAltered(true)
        var select = document.getElementById('productMediaFormat')
        var val = select.options[select.selectedIndex].value
        console.log("Select: ", select, "Value: ", val)
        const product = {...newProduct}
        product[event.target.name] = event.target.value
        console.log(product)
        setNewProduct(product)

    }

    const addProduct = (product) => {
        console.log("Add Product")
        console.log(product)
        product.productImageUrls = newImageSet
        product.productMediaFormat = document.getElementById("productMediaFormat").value
        if (variantAltered) {
            // let variantArr = [document.getElementById("var0").value, document.getElementById("var1").value, document.getElementById("var2").value, document.getElementById("var3").value]
            // let filteredVariants = []
            let filteredVariants = variants.filter(element => element !== "")
            console.log(filteredVariants)
            // variantArr.forEach(element => {
            //     if (element !== "") {
            //         filteredVariants.push(element)
            //     }
            // });
            product.productVariants = filteredVariants
            console.log("Variants added")
        }

        Axios.post("https://bootlegbackend.herokuapp.com/product/add", product, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
          console.log(response.data)
          !response.data.product ? props.setError("One or more required fields omitted.") : props.setSuccess("Product added successfully.")
          props.loadProductList();
        })
        .catch((error) => {
          console.log("Error adding product:", error)
        })
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        !sourceTypeAltered ? newProduct.productSourceType = defaultSourceType : (console.log("Source type set to user specified"))
        !variantAltered ? newProduct.hasVariant = defaultVariants : newProduct.hasVariant = "yes"
        !mediaAltered ? newProduct.productMediaFormat = mediaAltered : (console.log("Media format set to user specified"))
        console.log(newProduct)
        console.log(newImageSet)
        const filterCriteria = (element) => {
            if(element !== undefined){
                return element
            }
            
        }  
        ;
        let filterUndefinedUrls = newImageSet.filter(filterCriteria)
        console.log("URLs with all undefined fields removed:", filterUndefinedUrls)
        setNewImageSet(filterUndefinedUrls)
        if(!Object.keys(newProduct).length)
        {
            setModalAlert(true)
        } else {
            addProduct(newProduct)
            props.closeModal()
        }
    }

  return (
    <div>
        { !ModalAlert ? <></> : <Alert variant="danger" onClose={() => {setModalAlert(false)}} dismissible>Product Name, Source, Price, Description and # in Stock are required fields.</Alert>}
        <h1>Add New Product to Inventory</h1>
        <Container>
            <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control style={{lineHeight:"1", height:"35px"}} name="productName" onChange={handleChange} autoFocus></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Source Material</Form.Label>
                <Form.Select className='select-text' id="productSourceType" name="productSourceType" type="select" defaultValue={defaultSourceType} onChange={handleSelectChange}>
                    {/* <option value="--" disabled>--</option> */}
                    <option className='select-text' value="Film/TV">Film/TV</option>
                    <option className='select-text' value="Video Game">Video Game</option>
                    <option className='select-text' value="Original Release">Original Release</option>
                </Form.Select>
            </Form.Group>

            <Form.Group>
                <Form.Label>Media Format</Form.Label>
                <Form.Select className='select-text' id="productMediaFormat" name="productMediaFormat" type="select" defaultValue={"Cassette"} onChange={handleMediaSelectChange}>
                    {/* <option value="--" disabled>--</option> */}
                    <option className='select-text' value="Cassette">Cassette</option>
                    <option className='select-text' value="Vinyl">Vinyl</option>
                    <option className='select-text' value="Apparel">Apparel/Accessory</option>
                </Form.Select>
            </Form.Group>

            <Form.Group>
                <Form.Label>{(typeof isOriginal == "boolean") ? (isOriginal ? "Original Creator" : "Source Name") : ("")}</Form.Label>
                <Form.Control style={{lineHeight:"1", height:"35px"}} name="productSource" type={isOriginal==="--" ? ("hidden") : ("text")} onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Product Price &#40;£&#41;</Form.Label>
                <Form.Control style={{lineHeight:"1", height:"35px"}} name="productPrice" type="number" onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Product Description</Form.Label>
                <Form.Control id="description" className='select-text' name="productDescription" as="textarea" rows={5} maxLength={1000} onChange={(e) => handleDescrChange(e)}></Form.Control>
                {<p>{characterCount}/1000</p>}
            </Form.Group>

            <Form.Group>
                <Form.Label>Stock Count</Form.Label>
                <Form.Control style={{lineHeight:"1", height:"35px"}} name="productStock" type="number" onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Product Image URLs &#40;max. 8&#41;</Form.Label>
                <div id='imageUrls'>
                    {/* <Form.Control id='0'onChange={handleUrlChange}></Form.Control>
                    <Form.Control id='1' onChange={handleUrlChange}></Form.Control>
                    <Form.Control id='2' onChange={handleUrlChange}></Form.Control>
                    <Form.Control id='3' onChange={handleUrlChange}></Form.Control> */}
                    {urls.map((url, index) => (
                        index === 0 ?
                        <Form.Control key={index} id={"primary"} style={{lineHeight:"1", height:"35px"}} onChange={handleUrlChange} placeholder={index===0 ? "Primary Image (required)" : `Image ${index + 1}`}></Form.Control>
                        :
                        <div className='removable-form'>
                            <Form.Control key={index} id={index} style={{lineHeight:"1", height:"35px"}} onChange={handleUrlChange} placeholder={`Image ${index + 1}`}></Form.Control>
                            <Button id={`Image ${index + 1}`} onClick={(e) => handleRemoveUrl(e)}>X</Button>
                        </div>
                    ))}
                </div>
                <Button variant='primary' disabled={urls.length !== 8 ? false : true} onClick={(e) => handleAddImgField(e)}>+</Button>
            </Form.Group>

            <Form.Group>
                <Form.Label>Bestseller Product Image</Form.Label>
                <Form.Control style={{lineHeight:"1", height:"35px"}} name="productBestsellerImage" onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Has variants?</Form.Label>
                <Form.Select className='select-text' id="hasVariant" name="hasVariant" type="select" defaultValue={"undefined"} onChange={handleVariantChange}>
                    <option className='select-text' value="no">No</option>
                    <option className='select-text' value="yes">Yes</option>
                </Form.Select>
            </Form.Group>

            { hasVariant ? 
            
                (<Form.Group>
                    {/* <Form.Label>Variants</Form.Label>
                    <Form.Control id='var0' name={0} onChange={(e) => handleVariant(e)}></Form.Control>
                    <Form.Control id='var1' name={1} onChange={(e) => handleVariant(e)}></Form.Control>
                    <Form.Control id='var2' name={3} onChange={(e) => handleVariant(e)}></Form.Control>
                    <Form.Control id='var3' name={4} onChange={(e) => handleVariant(e)}></Form.Control> */}
                    <div id='imageVariants'>
                        {variants.map((variant, index) => (
                            <div className='removable-form'>
                                <Form.Control key={index} id={`${index}`} style={{lineHeight:"1", height:"35px"}} onChange={(e) => handleVariant(e)} placeholder={`Variant ${index +1}`}></Form.Control>
                                {index === 0 ?
                                <></>
                                :
                                <Button id={`${index}`} onClick={(e) => handleRemoveVariant(e)}>X</Button>
                                }
                            </div>
                        ))}
                    </div>
                    <Button variant='primary' disabled={variants.length !== 8 ? false : true} onClick={(e) => handleAddVarField(e)}>+</Button>

                </Form.Group>)

                :

                (<></>)

            } 

            <Form.Group>
                <Form.Label>Product Audio Sample</Form.Label>
                <Form.Control style={{lineHeight:"1", height:"35px"}} name="productAudio" onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Sample Track Title</Form.Label>
                <Form.Control style={{lineHeight:"1", height:"35px"}} name="productSampleName" onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Sample Track Artist</Form.Label>
                <Form.Control style={{lineHeight:"1", height:"35px"}} name="productSampleArtist" onChange={handleChange}></Form.Control>
            </Form.Group>
            
            <br/>
            <Button variant="primary" onClick={(e) => handleSubmit(e)}>Add Product</Button>

            
        </Container>
    </div>
  )
}

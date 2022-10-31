import React, { useState} from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import Axios from 'axios'
import './Product.css'

export default function ProductCreateForm(props) {

    
    const [newProduct, setNewProduct] = useState({})
    
    const [ModalAlert, setModalAlert] = useState(false)

    const [isOriginal, setIsOriginal] = useState(false)

    const [sourceTypeAltered, setSourceTypeAltered] = useState(false)

    const [variantAltered, setVariantAltered] = useState(false)

    const [hasVariant, setHasVariant] = useState(false)

    const [mediaAltered, setMediaAltered] = useState(false)

    const [newImageSet, setNewImageSet] = useState([])

    const defaultSourceType = "Film/TV"

    const defaultVariants = "false"

    const defaultMediaFormat = "Cassette"

    const success = props.success

    const error = props.error

    const handleChange = (e) => {

        const attributeToChange = e.target.name

        const newValue = e.target.value

        const product = {...newProduct}

        product[attributeToChange] = newValue

        setNewProduct(product)
    }

    const handleUrlChange = (e) => {

        let urlToChange = e.target.id

        console.log(urlToChange)

        const newValue = e.target.value

        console.log(newValue)

        const images = [...newImageSet]

        images[urlToChange] = newValue
        
        console.log(images)

        setNewImageSet(images)
        
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
            let variantArr = [document.getElementById("var0").value, document.getElementById("var1").value, document.getElementById("var2").value, document.getElementById("var3").value]
            let filteredVariants = []
            variantArr.forEach(element => {
                if (element !== "") {
                    filteredVariants.push(element)
                }
            });
            product.productVariants = filteredVariants
            console.log(variantArr)
            console.log("Variants added")
        }

        Axios.post("product/add", product, {
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
                <Form.Control name="productName" onChange={handleChange} autoFocus></Form.Control>
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
                <Form.Control name="productSource" type={isOriginal==="--" ? ("hidden") : ("text")} onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Product Price &#40;£&#41;</Form.Label>
                <Form.Control name="productPrice" type="number" onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Product Description</Form.Label>
                <Form.Control className='select-text' name="productDescription" as="textarea" rows={5} onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Stock Count</Form.Label>
                <Form.Control name="productStock" type="number" onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Product Image URLs &#40;up to four&#41;</Form.Label>
                <Form.Control id='0'onChange={handleUrlChange}></Form.Control>
                <Form.Control id='1' onChange={handleUrlChange}></Form.Control>
                <Form.Control id='2' onChange={handleUrlChange}></Form.Control>
                <Form.Control id='3' onChange={handleUrlChange}></Form.Control>
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
                    <Form.Label>Variants</Form.Label>
                    <Form.Control id='var0'></Form.Control>
                    <Form.Control id='var1'></Form.Control>
                    <Form.Control id='var2'></Form.Control>
                    <Form.Control id='var3'></Form.Control>
                </Form.Group>)

                :

                (<></>)

            } 

            <Form.Group>
                <Form.Label>Product Audio</Form.Label>
                <Form.Control name="productAudio" onChange={handleChange} autoFocus></Form.Control>
            </Form.Group>
            <br/>
            <Button variant="primary" onClick={(e) => handleSubmit(e)}>Add Product</Button>

            
        </Container>
    </div>
  )
}

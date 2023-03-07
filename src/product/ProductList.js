import { useState, useEffect } from 'react'
import { Row, Container, Modal } from "react-bootstrap";
import './ProductList.css'
import Axios from "axios"
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { useLocation } from 'react-router-dom';
import Product from './Product';
import ProductDetail from './ProductDetail';

// Props required by this component from App.js: cart, setCart
export default function ProductList(props) {

  // Initialises the useLocation hook for storing the bestseller state
  const location = useLocation()
  // Stores the bestseller state
  const bestseller = location.state
  
  // products state, populated by below useEffect hook on initial load
  const [products, setProducts] = useState([])
  
  // filter handling states
  const [productList, setProductList] = useState(products)
  const [selectedSource, setSelectedSource] = useState("All Sources")
  const [selectedFormat, setSelectedFormat] = useState("All Formats")
  const [selectedSort, setSelectedSort] = useState("Alpha AZ")

    // useEffect hook with API call to retrieve all products from database on page load
    useEffect(() => {
      console.log("Productlist useEffect")
        Axios.get("https://bootlegbackend.herokuapp.com/product/index")
      .then((response) => {
        console.log(response)

          // Setting products state here:
          setProducts(response.data.product)
      })
      .catch((error) => {
        console.log(error.response.data)
      })
    }, [])

    // useEffect hook for setting productList (used to render mapped products) once products state is set above
    useEffect(() => {
      setProductList(sorting(products))
    },[products])

    // useEffect hook for filtering product state when Source filter is changed (after selectedSource is updated)
    useEffect(() => {

      // check to see if format filter is set to "All Formats"; if not, filter all products by the selected format, otherwise set to product state ("all products") 
      let firstByFormat = (selectedFormat !== "All Formats" ? products.filter(products => products.productMediaFormat === selectedFormat) : products)

      // check to see if source filter is set to "All Sources"; if not, filter the above variable by the selected format, otherwise set to above variable without changes
      let thenBySource = (selectedSource !== "All Sources" ? firstByFormat.filter(products => products.productSourceType === selectedSource) : firstByFormat)
      console.log(thenBySource)

      // set productList to fully filtered product list, sorted according to current selectedSort (defined in below sorting() function)
      setProductList(sorting(thenBySource))
    },[selectedSource])


    // useEffect hook for filtering product state when Format filter is changed (after selectedFormat is updated)
    useEffect(() => {
      let firstBySource = (selectedSource !== "All Sources" ? products.filter(products => products.productSourceType === selectedSource) : products)
      let thenByFormat = (selectedFormat !== "All Formats" ? firstBySource.filter(products => products.productMediaFormat === selectedFormat) : firstBySource)
      setProductList(sorting(thenByFormat))
    },[selectedFormat])

    // useEffect hook for sorting the current state of the product list
    useEffect(() => {
      console.log(selectedSort)
      let toSort = Array.from(productList)
      if (selectedSort === "Date Asc"){
        toSort.sort((a,b) => (a.createdAt > b.createdAt) ? 1 : -1)
      }
      else if(selectedSort === "Date Desc")
      {
        toSort.sort((a,b) => (a.createdAt < b.createdAt) ? 1 : -1)
      }else if(selectedSort === "Alpha AZ")
      {
        toSort.sort((a,b) => (a.productName > b.productName) ? 1 : -1)
      }else if(selectedSort === "Alpha ZA")
      {
        toSort.sort((a,b) => (a.productName < b.productName) ? 1 : -1)
      }
      console.log(toSort)
      setProductList(toSort)
    },[selectedSort])

    // function used in selectedSource/selectedFormat-dependent useEffect hooks for performing above sorting on update of those states
    const sorting = (sortThis) => {
      let toSort = Array.from(sortThis)
      if (selectedSort === "Date Asc"){
        return toSort.sort((a,b) => (a.createdAt > b.createdAt) ? 1 : -1)
      }
      else if(selectedSort === "Date Desc")
      {
        return toSort.sort((a,b) => (a.createdAt < b.createdAt) ? 1 : -1)
      }else if(selectedSort === "Alpha AZ")
      {
        return toSort.sort((a,b) => (a.productName > b.productName) ? 1 : -1)
      }else if(selectedSort === "Alpha ZA")
      {
        return toSort.sort((a,b) => (a.productName < b.productName) ? 1 : -1)
      }
    }
    
    const [modalIsOpen, setModalIsOpen] = useState(!!bestseller ? true : false);

    const setModalOpen =()=>{
      !modalIsOpen ? setModalIsOpen(true) : setModalIsOpen(false)
    }

  return (

    <div className="product-body">

        { !!bestseller 
          ? 
            (
              
              <Modal size="xl" centered show={modalIsOpen} onHide={() => setModalOpen()}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{fontWeight: "bolder"}}>
                      More about this product...
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
  
                    <ProductDetail product={bestseller} cart={props.cart} setCart={props.setCart}/>

                  </Modal.Body>
                </Modal>
            )
          : 
            console.log("Neutral entry.")}
        {console.log(bestseller)}

        <div className="filter-flex-container">
          <div className="filter-container">
          
            <h5>Filter by Source</h5>
          
            <ButtonGroup id="sourceFilter" className="filter" >
              <Button variant="primary" id={selectedSource==="All Sources" ? "isSelected" : ""} name="All Sources" onClick={(e) => {setSelectedSource(e.target.name)}}>All</Button>
              <Button variant="primary" id={selectedSource==="Film/TV" ? "isSelected" : ""} name="Film/TV" onClick={(e) => {setSelectedSource(e.target.name)}}>Film/TV</Button>
              <Button variant="primary" id={selectedSource==="Video Game" ? "isSelected" : ""} name="Video Game" onClick={(e) => {setSelectedSource(e.target.name)}}>Video Game</Button>
              <Button variant="primary" id={selectedSource==="Original Release" ? "isSelected" : ""} name="Original Release" onClick={(e) => {setSelectedSource(e.target.name)}}>Original Release</Button>
            </ButtonGroup>
            &nbsp;
          
          </div>
          
          <div className="filter-container">
          
            <h5>Filter by Format</h5>
          
            <ButtonGroup id="formatFilter" className="filter" >
              <Button variant="primary" id={selectedFormat==="All Formats" ? "isSelected" : ""}  name="All Formats" onClick={(e) => {setSelectedFormat(e.target.name)}}>All</Button>
              <Button variant="primary" id={selectedFormat==="Cassette" ? "isSelected" : ""} name="Cassette" onClick={(e) => {setSelectedFormat(e.target.name)}}>Cassette</Button>
              <Button variant="primary" id={selectedFormat==="Vinyl" ? "isSelected" : ""} name="Vinyl" onClick={(e) => {setSelectedFormat(e.target.name)}}>Vinyl</Button>
              <Button variant="primary" id={selectedFormat==="Apparel" ? "isSelected" : ""} name="Apparel" onClick={(e) => {setSelectedFormat(e.target.name)}}>Apparel</Button>
            </ButtonGroup>
            &nbsp;
          
          </div>
          
          <div className="filter-container">
          
            <h5>Sort by:</h5>
          
            <ButtonGroup id="sortBy" className="filter" >
              <Button variant="primary" id={selectedSort==="Alpha AZ" ? "isSelected" : ""} name="Alpha AZ" onClick={(e) => {setSelectedSort(e.target.name)}}>Alphabetical (A-Z)</Button>
              <Button variant="primary" id={selectedSort==="Alpha ZA" ? "isSelected" : ""} name="Alpha ZA" onClick={(e) => {setSelectedSort(e.target.name)}}>Alphabetical (Z-A)</Button>
              <Button variant="primary" id={selectedSort==="Date Asc" ? "isSelected" : ""}  name="Date Asc" onClick={(e) => {setSelectedSort(e.target.name)}}>Date Added (Asc.)</Button>
              <Button variant="primary" id={selectedSort==="Date Desc" ? "isSelected" : ""} name="Date Desc" onClick={(e) => {setSelectedSort(e.target.name)}}>Date Added (Desc.)</Button>
            </ButtonGroup>
            &nbsp;
          
          </div>
        </div>

        <Container className="d-flex"  >

          <Row  className="m-auto align-self-center" xs={1} sm={2} md={3} lg={4} xl={5}>

            { 
              productList.map((products, index) => (
    
              <div className="productCard" key={index}>

              <Product product={products} cart={props.cart} setCart={props.setCart}/>
      
              </div>

              )) 
            }
          
          </Row> 
        </Container>
 
    </div>
  )
}
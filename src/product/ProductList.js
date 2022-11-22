import { useState, useEffect } from 'react'
import { Row, Container, Modal } from "react-bootstrap";
import './ProductList.css'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { useLocation } from 'react-router-dom';
import ProductDetail from './ProductDetail';


export default function ProductList(props) {

    const location = useLocation()
    const bestseller = location.state

    const prods = props.products

    const [filterSource, setFilterSource] = useState("allProducts")
    const [filter, setFilter] = useState(props.allProducts)
    const [categoryFilter, setCategoryFilter] = useState("allProducts")

    let mainFilter = props[filter]

    let addFilter = []

    const [fullFilter, setFullFilter] = useState(mainFilter)

    const [modalIsOpen, setModalIsOpen] = useState(!!bestseller ? true : false);

    const setModalOpen =()=>{
      !modalIsOpen ? setModalIsOpen(true) : setModalIsOpen(false)
    }

    useEffect(() => {
        props.loadProductList()

    }, [])

    
    const handleFilterClick = (e) => {
      console.log(e.target.name)
      setFilterSource(e.target.name)
      setFilter(props[e.target.name])
    }
    
    const handleCategoryClick = (e) => {
      console.log(e.target.name)
      if (e.target.name !== 'allProducts') {
        console.log(filter)
        console.log(prods)
        let resetFilter = props[filterSource]
        addFilter = resetFilter.filter(prod => prod.props.children.props.products.productMediaFormat === e.target.id)
        console.log("HERE", addFilter)
        setFilter(addFilter)       
      } else {
        setFilter(props[filterSource])
      }
    }

    // const test = props.products.filter(post => {
    //   if (query === '') {
    //     return post;
    //   } else if (post.productName.toLowerCase().includes(query.toLowerCase())) {
    //     return post;
    //   }
    // }).map((post) => (
    //   <div key={post._id}>
    //     <p>{post.productName}</p>
    //     <p>{post.productPrice}</p>
    //   </div>
    // ))

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
  
                    <ProductDetail products={bestseller} addToCart={props.addToCart} handleProductQuantity={props.handleProductQuantity} />

                  </Modal.Body>
                </Modal>
            )
          : 
            console.log("Neutral entry.")}
        {console.log(bestseller)}

        <div className="filter-container">

          <ButtonGroup id="shopFilter" className="filter" >
          <Button variant="primary" name="allProducts" onClick={(e) => {handleFilterClick(e)}}>All</Button>
          <Button variant="primary" name="filmProducts" onClick={(e) => {handleFilterClick(e)}}>Film/TV</Button>
          <Button variant="primary" name="videoProducts" onClick={(e) => {handleFilterClick(e)}}>Video Game</Button>
          <Button variant="primary" name="originalProducts" onClick={(e) => {handleFilterClick(e)}}>Original Release</Button>
          </ButtonGroup>
          {/* <ButtonGroup id="shopFilter" className="filter" >
          <Button variant="primary" name="All" onClick={(e) => {handleFilterClick(e)}}>All</Button>
          <Button variant="primary" name="Film/TV" onClick={(e) => {handleFilterClick(e)}}>Film/TV</Button>
          <Button variant="primary" name="Video Game" onClick={(e) => {handleFilterClick(e)}}>Video Game</Button>
          <Button variant="primary" name="Original Release" onClick={(e) => {handleFilterClick(e)}}>Original Release</Button>
          </ButtonGroup> */}
          &nbsp;
        
        </div>

        <div className="filter-container">

          <ButtonGroup id="shopFilter" className="filter" >
          <Button variant="primary" name="allProducts" onClick={(e) => {handleCategoryClick(e)}}>All</Button>
          <Button variant="primary" id='Cassette' name="cassetteProducts" onClick={(e) => {handleCategoryClick(e)}}>Cassettes</Button>
          <Button variant="primary" id='Vinyl' name="vinylProducts" onClick={(e) => {handleCategoryClick(e)}}>Vinyl</Button>
          <Button variant="primary" id='Apparel' name="apparelProducts" onClick={(e) => {handleCategoryClick(e)}}>Apparel</Button>
          </ButtonGroup>
          &nbsp;
     
        </div>
        <Container className="d-flex"  >

          <Row  className="m-auto align-self-center" xs={1} sm={2} md={3} lg={4} xl={5}>

            {/* {(filter === "Original Release" ? props.originalProducts : (filter === "Video Game" ? props.videoProducts : (filter === "Film/TV" ? props.filmProducts : props.allProducts ) ) )} */}

            { filter }
          
          </Row> 
        </Container>
 
    </div>
  )
}

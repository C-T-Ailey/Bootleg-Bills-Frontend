import { useState, useEffect } from 'react'
import { Row, Container } from "react-bootstrap";
import './ProductList.css'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'






export default function ProductList(props) {

    const [filter, setFilter] = useState("all")
    const [categoryFilter, setCategoryFilter] = useState("all")
    // const [query, setQuery] = useState("")
    useEffect(() => {
        loadProductList()
    }, [])


    // const loadProductList = () => {

    //     Axios.get("product/index")
    //     .then((response) => {
    //         console.log(response)
    //         // Setting state here:
    //         props.setProducts(response.data.product)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }

    const loadProductList = () => {

        props.loadProductList()
        
    }


    console.log(props.products, "ProductList Test")

    const handleFilterClick = (e) => {
      console.log(e.target.name)
      setFilter(e.target.name)
    }

    const handleCategoryClick = (e) => {
      console.log(e.target.name)
      setCategoryFilter(e.target.name)
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


        <div className="filter-container">

          <ButtonGroup id="shopFilter" className="filter" >
          <Button variant="primary" name="All" onClick={(e) => {handleFilterClick(e)}}>All</Button>
          <Button variant="primary" name="Film/TV" onClick={(e) => {handleFilterClick(e)}}>Film/TV</Button>
          <Button variant="primary" name="Video Game" onClick={(e) => {handleFilterClick(e)}}>Video Game</Button>
          <Button variant="primary" name="Original Release" onClick={(e) => {handleFilterClick(e)}}>Original Release</Button>
          </ButtonGroup>
          &nbsp;
     
        </div>

        <div className="filter-container">

          <ButtonGroup id="shopFilter" className="filter" >
          <Button variant="primary" name="All" onClick={(e) => {handleCategoryClick(e)}}>All</Button>
          <Button variant="primary" name="Cassette" onClick={(e) => {handleCategoryClick(e)}}>Cassettes</Button>
          <Button variant="primary" name="Vinyl" onClick={(e) => {handleCategoryClick(e)}}>Vinyl</Button>
          <Button variant="primary" name="Apparel" onClick={(e) => {handleCategoryClick(e)}}>Apparel</Button>
          </ButtonGroup>
          &nbsp;
     
        </div>
        <Container className="d-flex"  >

          <Row  className="m-auto align-self-center" xs={1} sm={2} md={3} lg={4} xl={5}>

            {(filter === "Original Release" ? props.originalProducts : (filter === "Video Game" ? props.videoProducts : (filter === "Film/TV" ? props.filmProducts : props.allProducts ) ) )}
            {/* {props.filmProuducts} */}
            {/* {(categoryFilter === "Cassette" ? props.cassetteProducts : (categoryFilter === "Vinyl" ? props.vinylProducts : (categoryFilter === "Apparel" ? props.apparelProducts : props.allProducts ) ) )} */}

            
          </Row> 
        </Container>
 
    </div>
  )
}

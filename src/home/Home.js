import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './home.css'
import AboutBills from './AboutBills'
// import ReactAudioPlayer from 'react-audio-player';

import Axios from 'axios';
import Image from 'react-bootstrap/Image'
// import bigLogo from './assets/big_logo.png'
import bigLogoNew from './assets/big_logo_new.png'
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { Nav } from 'react-bootstrap';


// const options = {
//   showArrows: false,
//   showStatus: false,
//   showIndicators: false,
//   showThumbs: false,
//   autoPlay: true,
//   infiniteLoop: true,
//   stopOnHover: false,
//   swipeable: false,
//   animationHandler: 'fade',
// };

export default function Home(props) {

    const [popular, setPopular] = useState({})

    const [getOrderState, setGetOrderState] = useState([])

    // function to retrieve all orders from db
    const getOrder = async () => {
      const data = await Axios.get('orders/index');
      return data.data
    }
    
    useEffect(()=>{
      // run getOrder, then set getOrderState to the response
      getOrder().then(response => setGetOrderState(response));
      console.log(getOrderState)      
    },[])
    

    useEffect(() => {
      // if the site hosts more than one product,
      if(props.products.length > 0){
        // run above getPopular function
      
          var popularities = {}
    
          // map function for mapping each product in db's ID
          const mapIds = props.products ? props.products.map(product => product._id) : []
      
          console.log(mapIds)
      
      
          // for each product ID in mapIds,
          mapIds.forEach(prodId => {
            let totalOrdered = 0
            const productId = prodId
            
            // function for fetching product by id
            const getProduct = () => {
              return Axios.get(`product/detail?id=${productId}`);
            }
            
            // array each returned ID from getProduct, and execute the following promise on each one:
            Promise.all([getProduct()])
              .then(function (responses) {
    
                // store the product object currently being iterated over
                const popProduct = responses[0].data.product
                console.log("This is popProduct:", popProduct)
    
                // log each order in the DB
                console.log('GET ORDER', getOrderState)
    
                // for each order in getOrderState,
                getOrderState.forEach(order => {
                  // if the order's cart includes the product ID being checked,
                  if(order.cart.includes(productId)){
                    // filter the order's cart to only include copies of that product ID, and add its length value to totalOrdered
                    totalOrdered += order.cart.filter(x => x===productId).length
                  } else {
                    // otherwise state that the order does not include the product. !! Possibly trim this out.
                    console.log("Order does not include product")
                  }
                })
                
                // var popularities is set to include all current values, updated with the product object currently stored in popProduct and their popularity stored as their totalOrdered count.
                popularities = {...popularities, [productId]: {product: popProduct, popularity: totalOrdered}}
                // log how many times popProduct has been ordered, the full contents of popularities, and set the popular state to the updated popularities.
                console.log(`${popProduct.productName} has been ordered ${totalOrdered} times.`)
                console.log(popularities)
                setPopular(popularities) 
                
              });
            }); 
      }
    }, [getOrderState, props.products]) // do this any time props.products updates

    if(!props.products.length){
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    const top3Products = !!Object.keys(popular).length ? Object.keys(popular).map((key) => popular[key]).sort((a,b) => b.popularity - a.popularity).slice(0,3) : [];
    console.log(top3Products, "TOP 3 PRODUCTS")



    
    if(top3Products.length === 3) {
    
    return (
      
        
      <>

        <div className='homepage-welcome'>
          <div className='homepage-logo'> 
          <h3>Welcome to</h3>
          <Image src={bigLogoNew} alt="" height={400} width={400}/>
          </div>
          <div className="homepage-about">
            <p>Bootleg Bill's Unofficial Audio Rarities is your one-stop shop for one-of-a-kind, custom designed, 100% unofficial mix tapes, soundtracks and rare releases.</p> 
            <p>Founded in 2016 as a small word-of-mouth creative project, we finally established an online presence in 2022 thanks to Software Engineers Ailish McLaughlin, Christopher Carey and Chris Ailey. Now you can have a look at what's to plunder from our catalogue of obscure counterfeit treasures, keep up to date on our latest releases, and bag one of your very own unofficial audio rarities!</p>
            <Link to={'/about'}>Want to know more about us?</Link>
          </div>
        </div>
        <div className="best-seller">
          <h2> Our Best Sellers: </h2>
        </div>

      <Carousel className='main-slide'>
        {top3Products.map(popProduct => (
            <div key={popProduct.product._id}>
              <div className="type">
                <a></a>{popProduct.product.productName}
                </div>
              <div className='carousel-source'>From {popProduct.product.productSource}</div>
              <img alt="" src={popProduct.product.productImageUrls[popProduct.product.productImageUrls.length -1]}/>
            </div>
        ))}
      </Carousel>

        {/* <div className="test">
  
        <input className="search" id="search" placeholder="Enter Post Title" onChange={event => setQuery(event.target.value)} />
          <div className="results">
            {test}
          </div>
        </div> */}


     </>
    )
  } 
    
      // return (
      //   <Carousel className='main-slide'>
      //   {top3Products.map(popProduct => (
      //       <div key={popProduct.product._id}>
      //         <div className="type">{popProduct.product.productName}</div>
      //         <img alt="" src={popProduct.product.productImageUrls[popProduct.product.productImageUrls.length -1]}/>
      //       </div>
      //   ))}
      // </Carousel>
      // )
  }


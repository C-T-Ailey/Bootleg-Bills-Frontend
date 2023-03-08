import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './home.css'
// import ReactAudioPlayer from 'react-audio-player';

import Axios from 'axios';
import Image from 'react-bootstrap/Image'
import bigLogoNew from './assets/big_logo_new.png'
import { Link } from 'react-router-dom';

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
      const data = await Axios.get('http://localhost:4000/orders/index');
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
              return Axios.get(`http://localhost:4000/product/detail?id=${productId}`);
            }
            
            // array each returned ID from getProduct, and execute the following promise on each one:
            Promise.all([getProduct()])
              .then(function (responses) {
    
                // store the product object currently being iterated over
                const popProduct = responses[0].data.product
                // console.log("This is popProduct:", popProduct)
    
                // log each order in the DB
                // console.log('GET ORDER', getOrderState)
    
                // for each order in getOrderState,
                getOrderState.forEach(order => {
                  // if the order's cart includes the product ID being checked,
                  if(order.cart.includes(productId)){
                    // filter the order's cart to only include copies of that product ID, and add its length value to totalOrdered
                    totalOrdered += order.cart.filter(x => x===productId).length
                  } else {
                    // otherwise state that the order does not include the product. !! Possibly trim this out.
                    // console.log("Order does not include product")
                  }
                })
                
                // var popularities is set to include all current values, updated with the product object currently stored in popProduct and their popularity stored as their totalOrdered count.
                popularities = {...popularities, [productId]: {product: popProduct, popularity: totalOrdered}}
                // log how many times popProduct has been ordered, the full contents of popularities, and set the popular state to the updated popularities.
                // console.log(`${popProduct.productName} has been ordered ${totalOrdered} times.`)
                setPopular(popularities) 
                
              });
            }); 
      }
    }, [getOrderState, props.products])

    
    // top3Products is... Hoo boy
    // top3Products checks to see if the popular state is populated. If so, the keys of popular are mapped and sorted from most to least popular, then returned as a slice of the first three indices to obtain the three best sellers : else, return an empty array
    
    
    const top3Products = !!Object.keys(popular).length ? Object.keys(popular).map((key) => popular[key]).sort((a,b) => b.popularity - a.popularity).slice(0,3) : [];
    // console.log(top3Products, "TOP 3 PRODUCTS")
    
    // useEffect(() => {
    //   console.log(Object.keys(popular).length === Object.keys(props.products).length)
    //   console.log("popular length, products length:", Object.keys(popular).length, Object.keys(props.products).length)
    // },[popular])

    // if there are no products currently accessible or top3Products isn't fully populated, (OUTDATED, RESERVED FOR BACKUP)
    // if(!props.products.length || top3Products.length !== 3){

    // if the "popular" state isn't populated with the full product list sorted by times ordered,
    if(Object.keys(popular).length !== Object.keys(props.products).length){
      // return a plain screen stating "Loading..."
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    // when top3Products is fully populated and the "popular" state's length matches that of props.products, let 'er rip.
    else {
 
    return (
      
        
      <>
      
        <div className='bestsellerCarousel'>
          <div className='bestseller-head'>
            <h2>Bill's Best Sellers</h2>
          </div>
          <Carousel className='main-slide' swipeable={true} emulateTouch={true} infiniteLoop={true} autoPlay={true} interval={5000} width={"80rem"}>
            {/* Map each of the top3Products to a div with a key corresponding to its product id */}
            {top3Products.map(popProduct => (
                <div key={popProduct.product._id}>
                  <div className="type">
                    {/* Name of the product as a link to its store page - state prop passes the specified bestseller to the product index and stores it with location.state */}
                    <Link className='bestLink' to={'/index'} state={popProduct.product}>
                      {popProduct.product.productName}
                    </Link>
                    </div>
                  {/* Display the product's source material or original artist, prefixed with "from" or "by" depending on which */}
                  <div className='carousel-source'> {popProduct.product.productSourceType!== "Original Release" ? `From "${popProduct.product.productSource}"` : `By ${popProduct.product.productSource}`}</div>
                  {/* background image taken from the last index of popProduct's productImageUrls property array */}
                  <img alt="" src={popProduct.product.productImageUrls[popProduct.product.productImageUrls.length -1]}/>
                </div>
            ))}
          </Carousel>
        </div>
      

        <div className='homepage-welcome'>
          <div className='homepage-logo'> 
          <h3>Welcome to</h3>
          <Image src={bigLogoNew} alt="" height={300} width={300}/>
          </div>
          <div className="homepage-about">
            <p>Bootleg Bill's Unofficial Audio Rarities is your one-stop shop for one-of-a-kind, custom designed, 100% unofficial mix tapes, soundtracks and rare releases.</p> 
            <p>Founded in 2016 as a small word-of-mouth creative project, we finally established an online presence in 2022 thanks to Software Engineers Ailish McLaughlin, Christopher Carey and Chris Ailey. Now you can have a look at what's to plunder from our catalogue of obscure counterfeit treasures, keep up to date on our latest releases, and bag one of your very own unofficial audio rarities!</p>
            <Link to={'/about'}>Want to know more about us?</Link>
          </div>
        </div>

        <div className="upcoming">
          <h2>{"Coming Soon!"}</h2>
          <ul>
            <li>Film/TV: Hackers (1995), Cassette + Vinyl</li>
            <li>Film/TV: The Crow (1994), Vinyl</li>
            <li>Video Game: DOOM (1993), Cassette</li>
            <li>Film/TV: Blade (1998), Cassette + Vinyl</li>
          </ul>
          <p></p>
        </div>


      {/* <div className='featured'>
        <h3>This Month's Featured Release</h3>
      </div> */}


     </>
    )
  }
}


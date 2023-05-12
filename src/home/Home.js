import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {Nav} from 'react-bootstrap';
import './home.css'
// import ReactAudioPlayer from 'react-audio-player';

import Axios from 'axios';
import Image from 'react-bootstrap/Image'
import bigLogoNew from './assets/big_logo_new.png'
import storeThumb from './assets/products-tape.png'
import signupThumb from './assets/signup-tape.png'
import loginThumb from './assets/login-tape.png'
import dashThumb from './assets/dash-tape.png'
import dashSellerThumb from './assets/dash-seller-tape.png'
import aboutThumb from './assets/about-tape.png'
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

    const [lock, setLock] = useState(true)

    // function to retrieve all orders from db
    const getOrder = async () => {
      const data = await Axios.get('https://bootlegbackend.herokuapp.com/orders/index');
      return data.data
    }
    
    useEffect(()=>{
      // run getOrder, then set getOrderState to the response
      getOrder().then(response => setGetOrderState(response));

      window.scrollTo(0, 0);
    },[])
    

    useEffect(() => {
      // if the site hosts more than one product,
      if(!!props.products.length){
        // run above getPopular function
      
          var popularities = {}
    
          // map function for mapping each product in db's ID
          const mapIds = props.products ? props.products.map(product => product._id) : []
      
      
          // for each product ID in mapIds,
          mapIds.forEach(prodId => {
            let totalOrdered = 0
            const productId = prodId
            
            // function for fetching product by id
            const getProduct = () => {
              return Axios.get(`https://bootlegbackend.herokuapp.com/product/detail?id=${productId}`);
            }
            
            // array each returned ID from getProduct, and execute the following promise on each one:
            getProduct().then(response => {
                // store the product object currently being iterated over
                const popProduct = response.data.product
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

    
    // top3Products checks to see if the popular state is populated. 
    // If so, the keys of popular are mapped and sorted from most to least popular, then returned as a slice of the first three indices to obtain the three best sellers 
    // : else, return an empty array
    
    
    const top3Products = !!Object.keys(popular).length ? Object.keys(popular).map((key) => popular[key]).sort((a,b) => b.popularity - a.popularity).slice(0,3) : [];
 
    return (
      
        
      <>
      
        { Object.keys(popular).length !== Object.keys(props.products).length || !Object.keys(props.products).length ?

          <div className='loading'>
            <p>Loading bestsellers...</p>
          </div>

          :
          
          <>
          {console.log(top3Products)}
          <div className='bestsellerCarousel'>

            <div className='bestseller-head'>
              <h2>Bill's Best Sellers</h2>
            </div>
            
            <Carousel className='main-slide' showThumbs={false} swipeable={true} emulateTouch={true} infiniteLoop={true} autoPlay={true} interval={5000} width={"80rem"}>
              {/* Map each of the top3Products to a div with a key corresponding to its product id */}
              {top3Products.map(popProduct => (
                  <div key={popProduct.product._id}>
                    <div className="type">
                      {/* Name of the product as a link to its store page - state prop passes the specified bestseller to the product index and stores it with location.state */}
                      <Link className='bestLink' to={'/products'} state={popProduct.product}>
                        {popProduct.product.productName}
                      </Link>
                      </div>
                    {/* Display the product's source material or original artist, prefixed with "from" or "by" depending on which */}
                    <div className='carousel-source'> {popProduct.product.productSourceType!== "Original Release" ? `From "${popProduct.product.productSource}"` : `By ${popProduct.product.productSource}`}</div>
                    {/* background image taken from the last index of popProduct's productImageUrls property array */}
                    <div id="imageBg" className='imageBg'>
                      {/* <img src={popProduct.product.productImageUrls[popProduct.product.productImageUrls.length -1]}/> */}
                      <img src={popProduct.product.productBestsellerImage}/>
                    </div>
                  </div>
              ))}
            </Carousel>
          </div>
        </>
        }
      

        <div className='homepage-welcome'>
          <div className='homepage-logo'>
            <h3>Welcome to</h3>
            <img className="billsLogo" src={bigLogoNew} alt=""/>
          </div>
          <div className="homepage-about">
            <p>Bootleg Bill's Unofficial Audio Rarities is your one-stop shop for one-of-a-kind, custom designed, 100% unofficial mix tapes, soundtracks and rare releases.</p> 
            <p>Founded in 2016 as a small word-of-mouth creative project, we finally established an online presence in 2022 thanks to Software Engineers Ailish McLaughlin, Christopher Carey and Chris Ailey. Now you can have a look at what's to plunder from our catalogue of obscure counterfeit treasures, keep up to date on our latest releases, and bag one of your very own unofficial audio rarities!</p>
            {/* <Link to={'/about'} className={'about-link'}>Want to know more about us?</Link> */}
          </div>
        </div>

        <div className='homepage-nav-thumbs'>
          <div className='thumbs-flex' id="bootstrap-overrides">
            <Nav.Link as={Link} to="/products">
            <div>
              <img alt='View Products' className='nav-thumb' src={storeThumb}/>
            </div>
            </Nav.Link>
              
            { !props.isAuth ? 
            <>
              <Nav.Link as={Link} to="/login">
                <div>
                  <img alt='Log In' className='nav-thumb' src={loginThumb}/>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                <div>
                  <img alt='Sign Up' className='nav-thumb' src={signupThumb}/>
                </div>
              </Nav.Link>
            </>
            :
            <>
            <Nav.Link as={Link} to="/manage">
              <div>
                {props.user.user.role === "seller" ? <img alt="Seller Dash" className='nav-thumb' src={dashSellerThumb}/> : <img alt='View Orders' className='nav-thumb' src={dashThumb}/>}
              </div>
            </Nav.Link>
            </>
            }
            <Nav.Link as={Link} to="/about">
              <div>
                <img alt='About Us' className='nav-thumb' src={aboutThumb}/>
              </div>
            </Nav.Link>
          </div>
        </div>

        <div className="upcoming">
          <h2>{"Coming Soon!"}</h2>
          <h4>{"Products"}</h4>
          <ul className='comingList'>
            <li>Film/TV: Hackers (1995), Cassette + Vinyl</li>
            <li>Video Game: DOOM (1993), Cassette</li>
            <li>Film/TV: Blade (1998), Cassette + Vinyl</li>
            <li>Limited Release: Double Bill (New!), Cassette</li>
          </ul>
          <p></p>
          <h4>{"Site Features"}</h4>
          <ul className='comingList'>
            <li>News</li>
            <li>Articles & Archives</li>
            <li>FAQs</li>
          </ul>
          <p></p>
        </div>


      {/* <div className='featured'>
        <h3>This Month's Featured Release</h3>
      </div> */}


     </>
    )
  }
// }


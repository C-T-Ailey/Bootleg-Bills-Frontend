import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './home.css'
// import ReactAudioPlayer from 'react-audio-player';

import Axios from 'axios';
import Image from 'react-bootstrap/Image'
// import bigLogo from './assets/big_logo.png'
import bigLogoNew from './assets/big_logo_new.png'


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

    const getOrder = async () => {
      const data = await Axios.get('orders/index');
      return data.data
    }
    
    useEffect(()=>{
      getOrder().then(response => setGetOrderState(response));
      console.log(getOrderState)      
    },[])
    

    const getPopular = () => {
      
      var popularities = {}

      const mapIds = props.products ? props.products.map(product => product._id) : []
  
      console.log(mapIds)
  
  
      mapIds.forEach(prodId => {
        let totalOrdered = 0
        const productId = prodId
        
        const getProduct = () => {
          return Axios.get(`product/detail?id=${productId}`);
        }
        
        
        Promise.all([getProduct()])
          .then(function (responses) {
            const popProduct = responses[0].data.product

            console.log('GET ORDER', getOrderState)

            getOrderState.forEach(order => {
              if(order.cart.includes(productId)){
                totalOrdered += order.cart.filter(x => x===productId).length
              } else {
                console.log("Order does not include product")
              }
            })
            
            popularities = {...popularities, [productId]: {product: popProduct, popularity: totalOrdered}}
            console.log(`This product has been ordered ${totalOrdered} times.`)
            console.log(popularities)
            setPopular(popularities) 
            
          });
        }); 
    }

    useEffect(() => {
      if(props.products.length > 0){
      getPopular()
      }
    }, [props.products])

    if(!props.products.length){
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    const top3Products = !!Object.keys(popular).length ? Object.keys(popular).map((key) => popular[key]).sort((a,b) => b.popularity - a.popularity).slice(0,3) : [];
    console.log(top3Products, "PRODUCTS")



    
    if(top3Products.length === 3) {
    
    return (
      
        
      <>

        <div className='homepage-welcome'>
          <div className='homepage-logo'> 
          <h3>Welcome to</h3>
          <Image src={bigLogoNew} alt="" height={400} width={400}/>
          </div>
          <div className="homepage-about">
            <p>Founded in 2016, Bootleg Bill's Unofficial Audio Rarities is your one-stop shop for custom designed, one-of-a-kind, 100% unofficial mix tapes, soundtracks and rare releases.</p> 
            <p>Originally just a small creative project driven by word-of-mouth, we finally established an online presence in 2022 thanks to Chris Ailey, Chris Carey and Dr. Ailish McLaughlin. Now you can browse what's left to plunder from our catalogue of obscure counterfeit treasures, stay updated on latest releases, and keep track of returning favourites!</p>
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


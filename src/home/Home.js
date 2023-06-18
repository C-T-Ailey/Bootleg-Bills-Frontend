import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
// import {Nav} from 'react-bootstrap';
import './home.css'
// import ReactAudioPlayer from 'react-audio-player';
// import Image from 'react-bootstrap/Image'
import bigLogoNew from './assets/big_logo_new.png'
import bigLogoV2 from './assets/big_logo_v2.png'
import bigLogoV2Text from './assets/big_logo_v4.png'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Product from '../product/Product';


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

    const [featured, setFeatured] = useState([])

    const [test, setTest] = useState()
    
    const featuredProducts = ["645040d6f21d0a8076260d83","637d1d226f5d7ad3b9ae4d23","640fcd206a370ac37cacf1e4"]

    useEffect(()=>{
      window.scrollTo(0, 0);
    },[])
    
    
    useEffect(() => {
      // if the site hosts more than one product,
      if(!!props.products.length){
        let popularProducts = Array.from(props.products).sort((a, b) => b.unitsSold - a.unitsSold).slice(0,5)
        console.log(popularProducts)
        setPopular(popularProducts)
        
        let features = []

        features.push(props.products.find(element => element._id === "645040d6f21d0a8076260d83"),props.products.find(element => element._id === "637d1d226f5d7ad3b9ae4d23"),props.products.find(element => element._id === "640fcd206a370ac37cacf1e4"))

        console.log(features)

        setFeatured(features)
        
      }
    }, [props.products])

    const product1Description = "The debut entry in our new series of limited, cassette-only releases has arrived! Celebrate two of our favourite synthpop stars with the Synthpop Edition of the Double Bill, featuring indie artpop icon Grimes and underground vocaloid powerhouse Astrophysics."

    const product2Description = "Help spread the word! Bootleg Bill's only official merchandise is hot off the press and ready to take home today!"
 
    return (
             
      <>

          
        <section className='upcoming'>
          <div className='homepage-welcome'>
            <div className='homepage-logo'>
              {/* <h3>Welcome to</h3> */}
              <img className="billsLogo" src={bigLogoV2Text} alt=""/>
            </div>
            <div className="homepage-about">
              {/* <p id="super">Your one-stop shop<br/>for one-of-a-kind,<br/>custom designed,<br/>100% unofficial<br/>tapes, records and apparel.</p> */}
              <p id='text'>Founded in 2016 as a small word-of-mouth creative project, "Bootleg Bill's Unofficial Audio Rarities" finally established an online presence in 2022. Now you can see for yourself what's to plunder from our catalogue of obscure counterfeit treasures, keep up to date on our latest and upcoming releases, and bag one of your very own unofficial audio rarities!</p>
              {/* <Link to={'/about'} className={'about-link'}>Want to know more about us?</Link> */}
            </div>
          </div>
        </section>
      
        { Object.keys(popular).length < 1 || !Object.keys(props.products).length ?

          <div className='loading'>
            <p>Loading bestsellers...</p>
          </div>

          :
          
          <>
          <div className='bestsellerCarousel'>

            <div className='bestseller-head'>
              <h2>Bill's Best Sellers</h2>
            </div>
            
            <Carousel className='main-slide' showThumbs={false} swipeable={true} emulateTouch={true} infiniteLoop={true} autoPlay={true} interval={5000} width={"80rem"}>
              {/* Map each of the "popular" state's objects to a div with a key corresponding to its product id */}
              {popular.map(product => (
                  <div key={product._id}>
                    <div className="type">
                      {/* Name of the product as a link to its store page - state prop passes the specified bestseller to the product index and stores it with location.state */}
                      <Link className='bestLink' to={'/products'} state={product}>
                        {product.productName}
                      </Link>
                      </div>
                    {/* Display the product's source material or original artist, prefixed with "from" or "by" depending on which */}
                    <div className='carousel-source'> {product.productSourceType!== "Original Release" ? `From "${product.productSource}"` : `By ${product.productSource}`}</div>
                    {/* background image taken from the last index of product's productImageUrls property array */}
                    <div id="imageBg" className='imageBg'>
                      <img alt={`${product.productName}`} src={product.productBestsellerImage}/>
                    </div>
                  </div>
              ))}
            </Carousel>
          </div>
        </>
        }
      


        <section className='upcoming'>
          <h2>{"Featured Products"}</h2>
          <p>Under Construction</p>
          <div className='featureFlex'>
            {
              featured.map(product => (
                <div className='featuredProduct'>
                  <div className='featureDisplay'>
                    <h5 className='featureName'>{product.productName.slice(0,11) === "! LIMITED !" ? product.productName.slice(11,product.productName.length) : product.productName}</h5>
                    <img className='featureThumb' src={product.productImageUrls[0]}/>
                  </div>
                  {console.log(product.productName.slice(0,12))}
                  <div className='featureDscrpt'>
                  {
                    product._id === featuredProducts[0] ? product1Description 
                    : 
                    (product._id === featuredProducts[1] ? product2Description
                    : 
                    "product 3")
                  }
                  </div>
                </div>
              ))
            }
          </div>

          
        </section>

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


import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
// import {Nav} from 'react-bootstrap';
import './home.css'
import bigLogoV2Text from './assets/big_logo_v4.png'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Product from '../product/Product';
import { BsChevronCompactDown } from 'react-icons/bs';
import underConstruction from './assets/construction_bg_2.png'
import cautionBg from './assets/caution-bg.jpg'


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

    const [test, setTest] = useState(false)
    
    const featuredProducts = ["645040d6f21d0a8076260d83","637d1d226f5d7ad3b9ae4d23","640fcd206a370ac37cacf1e4"]

    useEffect(()=>{
      window.scrollTo(0, 0);
    },[])
    
    
    useEffect(() => {
      // if the site hosts more than one product,
      if(!!props.products.length){
        let popularProducts = Array.from(props.products).sort((a, b) => b.unitsSold - a.unitsSold).slice(0,5)

        setPopular(popularProducts)
        
        let features = []

        features.push(props.products.find(element => element._id === "645040d6f21d0a8076260d83"),props.products.find(element => element._id === "637d1d226f5d7ad3b9ae4d23"),props.products.find(element => element._id === "640fcd206a370ac37cacf1e4"))

        setFeatured(features)
        
      }
    }, [props.products])

    const product1Description = "The debut entry in our new series of limited, cassette-only releases has arrived! Celebrate two of our favourite synthpop stars with the Synthpop Edition of the Double Bill, featuring indie artpop icon Grimes and underground vocaloid powerhouse Astrophysics."

    const product2Description = "Help spread the word! Bootleg Bill's only official merchandise is hot off the press and ready to take home today!"

    const product3Description = ""

    const scrollToFeatures = (e) => {
      if (e.deltaY > 0) {
        const featuredYPos = document.getElementById("featured").getBoundingClientRect().top
        window.scroll(0,featuredYPos)
      }
      // document.getElementById("featured").scrollIntoView();
    }

    const scrollFromFeatures = (e) => {
      if (e.deltaY > 0) {
        const comingSoonYPos = document.getElementById("comingSoon").getBoundingClientRect().bottom
        window.scroll(0,comingSoonYPos)
      } 
      else if (e.deltaY < 0) {
        const homeYPos = document.getElementById("top").getBoundingClientRect().top
        window.scroll(0,homeYPos)
      }
    }

    const goToFeatures = (e) => {

      const navBar = document.getElementById('navId')
      const navHeight = parseInt(navBar.offsetHeight)
      let features = document.getElementById("featured")
      const featureTop = features.getBoundingClientRect().top

      let viewPortOffset = document.body.getBoundingClientRect();
      let viewTop = viewPortOffset.top;


      window.scroll(0,(featureTop - navHeight)-viewTop)

    }

    const toggleVariants = (e) => {
        // e.preventDefault();
        setTest(!test)
    }


 
    return (

        <div className='sectionWrapper' id="top">

          <section className='homeSection' id="home">

            <div id='homeCarousel'>

              { !Object.keys(props.products).length ?
              
                <div className='loading'>
                  <p>Loading products...</p>
                </div>
              
                :
                
                <div className='productsCarousel'>
                  
              
                  <Carousel showThumbs={false} showIndicators={false} showArrows={false} swipeable={false} infiniteLoop={true} autoPlay={true} useKeyboardArrows interval={3000} width={matchMedia("max-width: 790px") ?"55vw":""}>
                    {props.products.map(product => (

                        <div key={product._id}>

                          <div id="imageBg" className='imageBg'>
                            {/* <img alt={`${product.productName}`} src={product.productImageUrls[!!product.hasVariant ?((Math.random() < 0.5) ? 1 : 0 ): 0]}/> */}
                            <img alt={`${product.productName}`} src={product.productImageUrls[!!test ? 1 : 0]}/>
                          </div>

                        </div>

                    ))}
                  </Carousel>


                </div>
                
              }

              <div className='homepage-logo'>
                <img className="billsLogo" src={bigLogoV2Text} alt=""/>
              </div>
              
              <div className='toggleDiv'>
                <button className='variantToggle' onClick={(e)=>toggleVariants(e)}>{!!test ? "X" : ""}</button>
                <div className='variantText'>show variants?</div>
              </div>
              
            </div>
            

            <div className='homepage-welcome'>

              <div className="homepage-about">
                <p className='about-text'>Founded in 2016 as a small word-of-mouth creative project, "Bootleg Bill's Unofficial Audio Rarities" finally established an online presence in 2022. Now you can see for yourself what's to plunder from our catalogue of obscure counterfeit treasures, keep up to date on our latest and upcoming releases, and bag one of your very own unofficial audio rarities!</p>
              </div>

              <div className='nextSection' onClick={(e) => {goToFeatures(e)}}>
                
                  <p>Take a look at<br/>our featured works!</p>

                  {/* <BsChevronCompactDown size={48} id="nextSectionButton" onClick={(e) => {goToFeatures(e)}}/> */}
                  <div id="buttonWrap" >
                    <div id="nextSectionButton">
                      <span id="downButton">V</span>
                    </div>
                  </div>
                
              </div>

            </div>


          </section>
          
          <section className="featuresSection" >
            
            <div className='bestseller-head' id="featured">
              <h2>Bill's Best Sellers</h2>
            </div>
          
            <div className='carouselContainer'>
              { Object.keys(popular).length < 1 || !Object.keys(props.products).length ?
              
                <div className='loading'>
                  <p>Loading bestsellers...</p>
                </div>
              
                :
                
              
                <div className='bestsellerCarousel'>
              
                  <Carousel className='main-slide' showThumbs={false} swipeable={true} emulateTouch={true} infiniteLoop={true} autoPlay={true} interval={5000} width={"70vw"}>
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
                
              }
            </div>
            
            <div className='featured indev'>
              <div id="undercon">
                <img alt="under construction" src={underConstruction}/>
              </div>
              <h2 id='featureHeader'>Featured Products</h2>
              <div className='featureFlex'>
                {
                  featured.map(product => (
                    <div className='featuredProduct'>
                      <div className='featureDisplay'>
                        <h5 className='featureName mobileHidden'>{product.productName.slice(0,11) === "! LIMITED !" ? product.productName.slice(11,product.productName.length) : product.productName}</h5>
                        <img className='featureThumb' src={product.productImageUrls[0]}/>
                      </div>

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
              
              <div id="dev-bg">
                <img alt="This section is under construction!" src={cautionBg}/>
              </div>
                            
            </div>
          
          </section>
          
          
          
          
            
          
          
          <section className='comingSoonSection indev' id="comingSoon">
            <div className="upcoming">
              <h2>{"Coming Soon!"}</h2>
              <h4>{"Products"}</h4>
              <ul className='comingList'>
                <li>Film/TV: Hackers (1995), Cassette + Vinyl</li>
                <li>Video Game: DOOM (1993), Cassette</li>
                <li>Film/TV: Blade (1998), Cassette + Vinyl</li>
              </ul>
              <p></p>
              <h4>{"Site Features"}</h4>
              <ul className='comingList'>
                <li>News</li>
                <li>Articles & Archives</li>
              </ul>
              <p></p>
            </div>
          </section>

        </div>

    )
  }
// }


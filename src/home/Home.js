import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
// import {Nav} from 'react-bootstrap';
import './home.css'
// import ReactAudioPlayer from 'react-audio-player';
// import Image from 'react-bootstrap/Image'
import bigLogoNew from './assets/big_logo_new.png'
// import storeThumb from './assets/products-tape.png'
// import signupThumb from './assets/signup-tape.png'
// import loginThumb from './assets/login-tape.png'
// import dashThumb from './assets/dash-tape.png'
// import dashSellerThumb from './assets/dash-seller-tape.png'
// import aboutThumb from './assets/about-tape.png'
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
    
    useEffect(()=>{
      window.scrollTo(0, 0);
    },[])
    

    useEffect(() => {
      // if the site hosts more than one product,
      if(!!props.products.length){
        let popularProducts = Array.from(props.products).sort((a, b) => b.unitsSold - a.unitsSold).slice(0,3)
        console.log(popularProducts)
        setPopular(popularProducts)
      }
    }, [props.products])
 
    return (
             
      <>
      
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
      

        <div className='homepage-welcome'>
          <div className='homepage-logo'>
            <h3>Welcome to</h3>
            <img className="billsLogo" src={bigLogoNew} alt=""/>
          </div>
          <div className="homepage-about">
            <p>Bootleg Bill's Unofficial Audio Rarities is your one-stop shop for one-of-a-kind, custom designed, 100% unofficial mix tapes, soundtracks and rare releases.</p> 
            <p>Founded in 2016 as a small word-of-mouth creative project, we finally established an online presence in 2022. Now you can see for yourself what's to plunder from our catalogue of obscure counterfeit treasures, keep up to date on our latest and upcoming releases, and bag one of your very own unofficial audio rarities!</p>
            {/* <Link to={'/about'} className={'about-link'}>Want to know more about us?</Link> */}
          </div>
        </div>

        {/* <div className='homepage-nav-thumbs'>
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
        </div> */}

        <div className='upcoming'>
          <h2>{"Featured Products"}</h2>
          <p>Under Construction</p>
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


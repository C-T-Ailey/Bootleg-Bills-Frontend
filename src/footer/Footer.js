import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom';

import NewsLetter from './NewsLetter';

export default function Footer(props) {
  return (

    <div className='footer-bg'>
      <div className='footer-cols'>
        <div className='footer-links' id='about'>
          <h2>About Us</h2>
          <hr className='mobileHide'></hr>
          <Link to={'/about'}>About us</Link>
          <a className='nope' href="">Careers</a>
          <a className='nope' href="">Terms of Service</a>
          <Link to={'/faq'}>FAQs</Link>
        </div>

        <div className='footer-links' id='products'>
          <h2>Products</h2>
          <hr className='mobileHide'></hr>
          <Link to={'/products'}>All</Link>
          <Link to={'/products'} state={"Cassette"}>Cassettes</Link>
          <Link to={'/products'} state={"Vinyl"}>Vinyl</Link>
          <Link to={'/products'} state={"Apparel"}>Apparel</Link>
        </div>

        <div className='footer-links' id='socials'>
          <h2>Social Media</h2>
          <hr className='mobileHide'></hr>
          <a className='nope' href="">Instagram</a>
          <a className='nope' href="">Facebook</a>
          <a className='nope' href="">Twitter</a>
        </div>

        <div id="emailContainer">
          <NewsLetter addNewsletterEmail={props.addNewsletterEmail}/>
        </div>
      
      </div>

      <div className='copyright'>
        <p>&copy; 2022 Chris Ailey, Chris Carey & Ailish McLaughlin</p>
      </div>

    </div>

  )
}


{/* <div className="fixed-bottom d-flex justify-content-center footer-container" >


<NewsLetter addNewsletterEmail={props.addNewsletterEmail}/>


</div> */}
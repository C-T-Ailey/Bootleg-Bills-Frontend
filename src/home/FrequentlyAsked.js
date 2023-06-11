import React, { useLayoutEffect } from 'react'
import './about.css'
import {Link} from 'react-router-dom'

export default function AboutBills(props) {

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  return (
    <div>
      <h1>Frequently Asked Questions</h1>
      <div className='billsStory'>
            <div className='question'>
              <h5>Q: I've got questions/feedback/suggestions. How can I get in touch?</h5>
              <p><span>A:</span> We'd love to hear from you, whatever you have to say. Just fire off an email to bootlegbills@proton.me and we'll address any concerns as soon as possible.</p>
            </div>

            <div className='question'>
              <h5>Q: When will my order be shipped/delivered?</h5>
              <p><span>A:</span> Though it pains us to say it; never. Bootleg Bill's is not a genuine storefront, and as such none of our "products" are for sale - Only a select few even exist physically, and then only as one-of-a-kind art pieces. If, through some misunderstanding, you have provided genuine payment details or other personal information, please contact us immediately. We offer you every assurance that no such information will be used by us for any purpose, and will be removed from our systems without question upon request.</p>
            </div>

            <div className='question'>
              <h5>Q: So what's this site about if it's not a real store?</h5>
              <p><span>A:</span> We're glad you asked! Functionally, Bootleg Bill's Unofficial Audio Rarities is a graphic design portfolio and web development playground for Chris, our lead developer. <br/> We'd love to go legit one day, but with the minefield of licensing and copyright considerations we'd be required to navigate, it's not likely any time soon. If you'd like to know more about exactly who and what Bootleg Bill's is, check out our <Link to={"/about"}>About Us</Link> page.</p>
            </div>

            <div className='question'>
              <h5>Q: You've used my work in some of your "products" without permission. Why?</h5>
              <p><span>A:</span> Truthfully - because our graphic/audio designer has felt that your work exemplifies his vision for the product, and believes he couldn't do better himself. It is our intention for any use of third-party creations to be entirely complimentary towards the original creator, and have done our very best to credit any such creator and their works on the above-linked "About Us" page. To our knowledge, all of our usage is permitted under UK law by the Fair Dealing provisions of the Copyright, Designs and Patents Act 1988 -- but if you feel otherwise, please don't hesitate to contact us and we'll do our best to remedy the situation.</p>
            </div>

      </div>
 
      
    </div>
  )
}
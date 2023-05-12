import React, { useLayoutEffect } from 'react'
import './about.css'

export default function AboutBills(props) {

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  return (
    <div>
      <div className='billsStory'>
          <h2>The Legend of Bootleg Bill</h2>
          <div className='billsP'>
            <p>Hi! I'm Chris Ailey - Founder, Product Graphics Designer and co-developer for <span className='bigBill'>Bootleg Bill's Unofficial Audio Rarities.</span> Disregard the spiel on the homepage -- that's mostly just fluff to make us sound like a genuine commercial endeavour. The true story is this: 
            <br/><br/>
            In June of 2016, a fresh replay of the game 'Metal Gear Solid: Peace Walker' inspired me to start what I had intended to be a small, one-off art piece. The goal was to design and record a copy of one of the game's world-building supplements, presented as cassette recordings of characters as they discuss contemporary events and personal histories. After replicating the tape from in-game materials and recording the audio tracks, I posted images of my prototype on a music forum and caught the attention of a 'Metal Gear' super-fan. He mentioned that he enthusiastically collected merchandise relating to it, regardless of legitimacy, and after no small amount of discussion I had been commissioned for a full set: six tapes, covering seven characters' worth of audio. The order was completed in good time and promptly changed hands, but not without leaving a taste for the craft that would drive the creation of many more pieces.
            <br/><br/>
            In 2022, Bootleg Bill's came to life as a final project submission for General Assembly's immersive software engineering bootcamp. Coordinated by the indomitable Dr. <a href='https://www.linkedin.com/in/ailish-mclaughlin/'>Ailish McLaughlin</a> and collaborating with the brilliantly skilled Mr. <a href='https://www.linkedin.com/in/chriskcarey/'>Christopher Carey</a>, our dev team worked tirelessly over three weeks to make this little dream a virtual reality; it is with immeasurable thanks to both of them that old Bill finally has a home of his own!
            <br/><br/>
            In those six years, Bootleg Bill's has developed into an ongoing project dedicated to creating cassette releases for various media productions -- some, for example, are based on tapes physically depicted in a production; others are soundtracks and curated mixes from works where a cassette would be thematically appropriate, while a growing few are replications of rare or obscure original releases.
            <br/>
            The majority of cassettes "available" in our store have indeed been physically reproduced as one-of-a-kind art pieces, with many others in various stages of design and planning for eventual production. Our vinyl records and apparel, however, are a strictly conceptual exercise in graphic design and image manipulation. <span className='smol'>at least until we have our own record press and silkscreen</span>
            <br/><br/>
            This website now effectively serves as a portfolio for the graphic design elements I have produced for these projects, and the presentation of Bootleg Bill's Unofficial Audio Rarities as a web store is in <span className='drama'>no way</span> representative of any availability for purchase.
            <br/><br/>
            However, if you would like to contact us regarding any of the designs featured here, send us an email at <span className='bigBill'>bootlegbills@proton.me</span>.
            <br/><br/>
            Until then, dudes. Be excellent to each other!
            <br/><br/>
            <span className='bigBill'>Chris</span>
            </p>
          </div>
      </div>

      <div className='credits'>
        <h3>Credits</h3>
        <h5>Web design & development</h5>
        <div>
          <p className='dev-names'>Chris Ailey</p>
          <ul>
              <ul>
                <li>Active Developer</li>
                <li>Graphic + audio design</li>
                <li>Original contributing developer</li>
              </ul>
          </ul>
            
          <p className='dev-names'>Ailish McLaughlin</p>
          <ul>
            <ul>
              <li>Original Project Co-ordinator</li>
              <li>Original Contributing Developer</li>
            </ul>
          </ul>

          <p className='dev-names'>Christopher Carey</p>
          <ul>
              <ul>
                <li>Original Contributing Developer</li>
              </ul>
          </ul>
        </div>

        <h5>Graphic and Audio Design</h5>
        <p>Chris Ailey</p>

        <h5>"Snatcher" Cover Source Art</h5>
        <p>Vandrell @ vandrell.deviantart.com</p>

        <h5>"Double Bill Vol. 1": Astrophysics Source Art</h5>
        <p>Jazz @ jazzboys.carrd.co</p>

        <h5>Side-by-Side Case + Tape Mockup Template</h5>
        <p>www.pixpine.com</p>

        <h5>Multi-tape Set Mockup Template</h5>
        <p>www.otherrecordlabels.com</p>

        <h5>Vinyl Record Mockup Template</h5>
        <p>MadeByMe @ www.graphicburger.com</p>

        <h5>T-shirt/Hoodie with Model Mockup Template</h5>
        <p>Vectonauta @ www.freepik.com</p>

        <h5>T-shirt Front & Back Mockup Template</h5>
        <p>www.rawpixel.com</p>

        <h5>Cyan/Magenta/Yellow Cassette Tape Art</h5>
        <p>www.canva.com</p>
      </div>
    </div>
  )
}
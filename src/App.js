import React, { useState, useEffect } from 'react'
import Signup from './user/Signup'
import Login from './user/Login'
import Dash from './user/Dash'
import Cart from './cart/Cart'
import AboutBills from './home/AboutBills'
import FrequentlyAsked from './home/FrequentlyAsked'
import {Route, Routes, Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'
import ProductList from './product/ProductList'
// import Product from './product/Product'
import jwt_decode from 'jwt-decode'
import Home from './home/Home'
import {BsCart4, BsChevronCompactDown, BsChevronCompactUp, BsFillVolumeUpFill, BsSkipForwardCircle, BsVolumeMuteFill} from 'react-icons/bs'
import Badge from 'react-bootstrap/Badge'
import Footer from './footer/Footer'
import Checkout from './cart/Checkout' 
import OrderConfirmation from './cart/OrderConfirmation'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Nav, Navbar, Image, Alert } from 'react-bootstrap';
import logo from './product/images/nav_logo_new.png'



// const logo = './product/images/logo.png'

export default function App() {

  // window location handler


  // Cart array,
  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  
  const navigate = useNavigate()

  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState({})
  const [orderRef, setOrderRef] = useState()
  const [products, setProducts] = useState([])
  const [userRole, setUserRole] = useState("")
  const [productQuantity, setProductQuantity] = useState(1)
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [productToEdit, setProductToEdit] = useState("")
  const [allOrders, setAllOrders] = useState([])

  
  const randInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  const audioLibrary = [
    {
      name:"Brian Bright - THPS Menu Loop",
      url: "https://od.lk/s/OTFfMjgxMzAyMjFf/thps_loop_neater.mp3"
    },
    {
      name:"Grimes ft. Astrophysics - Oblivion (Double Bill Mix)",
      url: "https://od.lk/s/OTFfMjgxMzA1OTZf/grimes-miku%20oblivion%20mix.mp3"
    },
    {
      name: "Brian Bright - THPS2 Menu Loop",
      url: "https://od.lk/s/OTFfMjgxMzA1OTdf/Brian%20Bright%20-%20THPS%202%20Menu%20Music.mp3"
    },
    {
      name: "Disconscious - Midnight Specimen",
      url: "https://od.lk/s/OTFfMjgxMzA2MDBf/Disconscious%20-%20Hologram%20Plaza%20-%2009%20Midnight%20Specimen.mp3"
    },
    {
      name: "Luxury Elite - Self-Discovery",
      url: "https://od.lk/s/OTFfMjgxMzA2MTdf/Self-Discovery.mp3"
    },
    {
      name: "Aim ft. YZ - Ain't Got Time to Waste",
      url: "https://od.lk/s/OTFfMjgxMzA2NDVf/Ain%27t%20Got%20Time%20to%20Waste%20-%20Aim%20ft.%20YZ.mp3"
    },
    {
      name: "Blue Thunder - Aquasky",
      url: "https://od.lk/s/OTFfMjgxMzA2NDdf/Aquasky%20-%20Blue%20Thunder.mp3"
    },
    {
      name: "Grand Unified - Le Hot '99",
      url: "https://od.lk/s/OTFfMjgxMzA2NDlf/Grand%20Unified%20-%20Le%20Hot%20%2799.mp3"
    },
    {
      name: "Gex 3D Enter the Gecko OST - In Drag Net",
      url: "https://od.lk/s/OTFfMjgxMzA2NDhf/Gex%20Enter%20the%20Gecko%20OST%20-%20In%20Drag%20Net.mp3"
    },
    {
      name: "Frank Contreras - SimpsonWave1995",
      url: "https://od.lk/s/OTFfMjgxMzc2Njdf/FrankJavCee%20-%20SimpsonWave1995.mp3"
    }
  ]
  
  const [selectedTrack,setSelectedTrack] = useState(randInt(0, audioLibrary.length-1))
  const [audioMuted, setAudioMuted] = useState(true)
  const [toggleVisible, setToggleVisible] = useState("hideToggle")
  const [playerVisible, setPlayerVisible] = useState("radioVisible")
  const [audioCanPlay, setAudioCanPlay] = useState(false)

  const [noticeClosed, setNoticeClosed] = useState(false)
  
  useEffect(() => {
    
    
    
    console.log("useEffect triggered")
    loadProductList()
    
    let token = localStorage.getItem("token")
    
    if(token != null){
      let user = jwt_decode(token)
      let timeNow = new Date().valueOf()
      console.log(
        `Token issued at ${new Date(user.iat * 1000)}, and expires at ${new Date(user.exp * 1000)}.\n
        Logged in as [${user.user.name}] with ${user.user.role} privileges.\n
        Token is currently ${timeNow - user.user.timestamp < 1800000 ? "valid" : "invalid"}.\n
        Full object :`, [user])

      if (verifyToken() === false) {
        console.log("token invalid")
        localStorage.removeItem("token");
        setIsAuth(false)
      } else if (verifyToken() === true) {
        console.log("token valid")
        setIsAuth(true)
        setUser(user)
        setUserRole(user.user.role)
      }
      // if(user){
      //   setIsAuth(true)
      //   setUser(user)
      //   setUserRole(user.user.role)
      // }
      // else if (!user){
      //   localStorage.removeItem("token");
      //   setIsAuth(false)
      // }
    }

    let parseCart = JSON.parse(localStorage.getItem("Cart"))

    setCart(parseCart)

  }, [])

  useEffect(() => {

    const cartTotal = cart.reduce((counter, obj) => counter + obj.cartQuantity, 0)

    setCartCount(cartTotal)

    localStorage.setItem("Cart", JSON.stringify(cart))
    
    console.log("Cart updated!",cart)

  }, [cart])

  const verifyToken = () => {
    let token = localStorage.getItem("token")
    let timeNow = new Date().valueOf()
    let user = jwt_decode(token)
    return timeNow - user.user.timestamp < 1800000
  }
  
  const addNewsletterEmail = (email) => {
    // The url is the api and the recipe post comma is the body 
    Axios.post("https://bootlegbackend.herokuapp.com/newsletter", email)
    .then(response => {
        console.log("Recipe Add Fine")
    })
    .catch(error => {
        console.log("There's an error")
        console.log(error)
    })

}

  
  const registerHandler = (user) => {
    Axios.post("https://bootlegbackend.herokuapp.com/auth/signup", user)
    .then(response => {
      if(response.data.message.slice(0, 6) === "Failed"){
        setErrorMessage("User registration failed.")
      } else {
      console.log(response)
      console.log("Signed up successfully!")
      console.log(user)
      setSuccessMessage("User signup has been successful")
      navigate("/login")
      }
    })
    .catch(error => {
      console.log(error)
      setErrorMessage("User registration failed!")
    })
  }

  const handleProductQuantity = (quantity) => {
    console.log("hello")
    console.log(quantity)
    setProductQuantity(quantity)
    // console.log(productQuantity)
  }


  const handleRemoveFromCart = (deletedItem) => {
    console.log(deletedItem.product._id)
    const findItem = cart.find(item => item.product._id === deletedItem.product._id) 
    const updatedCart = Array.from(cart)
    console.log("index:",updatedCart.indexOf(findItem))
    updatedCart.splice(updatedCart.indexOf(findItem),1)
    // setCartDisplayArr(cartDisplayArr.filter(element => element._id !== deletedItem._id))
    console.log(updatedCart)
    setCart(updatedCart)
  }
  
  const loadProductList = () => {
    Axios.get("https://bootlegbackend.herokuapp.com/product/index")
    .then((response) => {
      // console.log(response)
        // Setting state here:
        setProducts(response.data.product)
    })
    .catch((error) => {
      console.log(error.response.data)
    })
  }

  const makeCart = (cartItems) => {
    // e.preventDefault()
    console.log(cartItems)
    console.log("makecart working")
    if(isAuth){
      let idArr = []
      cartItems.forEach(element => {
        idArr.push(element._id)
      });
      console.log(idArr)
      var dataObj = {user : user.user.id, status : "active", product : idArr }
      console.log(dataObj)
      Axios.post("https://bootlegbackend.herokuapp.com/cart", dataObj)
      .then(response => {
        console.log(response)
        navigate("/checkout")
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      navigate("/login")
    }
  }

  const loginHandler = (cred) => {
    console.log(cred)
    Axios.post("https://bootlegbackend.herokuapp.com/auth/login", cred)
    .then(response => {
      console.log(response.data.token)
      if(Object.keys(response.data.token).length){
        localStorage.setItem("token", response.data.token);
        let user = jwt_decode(response.data.token)
        setIsAuth(true)
        setUser(user)
        console.log(user.user.role)
        setUserRole(user.user.role)
        user.user.role === "seller" ? navigate("/manage") : navigate("/products")
        console.log("User successfully logged in.")
        setSuccessMessage("User successfully logged in.")
        setTimeout(() => {
          setSuccessMessage(null);
          }, 3000);
      } else {
        console.log("test")
      }
    })
    .catch(error => {
      console.log(error)
      setErrorMessage("User has failed to login.")
      setTimeout(() => {
        setErrorMessage(null);
        }, 3000);
    })
  }

  const onLogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false)
    setUser(null)
    setUserRole("")
    console.log("User successfully logged out.")
    setSuccessMessage("User successfully logged out.")
    navigate("/")

    setTimeout(() => {
      setSuccessMessage(null);
      }, 3000);
  }

  const sessionExpiredHandler = () => {
    localStorage.removeItem("token");
    setIsAuth(false)
    setUser(null)
    setUserRole("")
    console.log("Session token expired.")
    setErrorMessage("Session expired.")
    navigate("/login")

    setTimeout(() => {
      setErrorMessage(null);
      }, 3000);
  }

  const sucMessage = successMessage ? (
    <Alert id="box" variant="success" onClose={() => setSuccessMessage(null)} dismissible>{successMessage}</Alert>
  ): null;

  const errMessage = errorMessage ? (
    <Alert id="box" variant="danger" onClose={() => setErrorMessage(null)} dismissible>{errorMessage}</Alert>
    
  ): null;


  const handleMute = () => {
    let audio = document.getElementById("daFunk")
    audio.muted = !!audio.muted ? false : true
    audio.volume = 0.5
    setAudioMuted(audio.muted)
  }

  const handleSkip = () => {
    // let newTrack = audioLibrary[randInt(0, audioLibrary.length-1)]
    // const isSame = () => {
    //   return newTrack.name === selectedTrack.name
    // } 
    // while (!!isSame()) {
    //   newTrack = audioLibrary[randInt(0, audioLibrary.length-1)]
    //   console.log("Rerolled cos same")
    //   isSame()
    // }
    // setSelectedTrack(newTrack)
    let newTrack = selectedTrack !== audioLibrary.length - 1 ? selectedTrack+1 : 0
    setSelectedTrack(newTrack)
  }

  const audioIsReady = () => {
    let audio = document.getElementById("daFunk")
    return audio.canPlayThrough
  }


  return (
    

    
    <div>

      <audio id="daFunk" controls={false} src={audioLibrary[selectedTrack].url} autoPlay loop muted onCanPlay={() => setAudioCanPlay(true)}></audio>
      
      {
        <div className={playerVisible}>
          <div className="radioContainer" onMouseOver={() => setToggleVisible("showToggle")} onMouseOut={() => setToggleVisible("hideToggle")}>
            <div className="muteContainer">
              { !audioMuted ? <BsFillVolumeUpFill id="mute" size={38} onClick={() => handleMute()}></BsFillVolumeUpFill> : <BsVolumeMuteFill id="mute" size={38} onClick={() => handleMute()}></BsVolumeMuteFill>}
            </div>
            <div className='marqueeContainer'>
              <div id='marquee'>
                { !!audioCanPlay ?
                  <div id="marquee__content">
                    <p className='marqueeContent'>&nbsp; &nbsp; &nbsp; Now Playing: &nbsp; &nbsp; &nbsp; {audioLibrary[selectedTrack].name}</p>
                  </div>
                  :
                  <div>
                    <p className='marqueeContent'>Loading...</p>
                  </div>
                }
              </div>
            </div>
            <div className="newTrackContainer">
            <BsSkipForwardCircle id="skip" size={38} onClick={() => handleSkip()}/>
            </div>
          </div>
          <div className='toggleContainer' onMouseEnter={() => setToggleVisible("showToggle")} onMouseLeave={() => setToggleVisible("hideToggle")}>
            <div className={toggleVisible} onClick={() => setPlayerVisible(playerVisible === "radioVisible" ? "radioHidden" : "radioVisible")}>
              {playerVisible === "radioVisible" ? <BsChevronCompactUp/> : <BsChevronCompactDown/>}
            </div>
          </div>
        </div>
      }
    
      {/* React Bootstrap Nav Bar*/}
      <Navbar id="navId" collapseOnSelect="true" expand="lg" className="navbar-bg"  sticky="top">
      {/* <Container> */}

        <Navbar.Brand href="/" id="nav-brand"><Image src={logo} height="50px" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse className="justify-content-end" >
        {/* <Nav className="nav-style"> */}
          { isAuth ? (
          <Nav id="nav-style">
          <Nav.Link as={Link} to="/" eventKey={"1"}> Home</Nav.Link>
          <Nav.Link as={Link} to="/products" eventKey={"2"}> Products</Nav.Link>
          <Nav.Link as={Link} to="/logout" onClick={onLogoutHandler} eventKey={"3"}>Logout</Nav.Link>
          <Nav.Link as={Link} to="/manage" eventKey={"4"}> 
          <Navbar.Text className="dash-link">
          {userRole === "seller" ? "Seller Dashboard" : "My Orders"}
          </Navbar.Text>
          </Nav.Link>
          <Nav.Link as={Link} to="/cart" eventKey={"5"}><BsCart4 size={26}> </BsCart4> <Badge bg="secondary"> {cartCount} </Badge></Nav.Link>
          <Navbar.Text style={{textShadow: '-2px 2px #000000'}}>{`Welcome, ${user.user.name}!`}</Navbar.Text>
          </Nav>
          ):(
          <Nav id="nav-style">
          <Nav.Link as={Link} to="/" eventKey={"1"}> Home</Nav.Link>
          <Nav.Link as={Link} to="/products" eventKey={"2"}> Products</Nav.Link>
          <Nav.Link as={Link} to="/login" eventKey={"3"}> Login</Nav.Link>
          <Nav.Link as={Link} to="/signup" eventKey={"4"}> Signup</Nav.Link>
          <Nav.Link as={Link} to="/cart" eventKey={"5"}><BsCart4 size={26}> </BsCart4> <Badge bg="secondary"> {cartCount} </Badge></Nav.Link>          
          </Nav>
          )}
          {/* </Nav> */}
        </Navbar.Collapse>
      {/* </Container> */}
      </Navbar>
     {sucMessage}
     {errMessage}
        {/* <div id='slashRouting'>
          <Routes>
            <Route path="/" element={<Home products={products} />} />
            <Route path="/signup" element={<Signup register={registerHandler} />} />
            <Route path="/index" element={<ProductList cart={cart} setCart={setCart}/>} />
            <Route path="/about" element={<AboutBills />} />
            <Route path="/login" element={<Login login={loginHandler} role={userRole}/>} />
            <Route path="/manage" element={<Dash user={user} role={userRole} products={products} productToEdit={productToEdit} setProductToEdit={setProductToEdit} allOrders={allOrders} setAllOrders={setAllOrders} loadProductList={loadProductList} sucMessage={sucMessage} setSuccess={setSuccessMessage} error={errMessage} setError={setErrorMessage} sessionExpiredHandler={sessionExpiredHandler}/>} />
            <Route path="/cart" element={<Cart cart={cart} makeCart={makeCart} productQuantity={productQuantity} handleRemoveFromCart={handleRemoveFromCart} handleProductQuantity={handleProductQuantity}/>} />
            <Route path="/checkout" element={<Checkout cart={cart} user={user} orderRef={orderRef} setOrderRef={setOrderRef} allOrders={allOrders} setAllOrders={setAllOrders} setCartCount={setCartCount} cartCount={cartCount}/>} />
            <Route path="/confirmation" element={<OrderConfirmation orderRef={orderRef} setOrderRef={setOrderRef}/>} />
          </Routes>
        </div> */}
        <div id='slashRouting'>
          <Routes>
            <Route path="/" element={<Home products={products} isAuth={isAuth} user={user} noticeClosed={noticeClosed} setNoticeClosed={setNoticeClosed}/>} />
            <Route path="/signup" element={<Signup register={registerHandler} />} />
            <Route path="/products" element={<ProductList cart={cart} setCart={setCart}/>} />
            <Route path="/about" element={<AboutBills />} />
            <Route path="/faq" element={<FrequentlyAsked />} />
            <Route path="/login" element={<Login login={loginHandler} role={userRole}/>} />
            <Route path="/manage" element={<Dash user={user} role={userRole} products={products} productToEdit={productToEdit} setProductToEdit={setProductToEdit} allOrders={allOrders} setAllOrders={setAllOrders} loadProductList={loadProductList} sucMessage={sucMessage} setSuccess={setSuccessMessage} error={errMessage} setError={setErrorMessage} sessionExpiredHandler={sessionExpiredHandler}/>} />
            <Route path="/cart" element={<Cart isAuth={isAuth} user={user} cart={cart} setCart={setCart} makeCart={makeCart} productQuantity={productQuantity} handleRemoveFromCart={handleRemoveFromCart} handleProductQuantity={handleProductQuantity} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>}/>
            <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} user={user} orderRef={orderRef} setOrderRef={setOrderRef} allOrders={allOrders} setAllOrders={setAllOrders} setCartCount={setCartCount} cartCount={cartCount}  totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>} />
            <Route path="/confirmation" element={<OrderConfirmation orderRef={orderRef} setOrderRef={setOrderRef}/>} />
          </Routes>
        </div>





        <Footer style={{zIndex:0}} addNewsletterEmail={addNewsletterEmail}/>
        
      

  
    </div>

  )
  
}

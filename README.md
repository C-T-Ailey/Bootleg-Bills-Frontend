# GA SEI Project 4: “Bootleg Bill’s Unofficial Audio Rarities” - Bootleg Mixtape E-Commerce App

### Deployed App: https://bootleg-bills.herokuapp.com/

> *This repository contains the code for the project's frontend. For the backend code, see [here](https://github.com/C-T-Ailey/project-04).*

**Note:** The project's frontend is configured to communicate with the deployed backend, currently hosted on Heroku, and the backend has CORS configured to allow communication with the deployed frontend. If you intend to host this project locally, you will need to reconfigure each API endpoint in the frontend to point to the localhost address of the backend, as well either of the following CORS solutions:
* Use a CORS browser extension;
* Adjust the CORS configuration in the backend's server.js file to reflect whichever localhost address the frontend will be running on.

The frontend also requires a .env file storing the key `REACT_APP_SELLER_KEY=` with a value of your choosing. This will be required if you wish to register as a Seller during the site's Signup process.

![bootlegbills](https://i.imgur.com/X5cwrx5.png)

#### Table of Contents
* Development Status
  * Post-Submission Additions and Changes
  * Planned Improvements
  * Known Bugs
* Project Debrief: Introduction
  * Project Requirements
  * Project Overview
  * Contributors
  * Timeframe
  * Technologies Employed
* Planning and Preparation
  * User Stories
  * Entity Relationship Diagram
  * Wireframe
* Development
  * Process
    * Backend
    * Frontend
  * Featured Code
* Outcome
  * Challenges
  * Wins
  * Future Inclusions and Improvements
  * Key Learnings

### Development Status

Since finishing development of the application within the scope of the General Assembly course for which it was submitted, I have independently been making incremental progress towards refactoring several components and rectifying bugs and incomplete features from the initial development process. As all the product images and audio samples used on the site were (and continue to be) personally designed and edited, the application now serves as a minor portfolio for my graphic design work in addition to an example of my previous software development projects. The version of the project as it stood upon completion of the course can be found under the "Legacy" branch of this repository.

This specific repository is for the application's frontend, to which the majority of adjustments so far have been made. Several styling improvements and bugfixes have been implemented, along with new features such as the means to offer (and "purchase") design variations for different products, filtering by products by category, and an About Us page detailing the project's conceptual background.

#### Post-Submission Additions and Changes
* Alphabetical/Reverse Alphabetical and Date Added (ascending/descending) sorting to accompany the Source/Format filters on the Products page.
* Implemented conditionals to hide the audio player on products without audio samples.
* Currently selected image on the Product Details modal view can now be clicked to open the full image in a new tab.
* Product names which are too long to fully fit on their Product card in the Products menu will now display as an animated scrolling marquee when hovered over with the mouse.
* Full list of changes coming soon -- please see repository commit notes until such time.

#### Planned Improvements
* :construction_worker: The majority of variables and functions are currently declared at the top level in App.js and passed as props to various components; refactor the codebase so more functions and props are employed only on their required pages to reduce memory usage.
  * In progress.
* :construction_worker: Cart and Checkout components rewritten from scratch.
  * In progress.
* :construction_worker: Rewrite/update styling to make the site more responsive to mobile devices.
  * In progress - Homepage, Products and About Bill's now display adequately on mobile devices.
* :construction_worker: Implement functional counters for each product's "Total orders" and "Outstanding orders" metrics on the Seller dashboard.
  * Requires adjustments so counters renew when a product is updated without reloading the dashboard - also requires a significant loading period before orders and statistics are viewable.
* Improved layout for the homepage.
* Featured Product section on the homepage, with a component in the Seller dashboard for updating it.
* Increased number of potential images and variants for products.
* Adjust the Product and Orders models and rewrite the "Add to Cart" function so that any selected variant for a product will be recorded in a customer's orders.
* Separate entry in the Product model for the "Bestseller" image, instead of using whichever image occupies the last populated index of the product images array.
* A means of selecting which of a given product's images will be used as its "Bestseller" image.
* Dedicated lower-resolution images to use as thumbnails on the Products page in order to reduce time and data spent loading them, and a corresponding field in the Product model to designate it.

#### Known Bugs
* Firefox Browser-specific issues:
  * The primary font for the site, Bungee Hairline, displays poorly in the Firefox browser.
  * The "Choose a Variant" dropdown selection options are displayed with the Comic Sans font, instead of the intended Bungee Hairline.
    * Issue seems to be a major hitch inherent to Firefox. For now, the select options font has been adjusted to display Courier instead. Might not be ideal, but it beats Comic Sans.
* :warning: The "Bestsellers" carousel on the homepage briefly displays names and images for non-bestseller products as the function for populating the carousel runs its course.
  * Somewhat fixed - the carousel occasionally briefly appears just once before displaying the populated carousel. Efforts continue to be made to fix fully.
* :white_check_mark: When attempting to update the product details for a product which has variants, the "Has variants?" selection will default to "No". Attempting to modify details after encountering this bug will sometimes alter the details for a different product instead of the intended one - exact criteria for replicating this bug are unknown.
  * Fully fixed.
* :white_check_mark: When navigating to a product from the "Bestsellers" carousel, the +/- quantity buttons on the product details modal view are non-functional.
  * Fully fixed as part of a full overhaul of the ProductList, Product and ProductDetail components.
* :white_check_mark: On the "Products" page, selecting a "media" filter and then selecting an "origin" filter will apply the chosen "origin" filter as if the "media" filter was set to "All", regardless of the user's selection.
  * Fully fixed as part of a full overhaul of the ProductList, Product and ProductDetail components.
* :white_check_mark: On the "Products" page, clicking "Add to cart" for a product will only add one of that product to the cart, regardless of the quantity set by the user.
  * Fully fixed as part of a full overhaul of the ProductList, Product and ProductDetail components.
* :white_check_mark: Attempting to update a product's details from the Seller dashboard (or perform any other operation which requires the user to be logged in) with an expired session token will crash the app.
  * Fully fixed by implementing more extensive auth-token validation and checks to sign a user out, remove their expired token from local storage, and redirect them to the login page.


### Project Debrief: Introduction

#### Project Requirements

* A working full-stack, single-page application hosted on Heroku.
* Incorporate the technologies of the MERN-stack (MongoDB/Mongoose, Express, React, Node).
* Have a well-styled interactive frontend.
* Use RESTful API routing and communicate with the Express backend via AJAX.
* Implement token-based authentication, including the ability for a user to sign-up, log in & log out.
* Implement authorization by restricting CRUD operation functionality to authenticated users. Navigation should also respond to the login status of the user.
* Have a well-scoped feature-set. Full-CRUD data operations are not required if one or more of the following are included:
  * Consume data from a third-party API.
  * Implement additional functionality if the user is an admin.


#### Project Overview
Bootleg Bill's Unofficial Audio Rarities is an E-Commerce application for custom-made cassette mixtapes, including rare/obscure original releases and replications of tapes shown in movies, TV shows and video games. Using a combination of React on the frontend and Express/MongoDB on the backend, Bootleg Bill's allows you to sign up as either a buyer or a seller, where they can browse the shop, see details about specific products, add items to the cart, go to checkout to complete their order and see a list and the status of their past orders. Sellers can also access a dashboard allowing them to add, edit or delete products from the inventory as well as view and edit each order status.


#### Contributors
* [Chris Ailey](https://github.com/C-T-Ailey)
* [Christopher Carey](https://github.com/christopher-k-c)
* [Ailish McLaughlin](https://github.com/ailishmcl) (Project Lead)

#### Timeframe
This project was completed as a three-person group assignment over 14 days.

#### Technologies Employed
* React
* React Bootstrap with additional custom CSS
* JavaScript & Node.js
* Express
* MongoDB
* Mongoose
* Postman
* Git & GitHub
* Figma (ERD and wireframing)
* Trello (Project planning)
* Heroku (Deployment)

### Planning and Preparation

As we were given 14 days for our fourth project with General Assembly – double the timeframe of our previous projects – we dared to be a little ambitious and attempt building a full E-Commerce application, or as close to one as we could get in the allotted time. I proposed “Bootleg Bill’s Unofficial Audio Rarities”: a storefront for high quality, custom-designed bootleg cassette tapes replicated from TV shows, movies, video games and rare or obscure original releases. The concept was rooted in a past creative project of mine where I had made such tapes myself; consequently, I still had the vast majority of my resources for them, which I felt would go a long way towards saving time and taking our application’s presentation to the next level. 

We dedicated a significant amount of time to planning; above all else, we felt it important to prioritise aligning our shared vision in order to ensure our development process would be as efficient as possible. We first created a flowchart in Figma, in order to plot a user’s journey through the app and clarify which models we would require at which stages.

![flowchart](https://i.imgur.com/T7kkjnS.png)
[Full flowchart available on Figma.](https://www.figma.com/file/nzI51c1l1kPjnLjdxosC6I/Flow-Chart)

Once we had a firm idea of them, we drafted our Entity Relationship Diagram and began developing our wireframe models of each site component. With our broad plan outlined, we broke it down into workable steps by setting up a Trello board with detailed user stories, the minimum viable product requirements, and an icebox for tracking individual development status in order to establish a clear roadmap for the process ahead.

#### User Stories
After settling on our concept for the application, we assembled a list of user stories to ensure we had a guide for the main points of functionality we wanted our users to experience.
* As an unregistered user, I want to be able to view the shop's products, so that I can decide if I want to buy a product. 
* As an unregistered user, I want to sign up for an account, so that I can log in and make purchases.
* As an unregistered seller, I want to be able to use a unique identifier on sign up, so that I can generate a seller account.
* As a logged out or unregistered user, I should only see an option to log in or sign up in the navbar so that I can log in or sign up from anywhere.
* As an unregistered user, I want to be prompted to sign up for an account if I try to add a product to my cart, so that I can purchase it.
* As a registering user, I want to be registered as a buyer by default, so that if I am a seller I have to manually choose that option.
* As a logged in user, I should be able to see a logout link in the navbar, so that I can easily log out.
* As a user, I want to view my order history, so I can keep track of the status of my orders and/or create a return for a delivered order.
* As a seller, on log in, I want to be able to see a dashboard of order and inventory information, so that I can keep track of the products and sales.
* As a seller, I want to be able to edit, add and delete products from the inventory, so that it can be kept up to date.
* As a seller, I want to be able to expand on each individual order's information, so that I can view or edit the details.
* As a seller, I want to be able to edit the status of an order in the dashboard, so that I can keep track of all orders.
* As a user, I want to be able to see whether a product is in stock, so that I know whether I can purchase it.
* As a user, I want to be able to filter the products on the shop page by movie or games, so that I can search for the products I'm interested in.
* As a user, I want to be able to see the best selling tape, so that I can know what is most popular on the site.
* As a user of the site, I want to be able to easily view product details without losing my place in the shop, so that I can have a seamless shopping experience.

#### Entity Relationship Diagram
In order to understand which data we would need to store and access to achieve our desired functionality, we created an ERD to show the flow and interaction of our intended models for the app.

Our intended models were as follows:
* User: Registered users for the site, required for authorisation and authentication of user-generated CRUD operations. User ID is referenced by the Cart and Order models in order to track the user who creates a given instance of them, and references every Cart and Order instance created by that user as an array of IDs for each. Shares a One to Many relationship with the Cart model as one User can have many Carts in their purchase history, and a One to Many relationship with the Order model as one User can have many Orders attributed to them.
* Product: Data for individual products, required to be created before a user can place orders. Product ID is referenced by the Cart model, as each Cart instance will reference the ID of each product added to it by the User. Shares a One to Many relationship with Cart, as one Cart can reference many Products.
* Cart: Data for the User’s shopping cart. Cart ID is referenced by the User who created the instance, and references the ID of that User. Shares a One to Many relationship with the User model as detailed above, and a One to One relationship with the Order model as only one Order can be generated from a Cart’s contents.
* Order: Data for the User’s orders. Each Order ID is referenced by the user who created it, sharing a One to Many relationship with them as detailed above.

![billERD](https://i.imgur.com/ii6CfsM.png)

#### Wireframing
With two weeks ahead of us and an ambitious goal in mind, we felt that the more meticulous we were in our planning, the more we would benefit in the long term. Ailish led the team in drafting our wireframe mockups in Figma, with input from each team member and portioning out the mockups for each view to be as efficient as possible.

![billwireframe](https://i.imgur.com/qJR7UE8.png)

[Full wireframe images available on Figma.](https://www.figma.com/file/CbzmDiTOtefvXPzt3A5Pus/Bootleg-Bill's-Unofficial-Audio-Rarities)

### Development

#### Process
#### Backend
**Express Setup**

The first responsibility I assumed for the project was assisting in getting our Express side of the application properly configured with the required files, folders and dependencies. I created and implemented the .gitignore and .env files, installed packages for bcrypt, dotenv, express, express-session, moment and mongoose, and provided configurations for the server.js file.

**User Model, Authentication & Authorization Operations**

The first features of the application I opted to build were those required for authentication and authorization. This naturally meant that the first requirement was the User model itself with the firstName, lastName, emailAddress, password and userType properties. The userType property would be essential for our plan of having two separate categories of users, Buyers and Sellers, and determining which features will be available to the user based on their userType.

With the model assembled, I began constructing the controllers and routes for the signup and login features. This involved writing POST APIs for each: the signup API function operates by creating a new User object, populating the instance’s properties with submitted form data, and encrypting the submitted password with bcrypt; the login API function operates by retrieving the user’s details from the database with the email address submitted through the login form, comparing the submitted password against the decrypted password from that user’s database entry and, if successful, generating an authentication token using JWT. The token payload is then populated with the user’s ID, firstName and userType, for later referencing in various identity checks, the greeting in the navbar, and determining the user’s permissions respectively. I also implemented a custom authorization middleware, so that routes which require a user to be logged in would redirect to the login page when accessed.

APIs were also written for retrieving a full list of registered users and getting a specific user by ID, partially as practice for writing API functions but also in anticipation of needing such a feature later. However, they never proved necessary, and were ultimately not implemented.

**Product Model Additional Functionality Adjustments**

Our teammate Christopher was responsible for constructing the Product model and its related CRUD operations, but as our development progressed, we recalled our previously discussed inclusion of a means by which we could filter the products according to their source material. As we would have products with origins ranging from TV and Film reproductions, video game soundtracks, and original releases, some property by which we could record and access this “source type” would be required. I took on the duty of implementing this, which (at least for the model itself) was a straightforward matter of adding a productSourceType and productSource property to it. productSourceType would be used to record the above information; productSource would store the specific title of the product’s source material if productSourceType is “TV/Film” or “Video Game”, or the artist name if productSourceType is “Original Release”.

Another adjustment I made to the Product model was to change the productImageUrl property to productImageUrls, and changed the stored data from a single URL string to an array of URL strings. The reason for this change was that we came to realise a single image for each product may not be sufficient in a genuine commercial application, especially with a product like cassette tapes where not every part of the product’s design can be shown in a single image, so a means by which more than one could be provided would be beneficial to us and enhance the user experience.

**Order GET and Update Operations** 

For the OrderHistory component, we needed to be able to retrieve the full list of placed orders and display them, either in full or according to the current user, depending on their userType. We also required a means to retrieve a single order by its ID, so that users can access the full details for a specific order, as well as the means to update an order for the sake of Seller users being able to manually change an order’s status. As I had elected to work on the OrderHistory and OrderDetails components, I assumed responsibility for this; by this point in development I had implemented a fair number of API routes for the project, so this was a fairly straightforward undertaking.



#### Frontend
**Signup.js & Login.js Components, Authentication**

With regards to frontend development, my first contribution was to build the components which would serve as the forms for user registration and logging in. By and large, this was a simple process which was mostly just a matter of taking form input and calling the relevant API to store or retrieve the user data; however, the process for Signup.js in particular was complicated by the requirement for a means by which users could register as either a Buyer or a Seller. By default, the form will be initialised to register the user as a Buyer, and all they will need to do is provide their name, email address and password in order to register for browsing and purchasing. However, Sellers would have vastly expanded permissions including the ability to create, edit and delete product records, as well as viewing the full list of placed orders and updating their statuses. As such, a verification system of some sort would be required in order to prevent anybody from having access to these features; my solution was to include a toggle button indicating that registering as a Seller is an option, which reveals an otherwise hidden input field prompting the user to provide the “Seller verification code”. If the provided code matches, the user will be registered as a Seller; otherwise, they will be notified of their failure to register and prompted to retry.

The Login.js component generates the token for the user’s session by calling the login API, checking the submitted credentials against the corresponding User database entry, and assigning the token to local storage if the user is authenticated. If the newly logged in user is a Buyer, they will be redirected immediately to the products index; users with the Seller type are redirected to the Dashboard, where they can view order history and inventory.

**ProductCreateForm.js component**

After Christopher had established the CRUD operation APIs for the Product model, I began work on the ProductCreateForm.js component so that we could begin populating our database and, at the very least, have some placeholder data to build the rest of our Product components around.

**Dash.js, OrderHistory.js, OrderDetails.js, ProductMetrics.js, ProductCreateForm.js and ProductEditForm.js Components**

With the authentication/authorization features implemented, and after Christopher had established the CRUD operation APIs in the backend for the Product model, my next move was to build the above components in order to ensure that Buyers had somewhere they could track their order histories, while Sellers had somewhere they could manage orders and inventory operations. 
For the former, I built the Dash.js component in order to house its subordinate components, followed by the OrderHistory.js component; this component renders a two-column table, labelled “Order Ref.” and “Order Status”, with the Order Ref data opening a modal view of the OrderDetails.js component on click and Order Status being a dynamic representation of that order’s current shipping status. Upon rendering the Dash.js component, the user’s userType property is checked. If “Buyer” is returned, OrderHistory.js will be the only visible content, and it will only be populated with orders placed by the user viewing it; if “Seller” is returned, the user will see the order history table populated with all orders from all users and, after opening the order details, will be able to select an updated status for the order from a dropdown select menu.

Sellers will also see a button for adding a new product to the inventory, which opens the ProductCreateForm.js component in a modal view, followed by a series of cards, each representing a ProductMetrics.js component. This series of cards is generated by a variable which maps each product in the database to a ProductMetrics.js component, and displays the product’s stock count, the number of unfulfilled orders it’s part of, the total number of times it has been ordered, and the options to edit or delete that product record. The “edit” button will load a modal view with the ProductEditForm.js component, which is broadly a modified copy of the ProductCreateForm.js component which is populated with the data for the selected product.

In addition to building each of these components, I was also responsible for providing the styling for them using Flexbox and custom CSS styles.

**ProductDetail.js Component**

With product CRUD operations implemented on both the front- and backend, we required a detailed view for each product; I achieved this by having each Product.js component’s card in the product index view open a modal view, which in turn contained the ProductDetail.js component populated with the details for that specific product.
This modal view is presented with the product images on the left, and the listed details on the right; the main image is displayed above a “gallery” row of up to three thumbnails, populated from the Product instance’s productImageUrls property.

One aspect of this component in particular which proved to be an interesting experience was attempting to implement the image “gallery”; I had little knowledge of how to approach such a feature, but found the processes of scripting and styling the selected thumbnail to visually indicate that it had indeed been selected, and changing the main image to represent the selected thumbnail, to be intuitive and surprisingly simple for my lack of prior understanding.

**Home.js Carousel “Best Sellers”**

Christopher had taken the initiative to include an image carousel on the Home.js landing page component; the idea was that it would be used to display the names and images for the top 3 best selling products.

The “best seller” image is taken from the product in question’s productImageUrls property, where whichever URL occupies the index at the end of the array is reserved for this purpose. As such, this URL’s corresponding image will not be displayed in the ProductDetail.js component, and may otherwise never be seen unless a product is ordered enough times to be counted among the best sellers. Constructing the code for determining best sellers was truthfully the most complex part of the project, and took repeated efforts and numerous iterations, each one closer to the solution while never close enough. Finally, with meticulous use of useEffect hooks, the map() method and API calls to retrieve each placed order in the database and count the instances of each product across them, I managed to complete the feature as we had envisioned it, and our carousel correctly displayed the image and basic information for the three most commonly-ordered products.

#### Featured Code

**Signup.js - Buyer/Seller UserType Selection**

Allowing users to register as either a Buyer or Seller was an essential aspect of our site’s functionality, so figuring out how to implement the checks for it into the signup form was a major breakthrough. During signup, users will see a toggle switch which is off by default. Toggling it calls the `handleToggleChange()` function, which sets a useEffect variable named `[checked, setChecked]` to the opposite of its current state. When set to “on”, it reveals a text input prompting the user to enter a seller verification code; though the input appears masked like a password field, this effect had to be achieved by using the `-webkit-text-security` CSS property as Chrome users would find that setting its type as “password” would pass the seller verification code to Chrome’s password autofill for the site.

If the input code matches the one defined for verification, the newly registered instance of the User model will have its userType property set to “seller”.

```jsx
{/* Signup.js Seller Verification */}
 
<Form.Group>
                <div className="userType">
                    <Form.Label>Register as a seller?:</Form.Label>
                    <Switch className='switch' onChange={handleToggleChange} checked={checked}/>
                </div>
                
            </Form.Group>
 
                <Form.Group className='verify-seller'>
                    <Form.Label>{userRole === "seller" ? ("Enter your seller verification code:") : ("")}</Form.Label>
                    <Form.Control className='auth-input' id="sellerKeyForm" type={userRole === "buyer" ? ("hidden") : ("text")} onChange={(e) => console.log(e.target.value)} autoComplete='new-password' onClick={(e) => {handleMask(e)}}></Form.Control>
                </Form.Group>
```

```css
/* index.css */
 
#sellerKeyForm {
  -webkit-text-security: disc;
  -moz-text-security: disc;
}
```

**JWT Authentication - The `loginHandler()` and `auth_login_post()` Functions**

Token-based authentication was a key feature for the application; being able to store certain properties of the currently logged-in instance of the User model in local storage would make it far simpler to perform various authorization checks in different components across the site. The first step in implementing this was the `auth_login_post()` function, where the token’s payload is defined as holding the User ID, firstName and userType; JWT is then used to sign the token with the payload, the .env file’s `SECRET` key, and the session expiry timer. The second step was implementing it into the frontend via the `loginHandler()` function, which calls the `auth_login_post()` API, performs a boolean check to see if the token object has readable length, sets the token in the browser’s local storage if so, and sets two useEffect states – `isAuth` and `user` – to “true” and the token payload data respectively.

```js
// Backend - controllers/auth.js
exports.auth_login_post = async (req, res) => {
   let {emailAddress, password} = req.body;
   console.log(emailAddress)
   try {
       let user = await User.findOne({emailAddress})
       console.log(user)
 
       if (!user) {
           return res.json({"message": "User not found."}).status(400);
       }
 
       console.log(password)
       console.log(user.password)
       const isMatch = await bcrypt.compareSync(password, user.password)
 
       if (!isMatch) {
           return res.json({"message": "Password does not match."}).status(400);
       }
 
       const payload = {
           user: {
               id: user._id,
               name: user.firstName,
               role: user.userType
           }
       }
 
       jwt.sign(
           payload,
           process.env.SECRET,
           {expiresIn: "12h"},
           (err, token) => {
               if (err) throw err;
               res.json({token}).status(200)
           }
       )
   }
   catch(error) {
       console.log(error);
       res.json({"message": "You are not logged in."}).status(400);
   }
}
```

```jsx
{/* Frontend - App,js */}
 
const loginHandler = (cred) => {
 
   console.log(cred)
 
   Axios.post("auth/login", cred)
   .then(response => {
     console.log(response.data.token)
     if(Object.keys(response.data.token).length){
       localStorage.setItem("token", response.data.token);
       let user = jwt_decode(response.data.token)
       setIsAuth(true)
       setUser(user)
       console.log(user.user.role)
       setUserRole(user.user.role)
       user.user.role === "seller" ? navigate("/manage") : navigate("/index")
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
```

**Home.js “Best Sellers” Carousel**

So that users could see which products are most popular on our site, Christopher implemented an image carousel which would display images and basic information for our three best sellers. Figuring out how to retrieve this data, however, was one of the biggest ordeals of the project. After many, many hours of constant revision, a solution was finally found, which operates as follows.

First, a dependency-free useEffect hook calls the function `getOrder()`, makes an API call to retrieve the full list of placed orders, and sets the `getOrderState` useState variable as the response. This is then followed by another useEffect hook with the props.products dependency, which calls the function `getPopular()` whenever props.products is updated if the length of props.products is greater than 0. This function maps an array of product IDs from props.products to the `mapIds` variable, then iterates through the new array, performs an API call using the `getProduct()` to match each ID to its corresponding product details, and then calls a promise which iterates through each order in `getOrderState` and adds a count of how many times that product occurs within each order to the `totalOrdered` variable.

An object named `popularities` is then constructed from the pre-existing key:value pairs within it, if any, and a new key:value pair using the product ID as the key and an object holding the product ID and the value of the `totalOrdered` variable. This object is then stored in the `popular` useEffect variable.

The `top3Products` variable is then declared, which maps `popular` (if not undefined) to a new array sorted by the object with the highest `totalOrdered` count to the lowest and stores a slice of the first three indices in order to provide the three best selling products. Then, if `top3Products` has a length of 3, each of the three spaces in the carousel will be populated with the image corresponding to the last index in each product’s productImageUrls property array.

```jsx
// Home.js
 
const [popular, setPopular] = useState({})
 
    const [getOrderState, setGetOrderState] = useState([])
 
    const getOrder = async () => {
      const data = await Axios.get('orders/index');
      return data.
    
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
    console.log(top3Products, "PRODUCTS")data
    }
 
if(top3Products.length === 3) {
    
    return (
      
      <>
      <div className="best-seller">
        <h2> Our Best Sellers: </h2>
      </div>
 
      <Carousel className='main-slide'>
        {top3Products.map(popProduct => (
            <div key={popProduct.product._id}>
              <div className="type">{popProduct.product.productName}</div>
              <img alt="" src={popProduct.product.productImageUrls[popProduct.product.productImageUrls.length -1]}/>
            </div>
        ))}
      </Carousel>
        <div className='homepage-logo'> 
        <Image src={bigLogo} alt="" height={500}/>
        <div className="homepage-about">
          <h3>About Us: </h3>
          <p> Bootleg Bill's Unofficial Rarities.... SOme more content here....</p>
        </div>
        </div>
 
     </>
    )
  }
```

### Outcome

#### Challenges
* Implementing the Seller Verification Code for the Signup.js component proved to be challenging as my initial approach was to set the input field type to “password”. As it was intended to be a secretive passcode which only those explicitly intended to act as Sellers would know, some kind of input masking seemed necessary; unfortunately, using this method, Chrome browser users would find that the password autofill prompt which appears upon form submission would prompt the user to save the verification code instead of their chosen password. The eventual solution was to keep the field’s input type as text while employing the -webkit/-moz-text-security CSS rule, which would mask the input as if it were a password without interacting with Chrome’s autofill in any way.
* Given the large, ambitious scale of this project, at least relative to our past work, maintaining a coordinated vision for the project and attempting to keep our code updated with one another’s progress while preventing conflicts and errors proved to be a constant battle. Constant communication was necessary to ensure that the project elements any one of us was working on would not be treading on the toes of our teammates; without it, far more time might have been spent having to fix bugs arisen from merge conflicts.
* The most taxing ordeal of the project was, without a doubt, implementing the carousel best sellers. Arriving at a solution involved more work with the map() method and useEffect/useState hooks than any other component I built; I was relatively comfortable with map(), but this feature necessitated using it to perform actions far outside anything else I had used it for thus far, and I spent an inordinate amount of my time attempting to discern the precise behaviours of useEffect and useState.

#### Victories
* The most fulfilling win of the project is easily the project itself. We started with the knowledge that we were aiming high; the fact that we were able to plan and construct the app with nearly every feature we initially envisioned is nothing short of a resounding success for each of us.
* Creating an application which neatly separates the functionality for two different categories of user was a significant accomplishment, and offered a great deal of insight into how the average E-Commerce app may function behind the scenes of what a customer would typically see.
* Being given the opportunity to provide custom media assets, and being able to create them to an appreciable quality, went a long way towards making the project feel authentic, unique and personal to us.

#### Future Inclusions and Improvements
* As the majority of our products are derived from TV shows, films and video games, we had initially intended to use a third party IMDB API in order to generate trivia about the product’s source material in the product details view. Due to time constraints, we were unable to implement it in time; I would ideally like to see this minor but enriching feature implemented.
* A product search feature in the product index view is also among potential future features, as well as an Order Ref. search and Order Status filter in the seller dashboard.
* A means of storing the shopping cart data in the browser’s local storage would be beneficial in preventing the shopping cart’s contents from being lost due to a page refresh or connectivity issues.

#### Key Learnings
In the wake of this project, the most significant takeaway for me personally is how intuitive the use of the Express framework became when used in tandem with React. Though React itself proved complex and utterly confounding at times, the amount of flexibility and the features which could be achieved with it were eye-opening once I managed to grasp its principles.
Another major lesson was, particularly for a project of this magnitude, the importance of not only having a thorough workable plan but also maintaining clear communication with teammates. Being able to navigate the seemingly insurmountable list of requirements ahead of us hinged entirely on being able to collaborate, share insights and be receptive to alternative ideas; the last point in particular was a significant one, as we each found ourselves weighed down by tunnel vision when tackling particularly difficult problems. Being able to acknowledge suggestions from our teammates made it easier to get ourselves out of such ruts, and made the end product all the stronger as a result.

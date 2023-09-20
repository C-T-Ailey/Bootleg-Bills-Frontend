# “Bootleg Bill’s Unofficial Audio Rarities” - A Non-Existent Bootleg Record & Cassette E-Commerce App

### Deployed App: https://bootleg-bills.herokuapp.com/
* Please be aware that this project is hosted using Heroku's "Eco" dynos. As such, it may take a few moments for both the frontend and backend to wake up before loading.

> *This repository contains the code for the project's frontend. For the backend code, see [here](https://github.com/C-T-Ailey/Bootleg-Bills-Backend).*

**Note:** The project's frontend is configured to communicate with the deployed backend, currently hosted on Heroku. The backend has CORS configured to allow communication with the deployed frontend. **If you intend to host this project locally**, you will need to reconfigure each API endpoint in the frontend to point to the hosted address of the backend, as well either of the following CORS solutions:
* Use a CORS browser extension;
* Adjust the CORS configuration in the backend's server.js file to reflect whichever localhost address the frontend will be running on.

The frontend also requires a .env file storing the key `REACT_APP_SELLER_KEY=` with a value of your choosing. This will be required if you wish to register as a Seller during the site's Signup process.

![bootlegbills](https://i.imgur.com/d6JCKSg.png)

#### Table of Contents
* Background & Development Status
  * Technologies Employed
  * Post-Submission Additions and Changes
  * Planned Improvements
  * Known Bugs

### Background & Development Status

In its web app form, Bootleg Bill's Unofficial Audio Rarities originated as a project submission for General Assembly's 2022 Software Engineering Immersive bootcamp, developed collaboratively alongside [Christopher Carey](https://www.linkedin.com/in/chriskcarey/ "Chris Carey's LinkedIn") and [Ailish McLaughlin](https://www.linkedin.com/in/ailish-mclaughlin/ "Ailish McLaughlin's LinkedIn"). In the months since completion of the course, I have independently been making efforts towards refactoring several components, rectifying bugs, resolving incomplete features from the initial development process and implementing new ones. The application now serves as both a minor portfolio for my previous code/design work and a testing ground for new ideas. 

The version of the project as it stood upon completion of the course can be found under the "Legacy" branch of this repository, along with a writeup of the project's development process.

This specific repository is for the application's frontend, to which the majority of adjustments so far have been made. Several styling improvements and bugfixes have been implemented, along with new features such as the means to offer and "purchase" design variations for different products, filtering by products by category, About Us & FAQs, and a custom-built "radio" player.

#### Technologies Employed
* Frontend:
  * React
  * React Bootstrap with supplementary custom CSS
  * JavaScript
* Backend:
  * Express
  * MongoDB
  * Mongoose
  * Postman
* Trello & Figma (Planning and whiteboarding)
* Heroku (Deployment)

#### Post-Submission Additions and Changes
* Alphabetical/Reverse Alphabetical and Date Added (ascending/descending) sorting to accompany the Source/Format filters on the Products page.
* Implemented conditionals to hide the audio player on products without audio samples.
* Currently selected image on the Product Details modal view can now be clicked to open the full image in a new tab.
* Product names which are too long to fully fit on their Product card in the Products menu will now display as an animated scrolling marquee when hovered over with the mouse.
* Each product's "bestseller" image, used in the homepage carousel for products which have sold enough to be among the top 3 highest selling products, can now be assigned separately when creating/editing products. This removes the previous limitation of only having four potential images and using the image occupying the last index of the product image array to represent it on the carousel.
* Users can now add up to 8 images and variants for each product.
* The user's cart status is now tracked and stored in their browser's local storage, allowing their selections to persist after refreshing and between visits to the site.
* Cart and Checkout components have been completely reworked. Several persistent bugs have been remedied, layouts and styling have been improved, and code has been significantly streamlined.
* "Add to Cart" functions have been rewritten (and Product & Orders models updated on the backend) so that any selected variant for a product will be displayed in the Cart/Checkout and recorded in a customer's orders. If a product is added to the cart from the Products index, the user will be notified that the product has variants and that proceeding will add the default variation to the cart.
* "Search by Name" feature has been added to the Product index and the Seller Dashboard's product list. 
* Sellers can now specify the name and artist for the track featured in the audio sample when creating/editing a product, which is in turn displayed under the audio player on the Product Details.
* Users can now enjoy a selection of music while they browse, courtesy of the newly implemented Radio feature (subject to further additions and improvements).
* For a comprehensive view of additions and changes, please refer to this repository's commit history.

#### Planned Improvements
* :construction_worker: The majority of variables and functions are currently declared at the top level in App.js and passed as props to various components; refactor the codebase so more functions and props are employed only on their required pages to reduce memory usage.
  * In progress.
* :construction_worker: Rewrite/update styling to make the site more responsive to mobile devices.
  * In progress.
* :construction_worker: Implement functional counters for each product's "Total orders" and "Outstanding orders" metrics on the Seller dashboard.
  * Requires adjustments so counters renew when a product is updated without reloading the dashboard - also requires a significant loading period before orders and statistics are viewable.
  * Feature has been temporarily suspended due to unacceptably slow loading, and will be reinstated when a more efficient solution is found.
    * "Total Orders" has been reinstated as this statistic is now readily available by reading each product's unitsSold property.
* :construction_worker: Improved layout for the homepage.
  * In progress.
* :construction_worker: Make the product index page's filters collapsible.
  * In progress.
* :construction_worker: Featured Product(s) section on the homepage, with a component in the Seller dashboard for updating it.
  * In progress.
* Dedicated lower-resolution images to use as thumbnails on the Products page in order to reduce time and data spent loading them, and a corresponding field in the Product model to designate it.
* Optional "Track list" form input when creating/editing a product.
* Fully custom-designed audio player on the product details view. 

#### Known Bugs
* Firefox Browser-specific issues:
  * The primary font for the site, Bungee Hairline, displays poorly in the Firefox browser. Use of Google Chrome or Microsoft Edge is recommended for viewing until a universally browser-friendly alternative is found.
  * The "Choose a Variant" dropdown selection options are displayed with the Comic Sans font, instead of the intended Bungee Hairline.
    * Issue seems to be a major hitch inherent to Firefox. For now, the select options font has been adjusted to display Courier instead. It might not be ideal, but it's better than Comic Sans.

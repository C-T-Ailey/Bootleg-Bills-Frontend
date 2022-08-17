# Project 04: Full Stack Application using MERN stack

## Bootleg Bill's Unofficial Audio Rarities
> *This repository contains the code for the project's frontend. For the backend code, see [here](https://github.com/C-T-Ailey/project-04). For the deployed app, see [here](https://bootlegbills.herokuapp.com/).*

## Overview
Bootleg Bill's Unofficial Audio Rarities is an E-Commerce site for custom-made cassette mixtapes, including rare/obscure original releases and replications of tapes shown in movies, TV shows and video games. Using a combination of React on the frontend and Express/MongoDB on the backend, Bootleg Bill's allows you to sign up as either a buyer or a seller, where they can browse the shop, see details about specific products, add items to the cart, go to checkout to complete their order and see a list and the status of their past orders. Sellers can also access a dashboard allowing them to add, edit or delete products from the inventory as well as view and edit each order status.

### Technical Requirements Satisfied:
- A functional, full stack SPA utilising the MERN stack, deployed via Heroku.
- Interactive frontend which communicates with the backend via AJAX calls.
- Token based authentication that allows the user to sign up, log in and log out.
- Authorization controlled access to completing checkout and viewing the dashboard, with the Navigation bar changing in response to authorization.
- Additional functionality for logged in users with the "Seller" user role.

### Technologies Used
- React
- HTML and CSS
- React Bootstrap 
- JavaScript 
- Node.js
- Express
- MongoDB/Mongoose
- Git/GitHub
- Figma
- Trello

### Team Members
- Ailish McLaughlin - [GitHub](https://github.com/ailishmcl) | [LinkedIn](www.linkedin.com/in/ailish-mclaughlin)
- Chris Ailey - [GitHub](https://github.com/C-T-Ailey/) | [LinkedIn](www.linkedin.com/in/c-t-ailey)
- Christopher Carey - [GitHub]() | [LinkedIn]()

### Process
Planning:
We dedicated a significant portion of the project's start to planning; we felt it important to prioritise aligning our shared vision in order to maximise efficiency once coding started. We created a user flow graph, ERDs and wireframes to assist this, and then broke the broad plan down into detailed user stories, icebox and MVPs in order to establish a clear roadmap. 
###### Trello
![Trello board screenshot picture](https://i.imgur.com/NdOfvLC.png) [Trello board](https://trello.com/b/qJ5YXS7L/project-four)
###### ERD (Entity Relationship Diagrams)
![ERD screenshot picture](https://i.imgur.com/ii6CfsM.png)
###### User Flow
![Wireframes pictures screenshot](https://i.imgur.com/T7kkjnS.png)
###### Wireframes
![Wireframes pictures screenshot](https://i.imgur.com/qJR7UE8.png)
![Wireframes pictures screenshot](https://i.imgur.com/eJXpLsL.png)
![Wireframes pictures screenshot](https://i.imgur.com/KMv74hr.png)
![Wireframes pictures screenshot](https://i.imgur.com/Fk33EoI.png)
![Wireframes pictures screenshot](https://i.imgur.com/a5voxYU.png)

### Key Features
- Responsive design for different screen sizes and mobile viewports.
- Ability to add one or multiple items to cart and edit their quantity/delete with the cart icon counter the nav bar responding appropriately.
- Top 3 most popular products are displayed in a responsive carousel on the homepage to pique buyer interest and maximise user experience.
- Seller dashboard which facilitates CRUD operations for products and order status.

### Deployed application link
[Heroku App](https://bootlegbills.herokuapp.com/index)

### Challenges
- One of the biggest challenges was ensuring we were aligned as a group on the vision, maintaining good communication and regular code merging to ensure we were working as efficiently as possible towards our end goal.
- It was challenging to figure out how to save entries to the database without submitting data via form, such as for the cart and the order form. We solved it by storing cart information as a state between adding to cart and checking out, but this has the downside of losing the cart data on refresh or loss of connectivity.

### Features to be added in the future
- Emptying the cart upon successfully placing an order.
- A search function for searching products in the shop, as well as for searching orders by reference number on the seller dashboard.
- Add a means of filtering orders in the seller dashboard by order status.
- Storing cart data in local storage so that it isn't erased by a page refresh or loss of connectivity.
- A community forum/review page where users can leave reviews on products, discuss retro music, etc.

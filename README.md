# ![amazonlogo](http://pngimg.com/uploads/amazon/amazon_PNG11.png) Amazon Clone Web App!

# Description
This application is a clone of the Amazon Website. This project is a passion project of mine that models the Amazon Website and implements all the key and major features of what a user can do on the Amazon Website.

# Technologies used:
- React Framework
- Mongoose
- MongoDB
- Express
- NodeJS
- Bootstrap
- Material UI
- StoreJS (local storage NPM package)
- VS Code Editor
- Stripe API 
- socket.io Client (Coming Soon!)
- AWS EC2 for deployment (comming soon!)

# Features currently present in the app (STABLE):
1. Authentication using JSON Web Tokens (JWT).
2. Option to view and delete all the items in our store.
3. Admin users have the option to edit and delete products
3. Option to add items or remove items from the cart for the user.
4. Display the total bill of the cart and update it as soon as the cart is updated by the user.
5. StoreJS Local Storage to store the JWT so that only logged-in users are allowed to buy items.


#Features in Progress:

  🔨 Search Function - this will allow customers to search for products
  🔨 Implementation of Customer Service Feature to allow users to speak with a representative about their orders
  🔨 Option to pay using Stripe Checkout and thus creating a new order and emptying the cart after payment is successful.
  🔨 Option to view all your past orders along with the bill amount for each.
  
  # How to Install 
  *** PLEASE INSTALL NODEJS IF NOT ALREADY INSTALLED) ***
  1. Clone this repository or download the project folder to your computer from GitHub
  2. Open the project in VS Code or your desired IDE.
  3. Open two terminal windows
  4. In the first terminal, navigate to the "backend" folder and enter:
  ### `npm i`
  5. After all the dependencies have been installed, enter:
  ### `nodemon server.js`
  6. Open your second terminal window and navigate to the "client" folder and enter
  ### `npm start`
  7. The application will the start running in developer mode natively on port 3000. You should be able to access the application by navigating to: [http://localhost:3000](http://localhost:3000)

# Contact Me
email: mikalanballentine@gmail

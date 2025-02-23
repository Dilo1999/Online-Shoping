E-commerce Mini App

This is a simple E-commerce Mini App built using React Native and Expo. The app allows users to browse products, add them to a cart, and proceed to checkout. It also includes a payment page for completing the purchase.

Features
   Product Listing: Displays a list of products fetched from an API.
   
   Product Details: Shows detailed information about a selected product.
   
   Shopping Cart: Allows users to add/remove products and view the total price.
   
   Payment Page: Simulates a payment process.
   
   Filtering: Users can filter products by category and price range.

Setup Instructions
   Prerequisites
   Node.js installed on your machine.
   
   Expo CLI installed globally.
   
   Installation
   Clone the repository
   
   
   git clone https://github.com/Dilo1999/Online-Shoping.git
   cd e-commerce-mini-app
   Install dependencies
   
   
   npm install
   Start the development server
   
   
   expo start
   Run the app

Use the Expo Go app on your mobile device to scan the QR code displayed in the terminal or browser.

Alternatively, you can run the app on an emulator or simulator.

Approach
Navigation
The app uses @react-navigation/native for navigation. It includes a stack navigator for moving between different screens and a drawer navigator (though not fully implemented in this version).

State Management
Local State: Used for managing component-specific state (e.g., form inputs, product filters).

AsyncStorage: Used for persisting the shopping cart data locally on the device.

Data Fetching
Products are fetched from the FakeStoreAPI using the fetch API. The data is then displayed in a list, and users can filter products by category or price.

Cart Management
Adding Products: Users can add products to the cart from the product list or product details page.

Removing Products: Users can remove products from the cart.

Clearing Cart: Users can clear the entire cart.

Payment Simulation
The payment page simulates a payment process. It includes form inputs for card details and an amount field. Upon successful "payment," the user is redirected back to the cart page.

Styling
The app uses React Native's StyleSheet for styling. The design is simple and responsive, ensuring a good user experience on both small and large screens.

Future Improvements
   Implement user authentication.
   
   Add a backend for managing products and orders.
   
   Enhance the UI/UX with animations and better design elements.
   
   Integrate a real payment gateway.

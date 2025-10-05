
# **1. Brief Description of the Project**  
This is an Inventory Management System API built with Node.js and MongoDB. It provides CRUD operations for products, stock management with validation to prevent negative inventory, and low stock alerts. The API includes proper error handling and automated testing.  

# **2. Setup and Run Instructions**  
## Prerequisites  
- Node.js installed  
- MongoDB installed and running  

## Installation Steps  
Clone the repository  
`git clone <my-repository-url>`  
`cd inventorymanagement`  

## Install dependencies 
`npm install`  

## Setup Environment Variables
Create .env file in root directory with:  
`MONGODB_URI=connectionString/inventory`  
`MONGODB_URI_TEST=connectionString/inventory-test`  
`PORT=3000`  

## MongoDB Connection Setup  
- Local MongoDB: Ensure MongoDB service is running on your machine  
- MongoDB Atlas (Cloud):  
- Create account at https://www.mongodb.com/cloud/atlas  
- Create a cluster  
- Go to Database Access → Add database user  
- Go to Network Access → Add your IP address  
- Go to Clusters → Click "Connect" → "Connect your application"  
- Copy connection string and update in .env  

## Run the Application  
- Development: npm run dev  
- Production: npm start  

## Run tests  
`npm test`  

## 3. Test Cases Instructions  
Run Test Cases  
`npm test`  
## What Tests Include  
- Product CRUD operations  
- Stock increase/decrease validation  
- Negative stock prevention  
- Low stock alerts  
- Error handling tests  

## 4. Design Choices & Assumptions  
## Design Choices:  
- Separate logic files: Created different files for stock operations and CRUD operations to - keep code organized and focused  
- Separate app.js and server.js: To avoid database connection conflicts during testing  
- PATCH endpoints for stock: Used PATCH instead of PUT for stock updates since we're only - changing part of the data  
- Dedicated inventory endpoints: Created special endpoints just for stock management instead of using generic updates  
## Assumptions:  
- **"Single warehouse system"** = Tracks inventory in ONE location only (not multiple stores/warehouses)  
- **"Stock quantities are integers"** = You can only have whole numbers of items (5 phones, not 5.5 phones)  
- **"No fractional quantities"** = Can't have half-items or decimal quantities  
- **"No user authentication"** = No login required to use the API (open access)  
- **"MongoDB preferred database"** = Chose MongoDB because it's good for this type of data   


## Technologies Used  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB with Mongoose ODM  
- **Testing**: Jest, Supertest  
- **Development**: Nodemon  
- **Environment**: Dotenv  
- **CORS**: For API accessibility 



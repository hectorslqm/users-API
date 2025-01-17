# Hi there 👋
This API is a simple CRUD API built using Node.js and Express.js. The API is used to perform CRUD operations on a MongoDB database.
The API endpoints are as follows:
- GET /
- GET /:id
- POST /
- PUT /:id
- DELETE /:id

# Database Schema
The database schema is as follows:
    - name: String, Mandatory, minimum length 3
    - lastName: String, Mandatory, minimum length 3

# How to execute
1. Clone the repository
2. Run the following command in the terminal
```bash
    npm install
    node api.js
```
3. To run locally you will require a mongoDB database. You can create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a cluster. You will get a connection string which you can use to connect to the database. Replace the connection string in the api.js file with your connection string.
4. You will require a .env file with the following variables:
```bash
    PORT=3000
    MONGO_URI=your_connection_string
```
4. You can use [Postman](https://www.postman.com/) to test the API endpoints.
6. The API endpoints are used to perform CRUD operations on the database.

# Postman Collection
```bash 

localhost:3000/ - GET request will return all the records in the database

localhost:3000/:id - GET request will return the record with the specified id

localhost:3000/ - POST request will add a new record to the database
// Request body should be in JSON format
{
    "name": "John",
    "lastName": "Doe"
}

localhost:3000/:id - PUT request will update the record with the specified id
// Request body should be in JSON format
{
    "name": "Jane",
    "lastName": "Doe"
}

localhost:3000/:id - DELETE request will delete the record with the specified id
```

# Extras
In the `index.js` you can find another example of how to use mongoose. In this example we use name and age 


# Seleksi Tenaga Ahli Diskominfo Jatim by Nur Rizky Romadhon

## Project Overview

This project is a Node.js API built with Express.js and Sequelize for managing **Orders** and **Products**. It allows users to create orders with multiple products, update stock levels, and query product and order details. The application uses MySQL as the database and Sequelize as the ORM.

## Features

- **Create Orders** with multiple products.
- **Update stock and sold counts** for products after orders are placed.
- **Retrieve product and order details**, including quantities and prices.
- **Manage relationships** between orders and products using a pivot table (`OrderProducts`).

## Prerequisites

- **Node.js** (v14 or above)
- **MySQL** (or any other SQL-based database)
- **Docker** (optional, for containerized deployment)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nurrizkyromadhon1/tes-seleksi-tenaga-ahli-diskominfo-jatim.git
   cd tes-seleksi-tenaga-ahli-diskominfo-jatim
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure the environment:**

   Create a `.env` file in the root directory of the project and configure the following values:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=api_test_new
   DB_PORT=3306
   ```

4. **Set up the database:**

   You can use the provided SQL schema or let Sequelize sync the models with the database.

   Option 1: Manually run the SQL schema:

   - Download the database schema file [here](./db/api_test_new.sql) and run it in your MySQL database.
   
   Option 2: Let Sequelize sync the models automatically:

   ```bash
   npm run db:sync
   ```

## API Endpoints

The API will be available at http://localhost:3000

### Products

- List Products: GET /api/products
- Create Product: POST /api/products
- Detail Product: GET /api/products/:id
- Update Product: PUT /api/products/:id
- Delete Product: DELETE /api/products/:id

### Orders

- List Orders: GET /api/orders
- Create Order: POST /api/orders
- Detail Order: GET /api/orders/:id
- Delete Order: DELETE /api/orders/:id

### Create Product

- **URL:** `/api/products`
- **Method:** `POST`
- **Request Body:**

   ```json
   {
      "name": "Laptop X",
      "price": 12000000,
      "stock": 15
    }
   ```

- **Response:**

   ```json
   {
        "message": "Product created successfully",
        "data": {
            "id": 1,
            "name": "Laptop X",
            "price": 12000000,
            "stock": 15,
            "sold": 0,
            "created_at": "2024-09-19T06:29:31.000000Z",
            "updated_at": "2024-09-19T06:29:31.000000Z"
        }
    }
   ```

### Create Order

- **URL:** `/api/orders`
- **Method:** `POST`
- **Request Body:**

   ```json
   {
     "products": [
       {
         "id": 2,
         "quantity": 1
       },
       {
         "id": 3,
         "quantity": 5
       }
     ]
   }
   ```

- **Response:**

   ```json
   {
     "message": "Order created successfully",
     "data": {
       "id": 1,
       "products": [
         {
           "id": 2,
           "name": "Smartphone",
           "price": 7000000,
           "quantity": 1,
           "stock": 49,
           "sold": 1,
           "created_at": "2024-09-20T03:14:49.000000Z",
           "updated_at": "2024-09-20T03:14:49.000000Z"
         },
         {
           "id": 3,
           "name": "Headset",
           "price": 350000,
           "quantity": 5,
           "stock": 45,
           "sold": 5,
           "created_at": "2024-09-20T03:14:49.000000Z",
           "updated_at": "2024-09-20T03:14:49.000000Z"
         }
       ],
       "created_at": "2024-09-20T03:14:49.000000Z",
       "updated_at": "2024-09-20T03:14:49.000000Z"
     }
   }
   ```

## Usage

### Running the API in Development

1. **Start the server:**

   ```bash
   npm run dev
   ```

2. **Open your browser or use Postman to access the API:**

   ```
   http://localhost:3000/api/products
   ```
   ```
   http://localhost:3000/api/orders
   ```

### Sync Database

To automatically create the tables and relations in the database:

```bash
npm run db:sync
```

## Deployment with Docker

This project includes a `Dockerfile` for containerized deployment. Follow the steps below to build and run the application using Docker.

### Steps:

1. **Build the Docker image:**

   ```bash
   docker build -t your-image-name .
   ```

2. **Run the Docker container:**

   ```bash
   docker run -p 3000:3000 --env-file .env your-image-name
   ```

3. **Access the API at:**

   ```
   http://localhost:3000/api/products
   ```
   ```
   http://localhost:3000/api/orders
   ```
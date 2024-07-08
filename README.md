## Overview

This is my Monday Fullstack application
<br>It can be used as a view in the Monday app framework


## Install - Dev

1. Make sure you have Node (v18+) installed

<br>
3. Install dependencies with npm:

```bash
npm install
```

## Configure your Monday App
See .env.example for example keys
## Run the project

1. Create a free mongoDB database/cluster and add the uri to .env as DATABASE_URI
2. Generate an API key with openSSL
```
openssl rand -hex 32
```
4. Add API key to .env as API_KEY and to .env in the client folder as REACT_APP_API_KEY
6. Add PORT=8080 to backend .env, and pick a port for the client .env. I have PORT=8301.
7. Add the client port to /config/allowedOrigins.ts for CORS exception. 

8. Add REACT_APP_API_URL=http://localhost:8080/api or setup a proxy in client package.json for your server and set the .env to REACT_APP_API_URL=/api
```
  "proxy": "http://localhost:8080"
```
8. Build the client code and run the server locally with the command:

```bash
npm run dev-server
```
9. Run the client locally and use the preview with url function in you monday app feature
```
npm run dev
```
10. Make sure to give the feature access to the board and read/write permissions from your monday developer tools. 

## Install - Production

I have deployed the app to a production build which can be found here:

https://ebc89-service-24294254-f6d3d8eb.us.monday.app

To deploy your own follow the steps above then:
1.  Set your environment variables in the Monday Code feature UI for DATABASE_URI, your generated API_KEY for the fragrances backend, and PORT.
2. Remove the proxy from package.json
3. Create a .env.production file in the client folder with REACT_APP_API_URL=/api
and REACT_APP_API_KEY=your-openssl-key
4. In the client folder 

```
npm run build
```


You will also need to whitelist the origin IP address (or all IP addresses as long as your credentials are sound) in the mongoDB security/network access page. 

Then using the monday code cli run 

```
mapps code:push
```

This should generate your own url that you can use for your feature. 

If you visit my url above you will be able to interact with the database but you won't be able to submit an order as the frontend uses Mondays seamless integration via the MondaySDK to modify the boards. 


<br>
<br>

# Fragrance API Documentation

## Base URL
`/api`

## Authentication
All routes require API key authentication.

## Rate Limiting
API requests are subject to rate limiting.

## Endpoints

### Get All Fragrances
- **URL:** `/fragrances`
- **Method:** GET
- **Query Parameters:**
  - `page` (optional): Page number for pagination (default: 1)
  - `limit` (optional): Number of items per page (default: 20)
  - `sort` (optional): Field to sort by (prefix with `-` for descending order, default: `name`)
- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    {
      "fragrances": [
        {
          "name": "string",
          "description": "string",
          "category": "string",
          "image_url": "string",
          "created_at": "date",
          "updated_at": "date"
        }
      ],
      "totalPages": "number",
      "currentPage": "number"
    }
    ```

### Get Fragrance by ID
- **URL:** `/fragrances/:id`
- **Method:** GET
- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    {
      "name": "string",
      "description": "string",
      "category": "string",
      "image_url": "string",
      "created_at": "date",
      "updated_at": "date"
    }
    ```

### Create New Fragrance
- **URL:** `/fragrances`
- **Method:** POST
- **Data Params:**
  ```json
  {
    "name": "string",
    "description": "string",
    "category": "string",
    "image_url": "string"
  }


- **Success Response:**
  - **Code:** 201
  - **Content:** 
  ```json
    {
    "message": "string",
    "fragrance": {
        "name": "string",
        "description": "string",
        "category": "string",
        "image_url": "string",
        "created_at": "date",
        "updated_at": "date"
    }
    }

### Update Fragrance
- **URL:** `/fragrances/:id`
- **Method:** PATCH
- **Data Params:**
  ```json
  {
  "name": "string",
  "description": "string",
  "category": "string",
  "image_url": "string"
    }

- **Success Response:**
  - **Code:** 200
  - **Content:** 
  ```json
  {
  "message": "string",
  "fragrance": {
    "name": "string",
    "description": "string",
    "category": "string",
    "image_url": "string",
    "created_at": "date",
    "updated_at": "date"
    }
  }

### Delete Fragrance
- **URL:** `/fragrances/:id`
- **Method:** DELETE
- **Success Response:**
  - **Code:** 200
  - **Content:** 
  ```json
    {
    "message": "string",
    "deletedFragrance": {
        "name": "string",
        "description": "string",
        "category": "string",
        "image_url": "string",
        "created_at": "date",
        "updated_at": "date"
    }
    }
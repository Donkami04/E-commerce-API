
# API REST - E-commerce

This API was mainly built in Node.JS with the Express framework. The main goal of this API is to create customers, users, products, categories and orders. It has different middleware for data validation, authentication and authorization layers.  For the database was used docker technology in a Postgres container. The responsibilities were distributed by services, routes, schemas and models. The following were the main dependencies used to build the API: jsonwebtoken, passport, bcrypt, sequelize, cors, express, dotenv, joi, boom, mysql12. 

In general for all REST tools GET was used to obtain general information and with the `id` parameter specific information. POST was used to create new elements, PATCH and DELETE to edit or delete a specific element with the `id` parameter  

## API Reference

### Get all customer

```http
  GET /api/v1/customer
```

Get the public information of all customeres|

### Get one customer

```http
  GET /api/v1/customer/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | Id of customer to fetch |

### Create one customer

```http
  POST /api/v1/customer
```
All the following data are necessary for the creation of a customer.

```javascript
{
	"name": "juan",
	"lastName": "garveis",
	"phone": "3434347",	
	"user":{
		"email": "juan@mail.com",
		"password": "12345678"
		}	
}
```
### Edit one customer

```http
  PATCH /api/v1/customer/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | Id of customer to edit |

### Delete one customer

```http
  DELETE /api/v1/customer/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | Id of customer to delete |

## Login

```http
  POST /api/v1/auth/login
```
This path is needed to validate the authentication, this will return a token which must be used for some of the other routes.

```
{
	"email": "juan@mail.com",
	"password": "12345678"
}
```

If the users forgets the password, they can recover it through the following endpoint by entering only the email address.

```http
  POST /api/v1/auth/recovery
```

This will send a link to the registered email with a link-token to assign a new password which will be in the next endpoint

```http
  POST /api/v1/auth/recovery
```
```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5c...",
	"newPassword": "12345678",
	"confirm": "12345678"
}

```

### Get all products

```http
  GET /api/v1/products
```

Get the information of all products|

### Get one product

```http
  GET /api/v1/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | Id of product to fetch |

### Create one product

```http
  POST /api/v1/products
```
All the following data are necessary for the creation of a products.

```javascript
{
	"name": "Red Pant",
	"price": 100,
	"image": "http://placeimg.com/640/480",
	"description":"Pant Pant Pant ",
	"categoryId": 6
}
```
### Edit one product

```http
  PATCH /api/v1/product/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | Id of product to edit |

### Delete one product

```http
  DELETE /api/v1/product/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | Id of product to delete |

### Get all categories

```http
  GET /api/v1/categories
```

Get the information of all categories|

### Get one category

```http
  GET /api/v1/categories/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | Id of category to fetch |

### Create one category

```http
  POST /api/v1/categories
```
All the following data are necessary for the creation of a category.

The authorization layer validates if the role is admin, since only admin role can create new categories.

```javascript
{
	"name": "Red Pant",
	"price": 100,
	"image": "http://placeimg.com/640/480",
	"description":"Pant Pant Pant ",
	"categoryId": 6
}
```
### Edit one category

```http
  PATCH /api/v1/categories/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | Id of categoriy to edit |

### Delete one category

```http
  DELETE /api/v1/categories/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | Id of category to delete |


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DATABASE_URL`

`JWT_SECRET`

`JWT_SECRET_RECOVERY`

`SMTP_EMAIL`

`SMTP_PASSWORD`



# User Management API Documentation

## Description

This is a **User Management API** built using **Node.js**, **Express.js**, **JWT (JSON Web Token)** for authentication, and **bcrypt** for password hashing. The system allows users to register, login, and manage their profiles. Administrators have additional access to manage other users.

### Prerequisites:

-   Node.js and npm installed
-   MongoDB
-   JWT and bcrypt for security and authentication

### Run the application

-   npm run dev

### Base URL

The API is deployed at

```
 https://usermanagement-rt.onrender.com/api/
```

### Routes

#### 1. POST /api/user/register

body

```
{
    "name" : "test",
    "mobileNo" : "1111111111",
    "password" : "password@123",
    "email"  : "abc@gmail.com",
    "bio" : "hello"
}


```

#### 2. POST /api/user/login

body

```
{
    "password" : "password@123",
    "email"  : "abc@gmail.com",
}

```

#### 3. GET /api/user/profile

pass token in authetication tab from testing tool

#### 4. POST /api/user/update_profile

pass token in authetication tab from testing tool

body

```
{
   "name" : "test1"
}

```

#### 4. POST /api/user/update_availability

pass token in authetication tab from testing tool

body

```
{
   "availability" : "unavailable"
}

```

### Routes for Admin

#### 4. POST /api/admin/login

body

```
{
    "name" : "admin",
    "mobileNo" : "1111",
    "password" : "admi@123",
    "email"  : "acb@gmail.com"
}

```

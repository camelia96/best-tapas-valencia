# 🥘 Best Tapas Valencia API

A RESTful API for managing tapas, bars, categories, and related data.  

This project is built as a **portfolio backend project**, focused on clean architecture, authentication with JWT, and API-to-API communication.

---

## 🚀 Overview

Best Tapas Valencia API allows you to:

- Authenticate using JSON Web Tokens (JWT)
- Manage tapas, bars, categories, areas and tags
- Protect API routes using middleware
- Easily test and explore the API using Postman

There is **no frontend required** to use this API. All interactions are done through HTTP requests.

---

## 🔒 Access Policy

For security reasons, the API is configured with a **single test user**.

The credentials for this user are stored inside this collection using collection variables. 

**Access to protected endpoints is therefore intended to be done via the provided Postman collection.**

---

## 🔐 Authentication

Authentication is handled using **JWT (JSON Web Tokens)**. 

**The following instructions are only available to understand how the authentication flow would work in real case scenarios.*

### Login Flow

1. Call the login endpoint:

```
POST /api/auth/login
```

2. Provide valid credentials with a JSON Body Request.

3. The API returns an **access token (JWT)**.

4. Use the token in all protected requests via the `Authorization` header:

```
Authorization: Bearer <your_token>
```

All protected endpoints require a **valid and non-expired token**.

---

## 🧪 Postman Usage

A [Postman Collection](https://web.postman.co/workspace/cf02a57e-03fe-4ce4-993b-f766b6619562/collection/27364724-957ab696-91a6-448d-ba68-ddcbe81f2d7f?action=share&source=copy-link&creator=27364724) is provided to make testing and reviewing the API easier.

- Once in the ```POST /api/auth/login``` endpoint, the prepared request (with collection variables)  retrieves a JWT from the API.
- A Postman script stores the token as a **collection variable**.
- All protected requests automatically include the token in the `Authorization` header.
- No manual setup is required after login.
- If the token expires (1h), you can just call the login endpoint to regain access to the rest of the API.

This allows anyone reviewing the project to test the API quickly and consistently.

---

## 📦 Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL (Supabase)**
- **JWT (jsonwebtoken)**
- **Postman** for API testing and documentation

---

## 📚 API Documentation

Each endpoint includes detailed documentation inside the Postman collection.

The collection-level documentation explains authentication and general usage.

---
### 🔗 Links

[Live DEMO](https://best-tapas-valencia.vercel.app/)

[Postman Collection](https://web.postman.co/workspace/cf02a57e-03fe-4ce4-993b-f766b6619562/collection/27364724-957ab696-91a6-448d-ba68-ddcbe81f2d7f?action=share&source=copy-link&creator=27364724)

---
## ✨ Notes

- This setup is intentionally limited and designed for **demonstration** and portfolio purposes only.

- This API is meant to be for API-to-API communication

- JWTs are validated on each protected request


---
## 📌 License

This project is for portfolio purposes. All design rights reserved.

Designed & Developed by ```Camelia```
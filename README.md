## NextJs Rest API

This project demonstrates how to build a REST API **Next.js API routes**. It showcases a simple and clean setup for creating backend endpoints within a Next.js application, suitable for full-stack development.

## 🚀 Features

- Built with **Next.js**
- API routing with `/app/api/:path*`
- Handles **GET**, **POST**, **PATCH**, and **DELETE** requests
- 🔐 Token-based authentication middleware
- 📝 Logging middleware for request method and URL
- 🧩 Modular and scalable file structure

## 🛠️ Technologies Used

- Next.js
- Node.js
- TypeScript
- MongoDB

```
/app
  /api
    /(auth)
      /users
    /(dashboard)
      /blogs
      /categories

/middlewares
  /api
    authMiddleware.ts            # Auth token validation
    logMiddleware.ts             # Request logger
```

## 🚀 Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/Elmoustafi-22/nextjs-rest-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000/api/:path*` to test the endpoints.

   ## 📬 Example API Endpoints

- `GET /api/users` – Fetch all users
- `POST /api/users` – Create a new user
- `GET /api/blogs` – Fetch all blogs
- `POST /api/blogs?userId=[user Id]&categoryId=[category ID]` – create a blog
- `DELETE /api/blogs/[blog ID]?userId=[user Id]&categoryId=[category ID]` – Delete an item

## 🧱 Middleware Overview

### 🔐 `authMiddleware.ts`
A basic middleware that extracts the bearer token from the `Authorization` header and checks its validity.

```ts
// Example logic
Authorization: Bearer <token>
```

```ts
const token = request.headers.get('authorization')?.split(" ")[1];
```

If the token is invalid or missing, the request is denied with a `401 Unauthorized` response.

---

### 📝 `logMiddleware.ts`
Logs request details (method and URL) for specific routes like `/api/blogs`.

```ts
// Example output
GET http://localhost:3000/api/blogs YES
```

---

### 🧪 Sample Middleware Logic (in `route.ts`)
```ts
if (request.url.includes("/api/blogs")) {
    const logResult = logMiddleware(request)
    console.log(logResult.response)
}

const authResult = authMiddleware(request)
if (!authResult?.isValid) {
    return new NextResponse(JSON.stringify({ success: false, message: "Unauthorised" }), { status: 401 })
}
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
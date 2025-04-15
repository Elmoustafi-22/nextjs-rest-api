## NextJs Rest API

This project demonstrates how to build a REST API **Next.js API routes**. It showcases a simple and clean setup for creating backend endpoints within a Next.js application, suitable for full-stack development.

## 🚀 Features

- Built with **Next.js**
- API routing with `/app/api/:path*`
- Handles **GET**, **POST**, **PATCH**, and **DELETE** requests

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

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
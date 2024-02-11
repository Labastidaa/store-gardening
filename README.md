## About this project

This is an e-Commerce created using App Directory inspired in a gardening business.

### Core Technologies

This project was created using latest technologies in the React Ecosystem which you can see in detail in the `package.json` file.

- TypeScript
- Next.js
- PostgreSQL
- Planetscale Database Management
- Deployed to Vercel
- Tailwind CSS

For the **Store** operations like fetching products and categories, cart management, payment **Server Actions**. **Admin dashboard** use **Client Components** and REST API endpoints, fetching data with Tanstack Query.

## Store Features

- Clerk Authentication and User Management System.
- Product and Categories pages.
- Add/Remove Products To Cart.
- Cart syncs with the database to persist in Desktop and Mobile.
- Cart Review before Checkout.
- Stripe Checkout and Payments.
- User profile page with orders.

## Admin Dashboard Features

Manage your products and categories. Protected routes and pages, must be registered and admin to access.

Products management

- Add/Edit/Delete products using a form. (React Hook Form & Zod)
- Upload images for the products. (Cloudinary)
- Control product properties like Featured and Archived.
- Overview table with all products properties and pagination. (Tanstack Table & Query)
- Search / Filter / Sort products in the table.

Categories management

- Add Category.
- Edit/Delete categories.
- Overview table with all categories properties and pagination.
- Search / Filter / Sort categories in the table.

## Visit the Store

[Rhiz Gardening Store](https://store-gardening.vercel.app/)

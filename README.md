# ShopEase E-Commerce Frontend

This project is a responsive e-commerce frontend built with React and Vite. It consumes live product data from the Fake Store API and demonstrates key e-commerce workflows like product discovery, filtering, sorting, and cart management.

## Features

- Responsive product listing page with image, title, price, and Add to Cart
- Search products by title with live results
- Filter products by category using API-driven category data
- Sort products by price or title without refetching data
- Mini cart dropdown with cart count, item quantity controls, and checkout action
- Full cart page with item details, remove item, quantity adjustment, and order summary
- Cart persistence using `localStorage`
- Tailwind CSS styling with adaptive layouts and interactive buttons

## Setup

```bash
npm install
npm run dev
```

Open the local development URL shown by Vite to preview the app.

## Production build

```bash
npm run build
```

## Approach

- Used React functional components and Hooks for state management
- Implemented a cart provider via Context API for app-wide cart state
- Fetched products and categories from Fake Store API once, then handled search/filter/sort on the client
- Added local persistence so cart contents survive refresh

## Notes

- This project is connected to the GitHub repository: `https://github.com/saipampari2/ECommerce.git`
- The project is intended as a frontend demo and does not include real checkout/payment processing

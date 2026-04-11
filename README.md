# 🏗️ Sustainable Tech Solutions - Frontend

A modern, eco-friendly e-commerce platform built with Next.js, dedicated to providing sustainable technology solutions. 🛒♻️

## 🚀 Live Demo
- **URL**: [https://sustainable-frontend-phi.vercel.app/](https://sustainable-frontend-phi.vercel.app/)

## 🛠️ Tech Stack
This project is built using the latest web technologies to ensure performance, scalability, and sustainability.

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **State Management**: [React Context API](https://react.dev/learn/passing-data-deeply-with-context) (for Cart & Auth)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Fonts**: Geist Sans & Geist Mono (via `next/font`)

## ✨ Key Features
- **🌐 Responsive UI**: Optimized for all devices (Mobile, Tablet, Desktop).
- **🛍️ Product Management**: 
  - Dynamic discovery of products via category listing.
  - Detailed product pages with dynamic routing (`/product/[slug]`).
- **🛒 Advanced Cart System**: 
  - Real-time cart updates with persistence.
  - One-by-one quantity management (Increase/Decrease).
  - Toast notifications for every action (Add, Remove, Clear).
  - Floating cart badge in header showing total items.
- **🌗 Theme Toggle**: Dark and light mode support via DaisyUI.
- **🚀 Performance**: Server-side rendering (SSR) and client-side interactivity correctly balanced.

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/armanhossain-atunu/Sustainable-Frontend.git
cd Sustainable-Frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔗 API Integration
The frontend connects to the following backend:
- **Base URL**: `https://sustainable-server.vercel.app/api/v1`
- **Endpoints used**:
  - `GET /products`: Fetch all products.
  - `GET /products?slug=[slug]`: Fetch specific product details.

## 📂 Project Structure
```text
src/
├── app/            # Next.js App Router routes
├── Components/     # Reusable UI components (Hero, Header, etc.)
├── context/        # Context Providers (Cart, Auth)
├── types/          # TypeScript interfaces
└── globals.css     # Global styles & Tailwind config
```

## 📄 License
This project is private and intended for internal use.

---
Built with ❤️ by [Arman Hossain Atunu](https://github.com/armanhossain-atunu)

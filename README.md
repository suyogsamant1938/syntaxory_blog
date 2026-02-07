# Syntaxory Blog 🚀

Syntaxory is a premium technical blogging platform designed for developers. It features AI-powered content generation, a secure subscription model, and an intuitive management dashboard.

![Syntaxory Logo](logo1.png)

## ✨ Features

-   **🤖 AI Content Generation**: Integrated with Google Gemini 1.5 Flash to generate high-quality technical articles automatically.
-   **💳 Premium Subscriptions**: Secure payment processing with Stripe for accessing exclusive content and features.
-   **🔐 Robust Authentication**: Powered by Supabase Auth with Row-Level Security (RLS) for data protection.
-   **📊 Admin Dashboard**: Full control over user management, blog moderation, and system health checks.
-   **📱 Modern UI/UX**: Responsive design built with React 19, featuring smooth transitions and dark mode support.
-   **☁️ Serverless Architecture**: Optimized for Vercel with high-performance serverless functions.

## 🛠️ Tech Stack

-   **Frontend**: React 19, Vite, React Router 7, Context API.
-   **Backend**: Node.js, Express (Serverless).
-   **Database**: Supabase (PostgreSQL).
-   **AI**: Google Generative AI (Gemini).
-   **Payments**: Stripe API & Webhooks.
-   **Styling**: Custom CSS Design System.

## 🚀 Getting Started

### Prerequisites

-   Node.js (v20 or higher)
-   npm or yarn
-   Supabase Account
-   Stripe Account
-   Google Gemini API Key

### Local Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/syntaxory_blog.git
    cd syntaxory_blog
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create `.env` files in both `client/` and `server/` directories. Refer to the [Deployment Guide](DEPLOYMENT_GUIDE.md) for required keys.

4.  **Run Locally**:
    ```bash
    # Run backend
    cd server && npm run dev
    
    # Run frontend
    cd client && npm run dev
    ```

## 📦 Deployment

This project is optimized for **Vercel**. For detailed step-by-step instructions on environment configuration and build settings, please see our [Deployment Guide](DEPLOYMENT_GUIDE.md).

## 📄 License

This project is licensed under the ISC License.

---

Built with ❤️ by [Your Name/GitHub Handle]

# Deployment Guide for Syntaxory Blog

This guide outlines the steps to deploy your MERN stack application to **Vercel** as a single project.

## 1. Project Changes Made
I have already applied the necessary changes to your repository:
- **Server**: Routes are now mounted under `/api` to avoid conflicts. The `app` is exported for Vercel Serverless compatibility.
- **Client**: The API base URL now defaults to `/api`.
- **Configuration**: Added `vercel.json` for routing and `package.json` in the root to handle workspaces.

## 2. Environment Variables
You must set the following Environment Variables in your Vercel Project Settings.

### Server Variables
| Variable Name | Value | Description |
|---|---|---|
| `FRONTEND_URL` | `https://your-project-name.vercel.app` | The URL of your deployed app (no trailing slash). Update this *after* you get the domain. |
| `SUPABASE_URL` | *Your Supabase URL* | |
| `SUPABASE_SERVICE_ROLE_KEY` | *Your Service Role Key* | **Critical**: Do not use the Anon key here. |
| `STRIPE_SECRET_KEY` | *Your Stripe Secret Key* | |
| `STRIPE_WEBHOOK_SECRET` | *Your Stripe Webhook Secret* | For verifying webhooks. |
| `STRIPE_PRICE_ID` | *Your Stripe Price ID* | |
| `GEMINI_API_KEY` | *Your Gemini API Key* | For AI blog generation. |

### Client Variables
| Variable Name | Value | Description |
|---|---|---|
| `VITE_API_URL` | `/api` | **IMPORTANT**: Set this simply to `/api`. This ensures requests are routed through the Vercel rewrite rules to the server. |
| `VITE_SUPABASE_URL` | *Your Supabase URL* | |
| `VITE_SUPABASE_ANON_KEY` | *Your Anon Key* | |

## 3. How to Deploy to Vercel

1.  **Push to GitHub**: Commit and push all changes to your GitHub repository.
2.  **Import to Vercel**:
    - Go to [Vercel Dashboard](https://vercel.com/dashboard).
    - Click **"Add New..."** -> **"Project"**.
    - Import your `syntaxory_blog` repository.
3.  **Configure Project**:
    - **Framework Preset**: Select **Vite**.
    - **Root Directory**: Keep it as `./` (the root of your project).
    - **Build and Output Settings**:
        - **Build Command**: `npm run build`
        - **Output Directory**: `dist` (This is now the default, so it's easier!)
        - **Install Command**: `npm install`
    - **Environment Variables**: Add all the variables listed above.
    - **Click Deploy**.

## 4. Post-Deployment Checks
- **Stripe Webhooks**: Update your Stripe Dashboard Webhook Endpoint to `https://your-project-name.vercel.app/api/webhook`.
- **CORS**: Ensure your `FRONTEND_URL` matches the deployed domain exactly.

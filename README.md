# Somatic Stroop Test — Deployment Guide

This is a modern, fullstack version of the Somatic Stroop Test built with Next.js, Tailwind CSS, and Prisma.

## Prerequisites
- Node.js v18.17 or later
- npm (standard with Node.js)

## Deployment to Cloud (Recommended)

This project is optimized for deployment on Vercel or Netlify with **Supabase (PostgreSQL)** for persistent storage.

1.  **Push to GitHub**: Push your local code to a GitHub repository.
2.  **Setup Supabase**:
    - Create a new project at [supabase.com](https://supabase.com).
    - Go to **Project Settings** > **Database**.
    - Copy the **Connection URI** (use the Transaction mode on port 6543 for serverless).
3.  **Deploy App**: 
    - Connect your GitHub repo to Vercel/Netlify.
    - Set the `DATABASE_URL` environment variable to your Supabase connection string.
4.  **Automatic Migrations**: The project automatically runs `prisma generate` and `prisma migrate deploy` during the build process.

## Local Deployment (Clinical Use)
To keep data on your own hardware with zero cost:
1.  **Build**: `npm run build`
2.  **Start Production**: `npm start`
3.  **Access**: Open `http://<YOUR-IP>:3000` on any tablet on the same Wi-Fi.

### 3. Quick Start (Development)
```bash
npm install
npx prisma generate
npm run dev
```

## Deployment to a Local Server/Laptop (Clinical Setting)

If you want to run this on a local server (e.g., in a clinic) so tablets on the same Wi-Fi can access it:

1.  **Build the Project**:
    ```bash
    npm run build
    ```

2.  **Start Production Server**:
    ```bash
    npm start
    ```

3.  **Find your IP Address**:
    On Mac/Linux: `ifconfig`
    On Windows: `ipconfig`

4.  **Access on Tablets**:
    Open `http://<YOUR-IP>:3000` on the tablet browsers.

## Data Storage
- **Database**: All session data is stored in `prisma/dev.db` (SQLite).
- **Exports**: Data can be exported as CSV directly from the Admin Dashboard in the app.

---

## Task Parameters
- **Fixation**: 600ms
- **Stimulus Max Duration**: 3000ms
- **Practice Block**: 10 trials
- **Test Block**: 60 trials
- **Somatic Interference Score**: Mean RT (Somatic) - Mean RT (Neutral)

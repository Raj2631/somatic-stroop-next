# Somatic Stroop Test — Deployment Guide

This is a modern, fullstack version of the Somatic Stroop Test built with Next.js, Tailwind CSS, and Prisma.

## Prerequisites
- Node.js v18.17 or later
- npm (standard with Node.js)

## Quick Start (Local Setup)

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Setup Database**:
    ```bash
    npx prisma migrate dev --name init
    ```

3.  **Start the Server**:
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` in your browser.

## Deployment to Vercel (Recommended)

1.  Push the project to a GitHub repository.
2.  Connect the repository to **Vercel**.
3.  **Important**: Since this version uses SQLite, the database will be reset on every deployment. For production persistence, avoid Vercel's serverless functions or connect to an external PostgreSQL database by changing the `datasource` in `prisma/schema.prisma`.

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

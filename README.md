## Backend (Node/Express + MongoDB)

Prereqs: Node 18+, MongoDB running locally (or provide MONGO_URL).

1. Install
   cd backend
   npm install

2. Start (dev)
   # ensure MongoDB is running on default port
   npm run dev
   # server will run on http://localhost:5000

3. Env:
   - MONGO_URL: optional, default mongodb://127.0.0.1:27017/vibecommerce
   - PORT: optional, default 5000
4. Api Doc Link
  https://documenter.getpostman.com/view/32562768/2sB3Wnw2Ak

Frontend (React + Tailwind CSS)
1. Install
   cd frontend
   npm install

2. Add Tailwind CSS
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
  
   Update tailwind.config.js:

    module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    };

Add Tailwind imports to src/index.css:

@tailwind base;
@tailwind components;
@tailwind utilities;

3. Start (dev)
  npm run dev


# Harsh Raj Developer Portfolio

Modern MEAN-stack developer portfolio for Harsh Raj. The frontend is a standalone Angular SPA styled with TailwindCSS and designed for both Vercel and GitHub Pages deployment. The backend is an Express + MongoDB API intended for separate hosting on Render or Railway with MongoDB Atlas.

## Stack

- Frontend: Angular 21, TailwindCSS, Angular CDK, standalone components, lazy project detail route
- Backend: Node.js, Express 5, Mongoose, MongoDB Atlas
- Deployment: GitHub Pages or Vercel for `frontend`, Render or Railway for `backend`

## Project structure

```text
.
├── backend
│   ├── render.yaml
│   ├── src
│   │   ├── app.js
│   │   ├── config
│   │   ├── controllers
│   │   ├── data
│   │   ├── db
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── server.js
│   │   └── server.test.js
│   └── .env.example
├── frontend
│   ├── angular.json
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── src
│       ├── app
│       ├── assets
│       ├── environments
│       ├── index.html
│       ├── main.ts
│       └── styles.css
└── package.json
```

## Frontend features

- Single-page SaaS-style portfolio with smooth-scroll section navigation
- Full-screen hero with animated background, floating tech badges, and CV download
- Visual about cards, animated skill grid, progress rings, radar chart, and contribution widget
- Project filtering by technology and lazy-loaded project detail route for deep linking
- Scroll progress bar, dark/light theme toggle, hover states, and intersection-observer reveals
- Local SVG placeholders for screenshots and diagrams so the UI works before final assets are added

## Backend API

The API exposes:

- `GET /projects`
- `GET /projects/:slug`
- `GET /skills`
- `GET /education`
- `GET /certificates`
- `GET /health`

MongoDB collections:

- `projects`
- `skills`
- `education`
- `certificates`

Seed data is defined in [backend/src/data/seed-data.js](/Users/harshraj/Desktop/VS Code/Portfolio/backend/src/data/seed-data.js).

## Local development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure backend environment

```bash
cp backend/.env.example backend/.env
```

Set `MONGODB_URI` to your MongoDB Atlas connection string or local Mongo instance.

### 3. Seed MongoDB

```bash
npm run seed
```

### 4. Start the backend

```bash
npm run dev:backend
```

### 5. Start the frontend

```bash
npm run dev:frontend
```

Frontend runs on `http://localhost:4200`. Backend runs on `http://localhost:4000`.

## Production deployment

### Frontend on GitHub Pages

GitHub Pages can host only the Angular frontend. The Express + MongoDB backend must remain on Render, Railway, or another Node-capable host. The GitHub Pages build uses hash-based routing so `/project/:slug` pages still work after deployment.

1. Create a GitHub repository and push this project to the `main` branch.
2. In GitHub, open `Settings` -> `Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` and the included workflow at [deploy-github-pages.yml](/Users/harshraj/Desktop/VS%20Code/Portfolio/.github/workflows/deploy-github-pages.yml) will publish the site.

Useful commands:

```bash
npm run build:gh-pages
```

If you preview the GitHub Pages build locally, the app uses fallback portfolio content when `/api` is unavailable.

### Backend

1. Create a MongoDB Atlas cluster and copy the connection string.
2. Deploy `backend` to Render or Railway.
3. Set:
   - `MONGODB_URI`
   - `CLIENT_URLS`
   - `NODE_ENV=production`
4. Run the seed script once against production data:

```bash
npm run seed --workspace backend
```

If using Render, the included [backend/render.yaml](/Users/harshraj/Desktop/VS Code/Portfolio/backend/render.yaml) can be used as a starting point.

### Frontend on Vercel

1. Import the repo into Vercel.
2. Set the project Root Directory to `frontend`.
3. Keep the build command as `npm run build`.
4. Keep the output directory as `dist/portfolio-frontend`.
5. Update [frontend/vercel.json](/Users/harshraj/Desktop/VS Code/Portfolio/frontend/vercel.json) so `/api/:path*` points to your real backend domain.
6. Deploy.

The frontend uses `environment.prod.ts` with `apiBaseUrl: '/api'`, so Vercel rewrites forward frontend API calls to the external Express service. Add both your production domain and any required Vercel preview domains to `CLIENT_URLS` as a comma-separated list.

## Git setup

This project can be initialized locally with:

```bash
git init -b main
git add .
git commit -m "Initial portfolio setup"
```

Then create a remote GitHub repository named `harsh-raj-portfolio` and connect it:

```bash
git remote add origin https://github.com/<your-username>/harsh-raj-portfolio.git
git push -u origin main
```

## Performance notes

- Images use Angular `NgOptimizedImage` and lazy loading for non-critical media.
- The project detail route is lazy loaded and preloaded via `PreloadAllModules`.
- Decorative widgets use Angular `@defer` to keep the initial payload lighter.
- API responses include cache headers for static portfolio content.
- Static SVG placeholders keep the visual layout stable without oversized assets.

## Content to replace before launch

- Social links in [frontend/src/app/core/data/portfolio-fallback.ts](/Users/harshraj/Desktop/VS Code/Portfolio/frontend/src/app/core/data/portfolio-fallback.ts)
- GitHub repository links in [backend/src/data/seed-data.js](/Users/harshraj/Desktop/VS Code/Portfolio/backend/src/data/seed-data.js)
- Email placeholder in [frontend/src/app/core/data/portfolio-fallback.ts](/Users/harshraj/Desktop/VS Code/Portfolio/frontend/src/app/core/data/portfolio-fallback.ts)
- Placeholder profile image and SVG project visuals in [frontend/src/assets/images/profile/profile-placeholder.svg](/Users/harshraj/Desktop/VS Code/Portfolio/frontend/src/assets/images/profile/profile-placeholder.svg)

## Notes

- The provided PDF CV is available to the frontend at `assets/Harsh-Raj-CV.pdf`.
- The UI is designed to work even if the API is unavailable by falling back to local portfolio content.
- Personal social URLs and repository URLs were left as placeholders because the attached CV could not be parsed confidently enough for production use.

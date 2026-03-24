# Harsh Raj Portfolio

Modern developer portfolio for Harsh Raj built with:

- Angular 21 frontend
- Express + MongoDB backend
- GitHub Pages or Vercel for frontend deployment
- Render or Railway for backend deployment

## Structure

```text
.
├── frontend
├── backend
├── package.json
└── README.md
```

## Local development

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev:frontend
```

Start backend:

```bash
npm run dev:backend
```

Frontend:
- `http://localhost:4200`

Backend:
- `http://localhost:4000`

## Build

Frontend production build:

```bash
npm run build:frontend
```

Frontend GitHub Pages build:

```bash
npm run build:gh-pages -- --base-href /My-Portfolio/
```

Backend test:

```bash
npm run test --workspace backend
```

## API

Available endpoints:

- `GET /projects`
- `GET /projects/:slug`
- `GET /skills`
- `GET /education`
- `GET /certificates`
- `GET /health`

## Deployment

### GitHub Pages

The repository includes a GitHub Actions workflow for Pages deployment:

- [deploy-github-pages.yml](/Users/harshraj/Desktop/VS%20Code/Portfolio/.github/workflows/deploy-github-pages.yml)

Required:

1. Push code to the `main` branch
2. In GitHub `Settings -> Pages`, set source to `GitHub Actions`
3. The site will deploy automatically

Expected URL:

```text
https://harsh-raj04.github.io/My-Portfolio/
```

### Backend hosting

GitHub Pages hosts only the frontend.  
If you want live API data, deploy `backend` separately on Render or Railway and update the frontend API base URL for production.

## Notes

- The frontend works even when the backend is unavailable because it uses fallback portfolio data.
- Project detail pages are GitHub Pages-safe through hash routing in the Pages build.
- The CV is available at `frontend/src/assets/Harsh-Raj-CV.pdf`.

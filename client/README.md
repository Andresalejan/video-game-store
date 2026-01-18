# GameStore Frontend

React frontend for the GameStore application.

## Tech Stack

- React 19
- Redux Toolkit
- React Router 7
- Tailwind CSS
- Vite 7
- TypeScript

## Development

```bash
# From project root
npm run dev

# Or from this directory
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3001/api
```

## Build

```bash
npm run build
```

Output will be in `dist/`.

## Deploy to GitHub Pages

```bash
npm run deploy
```

Note: Update `VITE_API_URL` in `.env` to point to your production API before deploying.

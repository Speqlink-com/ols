# ACBDT Web

The public Next.js 16 application for the Africa Cancer Biomarkers Database & Technology initiative.

The frontend is intentionally independent from the backend. It connects to the ACBDT API through `API_INTERNAL_URL` during server rendering and uses `https://api.acbdt.org` as the production fallback.

## Local development

Requirements: Node.js 22 and pnpm 10.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`.

If the API is unavailable, the biomarker and evidence pages display clearly labelled synthetic fixtures so the prototype remains demonstrable.

## Verification

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Deployment

Deploy this directory as one Next.js project. For Vercel, use the repository root as the project root and set:

```text
API_INTERNAL_URL=https://api.acbdt.org
NEXT_PUBLIC_API_BASE_URL=https://api.acbdt.org
```

The included Dockerfile produces a standalone Next.js image when container deployment becomes available again.

The FastAPI service now lives in the sibling `../ols-bkd` folder and can be deployed independently at `https://api.acbdt.org`.

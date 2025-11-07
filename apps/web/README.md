# Linked All Web Application

Next.js web application for the Linked All platform.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.0.0

### Installation

```bash
# From the monorepo root
pnpm install

# From this directory
cd apps/web
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Type check
pnpm type-check
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
apps/web/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/             # Utilities and helpers
├── public/          # Static assets
├── styles/          # Global styles
└── types/           # TypeScript type definitions
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

```bash
cp .env.example .env.local
```

See `.env.example` for all available environment variables.

## Features

### Phase 0 (MVP)
- [ ] Product listing and browsing
- [ ] Vendor storefronts
- [ ] Shopping cart
- [ ] Checkout flow
- [ ] User authentication
- [ ] Vendor onboarding

### Phase 1
- [ ] Payment integration
- [ ] Wallet dashboard
- [ ] Referral system
- [ ] Vendor analytics

### Phase 2
- [ ] LinkedCoin rewards
- [ ] Advanced search
- [ ] AI recommendations
- [ ] Logistics tracking

## Deployment

The web application is designed to be deployed on Vercel:

```bash
# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

## Contributing

See the main [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

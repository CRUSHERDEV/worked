# Getting Started with Linked All Development

This guide will help you set up your development environment and start contributing to Linked All.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20.0.0 ([Download](https://nodejs.org/))
- **pnpm** >= 10.0.0 (`npm install -g pnpm`)
- **Docker** and **Docker Compose** ([Download](https://www.docker.com/))
- **Git** ([Download](https://git-scm.com/))
- **Supabase CLI** (`npm install -g supabase`)

## Step 1: Clone the Repository

```bash
git clone https://github.com/your-org/linked-all-v1.git
cd linked-all-v1
```

## Step 2: Install Dependencies

```bash
pnpm install
```

This will install all dependencies for all packages and apps in the monorepo.

## Step 3: Environment Setup

### Copy Environment Variables

```bash
cp .env.example .env.local
```

### Configure Supabase

1. Create a Supabase project at https://supabase.com
2. Copy your project URL and keys to `.env.local`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

### Or Use Local Supabase

```bash
supabase start
```

This will start a local Supabase instance.

## Step 4: Database Setup

```bash
# Apply database migrations
supabase db reset
```

## Step 5: Start Development Services

### Option A: Start All Services with Docker

```bash
docker-compose -f infrastructure/docker/docker-compose.yml up -d
```

### Option B: Start Services Individually

#### Terminal 1 - API Gateway
```bash
cd services/api-gateway
pnpm dev
```

#### Terminal 2 - Web App
```bash
cd apps/web
pnpm dev
```

#### Terminal 3 - Mobile App
```bash
cd apps/mobile
pnpm dev
```

## Step 6: Access Applications

- **Web App**: http://localhost:3000
- **API Gateway**: http://localhost:3001
- **API Docs**: http://localhost:3001/docs
- **Supabase Studio**: http://localhost:54323

## Step 7: Verify Setup

Run the following commands to ensure everything is set up correctly:

```bash
# Type check
pnpm type-check

# Lint
pnpm lint

# Build (optional)
pnpm build
```

## Next Steps

1. **Read the architecture docs**: `/docs/architecture/ARCHITECTURE.md`
2. **Review the API reference**: `/docs/api/API_REFERENCE.md`
3. **Check contribution guidelines**: `/CONTRIBUTING.md`
4. **Pick an issue to work on**: Check GitHub Issues

## Common Issues

### Port Already in Use

If you get a "port already in use" error:

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### pnpm Install Fails

```bash
# Clear pnpm cache
pnpm store prune

# Reinstall
rm -rf node_modules
pnpm install
```

### Docker Issues

```bash
# Restart Docker
docker-compose down
docker-compose up -d

# Clear Docker cache
docker system prune -a
```

## Getting Help

- Check the documentation in `/docs`
- Search existing GitHub issues
- Ask in GitHub Discussions
- Contact the team

Happy coding! 🚀

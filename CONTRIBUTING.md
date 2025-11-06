# Contributing to Linked All

Thank you for your interest in contributing to Linked All! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

Please be respectful and considerate in all interactions. We are committed to providing a welcoming and inclusive environment for all contributors.

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.0.0
- Docker and Docker Compose
- Git
- Supabase CLI (for database work)

### Setup

1. **Fork and clone the repository:**
```bash
git clone https://github.com/your-username/linked-all-v1.git
cd linked-all-v1
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

4. **Start development services:**
```bash
# Start all services with Docker
docker-compose -f infrastructure/docker/docker-compose.yml up -d

# Or start individual services
pnpm dev
```

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Urgent production fixes

### Creating a Feature

1. **Create a feature branch:**
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes:**
- Write clean, readable code
- Follow existing code style
- Add tests for new functionality
- Update documentation

3. **Commit your changes:**
```bash
git add .
git commit -m "feat: add your feature description"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

4. **Push and create a pull request:**
```bash
git push origin feature/your-feature-name
```

## Code Style

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Define proper types (avoid `any`)
- Use functional components for React

### Formatting

- Use Prettier for code formatting
- Run `pnpm format` before committing
- Configure your editor to format on save

### Linting

- Use ESLint for code quality
- Run `pnpm lint` before committing
- Fix all linting errors

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter @linked-all/marketplace-service test

# Run tests in watch mode
pnpm test --watch
```

### Writing Tests

- Write unit tests for utilities and services
- Write integration tests for API endpoints
- Write E2E tests for critical user flows
- Aim for >80% code coverage

## Documentation

- Update README.md if you change functionality
- Add JSDoc comments for functions and classes
- Update API documentation for endpoint changes
- Include examples in documentation

## Pull Request Process

1. **Before submitting:**
   - Run `pnpm lint` and fix all issues
   - Run `pnpm type-check` and fix all errors
   - Run `pnpm test` and ensure all tests pass
   - Update documentation if needed

2. **Pull request description:**
   - Describe what changes you made
   - Explain why the changes are needed
   - Include screenshots for UI changes
   - Reference related issues

3. **Review process:**
   - At least one maintainer approval required
   - All CI checks must pass
   - Address review comments
   - Keep PR focused and reasonably sized

4. **After approval:**
   - Squash commits if requested
   - Maintainer will merge the PR

## Project Structure

```
linked-all-v1/
├── apps/              # Applications (web, mobile)
├── packages/          # Shared packages (ui, types, config, utils)
├── services/          # Backend microservices
├── infrastructure/    # Infrastructure as Code
├── supabase/          # Database schema and migrations
├── docs/              # Documentation
└── .github/           # GitHub workflows and templates
```

## Common Tasks

### Adding a new package

```bash
# Create package directory
mkdir -p packages/new-package/src

# Create package.json
cd packages/new-package
pnpm init

# Add to workspace (already configured in pnpm-workspace.yaml)
```

### Adding a new service

```bash
# Create service directory
mkdir -p services/new-service/src

# Copy template files from existing service
# Update package.json and implement service
```

### Database migrations

```bash
# Create a new migration
supabase migration new migration_name

# Apply migrations
supabase db reset
```

### Running specific apps/services

```bash
# Web app
cd apps/web && pnpm dev

# Mobile app
cd apps/mobile && pnpm dev

# Specific service
cd services/api-gateway && pnpm dev
```

## Getting Help

- Check existing documentation
- Search for existing issues
- Ask in discussions
- Reach out to maintainers

## License

By contributing to Linked All, you agree that your contributions will be licensed under the project's license.

---

Thank you for contributing to Linked All! 🚀

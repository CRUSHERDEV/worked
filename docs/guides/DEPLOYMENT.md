# Deployment Guide

This guide covers deploying Linked All to various environments.

## Deployment Environments

- **Development**: Local development environment
- **Staging**: Pre-production testing environment
- **Production**: Live production environment

## Prerequisites

- AWS Account (for backend services)
- Vercel Account (for web app)
- Expo Account (for mobile app)
- Supabase Account (for database)
- GitHub Account (for CI/CD)

## Environment Setup

### 1. Configure GitHub Secrets

Add the following secrets to your GitHub repository:

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
EXPO_TOKEN
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_KEY
```

### 2. Configure AWS

```bash
# Install AWS CLI
brew install awscli  # macOS
# or
apt-get install awscli  # Linux

# Configure credentials
aws configure
```

## Deploying Web Application

### Vercel Deployment

#### Automatic (via GitHub)

Push to `main` branch triggers automatic deployment via GitHub Actions.

#### Manual Deployment

```bash
cd apps/web

# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## Deploying Backend Services

### Using GitHub Actions

Push to `main` branch with service changes triggers deployment.

### Manual Docker Deployment

```bash
# Build and push Docker images
docker-compose -f infrastructure/docker/docker-compose.yml build
docker-compose push

# Deploy to ECS
aws ecs update-service \
  --cluster linked-all-v1-prod-cluster \
  --service api-gateway \
  --force-new-deployment
```

### Using Terraform

```bash
cd infrastructure/terraform

# Initialize
terraform init

# Plan
terraform plan -var="environment=production"

# Apply
terraform apply -var="environment=production"
```

## Deploying Mobile Application

### Using EAS (Expo Application Services)

```bash
cd apps/mobile

# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

## Database Migrations

### Staging

```bash
# Link to staging project
supabase link --project-ref staging-project-ref

# Push migrations
supabase db push
```

### Production

```bash
# Link to production project
supabase link --project-ref prod-project-ref

# Create backup first!
supabase db dump -f backup-$(date +%Y%m%d).sql

# Push migrations
supabase db push
```

## Monitoring Deployment

### Check Service Health

```bash
# API Gateway
curl https://api.linkedall.africa/health

# Individual services
curl https://api.linkedall.africa/api/v1/marketplace/health
```

### View Logs

```bash
# Vercel logs
vercel logs

# AWS ECS logs
aws logs tail /ecs/api-gateway --follow

# Or use CloudWatch console
```

### Monitor Metrics

- CloudWatch Dashboard
- Grafana Dashboard
- Sentry for errors

## Rollback Procedures

### Web App

```bash
# Via Vercel dashboard
# Or redeploy previous commit
vercel --prod
```

### Backend Services

```bash
# Rollback ECS service
aws ecs update-service \
  --cluster linked-all-v1-prod-cluster \
  --service api-gateway \
  --task-definition api-gateway:previous-version

# Or use Terraform
terraform apply -var="environment=production"
```

### Database

```bash
# Restore from backup
supabase db reset --db-url postgresql://...
```

## Post-Deployment Checklist

- [ ] All services are healthy
- [ ] Database migrations applied
- [ ] Environment variables updated
- [ ] Monitoring alerts configured
- [ ] Logs are being collected
- [ ] Performance metrics normal
- [ ] Critical user flows tested
- [ ] Team notified of deployment

## Troubleshooting

### Deployment Fails

1. Check GitHub Actions logs
2. Verify all secrets are configured
3. Check AWS resource limits
4. Review application logs

### Service Not Starting

1. Check environment variables
2. Verify database connectivity
3. Check Docker image logs
4. Verify AWS security groups

### Database Migration Errors

1. Check migration syntax
2. Verify database permissions
3. Check for conflicts
4. Restore from backup if needed

## Useful Commands

```bash
# Check deployment status
vercel ls

# View ECS services
aws ecs list-services --cluster linked-all-v1-prod-cluster

# Check task status
aws ecs describe-tasks --cluster linked-all-v1-prod-cluster --tasks <task-id>

# View CloudWatch logs
aws logs tail /ecs/api-gateway --follow --since 1h
```

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [Expo EAS Documentation](https://docs.expo.dev/eas/)
- [Supabase CLI Documentation](https://supabase.com/docs/guides/cli)

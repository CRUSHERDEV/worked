# Infrastructure Configuration

Infrastructure as Code (IaC) for the Linked All platform using Terraform and Docker.

## Structure

```
infrastructure/
├── docker/           # Docker configurations
│   ├── docker-compose.yml
│   └── Dockerfile.service
├── terraform/        # Terraform configurations
│   ├── main.tf
│   ├── modules/
│   │   ├── vpc/
│   │   ├── ecs/
│   │   ├── s3/
│   │   └── cloudfront/
│   └── variables.tf
└── kubernetes/       # Kubernetes manifests (future)
```

## Docker Setup

### Local Development

Start all services with Docker Compose:

```bash
cd infrastructure/docker
docker-compose up -d
```

Stop all services:

```bash
docker-compose down
```

View logs:

```bash
docker-compose logs -f [service-name]
```

### Services

- API Gateway: http://localhost:3001
- Marketplace: http://localhost:3002
- Orders: http://localhost:3003
- Wallet: http://localhost:3004
- Auth: http://localhost:3005
- Logistics: http://localhost:3006
- Redis: localhost:6379
- Meilisearch: http://localhost:7700

## Terraform Setup

### Prerequisites

1. Install Terraform >= 1.0
2. Configure AWS credentials:
```bash
aws configure
```

### Initialize Terraform

```bash
cd infrastructure/terraform
terraform init
```

### Plan Infrastructure Changes

```bash
terraform plan -var="environment=dev"
```

### Apply Infrastructure

```bash
terraform apply -var="environment=dev"
```

### Destroy Infrastructure

```bash
terraform destroy -var="environment=dev"
```

## AWS Resources

### Development Environment

- VPC with public and private subnets
- ECS Fargate cluster for microservices
- S3 bucket for static assets
- CloudFront CDN for content delivery
- Application Load Balancer
- RDS PostgreSQL (if needed beyond Supabase)
- ElastiCache Redis for caching

### Production Environment

Additional resources for production:
- Multi-AZ deployment
- Auto-scaling groups
- CloudWatch monitoring and alarms
- Route53 for DNS
- ACM for SSL certificates
- WAF for security
- Backup and disaster recovery

## Environments

### Development (dev)
- Single-AZ deployment
- Smaller instance sizes
- Development database instance

### Staging (staging)
- Similar to production
- Used for pre-production testing
- Isolated from production data

### Production (prod)
- Multi-AZ deployment
- Auto-scaling enabled
- High availability configuration
- Enhanced monitoring

## Cost Optimization

- Use Fargate Spot for non-critical workloads
- Implement auto-scaling policies
- Use S3 Intelligent-Tiering
- Enable CloudFront caching
- Monitor and optimize database queries

## Security

- All traffic encrypted in transit (TLS)
- Data encrypted at rest
- Private subnets for services
- Security groups for network isolation
- IAM roles with least privilege
- Secrets stored in AWS Secrets Manager
- Regular security audits

## Monitoring

- CloudWatch Logs for application logs
- CloudWatch Metrics for system metrics
- X-Ray for distributed tracing
- CloudWatch Alarms for critical events
- Custom dashboards for business metrics

## Backup and Recovery

- Automated RDS snapshots
- S3 versioning enabled
- Point-in-time recovery for databases
- Disaster recovery plan documented
- Regular backup testing

## CI/CD Integration

Infrastructure changes are deployed through CI/CD pipelines:

```bash
# GitHub Actions workflow
.github/workflows/infrastructure.yml
```

## Useful Commands

### Docker

```bash
# Build specific service
docker-compose build [service-name]

# Restart service
docker-compose restart [service-name]

# View resource usage
docker stats
```

### Terraform

```bash
# Format Terraform files
terraform fmt -recursive

# Validate configuration
terraform validate

# Show current state
terraform show

# List resources
terraform state list

# Import existing resource
terraform import [resource] [id]
```

## Troubleshooting

### Docker Issues

- Clear Docker cache: `docker system prune -a`
- Check logs: `docker-compose logs -f`
- Restart Docker daemon

### Terraform Issues

- Reinitialize: `terraform init -upgrade`
- Check state: `terraform state list`
- Manual state fix: `terraform state rm [resource]`

## Resources

- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [AWS ECS Best Practices](https://docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/)

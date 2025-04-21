# Docker Setup for ProVibe

This document outlines how to use Docker with the ProVibe project.

## Architecture

The Docker setup consists of:

1. Individual Dockerfiles for each Next.js application:
   - `apps/web/Dockerfile` - Web application
   - `apps/app/Dockerfile` - App application
   - `apps/admin/Dockerfile` - Admin application
2. `docker-compose.yml` - Orchestrates all services together
3. `.dockerignore` - Excludes unnecessary files from Docker builds

## Prerequisites

- Docker and Docker Compose installed on your machine
- Git repository cloned locally

## Getting Started

### Build and run all services

```bash
# Build all containers
docker compose build

# Start all services in detached mode
docker compose up
```

### Building individual services

You can build and run individual services if needed:

```bash
# Build and start only the web application
docker-compose up -d web

# Build and start only the app application
docker-compose up -d app

# Build and start only the admin application
docker-compose up -d admin
```

### Stop the Docker environment

```bash
docker compose down
```

## Accessing Services

Each application is running on its own port:

- Web Application: http://localhost:3000
- App Application: http://localhost:3001
- Admin Application: http://localhost:3002
- PostgreSQL: localhost:5432

## Environment Variables

The Docker Compose setup uses the following environment variables:

- `DATABASE_URL`: Connection string for PostgreSQL
- `POSTGRES_USER`: Database username
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_DB`: Database name
- `TAILWIND_DISABLE_LIGHTNINGCSS`: Required for TailwindCSS configuration

## Volumes

The setup includes persistent volumes for:

- PostgreSQL data
- Node modules for each application (improves build performance)
- Next.js build artifacts for each application

## Troubleshooting

If you encounter issues:

1. Ensure Docker and Docker Compose are up to date
2. Try rebuilding the containers: `docker-compose build --no-cache <service_name>`
3. Check container logs: `docker-compose logs <service_name>`
4. Reset volumes if database issues occur: `docker-compose down -v` (caution: this removes all data)

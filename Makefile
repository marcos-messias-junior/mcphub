.PHONY: help dev prod build test lint shell logs clean

# Default target
help:
	@echo "MCPHub Docker Commands:"
	@echo "  make dev        - Start development environment with hot reload"
	@echo "  make prod       - Start production environment"
	@echo "  make build      - Build Docker images"
	@echo "  make test       - Run tests in Docker"
	@echo "  make lint       - Run linter in Docker"
	@echo "  make shell      - Open shell in development container"
	@echo "  make logs       - View container logs"
	@echo "  make clean      - Stop and remove all containers"
	@echo "  make db-shell   - Open PostgreSQL shell"

# Development commands
dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
	@echo "Development environment started!"
	@echo "Frontend (hot reload): http://localhost:5173"
	@echo "Backend API: http://localhost:3000"
	@echo "PostgreSQL: localhost:5432"

dev-build:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

# Production commands
prod:
	docker compose up -d

prod-build:
	docker compose up -d --build

# Build images
build:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml build

# Run tests
test:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml run --rm mcphub pnpm test

# Run linter
lint:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml run --rm mcphub pnpm lint

# Run formatter
format:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml run --rm mcphub pnpm format

# Open shell in container
shell:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml exec mcphub /bin/sh

# Open new shell in container (if container is not running)
shell-run:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml run --rm mcphub /bin/sh

# View logs
logs:
	docker compose logs -f

logs-mcphub:
	docker compose logs -f mcphub

logs-postgres:
	docker compose logs -f postgres

# Database shell
db-shell:
	docker compose exec postgres psql -U mcphub -d mcphub

# Stop and clean
stop:
	docker compose down

clean:
	docker compose down -v
	@echo "All containers and volumes removed!"

# Check status
ps:
	docker compose ps

# Run any pnpm command
pnpm:
	@docker compose -f docker-compose.yml -f docker-compose.dev.yml run --rm mcphub pnpm $(filter-out $@,$(MAKECMDGOALS))

# Catch-all target to prevent errors when passing arguments
%:
	@:
#!/bin/bash

# MCPHub Docker Development Helper Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Main command
case "$1" in
    start)
        print_info "Starting MCPHub development environment..."
        docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
        print_info "Building frontend for production access..."
        docker compose -f docker-compose.yml -f docker-compose.dev.yml exec mcphub sh -c "cd /app/frontend && pnpm build"
        docker compose -f docker-compose.yml -f docker-compose.dev.yml restart mcphub
        print_info "Development environment started!"
        print_info "Frontend (production build): http://localhost:3000"
        print_info "Frontend (hot reload): http://localhost:5173"
        print_info "Backend API: http://localhost:3000"
        print_info "PostgreSQL: localhost:5432"
        ;;
    
    stop)
        print_info "Stopping MCPHub development environment..."
        docker compose -f docker-compose.yml -f docker-compose.dev.yml down
        print_info "Environment stopped."
        ;;
    
    rebuild)
        print_info "Rebuilding and starting MCPHub development environment..."
        docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
        print_info "Building frontend..."
        docker compose -f docker-compose.yml -f docker-compose.dev.yml exec mcphub sh -c "cd /app/frontend && pnpm build"
        docker compose -f docker-compose.yml -f docker-compose.dev.yml restart mcphub
        print_info "Environment rebuilt and started!"
        ;;
    
    logs)
        docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f
        ;;
    
    shell)
        print_info "Opening shell in MCPHub container..."
        docker compose -f docker-compose.yml -f docker-compose.dev.yml exec mcphub /bin/sh
        ;;
    
    test)
        print_info "Running tests..."
        docker compose -f docker-compose.yml -f docker-compose.dev.yml run --rm mcphub pnpm test
        ;;
    
    lint)
        print_info "Running linter..."
        docker compose -f docker-compose.yml -f docker-compose.dev.yml run --rm mcphub pnpm lint
        ;;
    
    clean)
        print_warning "This will remove all containers and volumes!"
        read -p "Are you sure? (y/N) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            docker compose -f docker-compose.yml -f docker-compose.dev.yml down -v
            print_info "All containers and volumes removed."
        fi
        ;;
    
    *)
        echo "Usage: $0 {start|stop|rebuild|logs|shell|test|lint|clean}"
        echo
        echo "Commands:"
        echo "  start    - Start development environment"
        echo "  stop     - Stop development environment"
        echo "  rebuild  - Rebuild and start development environment"
        echo "  logs     - View container logs"
        echo "  shell    - Open shell in container"
        echo "  test     - Run tests"
        echo "  lint     - Run linter"
        echo "  clean    - Remove all containers and volumes"
        exit 1
        ;;
esac
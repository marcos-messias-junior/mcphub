# Docker Compose Setup for MCPHub

This guide explains how to run MCPHub using Docker Compose.

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/samanhappy/mcphub.git
   cd mcphub
   ```

2. **Copy environment variables**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` file**
   - Set a secure `JWT_SECRET`
   - Add your `OPENAI_API_KEY` for smart routing (optional)
   - Adjust other settings as needed

4. **Start the services**
   ```bash
   docker-compose up -d
   ```

5. **Access MCPHub**
   - Web UI: http://localhost:3000
   - Default credentials: `admin` / `admin123`

## Services

### MCPHub Application
- Main application server
- Runs on port 3000
- Mounts configuration files from host

### PostgreSQL Database
- Uses `pgvector/pgvector:pg16` image for vector search support
- Runs on port 5432
- Data persisted in Docker volume

### Nginx (Optional)
- Reverse proxy with SSL support
- Activated with profile: `docker-compose --profile with-nginx up -d`
- Requires `nginx.conf` configuration

## Configuration Files

### Required Files
- `mcp_settings.json` - MCP server configurations
- `.env` - Environment variables

### Optional Files
- `servers.json` - Additional server configurations
- `nginx.conf` - Nginx reverse proxy configuration
- `ssl/` - SSL certificates for HTTPS

## Development Mode

For development with hot-reload:

```bash
# Use the development script (recommended)
./docker-dev.sh start

# Or use compose directly
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Build frontend and restart (if needed)
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec mcphub sh -c "cd /app/frontend && pnpm build"
docker compose -f docker-compose.yml -f docker-compose.dev.yml restart mcphub
```

### Development Features

- **Hot Reload**: Both backend (Node.js) and frontend (Vite) support hot reloading
- **Port Exposure**:
  - Backend API: http://localhost:3000
  - Frontend Dev Server: http://localhost:5173
  - PostgreSQL: localhost:5432
- **Volume Mounts**: Source code is mounted for live updates
- **Separate Database**: Uses `postgres-data-dev` volume to keep dev data separate

### Development URLs

- Frontend (with hot reload): http://localhost:5173
- Backend API: http://localhost:3000
- Database: postgresql://mcphub:mcphub_password@localhost:5432/mcphub

## Common Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f mcphub

# Stop services
docker-compose down

# Stop and remove volumes (WARNING: Deletes database)
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# Access PostgreSQL
docker-compose exec postgres psql -U mcphub -d mcphub
```

## Volumes

- `postgres-data` - PostgreSQL database files
- `./mcp_settings.json` - MCP server configurations
- `./data` - Application data directory
- `./servers.json` - Server configurations

## Environment Variables

Key variables in `.env`:

- `JWT_SECRET` - Secret key for JWT tokens (required)
- `OPENAI_API_KEY` - OpenAI API key for smart routing (optional)
- `DATABASE_URL` - PostgreSQL connection string (auto-configured)
- `BASE_PATH` - Base path for API routes (optional)

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is healthy: `docker-compose ps`
- Check logs: `docker-compose logs postgres`

### MCPHub Won't Start
- Check logs: `docker-compose logs mcphub`
- Verify `.env` file exists and is configured
- Ensure ports 3000 and 5432 are not in use

### Permission Issues
- Ensure mounted files have correct permissions
- Run `chmod 644 mcp_settings.json servers.json`

### Smart Routing Not Working
- Verify `OPENAI_API_KEY` is set in `.env`
- Check PostgreSQL has pgvector extension enabled
- Review logs for embedding errors

## Production Deployment

For production:

1. Use strong `JWT_SECRET`
2. Configure SSL with Nginx profile
3. Set `NODE_ENV=production`
4. Use external PostgreSQL for better performance
5. Configure backups for database volume
6. Monitor with `docker-compose logs -f`
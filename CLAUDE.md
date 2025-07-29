# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MCPHub is a unified hub for Model Context Protocol (MCP) servers that provides:
- A centralized web dashboard for managing multiple MCP servers
- Streamable HTTP (SSE) endpoints for AI client integration
- Smart routing with vector-based semantic search
- Group-based access control and server organization
- Built-in authentication and user management

## Development Commands

### Build & Run
```bash
# Install dependencies
pnpm install

# Development (frontend + backend with hot-reload)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Separate frontend/backend development
pnpm backend:dev   # Backend only with hot-reload
pnpm frontend:dev  # Frontend only with hot-reload
```

### Testing & Code Quality
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Lint code
pnpm lint

# Format code
pnpm format
```

### Single Test Execution
```bash
# Run a specific test file
pnpm test path/to/test.test.ts

# Run tests matching a pattern
pnpm test --testNamePattern="pattern"
```

## Architecture Overview

### Backend Structure (Node.js/Express/TypeScript)
- **src/server.ts**: Main Express server initialization with route setup for MCP endpoints
- **src/services/mcpService.ts**: Core MCP server management - handles client connections, tool registration, and server lifecycle
- **src/services/sseService.ts**: SSE/HTTP streaming implementation for MCP protocol communication
- **src/services/vectorSearchService.ts**: Vector embeddings and semantic search for smart routing
- **src/controllers/**: REST API controllers for auth, servers, groups, users, and configuration
- **src/middlewares/**: Authentication, user context, and request processing middleware
- **src/db/**: TypeORM entities and repositories for PostgreSQL with pgvector support

### Frontend Structure (React/Vite/TypeScript)
- **frontend/src/App.tsx**: Main React application with routing setup
- **frontend/src/pages/**: Dashboard, servers, groups, market, and settings pages
- **frontend/src/components/**: Reusable UI components and forms
- **frontend/src/services/**: API service layer for backend communication
- **frontend/src/contexts/**: React contexts for auth, theme, and toast notifications
- **frontend/src/i18n.ts**: Internationalization setup (English/Chinese)

### Key Concepts
1. **MCP Server Management**: Servers are configured in `mcp_settings.json` and managed through the dashboard
2. **Group Organization**: Servers can be organized into groups for logical access control
3. **Smart Routing**: Uses OpenAI embeddings to find relevant tools based on semantic similarity
4. **Multi-Protocol Support**: Handles both stdio and SSE MCP server protocols
5. **User Context**: Supports both global and user-scoped server configurations

### API Endpoints
- `/api/auth/*`: Authentication endpoints (login, register, change password)
- `/api/servers/*`: Server CRUD operations
- `/api/groups/*`: Group management
- `/api/users/*`: User administration
- `/mcp/:group?`: Streamable HTTP endpoint for MCP communication
- `/sse/:group?`: SSE endpoint (deprecated in favor of /mcp)

### Database Schema
- Uses TypeORM with PostgreSQL
- Vector embeddings stored using pgvector extension
- Entities: User, VectorEmbedding
- Smart routing requires PostgreSQL with pgvector and OpenAI API key

### Environment Variables
Key configuration options in `.env`:
- `PORT`: Server port (default: 3000)
- `JWT_SECRET`: JWT token secret
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: For vector embeddings
- `BASE_PATH`: Base path for API routes
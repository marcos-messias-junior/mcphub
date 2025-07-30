import swaggerJsdoc from 'swagger-jsdoc';
import packageJson from '../../package.json' with { type: 'json' };

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MCPHub API Documentation',
      version: packageJson.version,
      description: `
        MCPHub is a unified hub for Model Context Protocol (MCP) servers that provides:
        - A centralized web dashboard for managing multiple MCP servers
        - Streamable HTTP (SSE) endpoints for AI client integration
        - Smart routing with vector-based semantic search
        - Group-based access control and server organization
        - Built-in authentication and user management
      `,
      contact: {
        name: 'MCPHub Support',
        url: 'https://github.com/samanhappy/mcphub',
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC',
      },
    },
    servers: [
      {
        url: 'http://mcphub.local',
        description: 'Development server',
      },
      {
        url: 'https://api.mcphub.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token obtained from /api/auth/login',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            username: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string', enum: ['admin', 'user'] },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Server: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            command: { type: 'string' },
            args: { type: 'array', items: { type: 'string' } },
            env: { type: 'object' },
            type: { type: 'string', enum: ['stdio', 'sse'] },
            groupName: { type: 'string' },
            readonly: { type: 'boolean' },
          },
          required: ['name', 'command', 'type'],
        },
        Group: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            servers: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
          required: ['name'],
        },
        Tool: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            inputSchema: { type: 'object' },
          },
        },
        LoginRequest: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
          },
          required: ['username', 'password'],
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            user: { $ref: '#/components/schemas/User' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' },
            statusCode: { type: 'number' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/swagger/*.ts'], // Path to the API routes
};

export const swaggerSpec = swaggerJsdoc(options);
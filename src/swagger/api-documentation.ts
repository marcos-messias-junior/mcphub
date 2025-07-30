/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication and authorization
 *   - name: Servers
 *     description: MCP server management
 *   - name: Groups
 *     description: Server group management
 *   - name: Users
 *     description: User management (admin only)
 *   - name: Market
 *     description: MCP server marketplace
 *   - name: Tools
 *     description: MCP tool execution
 *   - name: Logs
 *     description: System log management
 *   - name: Configuration
 *     description: System configuration
 *   - name: DXT
 *     description: DXT file upload
 *   - name: MCP
 *     description: Model Context Protocol endpoints
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *               password:
 *                 type: string
 *                 minLength: 6
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Registration failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/auth/user:
 *   get:
 *     summary: Get current user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Current user information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authenticated
 */

/**
 * @swagger
 * /api/auth/change-password:
 *   post:
 *     summary: Change user password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Current password incorrect
 */

/**
 * @swagger
 * /api/servers:
 *   get:
 *     summary: Get all servers
 *     tags: [Servers]
 *     responses:
 *       200:
 *         description: List of all servers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Server'
 *   post:
 *     summary: Create new server
 *     tags: [Servers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Server'
 *     responses:
 *       201:
 *         description: Server created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Server'
 *       400:
 *         description: Invalid server data
 */

/**
 * @swagger
 * /api/servers/{name}:
 *   put:
 *     summary: Update server
 *     tags: [Servers]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Server name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Server'
 *     responses:
 *       200:
 *         description: Server updated successfully
 *       404:
 *         description: Server not found
 *   delete:
 *     summary: Delete server
 *     tags: [Servers]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Server name
 *     responses:
 *       204:
 *         description: Server deleted successfully
 *       404:
 *         description: Server not found
 */

/**
 * @swagger
 * /api/servers/{name}/toggle:
 *   post:
 *     summary: Toggle server enabled status
 *     tags: [Servers]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Server name
 *     responses:
 *       200:
 *         description: Server toggled successfully
 *       404:
 *         description: Server not found
 */

/**
 * @swagger
 * /api/servers/{serverName}/tools/{toolName}/toggle:
 *   post:
 *     summary: Toggle tool enabled status
 *     tags: [Servers]
 *     parameters:
 *       - in: path
 *         name: serverName
 *         required: true
 *         schema:
 *           type: string
 *         description: Server name
 *       - in: path
 *         name: toolName
 *         required: true
 *         schema:
 *           type: string
 *         description: Tool name
 *     responses:
 *       200:
 *         description: Tool toggled successfully
 *       404:
 *         description: Server or tool not found
 */

/**
 * @swagger
 * /api/servers/{serverName}/tools/{toolName}/description:
 *   put:
 *     summary: Update tool description
 *     tags: [Servers]
 *     parameters:
 *       - in: path
 *         name: serverName
 *         required: true
 *         schema:
 *           type: string
 *         description: Server name
 *       - in: path
 *         name: toolName
 *         required: true
 *         schema:
 *           type: string
 *         description: Tool name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tool description updated
 *       404:
 *         description: Server or tool not found
 */

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: List of all groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 *   post:
 *     summary: Create new group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Group created successfully
 *       400:
 *         description: Invalid group data
 */

/**
 * @swagger
 * /api/groups/{id}:
 *   get:
 *     summary: Get group by ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     responses:
 *       200:
 *         description: Group details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Group not found
 *   put:
 *     summary: Update group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: Group updated successfully
 *       404:
 *         description: Group not found
 *   delete:
 *     summary: Delete group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     responses:
 *       204:
 *         description: Group deleted successfully
 *       404:
 *         description: Group not found
 */

/**
 * @swagger
 * /api/groups/{id}/servers:
 *   get:
 *     summary: Get servers in group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     responses:
 *       200:
 *         description: List of servers in group
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *   post:
 *     summary: Add server to group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serverName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Server added to group
 *       404:
 *         description: Group or server not found
 */

/**
 * @swagger
 * /api/groups/{id}/servers/{serverName}:
 *   delete:
 *     summary: Remove server from group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *       - in: path
 *         name: serverName
 *         required: true
 *         schema:
 *           type: string
 *         description: Server name
 *     responses:
 *       200:
 *         description: Server removed from group
 *       404:
 *         description: Group or server not found
 */

/**
 * @swagger
 * /api/groups/{id}/servers/batch:
 *   put:
 *     summary: Batch update servers in group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               servers:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Servers updated in group
 *       404:
 *         description: Group not found
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Admin access required
 *   post:
 *     summary: Create new user (admin only)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid user data
 *       403:
 *         description: Admin access required
 */

/**
 * @swagger
 * /api/users/{username}:
 *   get:
 *     summary: Get user by username (admin only)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       403:
 *         description: Admin access required
 *   put:
 *     summary: Update user (admin only)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       403:
 *         description: Admin access required
 *   delete:
 *     summary: Delete user (admin only)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       403:
 *         description: Admin access required
 */

/**
 * @swagger
 * /api/users-stats:
 *   get:
 *     summary: Get user statistics (admin only)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: number
 *                 activeUsers:
 *                   type: number
 *                 adminUsers:
 *                   type: number
 *       403:
 *         description: Admin access required
 */

/**
 * @swagger
 * /api/market/servers:
 *   get:
 *     summary: Get all market servers
 *     tags: [Market]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Filter by tag
 *     responses:
 *       200:
 *         description: List of market servers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/market/servers/search:
 *   get:
 *     summary: Search market servers
 *     tags: [Market]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/market/servers/{name}:
 *   get:
 *     summary: Get market server by name
 *     tags: [Market]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Server name
 *     responses:
 *       200:
 *         description: Market server details
 *       404:
 *         description: Server not found
 */

/**
 * @swagger
 * /api/market/categories:
 *   get:
 *     summary: Get all market categories
 *     tags: [Market]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */

/**
 * @swagger
 * /api/market/tags:
 *   get:
 *     summary: Get all market tags
 *     tags: [Market]
 *     responses:
 *       200:
 *         description: List of tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */

/**
 * @swagger
 * /api/tools/call/{server}:
 *   post:
 *     summary: Call a tool on a server
 *     tags: [Tools]
 *     parameters:
 *       - in: path
 *         name: server
 *         required: true
 *         schema:
 *           type: string
 *         description: Server name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tool:
 *                 type: string
 *               arguments:
 *                 type: object
 *     responses:
 *       200:
 *         description: Tool execution result
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Server or tool not found
 */

/**
 * @swagger
 * /api/dxt/upload:
 *   post:
 *     summary: Upload DXT file
 *     tags: [DXT]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Invalid file
 */

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Get system logs
 *     tags: [Logs]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 100
 *         description: Number of logs to retrieve
 *     responses:
 *       200:
 *         description: List of log entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   timestamp:
 *                     type: string
 *                   level:
 *                     type: string
 *                   message:
 *                     type: string
 *   delete:
 *     summary: Clear system logs
 *     tags: [Logs]
 *     responses:
 *       204:
 *         description: Logs cleared successfully
 */

/**
 * @swagger
 * /api/logs/stream:
 *   get:
 *     summary: Stream system logs (SSE)
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: SSE stream of log entries
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Get all settings
 *     tags: [Configuration]
 *     responses:
 *       200:
 *         description: System settings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/system-config:
 *   put:
 *     summary: Update system configuration
 *     tags: [Configuration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Configuration updated
 *       400:
 *         description: Invalid configuration
 */

/**
 * @swagger
 * /config:
 *   get:
 *     summary: Get runtime configuration
 *     tags: [Configuration]
 *     security: []
 *     responses:
 *       200:
 *         description: Runtime configuration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 basePath:
 *                   type: string
 *                 version:
 *                   type: string
 */

/**
 * @swagger
 * /public-config:
 *   get:
 *     summary: Get public configuration
 *     tags: [Configuration]
 *     security: []
 *     responses:
 *       200:
 *         description: Public configuration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 skipAuth:
 *                   type: boolean
 */

/**
 * @swagger
 * /mcp/{group}:
 *   post:
 *     summary: Send MCP request
 *     tags: [MCP]
 *     parameters:
 *       - in: path
 *         name: group
 *         schema:
 *           type: string
 *         description: Optional group name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: MCP response
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: string
 *   get:
 *     summary: Get MCP status
 *     tags: [MCP]
 *     parameters:
 *       - in: path
 *         name: group
 *         schema:
 *           type: string
 *         description: Optional group name
 *     responses:
 *       200:
 *         description: MCP status
 *   delete:
 *     summary: Delete MCP connection
 *     tags: [MCP]
 *     parameters:
 *       - in: path
 *         name: group
 *         schema:
 *           type: string
 *         description: Optional group name
 *     responses:
 *       204:
 *         description: Connection deleted
 */

/**
 * @swagger
 * /sse/{group}:
 *   get:
 *     summary: Server-Sent Events endpoint (deprecated)
 *     tags: [MCP]
 *     deprecated: true
 *     parameters:
 *       - in: path
 *         name: group
 *         schema:
 *           type: string
 *         description: Optional group name
 *     responses:
 *       200:
 *         description: SSE stream
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: string
 */

export {};
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create initial tables if needed
-- TypeORM will handle most schema creation, but we ensure pgvector is available
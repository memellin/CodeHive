-- init.sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS snippets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    code TEXT NOT NULL,
    language VARCHAR(50) NOT NULL,
    tags TEXT[],
    userId INT REFERENCES users(id) ON DELETE CASCADE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir usuários iniciais
INSERT INTO users (username, email, password)
VALUES
    ('joao', 'joao@example.com', 'senha123'),
    ('maria', 'maria@example.com', 'senha456');

-- Inserir snippets iniciais associados aos usuários
INSERT INTO snippets (title, code, language, tags, userId)
VALUES
    ('Hello World in JavaScript', 'console.log("Hello, World!");', 'JavaScript', '{"nodejs", "express"}', 1),
    ('Hello World in Python', 'print("Hello, World!")', 'Python', '{"flask", "django"}', 2),
    ('Hello World in Java', 'System.out.println("Hello, World!");', 'Java', '{"spring", "hibernate"}', 1);
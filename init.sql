  CREATE TABLE IF NOT EXISTS "Users" (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS "Snippets" (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      code TEXT NOT NULL,
      language VARCHAR(50) NOT NULL,
      tags TEXT[],
      userId INT REFERENCES "Users"(id) ON DELETE CASCADE,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  INSERT INTO "Users" (username, email, password)
  VALUES
      ('joao', 'joao@example.com', 'senha123'),
      ('maria', 'maria@example.com', 'senha456');

  INSERT INTO "Snippets" (title, code, language, tags, userId)
  VALUES
      ('Hello World in JavaScript', 'console.log(\"Hello, World!\");', 'JavaScript', '{"nodejs", "express"}', 1),
      ('Hello World in Python', 'print(\"Hello, World!\")', 'Python', '{"flask", "django"}', 2),
      ('Hello World in Java', 'System.out.println(\"Hello, World!\");', 'Java', '{"spring", "hibernate"}', 1);
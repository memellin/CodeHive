# CodeHive

Bem-vindo ao CodeHive! Este projeto é um ambiente de desenvolvimento colaborativo, projetado para facilitar a criação e o compartilhamento de código entre desenvolvedores.

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:

- **README.md**: Arquivo de documentação do projeto.
- **index.js**: Arquivo principal que inicializa o servidor Express e configura as rotas.
- **docker-compose.yml** e **dockerfile**: Arquivos para orquestração e construção dos containers Docker (backend e banco de dados).
- **init.sql**: Script SQL para inicialização e povoamento do banco de dados PostgreSQL.
- **swagger.js** e **swagger-output.json**: Geração e saída da documentação automática da API (Swagger).
- **package.json** e **package-lock.json**: Gerenciamento de dependências e scripts do Node.js.
- **src/**: Código-fonte principal do backend:
  - **config/**: Configurações do projeto, como conexão com banco de dados (`database.js`) e CORS (`cors.js`).
  - **route/**: Definição das rotas da API, como `snippetRoutes.js` (snippets) e `authRoutes.js` (autenticação).
  - **middleware/**: Middlewares personalizados, como autenticação (`authMiddleware.js`).
  - **entities/**: Definição dos modelos Sequelize, como `User.js` e `Snippet.js`.
- **dist/**: Arquivos transpilados/gerados para ambiente de produção.
- **.gitignore**: Arquivos e pastas ignorados pelo Git.
- **node_modules/**: Dependências instaladas do projeto.

## Objetivo

O objetivo do CodeHive é fornecer uma plataforma onde desenvolvedores possam colaborar em tempo real, compartilhar conhecimento e melhorar suas habilidades de programação.


## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Para mais informações, entre em contato com os mantenedores do projeto.

# NLW Agents - Backend

> Projeto desenvolvido durante o evento NLW Agents da [Rocketseat](https://rocketseat.com.br).

Este é o serviço de backend para a aplicação NLW Agents, responsável por gerenciar as salas, agentes e a interação com o modelo de IA.

## ✨ Tecnologias Utilizadas

- **Framework:** [Fastify](https://fastify.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) com a extensão [pgvector](https://github.com/pgvector/pgvector)
- **Validação:** [Zod](https://zod.dev/)
- **Containerização:** [Docker](https://www.docker.com/)

## 🚀 Começando

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

- [Node.js](https://nodejs.org/en) (v20.x ou superior)
- [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/products/docker-desktop/)

### Instalação e Configuração

1.  **Clone o repositório:**

    ```bash
    git clone git@github.com:luandstv/nlw-agents-backend.git
    cd nlw-agents-backend
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**

    - Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`.
      ```bash
      cp .env.example .env
      ```
    - Altere as variáveis no arquivo `.env` se necessário. O padrão já está configurado para o ambiente Docker.

4.  **Inicie o banco de dados com Docker:**

    - O comando a seguir irá iniciar um container PostgreSQL com a extensão `pgvector` já habilitada.
      ```bash
      docker-compose up -d
      ```

5.  **Execute as migrações do banco de dados:**

    - Este comando aplicará as migrações da Drizzle para criar as tabelas necessárias.
      ```bash
      npm run db:migrate
      ```

6.  **(Opcional) Popule o banco de dados com dados de teste:**
    - Para preencher o banco com dados iniciais, execute o script de seed.
      ```bash
      npm run db:seed
      ```

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com hot-reload.
- `npm run start`: Inicia o servidor em modo de produção.
- `npm run db:migrate`: Executa as migrações do banco de dados.
- `npm run db:seed`: Popula o banco de dados com dados de teste.

## ↔️ Endpoints da API

Para testar os endpoints disponíveis, você pode usar o arquivo `client.http` com a extensão REST Client no VS Code.

- `GET /health`: Verifica o status da aplicação.
- `GET /rooms`: Lista as salas disponíveis.

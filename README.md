# social-api

API RESTful que simula o backend de uma rede social simplificada, construída com Node.js, Express e MySQL.

---

## Funcionalidades

- Cadastro e autenticação de usuários com JWT
- Criação, listagem, edição e exclusão de posts (com paginação)
- Comentários por post
- Curtidas (likes) por post
- Controle de autorização por recurso (somente o autor pode editar/excluir)

---

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Joi](https://joi.dev/) ou [express-validator](https://express-validator.github.io/)
- [dotenv](https://github.com/motdotla/dotenv)

---

## Estrutura do projeto

```
social-api/
├── src/
│   ├── routes/          # Definição das rotas da API
│   ├── controllers/     # Recebem as requisições e delegam para os services
│   ├── services/        # Regras de negócio
│   ├── repositories/    # Acesso ao banco de dados
│   ├── middlewares/     # Autenticação, tratamento de erros, etc.
│   ├── validations/     # Schemas de validação de dados
│   └── config/          # Configuração do banco de dados e variáveis de ambiente
├── sql/
│   └── create_tables.sql
├── docs/
│   └── social-api.postman_collection.json
├── .env.example
├── README.md
└── package.json
```

---

## Pré-requisitos

- Node.js v18+
- MySQL 8+
- npm ou yarn

---

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/social-api.git
cd social-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com as suas configurações:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=social_api
JWT_SECRET=seu_segredo_jwt
JWT_EXPIRES_IN=7d
```

### 4. Crie o banco de dados e as tabelas

Acesse seu cliente MySQL e execute:

```bash
mysql -u root -p < sql/create_tables.sql
```

Ou importe o arquivo `sql/create_tables.sql` manualmente pela sua ferramenta de preferência (DBeaver, MySQL Workbench, etc.).

### 5. Inicie o servidor

```bash
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start
```

O servidor estará disponível em `http://localhost:3000`.

---

## Endpoints da API

### Usuários

| Método | Rota            | Descrição                         | Auth |
|--------|-----------------|-----------------------------------|------|
| POST   | /users          | Cadastro de usuário               | Não  |
| POST   | /users/login    | Login e geração de token JWT      | Não  |
| GET    | /users/:id      | Visualização de perfil            | Sim  |
| PUT    | /users/:id      | Atualização do próprio perfil     | Sim  |

### Posts

| Método | Rota                  | Descrição                          | Auth |
|--------|-----------------------|------------------------------------|------|
| POST   | /posts                | Criar post                         | Sim  |
| GET    | /posts?page=&limit=   | Listar posts com paginação         | Sim  |
| GET    | /posts/:id            | Visualizar post específico         | Sim  |
| PUT    | /posts/:id            | Editar post (somente autor)        | Sim  |
| DELETE | /posts/:id            | Excluir post (somente autor)       | Sim  |

### Comentários

| Método | Rota                    | Descrição                              | Auth |
|--------|-------------------------|----------------------------------------|------|
| POST   | /posts/:id/comments     | Adicionar comentário ao post           | Sim  |
| GET    | /posts/:id/comments     | Listar comentários de um post          | Sim  |
| DELETE | /comments/:id           | Excluir comentário (somente autor)     | Sim  |

### Curtidas

| Método | Rota               | Descrição              | Auth |
|--------|--------------------|------------------------|------|
| POST   | /posts/:id/like    | Curtir post            | Sim  |
| DELETE | /posts/:id/like    | Remover curtida        | Sim  |

> **Autenticação:** envie o token JWT no header `Authorization: Bearer <token>`.

---

## Exemplos de requisição

### Cadastro de usuário

```http
POST /users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

### Login

```http
POST /users/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Criar post

```http
POST /posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Meu primeiro post",
  "content": "Conteúdo do post aqui."
}
```

### Listar posts com paginação

```http
GET /posts?page=1&limit=10
Authorization: Bearer <token>
```

---

## Coleção Postman / Insomnia

Importe o arquivo localizado em `docs/social-api.postman_collection.json` no Postman ou Insomnia para testar todos os endpoints com exemplos prontos.

---

## Regras de negócio

- O e-mail do usuário deve ser único no sistema.
- Senhas são armazenadas exclusivamente com hash bcrypt.
- Usuário só pode editar ou excluir seus próprios dados.
- Posts e comentários só podem ser editados ou excluídos pelo autor.
- Um usuário pode curtir um post apenas uma vez.
- A listagem de posts utiliza paginação obrigatória via query params `page` e `limit`.

---

## Tratamento de erros

Todos os erros são tratados de forma centralizada pelo middleware de erros. Respostas de erro seguem o formato:

```json
{
  "error": "Mensagem descritiva do erro"
}
```

Códigos HTTP utilizados: `400` (validação), `401` (não autenticado), `403` (não autorizado), `404` (não encontrado), `409` (conflito), `500` (erro interno).

---

## Autor

Desenvolvido como projeto avaliativo da disciplina de Desenvolvimento Web Back-end.

# 🚀 GEVEX - Backend de Rede Social

API RESTful desenvolvida em Node.js para simular o backend de uma rede social. O projeto implementa cadastro de usuários, autenticação, postagens, comentários e curtidas, seguindo uma arquitetura robusta em camadas.

## 📝 Contexto do Projeto
Este sistema permite o gerenciamento completo de interações em uma rede social simplificada, respeitando regras rigorosas de autenticação (JWT) e autorização de recursos.

## 🛠️ Tecnologias e Requisitos Técnicos
- **Runtime:** Node.js + Express
- **Banco de Dados:** MySQL
- **Segurança:** Senhas criptografadas com `bcrypt` e autenticação via `JWT`
- **Validação:** Joi ou Express-Validator
- **Ambiente:** Gerenciamento via variáveis de ambiente (`.env`)
- **Arquitetura:** Separação em camadas (Routes, Controllers, Services, Repositories)

## 📂 Estrutura de Pastas
```text
social-api/
├── src/
│   ├── routes/         # Definição dos endpoints
│   ├── controllers/    # Orquestração de req/res
│   ├── services/       # Regras de negócio e lógica
│   ├── repositories/   # Consultas ao Banco de Dados
│   ├── middlewares/    # Auth e Erros centralizados
│   ├── validations/    # Schemas de validação
│   └── config/         # Configurações de DB e JWT
├── sql/                # Scripts de criação das tabelas
├── docs/               # Coleção Postman/Insomnia
├── .env.example        # Exemplo de variáveis de ambiente
├── README.md
└── package.json
```
⚙️ Como Executar o Projeto

    Instalação:
    Bash

    npm install

    Banco de Dados:

        Crie o banco no MySQL.

        Execute o script SQL em /sql/ para criar as tabelas necessárias.

    Configuração:

        Renomeie .env.example para .env e preencha suas credenciais.

    Rodar a API:
    Bash

    npm run dev

📌 Requisitos Funcionais (Endpoints)
Usuários

    POST /users - Cadastro de usuário (RF01)

    POST /users/login - Login com geração de JWT (RF02)

    GET /users/:id - Visualização de perfil (RF03)

    PUT /users/:id - Atualização do próprio perfil (RF04)

Posts

    POST /posts - Criar post autenticado (RF05)

    GET /posts?page=&limit= - Listagem com paginação (RF06)

    GET /posts/:id - Visualizar post específico (RF07)

    PUT /posts/:id - Editar post (apenas autor) (RF08)

    DELETE /posts/:id - Excluir post (apenas autor) (RF09)

Interações

    POST /posts/:id/comments - Adicionar comentário (RF10)

    GET /posts/:id/comments - Listar comentários do post (RF11)

    DELETE /comments/:id - Excluir comentário (apenas autor) (RF12)

    POST /posts/:id/like - Curtir post (RF13)

    DELETE /posts/:id/like - Remover curtida (RF14)

⚖️ Regras de Negócio

    Unicidade: E-mail deve ser único no sistema.

    Privacidade: Usuário só edita/exclui seus próprios dados.

    Autoria: Posts e comentários só podem ser alterados/removidos por seus respectivos autores.

    Curtidas: Limite de 1 curtida por usuário em cada post.

    Paginação: Obrigatória na listagem de posts.

📦 Entregáveis

    Código-fonte organizado em camadas.

    Arquivo SQL de criação das tabelas.

    Arquivo .env.example.

    Coleção Postman/Insomnia para testes.

Projeto desenvolvido para fins acadêmicos - SENAI.

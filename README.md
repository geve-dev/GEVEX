# 🚀 GEVEX - Backend de Rede Social

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

**API RESTful** desenvolvida em **Node.js** para simular o backend de uma rede social completa. O projeto permite cadastro de usuários, autenticação segura, criação de postagens, comentários, curtidas e gerenciamento de interações, tudo seguindo uma **arquitetura limpa em camadas**.

---

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Endpoints Principais](#-endpoints-principais)
- [Regras de Negócio](#-regras-de-negócio)
- [Entregáveis](#-entregáveis)
- [Status do Projeto](#-status-do-projeto)

---

## 📝 Sobre o Projeto

O **GEVEX** é um backend completo para uma rede social simplificada, desenvolvido com foco em boas práticas de desenvolvimento. Ele gerencia todo o fluxo de usuários, conteúdos e interações sociais, com ênfase em **segurança**, **escalabilidade** e **manutenibilidade**.

Ideal para demonstração de conhecimentos em APIs REST, autenticação JWT e arquitetura em camadas.

**Projeto desenvolvido para fins acadêmicos — SENAI.**

---

## ✨ Funcionalidades

### Usuários
- Cadastro de novos usuários
- Login com geração de token JWT
- Visualização e atualização de perfil (apenas o próprio)

### Postagens
- Criação, edição e exclusão de posts (apenas pelo autor)
- Listagem paginada de posts
- Visualização de post individual

### Interações
- Adicionar e remover comentários
- Curtir e descurtir posts (máximo 1 curtida por usuário por post)
- Listagem de comentários por post

---

## 🛠️ Tecnologias Utilizadas

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Banco de Dados:** [MySQL](https://www.mysql.com/)
- **Autenticação:** JWT + bcrypt para hash de senhas
- **Validação:** Joi ou express-validator
- **Gerenciamento de ambiente:** dotenv (variáveis de ambiente)
- **Arquitetura:** Camadas (Routes → Controllers → Services → Repositories)

---

## 📂 Estrutura de Pastas

```text
social-api/
├── src/
│   ├── routes/          # Definição dos endpoints
│   ├── controllers/     # Controle de requisições e respostas
│   ├── services/        # Regras de negócio e lógica principal
│   ├── repositories/    # Camada de acesso ao banco de dados
│   ├── middlewares/     # Autenticação, erros e validações
│   ├── validations/     # Schemas de validação
│   └── config/          # Configurações (DB, JWT, etc.)
├── sql/                 # Scripts SQL de criação das tabelas
├── docs/                # Coleções Postman / Insomnia
├── .env.example         # Exemplo de variáveis de ambiente
├── README.md
└── package.json

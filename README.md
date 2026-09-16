# Full Stack Development - Final Assignment - Backend Only
## By Joshua Gottfried

### Chosen case study: "Hotel or venue room booking system"


# Tech Stack:

Framework: NestJS
Database / ORM: PostgreSQL + TypeORM
Auth: Better Auth with email/password login
Validation: Zod
Domain Events: ?
Background Jobs: BullMQ + Redis
Email: ?
Realtime: ? not needed?
Tests: Jest
Infra: docker compose
Project Management: Github Kanban Board

# Routes:
- /register - POST
- /login - POST
- /listings - GET
- /listing/:id - GET, POST, PATCH
- /listing/:id/book - POST

# Architecture
Basically how to recreate the project, in steps

## Create project
```sh
yarn init
npm install -g @nestjs/cli # yarn has no global command
yarn new fsd-final .
```




# Roles
- customer
- admin

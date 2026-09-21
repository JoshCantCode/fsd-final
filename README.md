# Full Stack Development - Final Assignment - Backend Only
## By Joshua Gottfried

### Chosen case study: "Hotel or venue room booking system"


# Tech Stack:

| Section | Choice |
|---------|--------|
| Framework | NestJS |
| Database/ORM | PostgreSQL + TypeORM |
| Auth | NestJS Auth with JWT |
| Validation | ? |
| Domain Events | ? |
| Background Jobs | BullMQ + Redis |
| Email | ? |
| Realtime | Notifications |
| Tests | Jest |
| Infra | Docker |


# ERD 


# Routes:
- /register - POST
- /login - POST

- /user - GET
- /user/:id - GET,POST,PATCH

- /listing - GET
- /listing/:id - GET, POST, PATCH
- /listing/:id/book - POST

- /location - GET
- /location/:id - GET,POST,PATCH

# Architecture
Basically how to recreate the project, in steps



# Roles
- User (read-only apart from write in listing)
- Admin (can edit anything)
- Manager (of a single location)

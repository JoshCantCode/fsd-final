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

# Roles
- User (read-only apart from write in listing)
- Admin (can edit anything)
- Manager (of a single location)


# The user flow

1. Create account via POST /register
2.Auth check, create new account via POST /user
3. Now authenticated to access all other customer-related endpoints


# The admin flow
1. Create account via POST /register, setting admin=true, and there must be an X-admin-key header with the admin key
2. Auth check, creates new admin account via POST /user
3. You can now do anything you want, have fun

# ExpressJS TypeScript CRUD API

A simple CRUD backend built with **ExpressJS**, **TypeScript**, and **PostgreSQL**.

## Features
- Create a resource
- List resources with optional filters (`isActive`)
- Get resource details by ID
- Update resource (including Activate / Disable)
- Delete resource
- PostgreSQL persistence
- CORS enabled for frontend integration

## Requirements
- Node.js >= 18
- PostgreSQL >= 13
- npm >= 8

## Setup

1. Clone repository:

```bash
git clone <your-repo-url>
cd <repo-folder>/backend
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the backend root:
```bash
PORT=3000
DATABASE_URL=postgres://<DB_USER>:<DB_PASSWORD>@<DB_HOST>:<DB_PORT>/<DB_NAME>
```

Example
```bash
PORT=3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/item
```

4. Run db migration

```bash
npm run migrate:up
```

5. Run the server

```bash
npm run dev
```
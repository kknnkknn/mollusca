# mollusca

A personal task management app built with Next.js, Prisma, and PostgreSQL.


---

## Stack

- [Next.js](https://nextjs.org/) (TypeScript)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [next-auth](https://next-auth.js.org/) - for authentication

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up `.env`

Copy the provided `.env.example` and adjust as needed.
```bash
cp .env.example .env
```
Your .env file should look something like:
```dotenv
# .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mollusca_dev"
NEXTAUTH_SECRET="your-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Start PostgreSQL (via Docker Compose)
Make sure Docker is running, then:
```
docker compose up -d
```

### 4. Set up the database

```bash
npx prisma migrate dev 
```

### 5. Seed initial data (Optional but recommended)

```bash
npm run seed
```

### 6. Start the dev server

```bash
npm run dev
```
Access the app at [http://localhost:3000](http://localhost:3000)

---

##  Project structure

```text
mollusca/
├── prisma/             # Prisma schema, migrations, seeds
├── src/
│   ├── app/            # Next.js App Router (pages, API routes)
│   │   └── api/        # API routes (e.g., route.ts)
│   ├── components/     # React components (planned)
│   ├── lib/            # Shared utilities (Prisma Client, helpers)
│   └── styles/         # Tailwind CSS and global styles
├── public/             # Static assets
└── docker-compose.yml  # Docker setup for PostgreSQL
```

---

## Features (WIP)

- [x] Setup with Next.js + Tailwind + Prisma
- [x] Task CRUD API
- [x] Auth with next-auth (credentials) 
- [x] User signup functionality
- [ ] Per-user task filtering
- [ ] Frontend UI for tasks
- [ ] Docker Compose setup improvements
- [ ] Automated testing (in progress)
- [ ] Deployment (AWS or Vercel planned)

### Testing 

API tests with Jest and Supertest.
Run tests:
```bash
npm run test
```

---

## Development Notes
PostgreSQL runs via Docker Compose.
Prisma Studio available with:

```bash
npx prisma studio
```
Next.js App Router structure (src/app) is used.
UI styling with Tailwind CSS.

---

## License

MIT (planned)


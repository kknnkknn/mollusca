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

Copy the provided `.env.sample` and adjust as needed.
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

### 3. Set up the database

```bash
npx prisma migrate dev --name init
```

### 4. Seed initial data (Optionai but recomended)

```bash
npm run seed
```

### 5. Start the dev server

```bash
npm run dev
```
Access the app at [http://localhost:3000](http://localhost:3000)

---

##  Project structure

```text
.
├── prisma/             # Prisma schema, migrations, and seed scripts
├── src/
│   ├── app/            # Next.js App Router (pages and API routes)
│   ├── components/     # React components (planned)
│   ├── lib/            # Shared utilities (Prisma Client, helpers, etc.)
│   └── styles/         # Tailwind CSS and global styles
├── public/             # Static assets (images, icons, etc.)
└── docker-compose.yml  # PostgreSQL setup via Docker── styles/             # Tailwind CSS
```

---

## Features (WIP)

- [x] Setup with Next.js + Tailwind + Prisma
- [x] Task CRUD API
- [x] Auth with next-auth (credentials) **(ログインのみ、サインアップは未実装)**
- [ ] Per-user task filtering
- [ ] UI for task management
- [ ] Docker Compose setup (PostgreSQL)
- [ ] 本番デプロイ（予定）

---

## Notes

- 初期はローカル開発＋PostgreSQLだけDockerで起動
- Prisma Studio (`npx prisma studio`) でDBをブラウザから確認可能
- Docker Composeの導入はあとから予定

---

## License

MIT (予定)


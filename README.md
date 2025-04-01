

```markdown
# mollusca

A personal task management app built with Next.js, Prisma, and PostgreSQL.


---

## Stack

- [Next.js](https://nextjs.org/) (TypeScript)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [next-auth (予定)](https://next-auth.js.org/) - for authentication

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up `.env`

```dotenv
# .env
DATABASE_URL="postgresql://myuser:mypass@localhost:5432/mydatabase"
NEXTAUTH_SECRET="適当なランダム文字列"
```

### 3. Set up the database

```bash
npx prisma migrate dev --name init
```

### 4. Start the dev server

```bash
npm run dev
```

Access the app at [http://localhost:3000](http://localhost:3000)

---

##  Project structure

```text
.
├── prisma/             # Prisma schema and migrations
├── pages/              # Next.js pages and API routes
├── components/         # React components (予定)
├── lib/                # Utility functions, DB client (予定)
└── styles/             # Tailwind CSS
```

---

## Features (WIP)

- [x] Setup with Next.js + Tailwind + Prisma
- [ ] Task CRUD API
- [ ] Auth with next-auth (credentials)
- [ ] Per-user task filtering
- [ ] UI for task management
- [ ] Docker化
- [ ] 本番デプロイ（予定）

---

## Notes

- 初期はローカル開発＋PostgreSQLだけDockerで起動
- Prisma Studio (`npx prisma studio`) でDBをブラウザから確認可能
- Docker Composeの導入はあとから予定

---

## License

MIT (予定)


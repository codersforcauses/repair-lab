# Repair Lab Tracker

A repair tracker for [Repair Lab](https://repairlab.myfreesites.net/) and other repair cafes.

## Stack

- Typescript
- Next.JS for frontend + backend
- Prisma as the ORM
- Postgres (Docker) for local DB
- Mocha + Chai for testing
- Clerk for auth
- TailwindCSS for styling
- ESLint + Prettier for linting

## Getting Started

First, install [Node](https://nodejs.org/en/download/) (either is fine) and [Docker](https://docs.docker.com/get-docker/).

Then, install the dependencies:

```bash
npm install
```

Duplicate the `.env.local.example` file as `.env.local`, `.env.example` file as `.env` and fill in the values found in the Discord.

If you're on Windows, change `localhost` to `host.docker.internal` for the `DATABASE_URL` and `DATABASE_URL_DIRECT` in `.env.local` and `.env`.

Now run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Database

To spin up the local db instances, install Docker and run:

```sh
docker compose up
```

Or if you want to keep using the current terminal...

```sh
docker compose up -d
```

By default, it's configured to run one on port `5432` for local development.

**Don't forget to stop the containers!**

```sh
docker compose down
```

## Prisma

### Development

When you make changes to the schema, you should sync the Prisma client with it. Run:

```sh
npx prisma db push
```

And maybe restart the Typescript server in VSCode (`CMD + SHIFT + P` then search "restart") if it keeps complaining.

You can continue to push changes as you work and the Prisma client will continue to give you correctly typed stuff, and it will not generate a migration file.

### Migration

When you're happy with your schema and everything works, run:

```sh
npx prisma migrate dev
```

This will create a migration which is saved to `prisma/migrations`.

### Studio

If you want to see the data or play around with it:

```sh
npx prisma studio
```

## Testing

Make sure you've started the Docker container.

```sh
npm run test
```

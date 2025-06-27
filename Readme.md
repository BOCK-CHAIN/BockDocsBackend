# BockDocs Backend

A secure, scalable Node.js backend for the BockDocs platform, providing RESTful APIs for document management and user authentication. Integrates with Neon Postgres (via Prisma ORM) and supports both email/password and Google OAuth authentication (via Firebase Admin SDK).

---

## Features

- User authentication (email/password & Google OAuth)
- JWT-based session management
- Document CRUD (create, read, update, delete)
- PostgreSQL database (Neon) via Prisma ORM
- Secure password hashing (bcrypt)
- CORS and JSON body parsing
- Environment-based configuration

---

## Tech Stack

- **Node.js** & **Express** — REST API server
- **Prisma ORM** — Database access and migrations
- **PostgreSQL (Neon)** — Cloud database
- **Firebase Admin SDK** — Google OAuth token verification
- **JWT** — Authentication tokens
- **bcryptjs** — Password hashing
- **dotenv** — Environment variable management

---

## Project Structure

```
BockDocs-backend/
  controllers/         # Route controllers (auth, document)
  generated/           # Prisma generated client
  prisma/              # Prisma schema and migrations
  routes/              # Express route definitions
  firebaseAdmin.js     # Firebase Admin SDK initialization
  prismaClient.js      # Prisma client instance
  .env                 # Environment variables
  index.js             # App entry point
  package.json
  serviceAccountKey.json (not committed)
```

---

## API Endpoints

### Auth

- `POST   /auth/signup`      — Register with email & password
- `POST   /auth/signin`      — Login with email & password
- `POST   /auth/google`      — Login/Upsert with Google OAuth (ID token)
- `GET    /auth/me`          — Get current user (JWT required)
- `POST   /auth/logout`      — Logout (client-side token removal)

### Documents

- `POST   /documents/create`         — Create a new document
- `GET    /documents/:id`            — Get a document by ID
- `GET    /documents/user/:userId`   — Get all documents for a user
- `PUT    /documents/save/:id`       — Update a document
- `DELETE /documents/delete/:id`     — Delete a document

---

## Database Schema

Prisma models (`prisma/schema.prisma`):

```prisma
model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  password String?
  uid      String?  @unique
  documents Document[]
}

model Document {
  id           Int      @id @default(autoincrement())
  userId       Int
  title        String
  content      String?
  createdAt    DateTime @default(now())
  lastModified DateTime @updatedAt
  user         User     @relation(fields: [userId], references: [id])
}
```

---

## Environment Variables

`.env` example:
```
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
JWT_SECRET=your_jwt_secret
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
```

- `DATABASE_URL`: Neon Postgres connection string
- `JWT_SECRET`: Secret for signing JWT tokens
- `GOOGLE_APPLICATION_CREDENTIALS`: Path to your Firebase service account JSON

---

## Setup & Development

1. **Clone the repository:**
   ```sh
   git clone https://github.com/BOCK-CHAIN/BockDocs-backend.git
   cd BockDocs-backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - DATABASE_URL=your neon url
JWT_SECRET=bockdocs
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json

4. **Set up Prisma and database:**
   ```sh
   npx prisma generate
   npx prisma migrate deploy
   ```

5. **Start the server:**
   ```sh
   npm start
   ```

---

## Authentication Flow

- **Email/Password:** Users register and login via `/auth/signup` and `/auth/signin`. Passwords are hashed with bcrypt. JWT is returned and must be sent in the `Authorization` header for protected routes.
- **Google OAuth:** Frontend obtains a Firebase ID token via Google sign-in, then POSTs it to `/auth/google`. The backend verifies the token with Firebase Admin SDK and upserts the user.

---

## Security Notes

- Never commit your `.env` or `serviceAccountKey.json` to version control.
- Always use strong JWT secrets and secure your database credentials.
- CORS is enabled for development; restrict origins in production.

---

## License

MIT

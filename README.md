# Investor Interest & Notification Backend

## Overview

This project is a backend application that allows investors to express interest in startups.

When an investor expresses interest, the interest is stored in PostgreSQL, an event is published to Redis, a notification is created for the startup founder, and a real-time Socket.IO event is emitted.

The project is built using Bun, Express.js, TypeScript, PostgreSQL, Prisma ORM, Redis, and Socket.IO.

---

## Tech Stack

- Bun
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Redis
- Socket.IO
- JWT Authentication
- Zod Validation
- bcrypt

---

## Project Structure

```text
src
│
├── controllers
├── middleware
├── prisma
├── redis
├── routes
├── services
├── socket
├── utils
├── validators
├── app.ts
└── server.ts
```

---

## Features

- User Registration
- User Login
- JWT Authentication
- Request Validation using Zod
- Express Interest API
- Duplicate Interest Prevention
- Redis Publish/Subscribe
- Automatic Founder Notifications
- Real-time Founder Notifications using Socket.IO
- Get Notifications API

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/harryjcpy/investor-interest.git
cd investor-interest
```

### 2. Install dependencies

```bash
bun install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root using the values from `.env.example`.

Example:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/investor_interest"
JWT_SECRET="your_jwt_secret"
PORT=3000
```

### 4. Generate Prisma Client

```bash
bunx prisma generate
```

### 5. Push the Database Schema

```bash
bunx prisma db push
```

### 6. Start Redis

Make sure Redis is running before starting the server.

For Windows development, Memurai Developer Edition can be used as a Redis-compatible server.

### 7. Start the Server

```bash
bun run dev
```

---

## API Endpoints

### POST `/api/auth/register`

Registers a new user.

**Example Request Body**

```json
{
  "name": "Harshit",
  "email": "harshit@test.com",
  "password": "123456",
  "role": "INVESTOR"
}
```

---

### POST `/api/auth/login`

Authenticates a user and returns a JWT token.

**Example Request Body**

```json
{
  "email": "harshit@test.com",
  "password": "123456"
}
```

---

### POST `/api/interests/express`

Allows an authenticated investor to express interest in a startup.

**Authorization**

```text
Bearer <JWT Token>
```

**Example Request Body**

```json
{
  "startupId": 1
}
```

---

### GET `/api/notifications`

Returns all notifications for the authenticated user.

**Authorization**

```text
Bearer <JWT Token>
```

---

## Event Flow

1. An investor expresses interest in a startup.
2. The interest is stored in PostgreSQL.
3. An event is published to Redis.
4. The Redis subscriber receives the event.
5. A notification is created for the startup founder.
6. A `new_interest` Socket.IO event is emitted to the founder.

---

## Authentication

Protected endpoints require a valid JWT token.

Example:

```text
Authorization: Bearer <JWT Token>
```

---

## Notes

- Duplicate interests from the same investor for the same startup are prevented.
- Passwords are securely hashed using bcrypt.
- JWT is used for authentication.
- Prisma ORM is used for database operations.
- Redis is used for publishing and subscribing to events.
- Socket.IO is used to send real-time notifications.

---

## Assumptions

- Investors and founders must be registered before using the APIs.
- A startup must exist before an investor can express interest.
- Redis (or Memurai on Windows) must be running before starting the backend server.
- Socket.IO notifications are emitted only when the founder is connected.

---

## Future Improvements

- Add unit and integration tests.
- Add pagination for notifications.
- Allow founders to mark notifications as read.
- Store Redis configuration using environment variables.
- Add refresh token support for authentication.
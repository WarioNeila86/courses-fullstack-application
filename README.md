# Full Stack Courses Application

This is a personal project to learn about frontend development with React and backend development with NodeJS and Express.

Full Stack application to manage courses using the **PERN stack**:

- **P**ostgreSQL for the database
- **E**xpress for the backend server
- **R**eact for the frontend
- **N**ode.js for runtime

---

## 🧠 Overview

### Server side: REST API with Node.js, Express & Sequelize (PostgreSQL)

REST API to manage courses — it supports full CRUD:

- **C**reate new courses
- **R**ead existing courses (get all or by ID)
- **U**pdate existing courses
- **D**elete courses

### Client side: React app created using Vite

For now, the frontend client shows all courses and allows searching by ID.

<img src="https://user-images.githubusercontent.com/6084473/200138408-25f6d8e3-6391-4252-b783-a237e54a8e01.png" alt="Courses list" width="600" >

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/en/) (v18+ recommended)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/downloads)

---

## 🚀 Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone git@github.com:WarioNeila86/courses-fullstack-application.git
cd courses-fullstack-application
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure the database

- Create PostgreSQL DB user
  - Windows:
    ```bash
    psql -U postgres
    CREATE USER "db-user" PASSWORD 'db-password' CREATEDB;
    ```
  - Linux:
    ```bash
    sudo -u postgres psql -c "CREATE USER \"db-user\" PASSWORD 'db-password' CREATEDB;"
    ```

### 4️⃣ Create the .env file

- Create a `.env` file in the root directory and add the following variables:
  ```
  DB_DEVELOPMENT_USERNAME=db-user
  DB_DEVELOPMENT_PASSWORD=db-password
  ```

### 5️⃣ Create and seed the database

```bash
npm run db-setup
```

### 6️⃣ Start the application

- Start the app: `npm run start`
- Start the server: `npm run server-start` - server can be accessed on http://localhost:4000/
- Start the server in development mode (it will automatically restart after changes are made): `npm run server-start-dev`
- Start the client: `npm run client-run-dev` - client can be accessed on http://localhost:3000/
- After starting the server, Swagger documentation can be accessed on http://localhost:4000/api/docs/

### 7️⃣ Run tests

```bash
npm test
```

## 📌 Sources

- 📺 YouTube course: [How to build a REST API with Node js & Express
  ](https://www.youtube.com/watch?v=pKd0Rpw7O48)
- 📝 [Restful API with NodeJS, Express, PostgreSQL, Sequelize, Travis, Mocha, Coveralls and Code Climate](https://medium.com/@victorsteven/restful-api-with-nodejs-express-postgresql-sequelize-travis-mocha-coveralls-and-code-climate-f28715f7a014)
- 📝 [Documenting your Express API with Swagger](https://blog.logrocket.com/documenting-your-express-api-with-swagger/)
- 📺 YouTube course: [CURSO de REACT JS desde 0](https://www.youtube.com/playlist?list=PL3aEngjGbYhkg3AR-cytsvQIIGp1JgrY_)

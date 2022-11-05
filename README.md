# Full Stack Courses application

This is a personal project to learn about frontend development with React and backend development with NodeJS and Express

Full Stack application to manage courses. It uses *PERN* stack:
* **P**ostgreSQL for the database
* **E**xpress for the server
* **R**eact for the frontend side
* **N**ode.js for the server

---

## Server side: REST API with NodeJS, Express & Sequelize with PostgreSQL

REST API server to manage courses, which allows you to perform all CRUD operations:
* **C**reate new courses
* **R**ead existing courses (getting full list or searching by id)
* **U**pdate existing course
* **D**elete existing course

## Frontend client side: React app created using vite

For now the frontend client shows all courses and allows searching by id

<img src="https://user-images.githubusercontent.com/6084473/200138408-25f6d8e3-6391-4252-b783-a237e54a8e01.png" alt="Courses list" width="600" >

---

### Prerequisites
* Install [nodeJS](https://nodejs.org/en/)
* Clone this repo
* Install project dependencies by running `npm install`

### How to execute the app/tests:
* Start the server: `npm run server-start` - server can be accessed on http://localhost:4000/
* Start the server in development mode (it will automatically restart after changes are made): `npm run server-start-dev`
* Start the client: `npm run client-run-dev` - client can be accessed on http://localhost:3000/
* After starting the server, Swagger documentation can be accessed on http://localhost:4000/api/docs/

## Additional scripts:
* Run unit tests: `npm test`
* Server lint checks: `npm run server-lint`
* Client lint checks: `npm run client-lint`
* Use prettier to format client code:`npm run client-format`


### Sources
* 📺 YouTube course: [How to build a REST API with Node js & Express
](https://www.youtube.com/watch?v=pKd0Rpw7O48)
* 📝 [Restful API with NodeJS, Express, PostgreSQL, Sequelize, Travis, Mocha, Coveralls and Code Climate](https://medium.com/@victorsteven/restful-api-with-nodejs-express-postgresql-sequelize-travis-mocha-coveralls-and-code-climate-f28715f7a014)
* 📝 [Documenting your Express API with Swagger](https://blog.logrocket.com/documenting-your-express-api-with-swagger/)
* 📺 YouTube course: [CURSO de REACT JS desde 0](https://www.youtube.com/playlist?list=PL3aEngjGbYhkg3AR-cytsvQIIGp1JgrY_)

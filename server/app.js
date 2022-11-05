const express = require('express');
const app = express();
const courseRouter = require('./routes/course-routes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Courses Express API with Swagger',
      version: '1.0.0',
      description:
                'This is a simple CRUD API application made with Express to manage Courses, documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'WarioNeila86',
        url: 'https://github.com/WarioNeila86/'
      }
    }
  },
  apis: ['server/routes/course-routes.js']
};

const specs = swaggerJsdoc(options);
app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

// recognize the incoming request object as a JSON Object - this method is called as a middleware
app.use(express.json());
// Add /api/courses router to middleware chain
app.use('/api/courses', courseRouter);

module.exports = app;

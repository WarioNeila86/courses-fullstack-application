const express = require('express');
const router = express.Router();

const { CourseController } = require('../controllers/course-controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated id of the course
 *         name:
 *           type: string
 *           description: Course name
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date of the record creation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date of the record creation
 *     Error:
 *       type: string
 *       description: Error message
 */

/**
 * @swagger
 * /api/courses/:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Returns all courses stored in database
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               description: Array of courses
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get('/', async (req, res) => {
  const courseController = new CourseController();
  const courses = await courseController.getCourses();
  res.send(courses);
});

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Returns specific course stored in database searching by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The course id
 *     responses:
 *       '200':
 *         description: OK - Found course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       '404':
 *         description: Course Not Found
 *         content:
 *           text/plain:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', async (req, res) => {
  const courseController = new CourseController();
  try {
    const foundCourse = await courseController.getCourse(Number(req.params.id));
    res.send(foundCourse);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @swagger
 * /api/courses/:
 *   post:
 *     tags:
 *       - Courses
 *     summary: Create new course providing its name
 *     requestBody:
 *       description: Create course request parameters
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The course name
 *     responses:
 *       '201':
 *         description: OK - Created course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       '400':
 *         description: Bad Request
 *         content:
 *           text/plain:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Course Not Created
 *         content:
 *           text/plain:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', async (req, res) => {
  const courseController = new CourseController();
  try {
    const addedCourse = await courseController.createCourse(req.body);
    res.status(201);
    res.send(addedCourse);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     tags:
 *       - Courses
 *     summary: Updates an existing course by providing its id in url path and new name in body
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The course id
 *     requestBody:
 *       description: New name
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name for the course
 *     responses:
 *       '200':
 *         description: OK - Updated course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       '404':
 *         description: Course Not Found
 *         content:
 *           text/plain:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '400':
 *         description: Bad Request
 *         content:
 *           text/plain:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', async (req, res) => {
  const courseController = new CourseController();
  try {
    const updatedCourse = await courseController.updateCourse(
      Number(req.params.id),
      req.body
    );
    res.send(updatedCourse);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     tags:
 *       - Courses
 *     summary: Deletes a course stored in database searching by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The course id
 *     responses:
 *       '200':
 *         description: OK - Deleted course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       '404':
 *         description: Course Not Found
 *         content:
 *           text/plain:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', async (req, res) => {
  const courseController = new CourseController();
  try {
    const deletedCourse = await courseController.deleteCourse(
      Number(req.params.id)
    );
    res.send(deletedCourse);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

const {CourseController} = require('../controllers/course-controller');

// Retrieve all courses route
router.get('/', async (req, res) => {
    const courseController = new CourseController();
    const courses = await courseController.getCourses();
    res.send(courses);
});

// Retrieve specific course by id
router.get('/:id', async (req, res) => {
    const courseController = new CourseController();
    try {
        const foundCourse = await courseController.getCourse(Number(req.params.id));
        res.send(foundCourse);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

// Create new course providing its name in request body
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

// Update an existing course by providing its id in url path and new name in body
router.put('/:id', async (req, res) => {
    const courseController = new CourseController();
    try {
        const updatedCourse = await courseController.updateCourse(req.body, Number(req.params.id));
        res.send(updatedCourse);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

// delete a course by providing its id in url path
router.delete('/:id', async (req, res) => {
    const courseController = new CourseController();
    try {
        const deletedCourse = await courseController.deleteCourse(Number(req.params.id));
        res.send(deletedCourse);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();

const {createCourse, deleteCourse, getCourse, getCourses, updateCourse} = require('../controllers/course-controller');

// Retrieve all courses route
router.get('/', async (req, res) => {
    await getCourses(req, res);
});


// retrieve a specific course by providing its id in url path
router.get('/:id', async (req, res) => {
    await getCourse(req, res);
});

// create a new course providing its name in request body
router.post('/', async (req, res) => {
    await createCourse(req, res);
});

// update an existing course by providing its id in url path and new name in body
router.put('/:id', async (req, res) => {
    await updateCourse(req, res);
});

// delete a course by providing its id in url path
router.delete('/:id', async (req, res) => {
    await deleteCourse(req, res);
});

module.exports = router;
const {validateCourse} = require('./validation');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'Course 1'},
    {id: 2, name: 'Course 2'},
    {id: 3, name: 'Course 3'}
]

// handle get request to our server
app.get('/', (req, res) => {
    res.send('Hello World!!');
});

// retrieve all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// using a param to retrieve a specific course
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id, 10));
    if (!course) {
        res.status(404).send(`The course with id '${req.params.id}' was not found`);
    } else {
        res.send(course);
    }
});

// create a new course
app.post('/api/courses', (req, res) => {
    const {error: validationError} = validateCourse(req.body);

    if (validationError) {
        const {message} = validationError;
        return res.status(400).send(`Wrong format: ${message}`);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// update resources
app.put('/api/courses/:id', (req, res) => {
    // look for the course
    // if course does not exist, return 404 / Not Found
    const course = courses.find(course => course.id === parseInt(req.params.id, 10));
    if (!course) {
        return res.status(404).send(`The course with id '${req.params.id}' was not found`);
    }

    // validate, if invalid, return 400 / Bad Request
    const {error: validationError} = validateCourse(req.body);

    if (validationError) {
        const {message} = validationError;
        return res.status(400).send(`Wrong format: ${message}`);
    }

    // Return updated course
    course.name = req.body.name;
    res.send(course);
});

// delete a course
app.delete('/api/courses/:id', (req, res) => {
    // look for the course
    // if course does not exist, return 404 / Not Found
    const course = courses.find(course => course.id === parseInt(req.params.id, 10));
    if (!course) {
        return res.status(404).send(`The course with id '${req.params.id}' was not found`);
    }

    // delete the course
    const courseIndex = courses.indexOf(course);
    courses.splice(courseIndex, 1);

    // return deleted course
    res.send(course);
});

// read PORT from env variable PORT, 3000 as default
const port = process.env.PORT || 3000;

// make our app listen at a given port
app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});
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
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// read PORT from env variable PORT, 3000 as default
const port = process.env.PORT || 3000;

// make our app listen at a given port
app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});
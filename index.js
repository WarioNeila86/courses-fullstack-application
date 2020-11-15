const {validateCourse} = require('./validation');
const express = require('express');
const app = express();

// recognize the incoming request object as a JSON Object - this method is called as a middleware
app.use(express.json());

const database = require('./api/server/src/models');

// GET request for the root path of the server will show a Hello World message
app.get('/', (req, res) => {
    res.send('Hello World!!');
});

// retrieve all courses
app.get('/api/courses', async (req, res) => {
    // res.send(courses);
    await database.Course.findAll().then(books => {
        res.send(books);
    }).catch(error => {
        res.status(404).send(error.message);
    });
});

// retrieve a specific course by providing its id in url path
app.get('/api/courses/:id', async (req, res) => {
    const foundCourse = await database.Course.findOne({
        where: { id: Number(req.params.id) }
    });
    if (!foundCourse) {
        res.status(404).send(`The course with id '${req.params.id}' was not found`);
    } else {
        res.send(foundCourse);
    }
});

// create a new course providing its name in request body
app.post('/api/courses', async (req, res) => {
    const newCourse = req.body;

    // validate, if invalid, return 400 / Bad Request
    const {error: validationError} = validateCourse(newCourse);
    if (validationError) {
        const {message} = validationError;
        return res.status(400).send(`Wrong format: ${message}`);
    }
    const addedCourse = await database.Course.create(newCourse);
    if (addedCourse) {
        res.send(addedCourse);
    } else {
        console.log('Unable to add course');
    }
});

// update an existing course by providing its id in url path and new name in body
app.put('/api/courses/:id', async (req, res) => {
    const newData = req.body;

    // validate, if invalid, return 400 / Bad Request
    const {error: validationError} = validateCourse(newData);
    if (validationError) {
        const {message} = validationError;
        return res.status(400).send(`Wrong format: ${message}`);
    }

    // search for the course, if course does not exist return 404 / Not Found
    const foundCourse = await database.Course.findOne({
        where: { id: Number(req.params.id) }
    });
    if (!foundCourse) {
        return res.status(404).send(`The course with id '${req.params.id}' was not found`);
    } else {
        // if found, replace the name and save the changes -- this will perform the UPDATE in DB
        foundCourse.name = newData.name;
        await foundCourse.save();
        res.send(foundCourse);
    }
});

// delete a course by providing its id in url path
app.delete('/api/courses/:id', async (req, res) => {
    // search for the course, if course does not exist return 404 / Not Found
    const foundCourse = await database.Course.findOne({
        where: { id: Number(req.params.id) }
    });
    if (!foundCourse) {
        res.status(404).send(`The course with id '${req.params.id}' was not found`);
    } else {
        // if found, delete the course
        await database.Course.destroy({
            where: {
                id: Number(req.params.id)
            }
        });

        // return deleted course -- sequelize destroy returns the number of deleted rows, not the rows itself
        res.send(foundCourse);
    }
});

// read PORT from env variable PORT or use port 3000 as default
const port = process.env.PORT || 3000;

// start the server listening at a given port
app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});
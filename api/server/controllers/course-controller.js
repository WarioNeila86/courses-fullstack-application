const database = require('../src/models');
const { validateCourse } = require('../../../validation');

const getCourses = async (req, res) => {
    await database.Course.findAll()
        .then(books => res.send(books))
        .catch(error => res.status(404).send(error.message));
}

const getCourse = async (req, res) => {
    const foundCourse = await database.Course.findOne({
        where: { id: Number(req.params.id) }
    });
    if (!foundCourse) {
        res.status(404).send(`The course with id '${req.params.id}' was not found`);
    } else {
        res.send(foundCourse);
    }
}

const createCourse = async (req, res) => {
    const newCourse = req.body;

    // validate, if invalid, return 400 / Bad Request
    const { error: validationError } = validateCourse(newCourse);
    if (validationError) {
        const { message } = validationError;
        return res.status(400).send(`Wrong format: ${message}`);
    }
    const addedCourse = await database.Course.create(newCourse);
    if (addedCourse) {
        res.send(addedCourse);
    } else {
        console.log('Unable to add course');
    }
}

const updateCourse = async (req, res) => {
    const newData = req.body;

    // validate, if invalid, return 400 / Bad Request
    const { error: validationError } = validateCourse(newData);
    if (validationError) {
        const { message } = validationError;
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
}

const deleteCourse = async (req, res) => {
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
}

module.exports = {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}
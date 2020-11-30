const database = require('../src/models');
const { validateCourse } = require('../utils/validation');

class CourseController {

    async getCourses() {
        const courses = await database.Course.findAll();
        if (courses) {
            return courses;
        } else {
            const error = new Error('No courses were found');
            error.status = 404;
            throw error;
        }
    }

    async getCourse(id) {
        const foundCourse = await database.Course.findOne({
            where: { id }
        });
        if (!foundCourse) {
            const error = new Error(`The course with id '${id}' was not found`);
            error.status = 404;
            throw error;
        } else {
            return foundCourse;
        }
    }

    async createCourse(course) {
        // validate, if invalid, throw 400 error / Bad Request
        const { error: validationError } = validateCourse(course);
        if (validationError) {
            const { message } = validationError;
            const error = new Error(`Wrong format: ${message}`);
            error.status = 400;
            throw error;
        }
        try {
            const addedCourse = await database.Course.create(course);
            return addedCourse;
        } catch (error) {
            error.status = 500;
            error.message = `Unable to add course: ${error.message}`;
            throw error;
        }
    }

    async updateCourse(course, id) {
        // validate, if invalid, return 400 / Bad Request
        const { error: validationError } = validateCourse(course);
        if (validationError) {
            const { message } = validationError;
            const error = new Error(`Wrong format: ${message}`);
            error.status = 400;
            throw error;
        }

        // search for the course, if course does not exist return 404 / Not Found
        const foundCourse = await database.Course.findOne({
            where: { id }
        });
        if (!foundCourse) {
            const error = new Error(`The course with id '${id}' was not found`);
            error.status = 404;
            throw error;
        } else {
            // if found, replace the name and save the changes -- this will perform the UPDATE in DB
            foundCourse.name = course.name;
            try {
                await foundCourse.save();
                return foundCourse;
            } catch (error) {
                error.status = 500;
                error.message = `Unable to update course: ${error.message}`;
                throw error;
            }
            
        }
    }

    async deleteCourse(id) {
        // search for the course, if course does not exist return 404 / Not Found
        const foundCourse = await database.Course.findOne({
            where: { id }
        });
        if (!foundCourse) {
            const error = new Error(`The course with id '${id}' was not found`);
            error.status = 404;
            throw error;
        } else {
            // delete the course
            await database.Course.destroy({
                where: { id }
            });
            // return deleted course -- sequelize destroy returns the number of deleted rows, not the rows itself
            return foundCourse;
        }
    }
}

module.exports.CourseController = CourseController;
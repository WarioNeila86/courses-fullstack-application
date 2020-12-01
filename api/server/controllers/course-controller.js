const database = require('../src/models');
const { validateCourse } = require('../utils/validation');

class CourseController {

    /**
     * Returns all courses stored in database
     * @returns {Promise<Array<Object>>} List of courses found in database
     */
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

    /**
     * Returns specific course from database searching by id
     * Throws an error if the course is not found
     * @param {number} id - The id of the course to retrieve
     * @returns {Promise<Object>} Found course
     */
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

    /**
     * Creates a course in the database
     * * Throws an error if the name format is incorrect
     * @param {Object} course - Object containing course name
     * @returns {Promise<Object>} Course created
     */
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

    /**
     * Modifies a course already stored in the database
     * Throws an error if the course is not found or the new name format is incorrect
     * @param {Object} course - Object containing the new course name
     * @param {number} id - The id of the course to modify
     * @returns {Promise<Object>} Course modified
     */
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

    /**
     * Deletes a course from the database
     * Throws an error if the course is not found
     * @param {number} id - The id of the course to delete
     * @returns {Promise<Object>} Course deleted
     */
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
            try {
                // delete the course
                await database.Course.destroy({
                    where: { id }
                });
                // return deleted course -- sequelize destroy returns the number of deleted rows, not the rows itself
                return foundCourse;
            } catch (error) {
                error.status = 500;
                error.message = `Unable to delete course: ${error.message}`;
                throw error;
            }
        }
    }
}

module.exports.CourseController = CourseController;
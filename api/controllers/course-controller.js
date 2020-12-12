const { validateCourse } = require('../utils/validation');
const { DbHelper } = require('../helpers/db-helpers');

class CourseController {

    constructor() {
        this._dbHelper = new DbHelper();
    }

    /**
     * Returns all courses stored in database
     * @returns {Promise<Array<Object>>} List of courses found in database
     */
    async getCourses() {
        return await this._dbHelper.findAllCourses();
    }

    /**
     * Returns specific course from database searching by id
     * Throws an error if the course is not found
     * @param {number} id - The id of the course to retrieve
     * @returns {Promise<Object>} Found course
     */
    async getCourse(id) {
        return await this._dbHelper.findCourseById(id);
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
        return await this._dbHelper.createCourse(course);
    }

    /**
     * Modifies a course already stored in the database
     * Throws an error if the course is not found or the new name format is incorrect
     * @param {number} id - The id of the course to modify
     * @param {Object} course - Object containing the new course name
     * @returns {Promise<Object>} Course modified
     */
    async updateCourse(id, course) {
        // validate, if invalid, return 400 / Bad Request
        const { error: validationError } = validateCourse(course);
        if (validationError) {
            const { message } = validationError;
            const error = new Error(`Wrong format: ${message}`);
            error.status = 400;
            throw error;
        }

        return await this._dbHelper.updateCourse(id, course.name);
    }

    /**
     * Deletes a course from the database
     * Throws an error if the course is not found
     * @param {number} id - The id of the course to delete
     * @returns {Promise<Object>} Course deleted
     */
    async deleteCourse(id) {
        const courseToDelete = await this._dbHelper.findCourseById(id);
        await this._dbHelper.deleteCourse(id);
        return courseToDelete;
    }
}

module.exports.CourseController = CourseController;
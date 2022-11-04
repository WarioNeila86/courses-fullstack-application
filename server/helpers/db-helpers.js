const database = require('../db/models');

class DbHelper {
  /**
     * Find all courses in the database
     * @returns {Promise<Array[Object]>} - Found courses
     */
  async findAllCourses () {
    const courses = await database.Course.findAll();
    if (courses) {
      return courses;
    }
    const error = new Error('No courses were found');
    error.status = 404;
    throw error;
  }

  /**
     * Search for a course in the database, throws an error if the course is not found
     * @param {number} id - The id of the course to retrieve
     * @returns {Promise<Object>} - Found course
     */
  async findCourseById (id) {
    const foundCourse = await database.Course.findOne({
      where: { id }
    });
    if (foundCourse) {
      return foundCourse;
    }
    const error = new Error(`The course with id '${id}' was not found`);
    error.status = 404;
    throw error;
  }

  /**
     * Create a course in the database
     * @param {{name: string}} course - Object containing course name
     * @returns {Promise<Object>} - Course added
     */
  async createCourse (course) {
    try {
      return await database.Course.create(course);
    } catch (error) {
      error.status = 500;
      error.message = `Unable to add course: ${error.message}`;
      throw error;
    }
  }

  /**
     * Modifies a course already stored in the database
     * Throws an error if the course is not found or the new name format is incorrect
     * @param {number} id - The id of the course to modify
     * @param {string} newName - New name for the course
     * @returns {Promise<Object>} - Course updated
     */
  async updateCourse (id, newName) {
    const foundCourse = await this.findCourseById(id);
    foundCourse.name = newName;
    try {
      return await foundCourse.save();
    } catch (error) {
      error.status = 500;
      error.message = `Unable to update course: ${error.message}`;
      throw error;
    }
  }

  /**
     * Deletes a course from the database
     * @param {number} id - The id of the course to delete
     * @returns {Promise<void>}
     */
  async deleteCourse (id) {
    try {
      await database.Course.destroy({
        where: { id }
      });
    } catch (error) {
      error.status = 500;
      error.message = `Unable to delete course: ${error.message}`;
      throw error;
    }
  }
}

module.exports = {
  DbHelper
};

jest.mock('../src/models');
const database = require('../src/models');

jest.mock('../utils/validation');
const { validateCourse } = require('../utils/validation');

const { CourseController } = require('./course-controller');
let courseController;

beforeEach(() => {
    courseController = new CourseController();
    jest.clearAllMocks();
})

describe('getCourses tests', () => {
    test('should return a list of courses', async () => {
        const expectedResponse = [
            { id: 1, name: 'Course 1' },
            { id: 2, name: 'Course 2' }
        ];
        database.Course.findAll = jest.fn(() => Promise.resolve(expectedResponse));
        const result = await courseController.getCourses();
        expect(database.Course.findAll).toHaveBeenCalledTimes(1);
        expect(result).toBe(expectedResponse);
    });

    test('should throw an error if there are no courses', async () => {
        const expectedResponse = undefined;
        database.Course.findAll = jest.fn(() => Promise.resolve(expectedResponse));
        try {
            await courseController.getCourses();
            expect(true).toBe(false);
        } catch (error) {
            expect(database.Course.findAll).toHaveBeenCalledTimes(1);
            expect(error.status).toEqual(404);
            expect(error.message).toEqual('No courses were found');
        }
    });
});

describe('getCourse tests', () => {
    test('should return found course', async () => {
        const id = 1;
        const expectedResponse = { id, name: 'Course 1' };
        database.Course.findOne = jest.fn(() => Promise.resolve(expectedResponse));
        const result = await courseController.getCourse(id);
        expect(database.Course.findOne).toHaveBeenCalledTimes(1);
        expect(result).toBe(expectedResponse);
    });

    test('should throw an error if the course with id is not found', async () => {
        const expectedResponse = undefined;
        const id = 1;
        database.Course.findOne = jest.fn(() => Promise.resolve(expectedResponse));
        try {
            await courseController.getCourse(id);
            expect(true).toBe(false);
        } catch (error) {
            expect(database.Course.findOne).toHaveBeenCalledTimes(1);
            expect(error.status).toEqual(404);
            expect(error.message).toEqual(`The course with id '${id}' was not found`);
        }
    });
});

describe('createCourse tests', () => {
    test('should return created course with id and name', async () => {
        const course = { name: 'Course 1' };
        const expectedResponse = { id: 1, name: 'Course 1' };
        validateCourse.mockImplementationOnce(() => 'Success');
        database.Course.create = jest.fn(() => Promise.resolve(expectedResponse));
        const result = await courseController.createCourse(course);
        expect(database.Course.create).toHaveBeenCalledTimes(1);
        expect(result).toMatchObject(course);
        expect(result).toHaveProperty('id');
    });

    test('should throw an error if the course format is incorrect', async () => {
        const course = { name: 'Co' };
        validateCourse.mockImplementationOnce(() => ({
            error: {
                message: '"name" length must be at least 3 characters long'
            }
        }));
        try {
            await courseController.createCourse(course);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.status).toBe(400);
            expect(error.message).toBe('Wrong format: "name" length must be at least 3 characters long');
        }
    });

    test('should throw an error if name is missing', async () => {
        const course = {};
        validateCourse.mockImplementationOnce(() => ({
            error: {
                message: '"name" is required'
            }
        }));
        try {
            await courseController.createCourse(course);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.status).toBe(400);
            expect(error.message).toBe('Wrong format: "name" is required');
        }
    });

    test('should throw an error if adding to database failed', async () => {
        const course = { name: 'Course 1' };
        validateCourse.mockImplementationOnce(() => 'Success');
        database.Course.create = jest.fn(() => Promise.reject(new Error('Database problem creating course')));
        try {
            await courseController.createCourse(course);
            expect(true).toBe(false);
        } catch (error) {
            expect(database.Course.create).toHaveBeenCalledTimes(1);
            expect(error.status).toBe(500);
            expect(error.message).toBe('Unable to add course: Database problem creating course');
        }
    });
});

describe('updateCourse tests', () => {
    test('should return updated course with id and name', async () => {
        const course = { name: 'New name' };
        const id = 1;
        const foundCourse = { id, name: 'Course 1' };
        validateCourse.mockImplementationOnce(() => 'Success');
        const mockSave = { save: jest.fn() };
        database.Course.findOne = jest.fn(() => Promise.resolve({ ...foundCourse, ...mockSave }));
        const result = await courseController.updateCourse(course, id);
        expect(database.Course.findOne).toHaveBeenCalledTimes(1);
        expect(mockSave.save).toHaveBeenCalledTimes(1);
        expect(result).toMatchObject(course);
        expect(result).toHaveProperty('id');
    });

    test('should throw an error if the course format is incorrect', async () => {
        const course = { name: 'Co' };
        validateCourse.mockImplementationOnce(() => ({
            error: {
                message: '"name" length must be at least 3 characters long'
            }
        }));
        try {
            await courseController.updateCourse(course);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.status).toBe(400);
            expect(error.message).toBe('Wrong format: "name" length must be at least 3 characters long');
        }
    });

    test('should throw an error if name is missing', async () => {
        const course = {};
        validateCourse.mockImplementationOnce(() => ({
            error: {
                message: '"name" is required'
            }
        }));
        try {
            await courseController.updateCourse(course);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.status).toBe(400);
            expect(error.message).toBe('Wrong format: "name" is required');
        }
    });

    test('should throw an error if the course with id is not found', async () => {
        const expectedResponse = undefined;
        const course = { name: 'New name' };
        const id = 1;
        validateCourse.mockImplementationOnce(() => 'Success');
        database.Course.findOne = jest.fn(() => Promise.resolve(expectedResponse));
        try {
            await courseController.updateCourse(course, id);
            expect(true).toBe(false);
        } catch (error) {
            expect(database.Course.findOne).toHaveBeenCalledTimes(1);
            expect(error.status).toEqual(404);
            expect(error.message).toEqual(`The course with id '${id}' was not found`);
        }
    });

    test('should throw an error if updating database failed', async () => {
        const course = { name: 'New name' };
        const id = 1;
        const foundCourse = { id, name: 'Course 1' };
        validateCourse.mockImplementationOnce(() => 'Success');
        const mockSave = { save: jest.fn() };
        database.Course.findOne = jest.fn(() => Promise.resolve({ ...foundCourse, ...mockSave }));
        mockSave.save = jest.fn(() => Promise.reject(new Error('Database problem saving data')));
        try {
            await courseController.updateCourse(course, id);
            expect(true).toBe(false);
        } catch (error) {
            expect(database.Course.findOne).toHaveBeenCalledTimes(1);
            expect(mockSave.save).toHaveBeenCalledTimes(1);
            expect(error.status).toBe(500);
            expect(error.message).toBe('Unable to update course: Database problem saving data');
        }
    });
});

describe('deleteCourse tests', () => {
    test('should return deleted course', async () => {
        const id = 1;
        const expectedResponse = { id, name: 'Course 1' };
        database.Course.findOne = jest.fn(() => Promise.resolve(expectedResponse));
        database.Course.destroy = jest.fn(() => Promise.resolve());
        const result = await courseController.deleteCourse(id);
        expect(database.Course.findOne).toHaveBeenCalledTimes(1);
        expect(database.Course.destroy).toHaveBeenCalledTimes(1);
        expect(result).toBe(expectedResponse);
    });

    test('should throw an error if the course with id is not found', async () => {
        const expectedResponse = undefined;
        const id = 1;
        database.Course.findOne = jest.fn(() => Promise.resolve(expectedResponse));
        try {
            await courseController.deleteCourse(id);
            expect(true).toBe(false);
        } catch (error) {
            expect(database.Course.findOne).toHaveBeenCalledTimes(1);
            expect(database.Course.destroy).toHaveBeenCalledTimes(0);
            expect(error.status).toEqual(404);
            expect(error.message).toEqual(`The course with id '${id}' was not found`);
        }
    });

    test('should throw an error if deleting in database failed', async () => {
        const id = 1;
        const expectedResponse = { id, name: 'Course 1' };
        database.Course.findOne = jest.fn(() => Promise.resolve(expectedResponse));
        database.Course.destroy = jest.fn(() => Promise.reject(new Error('Database problem deleting data')));
        try {
            await courseController.deleteCourse(id);
            expect(true).toBe(false);
        } catch (error) {
            expect(database.Course.findOne).toHaveBeenCalledTimes(1);
            expect(database.Course.destroy).toHaveBeenCalledTimes(1);
            expect(error.status).toBe(500);
            expect(error.message).toBe('Unable to delete course: Database problem deleting data');
        }
    });
});
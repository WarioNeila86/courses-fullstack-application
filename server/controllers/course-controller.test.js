const mockDbHelper = {
  findAllCourses: jest.fn(),
  findCourseById: jest.fn(),
  createCourse: jest.fn(),
  updateCourse: jest.fn(),
  deleteCourse: jest.fn()
};
jest.mock('../helpers/db-helpers', () => ({ DbHelper: jest.fn().mockImplementation(() => mockDbHelper) }));

jest.mock('../utils/validation');
const { validateCourse } = require('../utils/validation');

const { CourseController } = require('./course-controller');
let courseController;

beforeEach(() => {
  courseController = new CourseController();
  jest.clearAllMocks();
});

describe('getCourses tests', () => {
  test('should return a list of courses', async () => {
    const foundCourses = [
      { id: 1, name: 'Course 1' },
      { id: 2, name: 'Course 2' }
    ];
    mockDbHelper.findAllCourses = jest.fn(() => Promise.resolve(foundCourses));
    const result = await courseController.getCourses();
    expect(mockDbHelper.findAllCourses).toHaveBeenCalledTimes(1);
    expect(result).toBe(foundCourses);
  });

  test('should throw an error if there are no courses', async () => {
    const expectedResponse = undefined;
    mockDbHelper.findAllCourses = jest.fn(() => Promise.resolve(expectedResponse));
    try {
      await courseController.getCourses();
    } catch (error) {
      expect(mockDbHelper.findAllCourses).toHaveBeenCalledTimes(1);
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('No courses were found');
    }
  });
});

describe('getCourse tests', () => {
  test('should return found course', async () => {
    const id = 1;
    const expectedResponse = { id, name: 'Course 1' };
    mockDbHelper.findCourseById = jest.fn(() => Promise.resolve(expectedResponse));
    const result = await courseController.getCourse(id);
    expect(mockDbHelper.findCourseById).toHaveBeenCalledTimes(1);
    expect(result).toBe(expectedResponse);
  });

  test('should throw an error if the course with id is not found', async () => {
    const expectedResponse = undefined;
    const id = 1;
    mockDbHelper.findCourseById = jest.fn(() => Promise.resolve(expectedResponse));
    try {
      await courseController.getCourse(id);
    } catch (error) {
      expect(mockDbHelper.findCourseById).toHaveBeenCalledTimes(1);
      expect(error.status).toEqual(404);
      expect(error.message).toEqual(`The course with id '${id}' was not found`);
    }
  });
});

describe('createCourse tests', () => {
  test('should return created course with id and name', async () => {
    const course = { name: 'Course 1' };
    const createdCourse = { id: 1, name: 'Course 1' };
    validateCourse.mockImplementationOnce(() => 'Success');
    mockDbHelper.createCourse = jest.fn(() => Promise.resolve(createdCourse));
    const result = await courseController.createCourse(course);
    expect(validateCourse).toHaveBeenCalledTimes(1);
    expect(mockDbHelper.createCourse).toHaveBeenCalledTimes(1);
    expect(result).toBe(createdCourse);
  });

  test('should return error from dbHelper.createCourse', async () => {
    const course = { name: 'Course 1' };
    validateCourse.mockImplementationOnce(() => 'Success');
    mockDbHelper.createCourse = jest.fn(() => Promise.reject(new Error('dbHelper.createCourse error')));
    try {
      await courseController.createCourse(course);
    } catch (error) {
      expect(validateCourse).toHaveBeenCalledTimes(1);
      expect(mockDbHelper.createCourse).toHaveBeenCalledTimes(1);
      expect(error.message).toBe('dbHelper.createCourse error');
    }
  });
});

describe('updateCourse tests', () => {
  test('should return updated course with id and name', async () => {
    const course = { name: 'New name' };
    const id = 1;
    const updatedCourse = { id, name: 'Course 1' };
    validateCourse.mockImplementationOnce(() => 'Success');
    mockDbHelper.updateCourse = jest.fn(() => Promise.resolve(updatedCourse));
    const result = await courseController.updateCourse(id, course);
    expect(validateCourse).toHaveBeenCalledTimes(1);
    expect(mockDbHelper.updateCourse).toHaveBeenCalledTimes(1);
    expect(result).toBe(updatedCourse);
    expect(result).toHaveProperty('id');
  });

  test('should return error from dbHelper.updateCourse', async () => {
    const course = { name: 'New name' };
    const id = 1;
    validateCourse.mockImplementationOnce(() => 'Success');
    mockDbHelper.updateCourse = jest.fn(() => Promise.reject(new Error('dbHelper.updateCourse error')));
    try {
      await courseController.updateCourse(course, id);
    } catch (error) {
      expect(validateCourse).toHaveBeenCalledTimes(1);
      expect(mockDbHelper.updateCourse).toHaveBeenCalledTimes(1);
      expect(error.message).toEqual('dbHelper.updateCourse error');
    }
  });
});

describe('deleteCourse tests', () => {
  test('should return deleted course', async () => {
    const id = 1;
    const expectedResponse = { id, name: 'Course 1' };
    mockDbHelper.findCourseById = jest.fn(() => Promise.resolve(expectedResponse));
    mockDbHelper.deleteCourse = jest.fn(() => Promise.resolve());
    const result = await courseController.deleteCourse(id);
    expect(mockDbHelper.findCourseById).toHaveBeenCalledTimes(1);
    expect(mockDbHelper.deleteCourse).toHaveBeenCalledTimes(1);
    expect(result).toBe(expectedResponse);
  });

  test('should return error from dbHelper.findCourseById', async () => {
    const id = 1;
    mockDbHelper.findCourseById = jest.fn(() => Promise.reject(new Error('dbHelper.findCourseById error')));
    try {
      await courseController.deleteCourse(id);
    } catch (error) {
      expect(mockDbHelper.findCourseById).toHaveBeenCalledTimes(1);
      expect(mockDbHelper.deleteCourse).toHaveBeenCalledTimes(0);
      expect(error.message).toEqual('dbHelper.findCourseById error');
    }
  });

  test('should return error from dbHelper.deleteCourse', async () => {
    const id = 1;
    const expectedResponse = { id, name: 'Course 1' };
    mockDbHelper.findCourseById = jest.fn(() => Promise.resolve(expectedResponse));
    mockDbHelper.deleteCourse = jest.fn(() => Promise.reject(new Error('dbHelper.deleteCourse error')));
    let result;
    try {
      result = await courseController.deleteCourse(id);
    } catch (error) {
      expect(mockDbHelper.findCourseById).toHaveBeenCalledTimes(1);
      expect(mockDbHelper.deleteCourse).toHaveBeenCalledTimes(1);
      expect(error.message).toBe('dbHelper.deleteCourse error');
      expect(result).toBe(undefined);
    }
  });
});

describe('checkCourseFormat tests', () => {
  test('should not throw an error if validation is successful', async () => {
    const course = { name: 'Course 1' };
    validateCourse.mockImplementationOnce(() => 'Success');
    expect(() => courseController.checkCourseFormat(course)).not.toThrow();
    expect(validateCourse).toHaveBeenCalledTimes(1);
    expect(validateCourse).toHaveBeenCalledWith(course);
  });

  test('should throw an error if the course name length is incorrect', async () => {
    const course = { name: 'Co' };
    validateCourse.mockImplementationOnce(() => ({
      error: {
        message: '"name" length must be at least 3 characters long'
      }
    }));
    try {
      courseController.checkCourseFormat(course);
    } catch (error) {
      expect(validateCourse).toHaveBeenCalledTimes(1);
      expect(validateCourse).toHaveBeenCalledWith(course);
      expect(error.status).toBe(400);
      expect(error.message).toBe('Wrong format: "name" length must be at least 3 characters long');
    }
  });

  test('should throw an error if course name is missing', async () => {
    const course = {};
    validateCourse.mockImplementationOnce(() => ({
      error: {
        message: '"name" is required'
      }
    }));
    try {
      courseController.checkCourseFormat(course);
    } catch (error) {
      expect(validateCourse).toHaveBeenCalledTimes(1);
      expect(validateCourse).toHaveBeenCalledWith(course);
      expect(error.status).toBe(400);
      expect(error.message).toBe('Wrong format: "name" is required');
    }
  });
});

jest.mock('../db/models');
const database = require('../db/models');

const { DbHelper } = require('./db-helpers');
let dbHelper;

beforeEach(() => {
  dbHelper = new DbHelper();
  jest.clearAllMocks();
});

describe('findAllCourses tests', () => {
  test('should return a list of courses', async () => {
    const expectedResponse = [
      { id: 1, name: 'Course 1' },
      { id: 2, name: 'Course 2' }
    ];
    database.Course.findAll = jest.fn(() => Promise.resolve(expectedResponse));
    const result = await dbHelper.findAllCourses();
    expect(database.Course.findAll).toHaveBeenCalledTimes(1);
    expect(result).toBe(expectedResponse);
  });

  test('should throw an error if there are no courses', async () => {
    const expectedResponse = undefined;
    database.Course.findAll = jest.fn(() => Promise.resolve(expectedResponse));
    try {
      await dbHelper.findAllCourses();
    } catch (error) {
      expect(database.Course.findAll).toHaveBeenCalledTimes(1);
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('No courses were found');
    }
  });
});

describe('findCourseById tests', () => {
  test('should return found course', async () => {
    const id = 1;
    const expectedResponse = { id, name: 'Course 1' };
    database.Course.findOne = jest.fn(() => Promise.resolve(expectedResponse));
    const result = await dbHelper.findCourseById(id);
    expect(database.Course.findOne).toHaveBeenCalledTimes(1);
    expect(database.Course.findOne).toHaveBeenCalledWith({ where: { id } });
    expect(result).toBe(expectedResponse);
  });

  test('should throw an error if the course with id is not found', async () => {
    const expectedResponse = undefined;
    const id = 1;
    database.Course.findOne = jest.fn(() => Promise.resolve(expectedResponse));
    try {
      await dbHelper.findCourseById(id);
    } catch (error) {
      expect(database.Course.findOne).toHaveBeenCalledTimes(1);
      expect(database.Course.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(error.status).toEqual(404);
      expect(error.message).toEqual(`The course with id '${id}' was not found`);
    }
  });
});

describe('createCourse tests', () => {
  test('should return created course with id and name', async () => {
    const course = { name: 'Course 1' };
    const createdCourse = { id: 1, name: 'Course 1' };
    database.Course.create = jest.fn(() => Promise.resolve(createdCourse));
    const result = await dbHelper.createCourse(course);
    expect(database.Course.create).toHaveBeenCalledTimes(1);
    expect(database.Course.create).toHaveBeenCalledWith(course);
    expect(result).toBe(createdCourse);
  });

  test('should throw an error if adding to database failed', async () => {
    const course = { name: 'Course 1' };
    database.Course.create = jest.fn(() => Promise.reject(new Error('Database problem creating course')));
    try {
      await dbHelper.createCourse(course);
    } catch (error) {
      expect(database.Course.create).toHaveBeenCalledTimes(1);
      expect(database.Course.create).toHaveBeenCalledWith(course);
      expect(error.status).toBe(500);
      expect(error.message).toBe('Unable to add course: Database problem creating course');
    }
  });
});

describe('updateCourse tests', () => {
  test('should return updated course with id and name', async () => {
    const id = 1;
    const newName = 'New name';
    const foundCourse = { id, name: 'Course 1' };
    const updatedCourse = { id, name: newName };
    const mockSave = { save: jest.fn().mockResolvedValueOnce(updatedCourse) };
    database.Course.findOne = jest.fn(() => Promise.resolve({ ...foundCourse, ...mockSave }));
    const result = await dbHelper.updateCourse(id, newName);
    expect(database.Course.findOne).toHaveBeenCalledTimes(1);
    expect(database.Course.findOne).toHaveBeenCalledWith({ where: { id } });
    expect(mockSave.save).toHaveBeenCalledTimes(1);
    expect(result).toBe(updatedCourse);
  });

  test('should throw an error if the course with id is not found', async () => {
    const id = 1;
    const newName = 'New name';
    const expectedResponse = undefined;
    database.Course.findOne = jest.fn(() => Promise.resolve(expectedResponse));
    try {
      await dbHelper.updateCourse(id, newName);
    } catch (error) {
      expect(database.Course.findOne).toHaveBeenCalledTimes(1);
      expect(database.Course.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(error.status).toEqual(404);
      expect(error.message).toEqual(`The course with id '${id}' was not found`);
    }
  });

  test('should throw an error if updating database failed', async () => {
    const id = 1;
    const newName = 'New name';
    const foundCourse = { id, name: 'Course 1' };
    const mockSave = { save: jest.fn() };
    database.Course.findOne = jest.fn(() => Promise.resolve({ ...foundCourse, ...mockSave }));
    mockSave.save = jest.fn(() => Promise.reject(new Error('Database problem saving data')));
    try {
      await dbHelper.updateCourse(id, newName);
    } catch (error) {
      expect(database.Course.findOne).toHaveBeenCalledTimes(1);
      expect(database.Course.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(mockSave.save).toHaveBeenCalledTimes(1);
      expect(error.status).toBe(500);
      expect(error.message).toBe('Unable to update course: Database problem saving data');
    }
  });
});

describe('deleteCourse tests', () => {
  test('should delete course', async () => {
    const id = 1;
    database.Course.destroy = jest.fn(() => Promise.resolve());
    await dbHelper.deleteCourse(id);
    expect(database.Course.destroy).toHaveBeenCalledTimes(1);
    expect(database.Course.destroy).toHaveBeenCalledWith({ where: { id } });
  });

  test('should throw an error if deleting in database failed', async () => {
    const id = 1;
    database.Course.destroy = jest.fn(() => Promise.reject(new Error('Database problem deleting data')));
    try {
      await dbHelper.deleteCourse(id);
    } catch (error) {
      expect(database.Course.destroy).toHaveBeenCalledTimes(1);
      expect(database.Course.destroy).toHaveBeenCalledWith({ where: { id } });
      expect(error.status).toBe(500);
      expect(error.message).toBe('Unable to delete course: Database problem deleting data');
    }
  });
});

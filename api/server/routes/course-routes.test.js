const request = require('supertest');
const app = require('../../../app');

const mockCourseController = {
    getCourses: jest.fn(),
    getCourse: jest.fn(),
    createCourse: jest.fn(),
    updateCourse: jest.fn(),
    deleteCourse: jest.fn()
};
jest.mock('../controllers/course-controller', () => ({ CourseController: jest.fn().mockImplementation(() => mockCourseController) }));

beforeEach(() => {
    jest.clearAllMocks();
});

test('should retrieve a list of courses', async () => {
    const foundCourses = [
        { id: 1, name: 'Course 1' },
        { id: 2, name: 'Course 2' }
    ];
    mockCourseController.getCourses.mockImplementationOnce(() => Promise.resolve(foundCourses));
    const response = await request(app).get('/api/courses');
    expect(mockCourseController.getCourses).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(foundCourses);
});

test('should retrieve specific course', async () => {
    const id = 1;
    const foundCourse = { id, name: 'Course 1' };
    mockCourseController.getCourse.mockImplementationOnce(() => Promise.resolve(foundCourse));
    const response = await request(app).get(`/api/courses/${id}`);
    expect(mockCourseController.getCourse).toHaveBeenCalledTimes(1);
    expect(mockCourseController.getCourse).toBeCalledWith(id);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(foundCourse);
});

test('should return an error if course not found', async () => {
    const id = 1;
    const error = new Error('Course not found');
    error.status = 404;
    mockCourseController.getCourse.mockImplementationOnce(() => Promise.reject(error));
    const response = await request(app).get(`/api/courses/${id}`);
    expect(mockCourseController.getCourse).toHaveBeenCalledTimes(1);
    expect(mockCourseController.getCourse).toBeCalledWith(id);
    expect(response.status).toBe(404);
    expect(response.text).toEqual(error.message);
});

test('should create a new course', async () => {
    const newCourse = { name: 'New course' };
    mockCourseController.createCourse.mockImplementationOnce(() => Promise.resolve({id: 11, ...newCourse}));
    const response = await request(app).post('/api/courses/').send(newCourse);
    expect(mockCourseController.createCourse).toHaveBeenCalledTimes(1);
    expect(mockCourseController.createCourse).toBeCalledWith(newCourse);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({id: 11, ...newCourse});
});

test('should return an error if course not created', async () => {
    const newCourse = { name: 'New course' };
    const error = new Error('Unable to create course');
    error.status = 500;
    mockCourseController.createCourse.mockImplementationOnce(() => Promise.reject(error));
    const response = await request(app).post('/api/courses/').send(newCourse);
    expect(mockCourseController.createCourse).toHaveBeenCalledTimes(1);
    expect(mockCourseController.createCourse).toBeCalledWith(newCourse);
    expect(response.status).toBe(500);
    expect(response.text).toEqual('Unable to create course');
});

test('should update existing course', async () => {
    const newCourse = { name: 'New name' };
    const id = 3;
    mockCourseController.updateCourse.mockImplementationOnce(() => Promise.resolve({id, ...newCourse}));
    const response = await request(app).put(`/api/courses/${id}`).send(newCourse);
    expect(mockCourseController.updateCourse).toHaveBeenCalledTimes(1);
    expect(mockCourseController.updateCourse).toBeCalledWith(newCourse, id);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({id, ...newCourse});
});

test('should return an error if course not updated', async () => {
    const newCourse = { name: 'New name' };
    const id = 3;
    const error = new Error('Unable to update course');
    error.status = 500;
    mockCourseController.updateCourse.mockImplementationOnce(() => Promise.reject(error));
    const response = await request(app).put(`/api/courses/${id}`).send(newCourse);
    expect(mockCourseController.updateCourse).toHaveBeenCalledTimes(1);
    expect(mockCourseController.updateCourse).toBeCalledWith(newCourse, id);
    expect(response.status).toBe(500);
    expect(response.text).toEqual('Unable to update course');
});

test('should delete a course', async () => {
    const id = 1;
    const deletedCourse = { id, name: 'Course 1' };
    mockCourseController.deleteCourse.mockImplementationOnce(() => Promise.resolve(deletedCourse));
    const response = await request(app).delete(`/api/courses/${id}`);
    expect(mockCourseController.deleteCourse).toHaveBeenCalledTimes(1);
    expect(mockCourseController.deleteCourse).toBeCalledWith(id);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(deletedCourse);
});

test('should return an error if course not deleted', async () => {
    const id = 1;
    const error = new Error('Course not found');
    error.status = 500;
    mockCourseController.deleteCourse.mockImplementationOnce(() => Promise.reject(error));
    const response = await request(app).delete(`/api/courses/${id}`);
    expect(mockCourseController.deleteCourse).toHaveBeenCalledTimes(1);
    expect(mockCourseController.deleteCourse).toBeCalledWith(id);
    expect(response.status).toBe(500);
    expect(response.text).toEqual(error.message);
});
const { validateCourse } = require('./validation');

test('should return an error if name property is not present', () => {
    const course = {};
    const { error } = validateCourse(course);
    expect(error.message).toBe('"name" is required');
});

test('should return an error if name value is less than 3 characters', () => {
    const course = { name: 'ab' };
    const { error } = validateCourse(course);
    expect(error.message).toBe('"name" length must be at least 3 characters long');
});

test('should return the course if validation is correct', () => {
    const course = { name: 'course' };
    const { value } = validateCourse(course);
    expect(value).toEqual(course);
});
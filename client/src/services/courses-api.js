import axios from 'axios'

const baseUrl = 'http://localhost:4000'

/**
 * Gets all courses from the server
 *
 * @returns Promise<object[]> - list of courses
 */
export const getAllCourses = async () => {
  const response = await axios.get(`${baseUrl}/api/courses`)
  console.log(response)
  return response.data
}

/**
 * Gets course by id from the server
 *
 * @param {string} id - course id
 * @returns Promise<object> - specific course
 */
export const getCourseById = async (id) => {
  const response = await axios.get(`${baseUrl}/api/courses/${id}`)
  console.log(response)
  return response.data
}

/**
 * Creates new course
 *
 * @param {string} courseName - course name
 * @returns Promise<object> - specific course
 */
export const createCourse = async (courseName) => {
  const body = { name: courseName }
  const response = await axios.post(`${baseUrl}/api/courses/`, body)
  console.log(response)
  return response.data
}

/**
 * Updates existing course
 *
 * @param {string} id - course id
 * @param {string} courseName - course name
 * @returns Promise<object> - specific course
 */
export const updateCourse = async (id, courseName) => {
  const body = { name: courseName }
  const response = await axios.put(`${baseUrl}/api/courses/${id}`, body)
  console.log(response)
  return response.data
}

/**
 * Deletes existing course
 *
 * @param {string} id - course id to delete
 * @returns Promise<object> - deleted course
 */
export const deleteCourse = async (id) => {
  const response = await axios.delete(`${baseUrl}/api/courses/${id}`)
  console.log(response)
  return response.data
}

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
 * @returns Promise<object> - specific course
 */
export const getCourseById = async (id) => {
  const response = await axios.get(`${baseUrl}/api/courses/${id}`)
  console.log(response)
  return response.data
}

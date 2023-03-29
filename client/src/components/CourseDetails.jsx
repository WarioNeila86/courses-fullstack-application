import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getCourseById, updateCourse } from '../services/courses-api'

export function CourseDetails() {
  const { courseId } = useParams()

  const [courseDetails, setCourseDetails] = useState(null)

  useEffect(() => {
    getCourseById(courseId).then(setCourseDetails).catch(console.error)
  }, [courseId])

  const [courseName, setCourseName] = useState('');

  const handleSubmit = async () => {
    console.log(`Updating course with id ${courseId}: ${courseName}`)
    try {
      const response = await updateCourse(courseId, courseName);
      alert(`Updated course with id: ${response.id}`);
    } catch (error) {
      alert(error.message)
    }
    
  }

  return (
    <>
      <h1>Course Details</h1>
      {!courseDetails ? (
        <p>Course not found</p>
      ) : (
        <ul>
          <li>Id: {courseDetails.id}</li>
          <li>Name: {courseDetails.name}</li>
          <li>Created on: {new Date(courseDetails.createdAt).toLocaleString()}</li>
          <li>Updated on: {new Date(courseDetails.updatedAt).toLocaleString()}</li>
        </ul>
      )}
      <div>
        <form autoComplete='off' noValidate onSubmit={handleSubmit}>
          <h2>Edit course</h2>
          <label>
            Course name:
            <input type='text' value={courseName} onChange={(event) => setCourseName(event.target.value)} />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </div>
    </>
  )
}

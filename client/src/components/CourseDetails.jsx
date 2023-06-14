import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { deleteCourse, getCourseById, updateCourse } from '../services/courses-api'

export function CourseDetails() {
  const { courseId } = useParams()
  const navigate = useNavigate();

  const [courseDetails, setCourseDetails] = useState(null)

  useEffect(() => {
    getCourseById(courseId).then(setCourseDetails).catch(console.error)
  }, [courseId])

  const [courseName, setCourseName] = useState('');

  const handleSubmit = async () => {
    console.log(`Updating course with id ${courseId}: ${courseName}`)
    try {
      await updateCourse(courseId, courseName);
    } catch (error) {
      alert(error.message);
    }
  }

  const handleDelete = async () => {
    console.log(`Deleting course with id ${courseId}: ${courseName}`);
    try {
      await deleteCourse(courseId);
      navigate('/');
    } catch (error) {
      alert(error.message);
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
          <input type='submit' value='Update' />
        </form>
      </div>
      <div>
        <input type='button' value='Delete' onClick={handleDelete} />
      </div>
    </>
  )
}

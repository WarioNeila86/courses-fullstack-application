import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getCourseById } from '../services/courses-api'

export function CourseDetails() {
  const { courseId } = useParams()

  const [courseDetails, setCourseDetails] = useState(null)

  useEffect(() => {
    getCourseById(courseId).then(setCourseDetails).catch(console.error)
  }, [courseId])

  return (
    <>
      <h1>Course Details</h1>
      {!courseDetails ? (
        <p>Course not found</p>
      ) : (
        <ul>
          <li>Id: {courseDetails.id}</li>
          <li>Name: {courseDetails.name}</li>
          <li>Created on: {courseDetails.createdAt}</li>
          <li>Updated on: {courseDetails.updatedAt}</li>
        </ul>
      )}
    </>
  )
}

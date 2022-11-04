import React, { useEffect, useState } from 'react'
import { CourseList } from './components/CourseList'
import { Course } from './components/Course'
import './App.css'

import { getAllCourses, getCourseById } from './services/courses-api'

export function App () {
  const [courses, setCourses] = useState(null)
  const [search, setSearch] = useState('')
  const [course, setCourse] = useState(null)

  useEffect(() => {
    getAllCourses().then(setCourses).catch(console.error)
  }, [])

  return (
    <div className="container">
      <h2>Find Course</h2>
      <form onSubmit={ev => {
        ev.preventDefault()
        console.log(search)
        getCourseById(search).then(setCourse).catch(console.error)
      }}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          value={search}
          onChange={ev => setSearch(ev.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {
        !course
          ? (<h3>Enter an id in the previous form to search for a course</h3>)
          : (
            <div>
              <h3>Searching course with id: {search}</h3>
              <Course course={course} />
            </div>
            )
      }
      <h2>Courses List</h2>
      {
        !courses || courses.length === 0
          ? (
            <p>Loading...</p>
            )
          : (
            <CourseList courses={courses} />
            )
      }
    </div>
  )
}

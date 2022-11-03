import React, { useEffect, useState } from "react"
import { CourseList } from './components/CourseList'
import './App.css'

import { getAllCourses } from './services/courses-api'


export function App() {

  const [courses, setCourses] = useState(null);

  useEffect(() => {
    getAllCourses().then(setCourses).catch(console.error);
  }, []);

  return (
    <div className="container">
      <h1>Courses List</h1>
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

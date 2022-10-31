import React, { useEffect, useState } from "react"

import { getAllCourses } from './services/courses-api'


export function App() {

  const [courses, setCourses] = useState(null);

  useEffect(() => {
    console.log('useEffect called')
    getAllCourses().then(setCourses).catch(console.error);
  }, []);

  return (
    <div>
      <p>Hello World!</p>
      {
        !courses || courses.length === 0
          ? (
            <p>Loading...</p>
          )
          : (
            <ul>
              {courses.sort((a, b) => a.id - b.id).map(course => (<li key={course.id}>{course.id} - {course.name}</li>))}
            </ul>
          )
      }
    </div>
  )
}

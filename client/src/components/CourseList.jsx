import React from 'react'
import { Course } from './Course'
import './CourseList.css'

export function CourseList ({ courses }) {
  return (
    <div className="courseList">
      {courses.sort((a, b) => a.id - b.id).map(course => (<Course course={course} key={course.id} />))}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Course } from './Course'
import './CourseList.css'

import { getAllCourses } from '../services/courses-api'

export function CourseList() {
    const [courses, setCourses] = useState(null)

    useEffect(() => {
        getAllCourses().then(setCourses).catch(console.error)
    }, [])

    return (
        <div className="courseList">
            <h1>Courses List</h1>
            {!courses || courses.length === 0 ? (
                <p>Loading...</p>
            ) : (
                courses
                    .sort((a, b) => a.id - b.id)
                    .map((course) => <Course course={course} key={course.id} />)
            )}
        </div>
    )
}

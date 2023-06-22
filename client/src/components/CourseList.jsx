import React, { useEffect, useState } from 'react'
import { Box, List, Typography } from '@mui/material'
import { Course } from './Course'
import { AddCourse } from './AddCourse'

import { getAllCourses } from '../services/courses-api'

export function CourseList() {
  const [courses, setCourses] = useState(null)

  useEffect(() => {
    getAllCourses().then(setCourses).catch(console.error)
  }, [])

  return (
    <Box
      sx={{
        border: '1px solid black',
        padding: '1rem',
        margin: '1rem 0',
        'border-radius': '0.5rem'
      }}
    >
      <Typography component="h1" variant="h5">
        Courses list
      </Typography>
      {!courses || courses.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <List sx={{ width: '100%', maxWidth: 360 }}>
          {courses
            .sort((a, b) => a.id - b.id)
            .map((course) => (
              <Course course={course} key={course.id} />
            ))}
        </List>
      )}
      <AddCourse courses={courses} setCourses={setCourses} />
    </Box>
  )
}

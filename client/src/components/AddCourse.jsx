import React, { useState } from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { createCourse } from '../services/courses-api'

export function AddCourse({ courses, setCourses }) {
  const [courseName, setCourseName] = useState('')

  const handleAdd = async () => {
    console.log(`New course name to be added: ${courseName}`)
    try {
      const courseAdded = await createCourse(courseName)
      console.log(`New course created with id: ${courseAdded.id}`)
      // clean text box
      setCourseName('')
      // update parent state with new course so the list is rendered again
      setCourses([...courses, courseAdded])
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <form autoComplete="off" noValidate>
        <Typography component="h2" variant="overline">
          Add course
        </Typography>
        <Stack spacing={2} direction="row">
          <TextField
            required
            id="outlined-basic"
            label="Course name"
            variant="outlined"
            size="small"
            value={courseName}
            onChange={(event) => setCourseName(event.target.value)}
          />
          <Button
            variant="outlined"
            size="small"
            endIcon={<AddCircleOutlineIcon />}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Stack>
      </form>
    </div>
  )
}

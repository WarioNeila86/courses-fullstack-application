import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import NumbersIcon from '@mui/icons-material/Numbers'
import TitleIcon from '@mui/icons-material/Title'
import TodayIcon from '@mui/icons-material/Today'
import { EditCourse } from './EditCourse'
import { DeleteCourse } from './DeleteCourse'

import { getCourseById } from '../services/courses-api'

export function CourseDetails() {
  const { courseId } = useParams()

  const [courseDetails, setCourseDetails] = useState(null)

  useEffect(() => {
    getCourseById(courseId).then(setCourseDetails).catch(console.error)
  }, [courseId])

  return (
    <>
      <Typography component="h1" variant="h5">
        Courses details
      </Typography>
      {!courseDetails ? (
        <p>Course not found</p>
      ) : (
        <List>
          <ListItem>
            <ListItemIcon>
              <NumbersIcon />
            </ListItemIcon>
            <ListItemText>{courseDetails.id}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TitleIcon />
            </ListItemIcon>
            <ListItemText>{courseDetails.name}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText>
              {new Date(courseDetails.createdAt).toDateString()}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EditCalendarIcon />
            </ListItemIcon>
            <ListItemText>
              {new Date(courseDetails.updatedAt).toDateString()} at{' '}
              {new Date(courseDetails.updatedAt).toTimeString()}
            </ListItemText>
          </ListItem>
        </List>
      )}
      <EditCourse />
      <DeleteCourse />
    </>
  )
}

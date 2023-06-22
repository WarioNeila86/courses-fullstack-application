import React from 'react'
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'
import { Info } from '@mui/icons-material'

export function Course({ course }) {
  const { name, id } = course

  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={`/courseDetails/${id}`}>
        <ListItemText primary={`${id} - ${name}`} />
        <IconButton aria-label="show more details" size="small">
          <Info fontSize="inherit" />
        </IconButton>
      </ListItemButton>
    </ListItem>
  )
}

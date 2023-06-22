import React from 'react'
import './Course.css'

export function Course({ course }) {
  const { name, id } = course

  return (
    <div className="course">
      <div>{id}</div> <div>{name}</div>
      <div className="link">
        <a href={`/courseDetails/${id}`}>More details</a>
      </div>
    </div>
  )
}

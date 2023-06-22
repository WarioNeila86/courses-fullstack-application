import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import {updateCourse} from '../services/courses-api'

export function EditCourse() {
  const { courseId } = useParams();
  const [courseName, setCourseName] = useState('');

  const handleEdit = async () => {
    console.log(`Updating course with id ${courseId}: ${courseName}`)
    try {
      await updateCourse(courseId, courseName);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
    <form autoComplete='off' noValidate onSubmit={handleEdit}>
      <h2>Edit course</h2>
      <label>
        Course name:
        <input type='text' value={courseName} onChange={(event) => setCourseName(event.target.value)} />
      </label>
      <input type='submit' value='Update' />
    </form>
  </div>
  );
}
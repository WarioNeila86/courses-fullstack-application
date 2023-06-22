import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {deleteCourse} from '../services/courses-api'

export function DeleteCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    console.log(`Deleting course with id ${courseId}`);
    try {
      await deleteCourse(courseId);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <input type='button' value='Delete' onClick={handleDelete} />
  </div>
  );
}
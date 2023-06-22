import React, {useState} from 'react'
import {createCourse} from '../services/courses-api'
import './AddCourse.css'

export function AddCourse() {
  const [courseName, setCourseName] = useState('');

  const handleSubmit = async () => {
    console.log(`New course name to be added: ${courseName}`)
    try {
      const response = await createCourse(courseName);
      alert(`New course created with id: ${response.id}`);
    } catch (error) {
      alert(error.message)
    }
    
  }

    return (
      <div>
        <form autoComplete='off' noValidate onSubmit={handleSubmit}>
          <h2>Add course</h2>
          <label>
            Course name:
            <input className='textBox' type='text' value={courseName} onChange={(event) => setCourseName(event.target.value)} />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </div>
    )
}

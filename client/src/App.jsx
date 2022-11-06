import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CourseList } from './components/CourseList'
import { CourseDetails } from './components/CourseDetails'
import './App.css'

export function App() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<CourseList />} />
                <Route
                    path="/courseDetails/:courseId"
                    element={<CourseDetails />}
                />
            </Routes>
        </div>
    )
}

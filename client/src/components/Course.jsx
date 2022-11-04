import React from 'react'
import './Course.css'

export function Course({ course }) {
    const { name, id } = course

    return (
        <div className="course">
            <span>{id}</span> <span>{name}</span>
        </div>
    )
}

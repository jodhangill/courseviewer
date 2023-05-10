import React from "react";
import CourseCard from "./CourseCard";
import { useState, useEffect } from "react";




function CourseContainer(props) {
    
    let availableCourses = props.courses;
    return (
        <div className="box">
            { <h2>{}</h2> }

            <div>
                {availableCourses.map(course => (
                    <CourseCard key={course} name={course}></CourseCard>
                ))}
            </div> 
            
        </div>            
    );
}

export default CourseContainer

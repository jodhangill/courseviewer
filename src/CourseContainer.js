import React from "react";
import CourseCard from "./CourseCard";
import { useState, useEffect } from "react";




function CourseContainer(props) {
    
    let availableCourses = props.courses;
    console.log(availableCourses)

    return (
        <div className="box">
            {/* <h2>{props.courses}</h2> */}

            <div>
                {availableCourses.map(course => (
                    <CourseCard key={course} name={course}></CourseCard>
                ))}
            </div> 
            
        </div>            
    );
}

export default CourseContainer

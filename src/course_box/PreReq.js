import React from "react";
import { useParams } from "react-router-dom";

export function PreReq() {
    const {text} = useParams();
    const data = require('../course_data/courses.json');
    const PreReq = data[data.findIndex(item => item.text === text)].prereqs; 
    return(
        <p> {PreReq} </p>
    );
}
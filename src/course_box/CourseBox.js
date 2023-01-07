import React from "react";
import { Link, useParams } from 'react-router-dom';
import { PreReq } from "./PreReq";

export function CourseBox() {
    const { text } = useParams();
    return (
        <div className="box">
            <h2>{text}</h2>
            <PreReq />
        </div>            
    );
}
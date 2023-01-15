import React from "react";
import { Link, useParams } from 'react-router-dom';
import ReviewContainer from "../reviews/ReviewContainer";
import { PreReq } from "./PreReq";



const CourseBox = () => {
    const { text } = useParams();    
    const buttonText = text;
    const onSubmit = (event) => {
        event.preventDefault(event);
        console.log(event.target.difficulty.value);
        console.log(event.target.review.value);
        console.log(event.target.prof.value);

    };
    return (
        <div className="box">
            <h2>{text}</h2>
            <PreReq />
            <ReviewContainer btnText={buttonText} onSubmit={onSubmit} />
        </div>            
    );
}

export default CourseBox

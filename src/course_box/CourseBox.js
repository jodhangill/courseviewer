import React from "react";
import { Link, useParams } from 'react-router-dom';
import ReviewContainer from "../reviews/ReviewContainer";
import { PreReq } from "./PreReq";

const CourseBox = () => {
    const { text } = useParams();    
    const buttonText = 'Rate ' + text;
    const onSubmit = (event) => {
      event.preventDefault(event);
      console.log('sdfsdf')
      console.log(event.target.review.value);
      console.log(event.target.stars.value);
    };
    return (
        <div className="box">
            <h2>{text}</h2>
            <PreReq />
            <ReviewContainer  btnText={buttonText} onSubmit={onSubmit} />
        </div>            
    );
}

export default CourseBox

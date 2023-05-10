import React from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addReviews } from "../../Firebase";
import ReviewContainer from "../reviews/ReviewContainer";
import { PreReq } from "./PreReq";

const CourseBox = () => {
    const { text } = useParams();  
    const navigate = useNavigate();
    navigate(0);
    const buttonText = text;
    const onSubmit = (event) => {
        event.preventDefault(event);
        const dif = event.target.difficulty.value;
        const rev = event.target.review.value;
        const prof = event.target.prof.value;
        const date = new Date();
        addReviews(text, dif, rev, prof, date);
        
    };
    return (
        <div className="box">
            <h2>{text}</h2>
            <PreReq text={text}/>
            <ReviewContainer btnText={buttonText} onSubmit={onSubmit}/>
        </div>            
    );
}

export default CourseBox

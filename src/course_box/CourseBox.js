import React from "react";
import { PreReq } from "./PreReq";

export class CourseBox extends React.Component {
    render() {
        return (
            <div className="box">
                <h2>{this.props.courseNumber}</h2>
                <PreReq value = {this.props.courseNumber}/>
            </div>            
        );
    }
}
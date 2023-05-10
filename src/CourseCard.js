import React from "react";
import {
    Card,
    CardText,
    CardTitle,
    CardBody,
} from "reactstrap";

import {
    Routes,
    Route,
    Link,
    useParams,
} from 'react-router-dom';
import { PreReq } from "./courses/course_box/PreReq";


function CourseCard(props) {
    return (
        <div className="box">
            
            <Card>
                <Link to={'/courses/' + props.name}>
                    <CardBody>
                        <CardTitle tag="h1">{props.name}</CardTitle>
                        {<CardText>{props.name}</CardText>}
                        <PreReq text={"CMPT120"}/>
                    </CardBody> 
                </Link>
                
            </Card>
            
        </div>            
    );
}

export default CourseCard

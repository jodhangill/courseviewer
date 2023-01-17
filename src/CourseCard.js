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
} from 'react-router-dom';


function CourseCard(props) {
    

    return (
        <div className="box">
            
            <Card>
                <Link to={'/courses/' + props.name}>
           
                    <CardBody>
                        <CardTitle tag="h1">{props.name}</CardTitle>
                        {/* <CardText>prereqs go here</CardText> */}
                    </CardBody> 
                </Link>
            </Card>
        </div>            
    );
}

export default CourseCard

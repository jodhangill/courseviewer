import React from "react";

export class PreReq extends React.Component {
    render() {
        let json = require('../course_data/courses.json');
        let j = json[json.findIndex(item => item.text === this.props.value)].prereqs;
        return <p> {j} </p>;
    }
}
import { func } from "prop-types";
import React from "react";
import { useParams } from "react-router-dom";

const data = require('../course_data/courses.json');
const deps = require('../course_data/departments.json');
let positions = []

export function PreReq() {
    const {text} = useParams();
    let PreReq = data[data.findIndex(item => item.text === text)].prereqs; 
    if (PreReq) {
        PreReq = removeSpaces(PreReq);        
    }
    console.log(positions);
    document.createElement('p');

    return(
        <p> {PreReq} </p>
    );
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function removeSpaces(str) {
    if (str.length > 1) {
        let success = false;
        let position = -1;
        for (let i in deps) {
            let dep = deps[i].text + ' ';
            position = str.search(dep);

            if (position >= 0) {
                positions.push(position);                
                position = position + dep.length - 1;
                str = str.slice(0, position) + str.slice(position + 1)
                success = true;         
            }
        }
        if (success) {
            return removeSpaces(str);
        }
        else {
            return str;            
        }
    }
    else {
        return str;
    }
}

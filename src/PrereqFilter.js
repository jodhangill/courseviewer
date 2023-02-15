import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { FixedSizeList as List } from "react-window";
import CourseContainer from "./CourseContainer";


let courses = require('./courses/course_data/courses.json');
const options = [];
for (let i = 0; i < courses.length; i++) {
  let name = courses[i].text;
  let title = name + ": " + courses[i].title;
  options.push({value: name, label: title})
} 

const height = 35;

const MenuList = (props) => {
  const { options, children, maxHeight, getValue } = props;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;
  
  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
}

function isNumber(char) {
  return /^\d$/.test(char);
}

const PrereqFilter = () => {

    let tags = [];
    let availableCourses = [];
    
    
    function handleSelect(data) {
      console.log(data.length)

      for(let i = 0; i < data.length; i++) {
        let tag = data[i].value;

        if(isNumber(tag[3])) {
          tag = tag.substr(0,3) + " " + tag.substr(3,tag.length);
        } else if(isNumber(tag[4])) {
          tag = tag.substr(0,4) + " " + tag.substr(4,tag.length);
        } else if(isNumber(tag[5])) {
          tag = tag.substr(0,5) + " " + tag.substr(5,tag.length);
        }

        
        tags[i] = tag;
      }
      console.log(tags);

      for(let j = 0; j < courses.length; j++) {

        if(courses[j].prereqs != undefined) {

          for(let i = 0; i < tags.length; i++) {

            if(courses[j].prereqs.includes(tags[i])) {
              if(!(availableCourses.indexOf(courses[j].text) > -1)) {
                console.log(courses[j].text + "  " + courses[j].prereqs)
                availableCourses.push(courses[j].text)
              }
              
              
              // {name: courses[j].text + ": " + courses[j].title, prereq: courses[j].prereqs}
            }            
          }
        }
        
        
      }
      // console.log(availableCourses)
    
    }
    return (
      <div> 
        <Select 
        components={{ MenuList }} 
        options={options} 
        onChange={handleSelect} 
        placeholder={'Select Course...'} 
        isMulti
        />

        <CourseContainer
        courses = {availableCourses}
        />
      </div>
        
        
    );
}

export default PrereqFilter;
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { FixedSizeList as List } from "react-window";
import CourseContainer from "./CourseContainer";


let courses = require('./courses/course_data/courses.json');
const options = [];
for (let i = 0; i < courses.length; i++) {
  let name = courses[i].text;
  let title = name + ": " + courses[i].title;
  options.push({ value: name, label: title })
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

let prereqs = require('./courses/course_data/majors/ComputingScience.json')
const PrereqFilter = () => {

  let availableCourses = []
  let unavailableCourses = [];

  for (let i = 0; i < prereqs.length; i++) {
    if (prereqs[i].Root == "pass") {
      availableCourses.push(prereqs[i].text);
    }
    else {
      unavailableCourses.push(prereqs[i].text);
    }
  }

  const [available, setAvailable] = useState(availableCourses);
  const [unavailable, setUnavailable] = useState(unavailableCourses);

  function check(C, Y, N, Root) {
    while (Root !== "pass" && Root !== "fail") {
      if (C.find(c => c == Root)) {
        Root = Y[Root];
      }
      else {
        Root = N[Root]
      }
    }
    return Root == "pass";
  }
  function isWCourse(course) {
    return course.charAt(course.length - 1) == 'W';
  }
  function handleSelect(data) {
    if (data.length == 0) {
      return;
    }
    let C = [];
    availableCourses = [];
    unavailableCourses = [];
    for (let i = 0; i < data.length; i++) {

      C.push(data[i].value);
      if (isWCourse(data[i].value)) {
        C.push("W");
      }
    }
    for (let i = 0; i < prereqs.length; i++) {
      if (check(C, prereqs[i].Y, prereqs[i].N, prereqs[i].Root)) {
        availableCourses.push(prereqs[i].text);
      }
      else {
        unavailableCourses.push(prereqs[i].text);
      }
    }
    console.log(availableCourses);
    console.log(unavailableCourses);
    setAvailable(availableCourses);
    setUnavailable(unavailableCourses);
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
      <h2>Available</h2>
      <CourseContainer
        courses={available}
      />
      <h2>Unavailable</h2>
      <CourseContainer
        courses={unavailable}
      />
    </div>


  );
}

export default PrereqFilter;
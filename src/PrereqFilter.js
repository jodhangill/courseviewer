import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { FixedSizeList as List } from "react-window";
import CourseContainer from "./CourseContainer";
import { Button } from "react-bootstrap";
// import queryString from 'query-string';



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





const PrereqFilter = () => {

  let availableCourses = [];
  let unavailableCourses = [];
  let takenCourses = [];
  let unitsTaken = "0";

  

  const [available, setAvailable] = useState(availableCourses);
  const [unavailable, setUnavailable] = useState(unavailableCourses);
  const [taken, setTaken] = useState(takenCourses);
  const [units, setUnits] = useState(unitsTaken);



  function check(C, Y, N, Root, creds) {
    while (Root !== "pass" && Root !== "fail" && Root !== "creds") {
      console.log(Root);
      if (C.find(c => c == Root)) {
        Root = Y[Root];
      }
      else {
        Root = N[Root]
      }

    }
    if (Root === "creds") {
      return units >= creds;
    }
    return Root == "pass";
  }
  function isWCourse(course) {
    return course.charAt(course.length - 1) == 'W';
  }
  function handleSelect(data) {
    setTaken(data);
  }
  function handleUnits(e) {
    setUnits(Number(e.target.value));
  }
  function checkAll() {
    let url = window.location.href
    let major;
    if ((url.split('/'))[4]) {
      major = (url.split('/'))[4].replaceAll("%20", "");
    }
    let prereqs = require('./courses/course_data/majors/' + major + '.json');
    let C = [];
    availableCourses = [];
    unavailableCourses = [];
    for (let i = 0; i < taken.length; i++) {

      C.push(taken[i].value);
      if (isWCourse(taken[i].value)) {
        C.push("W");
      }
    }
    for (let i = 0; i < prereqs.length; i++) {
      if (check(C, prereqs[i].Y, prereqs[i].N, prereqs[i].Root, prereqs[i].creds)) {
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
        placeholder={'Select Completed Course...'}
        isMulti
      />
      <label>Total Units Completed:</label>
      <input
        id="units"
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        onChange={handleUnits}
      />
      <button onClick={checkAll}>OK</button>
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
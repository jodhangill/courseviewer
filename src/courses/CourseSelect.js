import React, { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import Select from "react-select";
import { FixedSizeList as List } from "react-window";

let courses = require('./course_data/courses.json');
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

const CourseList = () => {
    let navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState();
    function handleSelect(data) {
      setSelectedOptions(data);
      let course = data.value;
      navigate('/courses/' + course);
    
    }
    return (
      <div>
        <Select components={{ MenuList }} options={options} onChange={handleSelect} placeholder={'Select Course...'}/>
        <Outlet />        
      </div>
    );
}

export default CourseList;
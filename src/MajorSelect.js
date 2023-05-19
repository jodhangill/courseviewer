import React, { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import Select from "react-select";
import { FixedSizeList as List } from "react-window";

let majors = require('./courses/course_data/departments.json')

const options = [];
for (let i = 0; i < majors.length; i++) {
  let name = majors[i].name;
  options.push({value: name, label: name})
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

const MajorList = () => {
    let navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState();
    function handleSelect(data) {
      setSelectedOptions(data);
      let course = data.value;
      navigate('/prereqcheck/' + course);
    
    }
    return (
      <div>
        <Select components={{ MenuList }} 
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
          ...theme.colors,
            text: 'orangered',
            primary25: '',
            primary: 'lightblue',
          },
        })} 
        options={options} 
        onChange={handleSelect} 
        placeholder={'Select Major...'}/>
        <Outlet />        
      </div>
    );
}

export default MajorList;
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

let trees = require('./courses/course_data/majors/ComputingScience.json')
const PrereqFilter = () => {

  let availableCourses = [];
  let unavailableCourses = [];
  
  class Node
  {
    constructor(item)
    {
      this.data = item;
      this.left = this.right = null;
    }
  }
 
  let preIndex = 0;
  function buildTree(In, pre, inStrt, inEnd)
  {
    if (inStrt > inEnd) {
      return null;
    }
    let tNode = new Node(pre[preIndex++]);
    if (inStrt == inEnd) {
      return tNode;      
    }
    let inIndex = search(In, inStrt, inEnd, tNode.data);
    tNode.left = buildTree(In, pre, inStrt, inIndex - 1);
    tNode.right = buildTree(In, pre, inIndex + 1, inEnd);
    return tNode;
  }
  function search(arr, strt, end, value)
  {
    let i;
    for(i = strt; i <= end; i++)
    {
      if (arr[i] == value) {
        return i;
      }
    }
    return i;
  }
  function check(C, root) {
    let n = C.length;
    if (n == 0) {
        return false;
    }
    if (C.find(c => c == root.data)) {  
        if (root.right != null) {
            return check(C, root.right);            
        }
        return true;
    }
    else if (root.left != null) {
        if (check(C, root.left)) {

            if (root.right != null) {
                return check(C, root.right);
            }
            else {
                return true
            }
        }  
        else {
            return false;
        }
    }
    else {
        return false;
    }
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
      for (let i = 0; i < trees.length; i++) {
        let n = trees[i].inTree.length;
        if (n == 0) {
          availableCourses.push(trees[i].text);
        }
        else {
          preIndex = 0;
          let root = buildTree(trees[i].inTree, trees[i].preTree, 0, n - 1);
          if (check(C, root)) {
            availableCourses.push(trees[i].text);
          }
          else {
            unavailableCourses.push(trees[i].text);
          }          
        }
      }
      console.log(availableCourses);
      console.log(unavailableCourses);
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
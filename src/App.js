import './App.css';
import CourseBox from './course_box/CourseBox'
import {
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import React, { useState } from "react";
import CourseList from './CourseSelect';
import ReviewForm from './reviews/ReviewForm';
import Body from './reviews/ReviewBody.tsx';
import ReviewContainer from './reviews/ReviewContainer';
import Stars from './reviews/Stars';

function App() {
  let courses = require('./course_data/courses.json');
  return (
    <div className="App">
      <h2>APP</h2>  
      <CourseList />
      {courses.map(course => (<Link to={'/courses/' + course?.text}/>))}        
      <Routes>
        <Route path='/courses/:text' element={<CourseBox/>}></Route>;
      </Routes>   
    </div>
  );
}

export default App;

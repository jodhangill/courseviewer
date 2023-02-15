import './App.css';
import CourseBox from './courses/course_box/CourseBox'
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import React, { useState } from "react";
import CourseList from './courses/CourseSelect';
import ReviewForm from './courses/reviews/ReviewForm';
import Body from './courses/reviews/ReviewBody.tsx';
import ReviewContainer from './courses/reviews/ReviewContainer';
import Stars from './courses/reviews/Stars';
import { collection, addDoc, getDocs } from "firebase/firestore";
import db, { addReviews, getFirestoreData, getReviews } from './Firebase';
import PrereqFilter from './PrereqFilter';

function App() {
  let courses = require('./courses/course_data/courses.json');
  const navigate = useNavigate();
  return (
    <div className="App">
      <h2>Course Viewer</h2>  
      <button id='coursebtn' className='btn btn-secondary' onClick={() => navigate('/courses')}>View Courses</button>
      <button className='btn btn-secondary' onClick={() => navigate('/PrerequisiteCheck')}>Check Prerequisites</button>
      {courses.map(course => (<Link to={'/courses/' + course?.text}/>))}        
      <Routes>
        <Route path='courses' element={<CourseList />}>
          <Route path=':text' element={<CourseBox/>}/>
        </Route>;
        <Route path='/PrerequisiteCheck' element={<PrereqFilter/>}></Route>
      </Routes>   
    </div>
  );
}

export default App;
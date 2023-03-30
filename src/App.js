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
import MajorList from './MajorSelect';

function resetButtons(id) {
  document.querySelectorAll('button').forEach(element => {
    element.className = 'btn btn-outline-secondary';
  });
  document.getElementById(id).className = "btn btn-secondary";
}

function App() {
  let courses = require('./courses/course_data/courses.json');
  const navigate = useNavigate();
  const [page, setPage] = useState();
  return (
    <div className="App">
      <h2>Course Viewer</h2>  
      <button id='coursebtn' className='btn btn-secondary' onClick={() => {navigate('/courses'); resetButtons('coursebtn');}}>View Courses</button>
      <button id='prereqbtn' className='btn btn-secondary' onClick={() => {navigate('/prereqcheck'); resetButtons('prereqbtn');}}>Check Prerequisites</button>
      {courses.map(course => (<Link to={'/courses/' + course?.text}/>))}     

      <Routes>
        <Route path='courses' element={<CourseList />}>
          <Route path=':text' element={<CourseBox/>}/>
        </Route>;
        <Route path='prereqcheck' element={<MajorList/>}>
          <Route path=':text' element={<PrereqFilter/>}/>
          
        </Route>
      </Routes>   
    </div>
  );
}

export default App;
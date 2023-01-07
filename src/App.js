import logo from './logo.svg';
import './App.css';
import {CourseBox} from './course_box/CourseBox'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import React from 'react';

function App() {
  let courses = require('./course_data/courses.json');
  return (
    <div className="App">
      <h2>APP</h2>      
      <Router>
          {courses.map(course => (<Link to={'/courses/' + course?.text}/>))}        
          <Routes>
            <Route path='/courses/:text' element={<CourseBox/>}></Route>;
          </Routes>        
      </Router>
    </div>
  );
}

export default App;

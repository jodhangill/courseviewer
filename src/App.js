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
import Dropdown from './dropdown/Dropdown'

function App() {
  let courses = require('./course_data/courses.json');

  const options = [];
  for (let i = 0; i < courses.length; i++) {
    let name = courses[i].text;

    let title = name + ": " + courses[i].title;
    options.push({value: name, label: title})

  }

 

  return (
    <div className="App">
      <h2>APP</h2>  

      <Dropdown
        isSearchable
        isMulti
        placeHolder="Select Course"
        options={options}
        onChange={(value) => console.log(value)}
        key={options.value}
      />

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

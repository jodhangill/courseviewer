import logo from './logo.svg';
import './App.css';
import {CourseBox} from './course_box/CourseBox'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom';
import React, { useState } from "react";
import Select from "react-select";




function App() {
  let courses = require('./course_data/courses.json');
  const [selectedOptions, setSelectedOptions] = useState();
  const options = [];
  for (let i = 0; i < courses.length; i++) {
    let name = courses[i].text;

    let title = name + ": " + courses[i].title;
    options.push({value: name, label: title})

  } 

  function handleSelect(data) {
    setSelectedOptions(data);
    console.log(data);

    // const { innerText } = data.nativeEvent.target;
    // console.log(innerText);

    // console.log(options[0].value);
  }

  return (
    <div className="App">
      <h2>APP</h2>  
      <Router>
          {courses.map(course => (<Link to={'/courses/' + course?.text}/>))}        
          <Routes>
            <Route path='/courses/:text' element={<CourseBox/>}></Route>;
          </Routes>        
      </Router>

      <Select
          options={options}
          placeholder="Select Course"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
        />  

      
    </div>
  );
}

export default App;

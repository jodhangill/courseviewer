import logo from './logo.svg';
import './App.css';
import {CourseBox} from './course_box/CourseBox'
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <CourseBox courseNumber = {'CMPT276'}/>
      </header>
    </div>
  );
}

export default App;

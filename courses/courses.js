var currentNumber = 1;

const fs = require('fs');
fs.writeFileSync('courses.json', '');
fs.appendFileSync('courses.json', '[')


fetch('http://www.sfu.ca/bin/wcm/course-outlines?2023/summer')
    .then((res) => res.json())
    .then(function(data) {
        for (d in data) {
            getCourses(data[d].text, Object.keys(data).length);
        }       
    })    

function getCourses(department, depsLength) {
    fetch('http://www.sfu.ca/bin/wcm/course-outlines?2023/summer/' + department)
        .then((response) => response.json())
        .then(function(data) {
            for (course in data) {
                let str = data[course].text;
                data[course].text = department + str;
            }
            fs.appendFileSync('courses.json', JSON.stringify(data, null, 4).replace(/[\[\]']+/g,''));
            if (currentNumber == depsLength) {
                fs.appendFileSync('courses.json', ']');
            }
            else {
                fs.appendFileSync('courses.json', ',');                
            }
            currentNumber++;

        });
}

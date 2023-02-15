var currentNumber = 1;

const fs = require('fs');
fs.writeFileSync('courses.json', '');
fs.appendFileSync('courses.json', '[')

fetch('http://www.sfu.ca/bin/wcm/course-outlines?2023/spring')
    .then((res) => res.json())
    .then(function(data) {
        for (d in data) {
            getCourses(data[d].text, Object.keys(data).length);
        }       
    })    

function getCourses(department, depsLength) {
    fetch('http://www.sfu.ca/bin/wcm/course-outlines?2023/spring/' + department)
        .then((response) => response.json())
        .then(async function(data) {
            for (course in data) {                   
                let str = data[course].text;
                data[course].text = department + str;
                data[course].prereqs = await getPreReqs(str, department);                        
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

async function getPreReqs(courseNumber, department) {
    if (courseNumber < 500) {
        return fetch('http://www.sfu.ca/bin/wcm/course-outlines?2023/spring/' + department + '/' + courseNumber)
            .then((response) => response.json())
            .then(async function(data) {
                if (data[0]) {
                    url = 'http://www.sfu.ca/bin/wcm/course-outlines?2023/spring/' + department + '/' + courseNumber + '/' + data[0].text;
                    pre = await getPreReqs2(url);
                    return pre;
                }

            });        
    }
}

async function getPreReqs2(url) {
    return fetch(url)
        .then((response) => response.json())
        .then(function(data) {
            pre = data.info.prerequisites
            return pre;
        })
}

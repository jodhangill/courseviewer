var currentNumber = 1;

const fs = require('fs');
fs.writeFileSync('courses.json', '');
fs.appendFileSync('courses.json', '[')
const map = new Map();

addTerm("2022", "fall");

function addTerm (year, term) {
    fetch('http://www.sfu.ca/bin/wcm/course-outlines?' + year + '/' + term)
        .then((res) => res.json())
        .then(function(data) {
            for (d in data) {
                getCourses(data[d].text, year, term);
            }       
        })    
}


function getCourses(department, year, term) {
    fetch('http://www.sfu.ca/bin/wcm/course-outlines?' + year + '/' + term + '/' + department)
        .then((response) => response.json())
        .then(async function(data) {
            let list = [];
            for (course in data) {
                
                let str = data[course].text;
                let strFull = department + str;
                if (!map.has(strFull)) {
                    list.push(
                        {
                            text: strFull,
                            value: str,
                            title: data[course].title,
                            prereqs: ""
                        }
                    );
                    map.set(strFull);
                    list[list.length - 1].prereqs = await getPreReqs(str, department);                       
                }
            }
            fs.appendFileSync('courses.json', JSON.stringify(list, null, 4).replace(/[\[\]']+/g,''));
            if (list.length > 0) {
                fs.appendFileSync('courses.json', ',');      
            }
                      


        });
}

async function getPreReqs(courseNumber, year, term, department) {
    if (courseNumber < 500) {
        return fetch('http://www.sfu.ca/bin/wcm/course-outlines?' + year + '/' + term + '/' + department + '/' + courseNumber)
            .then((response) => response.json())
            .then(async function(data) {
                if (data[0]) {
                    url = 'http://www.sfu.ca/bin/wcm/course-outlines?' + year + '/' + term + '/' + department + '/' + courseNumber + '/' + data[0].text;
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

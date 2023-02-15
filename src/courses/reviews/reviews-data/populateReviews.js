const courses = require('../../course_data/courses.json');
var fs = require('fs');

var obj = [

];
for (course in courses) {
    obj.push({id: courses[course].text , reviews: []});
}
var json = JSON.stringify(obj);
var fs = require('fs');
fs.writeFileSync('./reviews.json', json);

var teacherdata
$j.request({
    type: "GET",
    url: "http://localhost:3000/v1/api/teachers.json"
}).then(function(response){
    teacherdata = response
}).catch(function(error){
    console.log("request failed")
})
  var theData = { teacherdata: teacherdata }
// Retrieve the HTML from the script tag we setup in step 1​
 // We use the id (header) of the script tag to target it on the page​
 var theTemplateScript = $j.select("#header").text;  

// The Handlebars.compile function returns a function to theTemplate variable​
 var theTemplate = Handlebars.compile (theTemplateScript);  
 $j.select('body').innerHTML = $j.select('body').innerHTML + (theTemplate (theData));


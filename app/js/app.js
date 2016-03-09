  $j.hide("#show-user");
  var pageTitle = "<h1>{{title}}</h1>"
  var template = Handlebars.compile(pageTitle);
  var data = template({title: "SPA Badge"});
  document.getElementById("title").innerHTML += data;

$j.request({
    type: "GET",
    url: "http://localhost:3000/v1/api/teachers.json"

  }).then(function(response){
    
    parsedData = JSON.parse(response);

    // console.log(parsedData)

    var teacherInfo = document.getElementById("teacher-template").innerHTML;
    var template = Handlebars.compile(teacherInfo)
    var teacherData = template({
      subtitle: "Teachers",
      teachers: parsedData
    });
    document.getElementById("div_teachers").innerHTML += teacherData;

    // catch teacher link click
    $j.on('.teacher_link', 'click', function(e){
      e.preventDefault();
      var uri = this.attributes[1].value;
    

      $j.request({
      type: "GET",
      url: "http://localhost:3000/v1/api/teachers/" + uri + ".json"
      }).then(function(response){
        console.log(response)
        // teacher detail data return
        parsedData = JSON.parse(response);
        $j.hide("#div_teachers")
        $j.show("#show-user");

        var teacherName = "{{title}}'s Badges"
        var template = Handlebars.compile(teacherName );
        var data = template({title: parsedData.name});
        document.getElementsByTagName("h2")[0].innerHTML += data;


        // request json data for teacher badges
          $j.request({
          type: "GET",
          url: "http://localhost:3000/v1/api/teachers/" + uri + "/badges.json"
          }).then(function(response){
          parsedData = JSON.parse(response);
          console.log(parsedData)

          //handlebars template starts here
          var badgeInfo = document.getElementById("badge-template").innerHTML;
          var template = Handlebars.compile(badgeInfo)
          var badgeData = template({
            teacher_id: uri,
            badges: parsedData
          });
          document.getElementById("div_badges").innerHTML += badgeData;
          //handlebars template ends here

          //Add new badge starts here

            // catch new badge link click
            document.getElementById("oreilly").addEventListener("submit", function(e) {
              e.preventDefault();
              console.log(e.target.title.value);
              switch (e.target.id)
              {
                case "add-badge-form": 
                  console.log("-----ADD BADGE FORM-------")
                  var badgeTitle = e.target.title.value
                  var teacher_id = e.target.user_id.value

                  // add new badge through json
                  $j.request({
                  type: "POST",
                  url: "http://localhost:3000/v1/api/teachers/" + teacher_id + "/badges.json?title=" + badgeTitle
                  }).then(function(response){
                    console.log(response)
                    var parsedData = JSON.parse(response);

                    //handlebars template starts here
                    var badgeInfo = document.getElementById("single-badge-template").innerHTML;
                    var template = Handlebars.compile(badgeInfo)
                    var badgeData = template({
                      teacher_id: '13',
                      id: parsedData.id,
                      title: parsedData.title,
                      points: parsedData.points
                    });
                    document.getElementById("div_badges_list").innerHTML += badgeData;
                    //handlebars template ends here

                  }).catch(function(error){
                  console.log(error)
                  });
                  // add new badge through json



                  break;
                case "down-badge-form": 
                  console.log("-----DOWN BADGE FORM-------")
                  // VOTE BUTTON SUBMITTED                
                  slogan_id = e.target.slogan_id.value
                  teacher_id = e.target.teacher_id.value
                  vote_value = e.target.vote_type.value
                  console.log(slogan_id)
                  console.log(teacher_id)
                  console.log(vote_value)

                  $j.request({
                  type: "PATCH",
                  url: "http://localhost:3000/v1/api/teachers/" + teacher_id + "/badges/" + slogan_id + ".json?value=" + vote_value
                  }).then(function(response){
                  parsedData = JSON.parse(response);

                  console.log(parsedData.points)
                  document.getElementById("point" + parsedData.id).innerHTML = "(" + parsedData.points + " points)";


                  }).catch(function(error){
                  console.log(error)
                  });
                // VOTE BUTTON SUBMITTED


                  break;
                default: 
                  console.log("-----UP BADGE FORM-------")
                  slogan_id = e.target.slogan_id.value
                  teacher_id = e.target.teacher_id.value
                  vote_value = e.target.vote_type.value
                  console.log(slogan_id)
                  console.log(teacher_id)
                  console.log(vote_value)

                  $j.request({
                  type: "PATCH",
                  url: "http://localhost:3000/v1/api/teachers/" + teacher_id + "/badges/" + slogan_id + ".json?value=" + vote_value
                  }).then(function(response){
                  parsedData = JSON.parse(response);

                  console.log(parsedData.points)
                  document.getElementById("point" + parsedData.id).innerHTML = "(" + parsedData.points + " points)";


                  }).catch(function(error){
                  console.log(error)
                  });
                // VOTE BUTTON SUBMITTED


              }

            });


          //Add new badge ends here
          }).catch(function(error){
          console.log(error)
          });
        // request json data for teacher badges

      // teacher detail data return
      }).catch(function(error){
      console.log(error)
      });


    // catch teacher link click ends here
    });
    
  }).catch(function(error){
    console.log("request failed")
})
  


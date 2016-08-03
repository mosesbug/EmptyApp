var myclass = "";

Template.layout.events({
    'click .logout': function(event){
        event.preventDefault();
				Meteor.logout();
        Router.go("/")
    },
//**********Speech Recognition Events*****************************
      "click #rec":function(event){
          $recBtn = $("#rec");
          $speechInput = $("#speech");
          switchRecognition();

          setTimeout(function(){
            console.log("testing jsonObject");
            console.dir(jsonObject);

    //***** Here is the grammar coding part
              var numOfcontext = jsonObject.result.metadata.contexts.length;
              console.log("num of context: " + numOfcontext);
                // Create a course
              for(i=0; i<numOfcontext; i++) {
                if (jsonObject.result.metadata.contexts[i] === "createcourse" && jsonObject.result.metadata.intentName ==="submit") {
                  console.log("createcourese inf whithin works bro");
                  const className = $(".js-className").val();
                  const collegeUniversity = $(".js-collegeUniversity").val();
                  const language = $(".js-language").val();
                  const description = $(".js-description").val();
                  const courseCode = $(".js-courseCode").val();

                  const instructor = Meteor.users.findOne({'_id': Meteor.userId()});
                  //const instructor = Meteor.userId();
                  const instructorFirst = instructor.profile.firstName;
                  const instructorLast = instructor.profile.lastName;

                  if (className == "" || collegeUniversity == "" || language == "" || description == "" || courseCode == "") {
                    window.alert("Uh oh, one or more fields are empty!")
                    respond("Uh oh, one or more fields are empty!");
                  } else {

                    const course = {className:className, collegeUniversity:collegeUniversity, language:language, description:description, instructorFirst:instructorFirst, instructorLast:instructorLast, instructor:instructor, courseCode:courseCode};

                    console.dir(course);

                    if(Courses.findOne({className: className })) {
                      console.log("the class is already existed");
                      respond("the class is already existed");
                      throw new UserException("Invalid");
                    }

                    Courses.insert(course);

                    //Router.go( "/");


                    var theCourseObject = Courses.findOne({className: className,
                                                 collegeUniversity:collegeUniversity,
                                                 language:language,
                                                 description:description,
                                                 instructorFirst:instructorFirst,
                                                 instructorLast:instructorLast,
                                                 instructor:instructor
                  });


                    var numClasses = Meteor.user().profile.classes.length;






                  Meteor.users.update(Meteor.userId(), {$push: {'profile.classes': theCourseObject}}); //previously theCourseObject._id

                  console.log("created a class successfully");
                  respond("created a class successfully");
                  toastr.info("created a class successfully");



                  //Router.go("/coursePage/"+this._id);





                    //Router.go( "/courses");
                    Router.go("/");

                  }

                }

                // For joining a course page
                  if(jsonObject.result.metadata.contexts[i] === "joincoursepage" && jsonObject.result.metadata.intentName ==="go to a class from joincourse page") {
                    console.log("joincoursepage works!!~~");
                  var language =  jsonObject.result.parameters.language;
                  var Language = language.charAt(0).toUpperCase() + language.slice(1);
                  var number =  jsonObject.result.parameters.number;
                  var titleOfClass = Language + " " + number;
                  if(Courses.find({className: titleOfClass}).fetch()[0] != null) {
                    console.log("Hello rjoung class name clas of ctitle");
                    Router.go("/showcourse/" + Courses.find({className: titleOfClass}).fetch()[0]._id);
                    respond(titleOfClass);
                    toastr.info(titleOfClass);
                  }else {
                    respond("We don't offer " + titleOfClass + "  Please say other course name");
                  }

                  }

                  // Join button
                  if(jsonObject.result.metadata.contexts[i] === "joincoursepage" && jsonObject.result.metadata.intentName ==="join a course") {

                    // if (courseCode == this.courseCode) {
                    //   var numClasses = Meteor.user().profile.classes.length;
                    //   for(i = 0; i < numClasses; i++) {
                    //     if(Meteor.user().profile.classes[i]._id===this._id) {
                    //       console.log("you've already added the class")
                    //       respond("you've already added the class");
                    //       Router.go("/coursePage/"+this._id);
                    //       throw new UserException("Invalid");
                    //
                    //     }
                    //
                    //   }
                    //
                    //   Meteor.users.update(Meteor.userId(), {$push: {"profile.classes": this }});
                    //
                    //   Router.go("/coursePage/"+this._id);
                    //
                    // } else {
                    //   respond("Incorrect course code. Please try it again");
                    //
                    // }

                  }




              }
              // **************************************************

              if(jsonObject && jsonObject.result.parameters.homepage) {


              console.log("Going to homepage...");
              Router.go("home");
              } else if (jsonObject && jsonObject.result.parameters.courses) {
              console.log("Going to the join course page");
              Router.go("/courses");

              // Creating a course
              if(jsonObject.result.metadata.intentName === "Create a course") {

                if(Meteor.user().profile.userType==="teacher") {
                console.log("creating a course metadat inttent name passesd");
                Router.go('/createClass');
                console.log("creating a course metadat inttent name passesd");
                respond("Welcome to Create a course page. Please, fill up the form and click the create button or Say submit");
                toastr.info("Create a course page");

              } else {
                  respond("You're a student, cannot create a course");
                  toastr.info("You're a student, cannot create a course");
                }
              }

              }

              // Going to your class
              else if (jsonObject.result.parameters.language && jsonObject.result.metadata.intentName ==="go to a specific class") {
               var language = jsonObject.result.parameters.language;
               var className = jsonObject.result.resolvedQuery;
               var arrayOfClasses = Meteor.user().profile.classes;
               console.log("array of classes");
               console.dir(arrayOfClasses);
               console.log(arrayOfClasses.length);

               for(i=0; i<arrayOfClasses.length; i++) {
                 var idObject = arrayOfClasses[i]._id;
                 var courseOne = Courses.findOne({_id:idObject});
                 console.log("courseOne is");
                 console.dir(courseOne);
                 myclass = courseOne._id;
                 var mycourseLangague = (courseOne.language).toLowerCase();
                 var mycourseName = (courseOne.className).toLowerCase();
                 console.dir(mycourseLangague);
                 console.dir(language);

                  if(mycourseLangague === language || mycourseName === className) {
                    console.log("Going to your class...");
                    var path = courseOne._id;
                    Router.go('/coursePage/' + path);
                    break;
                  } else {
                    console.log("you are not enrolled.");

                  }

               }

              // ******  Assignment code
              }


              else  if (jsonObject.result.parameters.assignment) {
              console.log("json assignment passed!");
              console.dir(Assignments.findOne());
              console.log("CourseOne in Assignment!!");
              console.dir(myclass);
              console.log("how many assignment do you have in this class");
              var numOfAssignments = Assignments.find({'metadata.course':myclass}).count();
              console.dir(numOfAssignments);

              if(!numOfAssignments) {
                var say2 = "you don't have any assignments"
                respond(say2);
              }

              if(numOfAssignments>0) {
                var say1 = "total you have " + numOfAssignments + " assignments";
                respond(say1);
                console.log("assignment fetch for for loop");
                console.dir(Assignments.find({'metadata.course':myclass}).fetch());
                var assignmentArray = Assignments.find({'metadata.course':myclass}).fetch();
                console.dir(assignmentArray[0].metadata.title);

                for(i=0; i<numOfAssignments; i++) {
                  var listOfAssignments = assignmentArray[i].metadata.title;
                  respond(listOfAssignments);
                }

                respond("Which assignments would you like to go?");
                toastr.info("Which assignments would you like to go?");



              }else {

              }

              if(Assignments.findOne()) {
                var titleofassignment = jsonObject.result.parameters.titleofassignment;

                console.dir(Assignments.findOne({metadata: {userId: titleofassignment}}));
                  if(titleofassignment === Assignments.find({title: "titleofassignment"}).title) {
                    Router.go
                  }


              }else {
                console.log("you don't have any assignment right now");
              }


              //# Assignment code 2
              } else if (jsonObject.result.metadata.contexts[1] === "myassignment") {
              var titleOfAssignment = jsonObject.result.resolvedQuery;
              var titleOfAssignment2 = titleOfAssignment.charAt(0).toUpperCase() + titleOfAssignment.slice(1);
              console.log("titleOfassignment is ");
              console.dir(titleOfAssignment);
              //                var titleOfAssignment2 = (jsonObject.result.resolvedQuery).replace(/\s+/, "");
                if(Assignments.findOne({'metadata.title': titleOfAssignment2})) {
                  respond("Going to " + titleOfAssignment);
                 var courseId = Assignments.findOne({'metadata.title': titleOfAssignment2})._id;
                  Router.go("/showAssignment/" + courseId);
                }
              }


//** To this part

          }, 5000);

      },

      "keypress #speech": function(event) {
          $speechInput = $("#speech");
          if (event.which == 13) {
              event.preventDefault();
              send();
              setTimeout(function(){

                  console.log("jsonObject");

                  console.dir(jsonObject);
        //***** Here is the grammar coding part
        var numOfcontext = jsonObject.result.metadata.contexts.length;
        console.log("num of context: " + numOfcontext);
          // Create a course
        for(i=0; i<numOfcontext; i++) {
          if (jsonObject.result.metadata.contexts[i] === "createcourse" && jsonObject.result.metadata.intentName ==="submit") {
            console.log("createcourese inf whithin works bro");
            const className = $(".js-className").val();
            const collegeUniversity = $(".js-collegeUniversity").val();
            const language = $(".js-language").val();
            const description = $(".js-description").val();
            const courseCode = $(".js-courseCode").val();

            const instructor = Meteor.users.findOne({'_id': Meteor.userId()});
            //const instructor = Meteor.userId();
            const instructorFirst = instructor.profile.firstName;
            const instructorLast = instructor.profile.lastName;

            if (className == "" || collegeUniversity == "" || language == "" || description == "" || courseCode == "") {
              window.alert("Uh oh, one or more fields are empty!")
              respond("Uh oh, one or more fields are empty!");
            } else {

              const course = {className:className, collegeUniversity:collegeUniversity, language:language, description:description, instructorFirst:instructorFirst, instructorLast:instructorLast, instructor:instructor, courseCode:courseCode};

              console.dir(course);

              if(Courses.findOne({className: className })) {
                console.log("the class is already existed");
                respond("the class is already existed");
                throw new UserException("Invalid");
              }

              Courses.insert(course);

              //Router.go( "/");


              var theCourseObject = Courses.findOne({className: className,
                                           collegeUniversity:collegeUniversity,
                                           language:language,
                                           description:description,
                                           instructorFirst:instructorFirst,
                                           instructorLast:instructorLast,
                                           instructor:instructor
            });


              var numClasses = Meteor.user().profile.classes.length;






            Meteor.users.update(Meteor.userId(), {$push: {'profile.classes': theCourseObject}}); //previously theCourseObject._id

            console.log("created a class successfully");
            respond("created a class successfully");
            toastr.info("created a class successfully");



            //Router.go("/coursePage/"+this._id);





              //Router.go( "/courses");
              Router.go("/");

            }

          }

          // For joining a course page
            if(jsonObject.result.metadata.contexts[i] === "joincoursepage" && jsonObject.result.metadata.intentName ==="go to a class from joincourse page") {
              console.log("joincoursepage works!!~~");
            var language =  jsonObject.result.parameters.language;
            var Language = language.charAt(0).toUpperCase() + language.slice(1);
            var number =  jsonObject.result.parameters.number;
            var titleOfClass = Language + " " + number;
            if(Courses.find({className: titleOfClass}).fetch()[0] != null) {
              console.log("Hello rjoung class name clas of ctitle");
              Router.go("/showcourse/" + Courses.find({className: titleOfClass}).fetch()[0]._id);
              respond(titleOfClass);
              toastr.info(titleOfClass);
            }else {
              respond("We don't offer " + titleOfClass + "  Please say other course name");
            }

            }





        }
        // **************************************************



        if(jsonObject.result.metadata.intentName ==="join a course") {
          console.log("Join COURSE JSFJSf");
          courseCode = 100;
          courseLangauge = jsonObject.result.parameters.language;
          courseNumber = jsonObject.result.parameters.number;
          courseName = courseLangauge.charAt(0).toUpperCase() + courseLangauge.slice(1) + " " + courseNumber;
          console.log(courseName);
          console.dir(Courses.find({className: courseName}).fetch()[0]._id);
          courseId = Courses.find({className: courseName}).fetch()[0]._id;
          courseObject = Courses.find({className: courseName}).fetch()[0];
            var numClasses = Meteor.user().profile.classes.length;
            for(i = 0; i < numClasses; i++) {
              if(Meteor.user().profile.classes[i]._id===courseId) {
                console.log("you've already added the class")
                respond("you've already added the class");
                Router.go("/coursePage/"+courseId);
                throw new UserException("Invalid");

              }

            }

            Meteor.users.update(Meteor.userId(), {$push: {"profile.classes": courseObject }});
            Router.go("/coursePage/"+courseId);
            respond("Successfuly enrolled in " + coureName);



        }


        if(jsonObject && jsonObject.result.parameters.homepage) {


        console.log("Going to homepage...");
        Router.go("home");
        } else if (jsonObject && jsonObject.result.parameters.courses) {
        console.log("Going to the join course page");
        Router.go("/courses");

        // Creating a course
        if(jsonObject.result.metadata.intentName === "Create a course") {

          if(Meteor.user().profile.userType==="teacher") {
          console.log("creating a course metadat inttent name passesd");
          Router.go('/createClass');
          console.log("creating a course metadat inttent name passesd");
          respond("Welcome to Create a course page. Please, fill up the form and click the create button or Say submit");
          toastr.info("Create a course page");

        } else {
            respond("You're a student, cannot create a course");
            toastr.info("You're a student, cannot create a course");
          }
        }

        }

        // Going to your class
        else if (jsonObject.result.parameters.language && jsonObject.result.metadata.intentName ==="go to a specific class") {
         var language = jsonObject.result.parameters.language;
         var className = jsonObject.result.number;
         var arrayOfClasses = Meteor.user().profile.classes;
         console.log("array of classes");
         console.dir(arrayOfClasses);
         console.log(arrayOfClasses.length);

         for(i=0; i<arrayOfClasses.length; i++) {
           var idObject = arrayOfClasses[i]._id;
           var courseOne = Courses.findOne({_id:idObject});
           console.log("courseOne is");
           console.dir(courseOne);
           myclass = courseOne._id;
           var mycourseLangague = (courseOne.language).toLowerCase();
           var mycourseName = (courseOne.className).toLowerCase();
           console.dir(mycourseLangague);
           console.dir(language);

            if(mycourseLangague === language || mycourseName === className) {
              console.log("Going to your class...");
              var path = courseOne._id;
              Router.go('/coursePage/' + path);
              break;
            } else {
              console.log("you are not enrolled.");

            }

         }

        // ******  Assignment code
        }


        else  if (jsonObject.result.parameters.assignment && jsonObject.result.metadata.intentName ==="go to your assignment") {
        console.log("json assignment passed!");
        console.dir(Assignments.findOne());
        console.log("CourseOne in Assignment!!");
        console.dir(myclass);
        console.log("how many assignment do you have in this class");
        var numOfAssignments = Assignments.find({'metadata.course':myclass}).count();
        console.dir(numOfAssignments);

        if(!numOfAssignments) {
          var say2 = "you don't have any assignments"
          respond(say2);
        }

        if(numOfAssignments>0) {
          var say1 = "total you have " + numOfAssignments + " assignments";
          respond(say1);
          console.log("assignment fetch for for loop");
          console.dir(Assignments.find({'metadata.course':myclass}).fetch());
          var assignmentArray = Assignments.find({'metadata.course':myclass}).fetch();
          console.dir(assignmentArray[0].metadata.title);

          for(i=0; i<numOfAssignments; i++) {
            var listOfAssignments = assignmentArray[i].metadata.title;
            respond(listOfAssignments);
          }

          respond("Which assignments would you like to go?");
          toastr.info("Which assignments would you like to go?");



        }else {

        }

        if(Assignments.findOne()) {
          var titleofassignment = jsonObject.result.parameters.titleofassignment;

          console.dir(Assignments.findOne({metadata: {userId: titleofassignment}}));
            if(titleofassignment === Assignments.find({title: "titleofassignment"}).title) {
              Router.go
            }


        }else {
          console.log("you don't have any assignment right now");
        }


        //# Assignment code 2
        } else if (jsonObject.result.metadata.contexts[1] === "myassignment") {
        var titleOfAssignment = jsonObject.result.resolvedQuery;
        var titleOfAssignment2 = titleOfAssignment.charAt(0).toUpperCase() + titleOfAssignment.slice(1);
        console.log("titleOfassignment is ");
        console.dir(titleOfAssignment);
        //                var titleOfAssignment2 = (jsonObject.result.resolvedQuery).replace(/\s+/, "");
          if(Assignments.findOne({'metadata.title': titleOfAssignment2})) {
            respond("Going to " + titleOfAssignment);
           var courseId = Assignments.findOne({'metadata.title': titleOfAssignment2})._id;
            Router.go("/showAssignment/" + courseId);
          }
        }
        // Creating an assignment teacer
        if(jsonObject.result.metadata.intentName ==="create assignment" && Meteor.user().profile.userType==="teacher") {
        //  http://localhost:3000/createAssignment/JhyT75rb3fKQbsFbH
          var acourseId = globalCourseId
          Router.go("/createAssignment/" + acourseId);
          respond("createAssignment page.  Please write the title and description. And you can also use the audio file")
        }



//** To this part
                }, 3000);
          }

        }


});
//**********Speech Recognition Global Variables and functions*********

var accessToken = "6601881cde5b47f48a95b6d8a5df8e53",
subscriptionKey = "947363e843f442bfb07be4f738578d70",
baseUrl = "https://api.api.ai/v1/",
$speechInput,
$recBtn,
recognition,
messageRecording = "Recording...",
messageCouldntHear = "I couldn't hear you, could you say that again?",
messageInternalError = "Oh no, there has been an internal server error",
messageSorry = "I'm sorry, I don't have the answer to that yet.";

var jsonObject;

function startRecognition() {
     recognition = new webkitSpeechRecognition();
     recognition.continuous = false;
         recognition.interimResults = false;
     recognition.onstart = function(event) {
       respond(messageRecording);
       toastr.info("Talk to me, I'm listening");
       updateRec();
     };
     recognition.onresult = function(event) {
       recognition.onend = null;

       var text = "";
         for (var i = event.resultIndex; i < event.results.length; ++i) {
           text += event.results[i][0].transcript;
         }
         setInput(text);
       stopRecognition();
     };
     recognition.onend = function() {
       respond(messageCouldntHear);
       stopRecognition();
     };
     recognition.lang = "en-US";
     recognition.start();
   }

   function stopRecognition() {
     if (recognition) {
       recognition.stop();
       recognition = null;
     }
     updateRec();
   }
   function switchRecognition() {
     if (recognition) {
       stopRecognition();
     } else {
       startRecognition();
     }
   }
   function setInput(text) {
     $speechInput.val(text);
     send();
   }
   function updateRec() {
     $recBtn.text(recognition ? "..." : "");

     if(!recognition) {
       var elem = document.createElement("img");
       elem.src= 'http://i.imgur.com/l5S4LZ2.png';
       elem.width= '30';
       elem.height= '30';
       document.getElementById("rec").appendChild(elem)
     } else {

     }
   }
   function send() {
     var text = $speechInput.val();
     $.ajax({
       type: "POST",
       url: baseUrl + "query/",
       contentType: "application/json; charset=utf-8",
       dataType: "json",
       headers: {
         "Authorization": "Bearer " + accessToken,
         "ocp-apim-subscription-key": subscriptionKey
       },
       data: JSON.stringify({q: text, lang: "en"}),
       success: function(data) {
         prepareResponse(data);
       },
       error: function() {
         respond(messageInternalError);
       }
     });
   }
   function prepareResponse(val) {
     var debugJSON = JSON.stringify(val, undefined, 2),
       spokenResponse = val.result.speech;
       jsonObject = val;
     respond(spokenResponse);
     debugRespond(debugJSON);
   }
   function debugRespond(val) {
    // $("#response").text(val);
   }
   function respond(val) {
     if (val == "") {
       val = messageSorry;
     }
     if (val !== messageRecording) {
       var msg = new SpeechSynthesisUtterance();
       msg.voiceURI = "native";
       msg.text = val;
       msg.lang = "en-US";
      window.speechSynthesis.speak(msg);

     }
  //   $("#spokenResponse").addClass("is-active").find(".spoken-response__text").html(val);
   }

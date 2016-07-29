var myclass = "";

Template.layout.events({
    'click .logout': function(event){
        event.preventDefault();
				Meteor.logout();
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




                  if(jsonObject && jsonObject.result.parameters.homepage) {
                    console.log("Going to homepage...");
                    Router.go("home");
                  } else if (jsonObject && jsonObject.result.parameters.courses) {
                    Router.go("/courses");
                  } else if (jsonObject.result.metadata.contexts[0] === "myclass") {
                     var language = (jsonObject.result.parameters.language).toLowerCase();
                     var arrayOfClasses = Meteor.user().profile.classes;
                     console.log("array of classes");
                     console.dir(arrayOfClasses);
                     console.log(arrayOfClasses.length);

                     for(i=0; i<arrayOfClasses.length; i++) {
                       var idObject = arrayOfClasses[i]._id;
                       var courseOne = Courses.findOne({_id:idObject});
                       console.log("courseOne is");
                       console.dir(courseOne);
                       var mycourseLangague = (courseOne.language).toLowerCase();
                       var mycourseName = (courseOne.className).toLowerCase();
                       console.dir(mycourseLangague);
                       console.dir(language);

                        if(mycourseLangague === language || mycourseName === language) {
                          console.log("Going to your class...");
                          var path = courseOne._id;
                          Router.go('/coursePage/' + path);
                          break;
                        }

                     }

                     console.log("you are not enrolled.");

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

                  if(jsonObject && jsonObject.result.parameters.homepage) {

                    console.log("Going to homepage...");
                    Router.go("home");
                  } else if (jsonObject && jsonObject.result.parameters.courses) {
                    Router.go("/courses");
                  } else if (jsonObject.result.metadata.contexts[0] === "myclass"&& jsonObject.result.parameters.language) {
                     var language = jsonObject.result.parameters.language;
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

                        if(mycourseLangague === language || mycourseName === language) {
                          console.log("Going to your class...");
                          var path = courseOne._id;
                          Router.go('/coursePage/' + path);
                          break;
                        }

                     }

                     console.log("you are not enrolled.");
                  // ******  Assignment code
                }


              else  if (jsonObject.result.parameters.assignment || jsonObject.result.parameters.titleofassignment) {
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
                      if(Assignments.findOne({'metadata.title': titleOfAssignment})) {
                        respond("Just kidding, Going to " + titleOfAssignment);
                       var courseId = Assignments.findOne({'metadata.title': titleOfAssignment})._id;
                        Router.go("/showAssignment/" + courseId);
                      }
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
     $recBtn.text(recognition ? "Stop" : "Speak");
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

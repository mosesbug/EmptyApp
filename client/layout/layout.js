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
                  console.log("test if statment ");
                  Router.go("home");
            } else if (jsonObject && jsonObject.result.parameters.courses) {
              Router.go("/courses");
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
                  console.log("testing jsonObject");
                  console.dir(jsonObject);
//***** Here is the grammar coding part

                  if(jsonObject && jsonObject.result.parameters.homepage) {
                    console.log("test if statment ");
                    Router.go("home");
                  } else if (jsonObject && jsonObject.result.parameters.courses) {
                    Router.go("/courses");
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

Router.configure({
	layoutTemplate: 'layout',
});

Router.route('/showcourse/:_id',
 {name:"showcourse", 
  data: function(){
    const c = Courses.findOne({_id:this.params._id});
    console.dir(c);
    return c;
    }
});

Router.route('/coursePage/:_id',
 {name:"coursePage", 
  data: function(){
    const c = Courses.findOne({_id:this.params._id});
    console.dir("hello")
    console.log(this);
    return c;
    }
});

Router.route('/createAssignment/:_id',
 {name:"createAssignment", 
  data: function(){
    const c = Courses.findOne({_id:this.params._id});
    console.dir("hello")
    console.log(this);
    return c;
    }
});

Router.route('/flashcards/:_id',
 {name:"flashcards", 
  data: function(){
    const c = Courses.findOne({_id:this.params._id});
    console.dir("hello")
    console.log(this);
    return c;
    }
});

Router.route('/createFlashcards/:_id',
 {name:"createFlashcards", 
  data: function(){
    const c = Courses.findOne({_id:this.params._id});
    console.dir("hello")
    console.log(this);
    return c;
    }
});

Router.route('/flashcardSet/:_id',
 {name:"flashcardSet", 
  data: function(){
    const c = Flashcards.findOne({_id:this.params._id});
    console.dir("hello")
    console.log(this);
    return c;
    },

  pairs: function(){
    const c = FlashcardPairs.findOne({_id:this.params._id});
    console.dir("hello")
    console.log(this);
    return c;
    },
});

Router.route('/practiceFlashcards/:_id',
 {name:"practiceFlashcards", 

  data: function(){
    const c = Flashcards.findOne({_id:this.params._id});
    console.dir("hello")
    console.log(this);
    return c;
    },
 
  pairs: function(){
    const c = FlashcardPairs.findOne({_id:this.params._id});
    console.dir("hello")
    console.log(this);
    return c;
    },
});



Router.route('/',{name:"home"});
Router.route('/login',{name:"login"});
Router.route('/signup',{name:"signup"});

Router.route('/courses',{name:"courses"});


Router.route('/review');

Router.route('/posts');
Router.route('/createPost');

Router.route('/createClass',{name:"createClass"});

Router.route('/audio');
Router.route('/showAudio');

Router.map(function () {
  this.route('serverFile', {
    path: '/record/',
    where: 'server',

    action: function () {
      var filename = this.params.filename;
      resp = {'lat' : this.request.body.lat,
              'lon' : this.request.body.lon};
      console.log("storing Response");
      let status = Recording.findOne();
      Recording.update(status._id,{$set:{recording:true}});

      Meteor._sleepForMs(3000);
      status = Recording.findOne();

      this.response.writeHead(200, {'Content-Type':
                                    'application/json; charset=utf-8'});
      this.response.end(JSON.stringify(status)+"\n");

    }
  });
});

Router.route('/showPost/:_id',
  {name:"showPost",
    data: function(){
      const c =Recordings.findOne({_id:this.params._id});
      console.dir(c);
      return c
      }   
  }
);

Router.route('/showAssignment/:_id',
  {name:"showAssignment",
    data: function(){
      const c =Assignments.findOne({_id:this.params._id});
      console.dir(c);
      return c
      }   
  }
);

Router.route('/showSubmission/:_id',
  {name:"showSubmission",
    data: function(){
      const c =Submissions.findOne({_id:this.params._id});
      console.dir(c);
      return c
      }   
  }
);

function responseTest(response){
  return () => {
     response.writeHead(200, {'Content-Type':
                                'application/json; charset=utf-8'});
     response.end(JSON.stringify(resp));
   }
}

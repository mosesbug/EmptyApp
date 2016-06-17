Template.items.helpers({
	items:function(){

		//const dest = $(".js-dest").val();  // this is important 
		return Items.find();   // got you!! 
	}



})


Template.items.events({
	"click .js-add": function(event){
		console.log("hey you clicked the button")
		//read the value and use it ** 
		//read in the values of the input and store
		const item = $(".js-item").val();

		const object = {item:item};
		console.dir(object);
		Items.insert(object);
	}
})
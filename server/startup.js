Meteor.startup(function(){
	if(Items.find().count()==0){
	Items.insert({offeredBy:"Haoling", item:"chair"});
	Items.insert({offeredBy:"Chanwoo", item:"water"});
	Items.insert({offeredBy:"Vincent", item:"cigarettes"});
	Items.insert({offeredBy:"Berra", item:"Chifanlema"});
	Items.insert({offeredBy:"Zimu", item:"evil"});
	Items.insert({offeredBy:"Shanshan", item:"table"});
	Items.insert({offeredBy:"Yuling", item:"table"});
	Items.insert({offeredBy:"Gabe", item:"LA"});
	Items.insert({offeredBy:"Tim", item:"computer"});
	Items.insert({offeredBy:"Jack", item:"Bruce Lee figure"});
}


})
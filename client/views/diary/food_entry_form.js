Template.foodEntryForm.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe("foodEntries", Meteor.userId());	
		self.subscribe("foods");
	});
});

Template.foodEntryForm.helpers({
	'foodEntry': function () {
		var id = FlowRouter.getParam("id");
		var fromSelect = FlowRouter.getQueryParam("fromSelect");
		
		/* =======================================
		console.log("in food entry form");
		console.log(id);
		console.log(fromSelect);
		========================================== */

		var foodDoc = FoodsCollection.findOne(id);
		// var rfc339FormattedDate = moment(Date()).format('YYYY-MM-DD');
		rfc339FormattedDate = Session.get("foodEntryDate");
		
	    // console.log(FoodsCollection.foodname);
		return {
			entryDate: rfc339FormattedDate,
			foodname: foodDoc.foodname,
			carbohydrates: foodDoc.carbohydrates,
			calories: foodDoc.calories,
			servings: foodDoc.servings,
			servingunit: foodDoc.servingunit,
			userId: Meteor.userId
		};
		
	},

	

	'foodEntryFormOperationIsAdd': function () {
		var routeName = FlowRouter.getRouteName();
		if(routeName == 'editFoodEntryRoute') {
			return false;
		} else {
			return true;
		}
	},

	'foodEntryFormOperation': function () {
		var routeName = FlowRouter.getRouteName();
		if(routeName == 'editFoodEntryRoute') {
			return "Edit";
		} else {
			return "Add";
		}
	},

	'unitTypeSelected': function (typeOfUnit) {
		var id = FlowRouter.getParam("id");
		var entry = FoodEntriesCollection.findOne(id);
		if(entry) {
			if(entry.servingunit == typeOfUnit) {
				return "selected";
			} else {
				return "";
			}
		} else {
			return "";
		}
	}
});

Template.foodEntryForm.events({
	

  	'click #cancelFoodEntry': function(evt, tpl) {
	    evt.preventDefault();
	    window.history.back();
 	},

  	'click #addFoodEntry': function(evt, tpl) {
	    evt.preventDefault();
	    var foodname = $('input[id=foodname]').val();
	    var vdate = $('input[id=date]').val();
	    var carbohydrates = $('input[id=carbohydrates]').val();
	    var calories = $('input[id=calories]').val();
	    var servings = $('input[id=servings]').val();
	    var servingunit = $('input[id=servingunit]').val(); //becuase it is input hidden and not select
	    
	    servings = servings * 1; // always a number
	    calories = calories * servings; // always multiplied by # of servings
	    carbohydrates = carbohydrates * servings; // always multiplied by # of servings

	    //console.log("FOODNAME = " + foodname);
	    //console.log("")
	    var result = FoodEntriesCollection.insert({
		        entryDate: moment.utc(vdate).toDate(), 
		        foodname: foodname,
		        carbohydrates: carbohydrates,
		        calories: calories,
		        servings: servings,
		        servingunit: servingunit,
		        userId: Meteor.userId()
	   	});

	   	// console.log(result);

	   	FlowRouter.go(FlowRouter.path("foodListRoute"));
	    
	    if(result) {
	    	success("Food entry inserted.");
	   	} else {
	   		error("Food entry not inserted.");
	   		warning("This is an issue.");
	   		info("You should tell somebody.");
	   	}
  	},

  	'click #editFoodEntry': function(evt, tpl) {
	    evt.preventDefault();
	    var id = FlowRouter.getParam("id");
	    var foodname = $('input[id=foodname]').val();
	    var vdate = $('input[id=date]').val();
	    var utcDate = moment.utc(vdate).toDate();
	    console.log(utcDate);
	    var carbohydrates = $('input[id=carbohydrates]').val();
	    var calories = $('input[id=calories]').val();
	    console.log(calories);
	    console.log(carbohydrates);
	    var servings = $('input[id=servings]').val();
	    var servingunit = $('input[id=servingunit]').val();
	    
    	FoodEntriesCollection.update(id, 
    	{
	      entryDate: moment.utc(vdate).toDate(), 
	      foodname: foodname,
	      carbohydrates: carbohydrates,
	      calories: calories,
	      servings: servings,
	      servingunit: servingunit,
	      userId: Meteor.userId()
		});
    	window.history.back();
  	}
});
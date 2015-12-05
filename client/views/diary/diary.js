Template.diary.onCreated(function () {
	var self = this;
	var rfc339FormattedDate = moment(Date()).format('YYYY-MM-DD');
	if (!Session.get("foodEntryDate")) {
		var date = rfc339FormattedDate;
		console.log("Date = " +date);
		Session.set("foodEntryDate", date);
	}
		
	self.autorun(function () {
		
		
		// var date = Session.get("foodEntryDate");
		//if(!date) {
			// Date isn't provided, create a new moment based on current date & time
		//	date = moment().format("YYYY-MM-DD");
		// Session.set("foodEntryDate", date);
		//}
		// date is either a new moment, or
		// Session.set("foodEntryDate", moment("11/21/2015").format("YYYY-MM-DD"))
		// session has been set as above via date control/filter.
		
		self.subscribe("foodEntriesForDate", Meteor.userId(), Session.get("foodEntryDate"));
		// self.subscribe("foodEntries", Meteor.userId());	
	});
});

Template.diary.helpers({

	foodEntries: function () {
	
		userId = Meteor.userId();
		vdate = Session.get("foodEntryDate")
		//var foodEntriesCursor = FoodEntriesCollection.find({userId: userId});
		var totalCalories = 0;
		var totalCarbohydrates = 0;

		var foodEntriesCursor = FoodEntriesCollection.find({$and: [{userId: userId}, {entryDate: vdate}]});
		
		_.each(foodEntriesCursor.fetch(), function (foodEntry) {
        	//console.log(foodEntry.calories + ' ' + foodEntry.carbohydrates);
        	totalCalories += foodEntry.calories;
        	totalCarbohydrates += foodEntry.carbohydrates;
        });

        //console.log("totals " + totalCalories + ' ' + totalCarbohydrates);
        Session.set("totalCalories", totalCalories);
        Session.set("totalCarbohydrates", totalCarbohydrates);
		return foodEntriesCursor;
	},
	
	foodEntriesExist: function () {
		
		userId = Meteor.userId();
		var foodEntriesCursor = FoodEntriesCollection.find({userId: userId});
		// foodEntriesCursor = FoodEntriesCollection.find({$and: [{userId: userId}, {entryDate: date}]});
		if(foodEntriesCursor) {
			return true;
		} else {
			return false;
		}
	}
});

Template.diary.events({
	'click #addFoodEntryButton': function (e) {
		e.preventDefault();
		FlowRouter.go(FlowRouter.path("foodListRoute"));
	},

	'change .diarydate': function (evt) {
        evt.preventDefault();
     
        var newDate = $('#diarydate').val();
        var newFormattedDate = moment(newDate).format("YYYY-MM-DD");
       
        Session.set("foodEntryDate", newFormattedDate);
        
    }

});



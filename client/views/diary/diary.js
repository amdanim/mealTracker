Template.diary.onCreated(function () {
	var self = this;
	var rfc339FormattedDate = moment.utc(Date()).format('YYYY-MM-DD');
	console.log("type of date = " + typeof rfc339FormattedDate);
	if (!Session.get("foodEntryDate")) {
		var date = rfc339FormattedDate;
		Session.set("foodEntryDate", date);
	}
		
	self.autorun(function () {
		
		// ===========================================================================
		// var date = Session.get("foodEntryDate");
		//if(!date) {
			// Date isn't provided, create a new moment based on current date & time
		//	date = moment().format("YYYY-MM-DD");
		// Session.set("foodEntryDate", date);
		//}
		// date is either a new moment, or
		// Session.set("foodEntryDate", moment("11/21/2015").format("YYYY-MM-DD"))
		// session has been set as above via date control/filter.
		// ===========================================================================

		self.subscribe("foodEntriesForDate", Meteor.userId(), Session.get("foodEntryDate"));
			
	});
});

Template.diary.helpers({

	foodEntries: function () {
		userId = Meteor.userId();
		dayOfEntries = Session.get("foodEntryDate")
		
		var dayStart = moment.utc(dayOfEntries).startOf('day').toDate();
		var dayEnd = moment.utc(dayOfEntries).endOf('day').toDate(); 
		var totalCalories = 0;
		var totalCarbohydrates = 0;

		var foodEntriesCursor = FoodEntriesCollection.find(
			{$and: [
			{userId: userId}, 
			{entryDate: {
				$gte: dayStart, 
				$lte: dayEnd
			}}
		]});

		_.each(foodEntriesCursor.fetch(), function (foodEntry) {
           	totalCalories += foodEntry.calories;
        	totalCarbohydrates += foodEntry.carbohydrates;
        });

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

	'click #foodEntryReportButton': function (e) {
		e.preventDefault();
		FlowRouter.go(FlowRouter.path("foodEntryReportRoute"));
	},

	'change .diarydate': function (evt) {
        evt.preventDefault();
     
        var newDate = $('#diarydate').val();
        var newFormattedDate = moment.utc(newDate).format("YYYY-MM-DD");
       
        Session.set("foodEntryDate", newFormattedDate);
        
    }

});



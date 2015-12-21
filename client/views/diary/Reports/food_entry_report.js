Template.foodEntryReport.onCreated(function () {
	var self = this;
	self.autorun(function () {
		// subscribe to the data for the whole month (multiple-rows for each day)
		self.subscribe("foodEntriesForMonth", Meteor.userId(), Session.get("foodEntryDate"));
		// self.subscribe("foodEntries", Meteor.userId());	
	});
});


Template.foodEntryReport.helpers({
	'foodEntryArrayItem': function () {
		var id = Meteor.userId();
		var dayOfEntries = Session.get("foodEntryDate");
		
		// console.log("User Id: " + id + " and Date: " + dayOfEntries);
		
		var monthStart = moment.utc(dayOfEntries).startOf('month').toDate();
		var monthEnd = moment.utc(dayOfEntries).endOf('month').toDate();
		
		// From the data for the month we want to grab the data for each day,
		// sum the calories and carbs and return the date, totalCalories and totalCarbs
		// as one row to be displayed. 
		
		var foodEntryReportArray = [];
		var newDate = monthStart;
        while (newDate <= monthEnd)
		{
    		var totalCalories = 0;
			var totalCarbohydrates = 0;
			var dayStart = moment.utc(newDate).startOf('day').toDate();
			var dayEnd = moment.utc(newDate).endOf('day').toDate();
    		var foodReportCursor = FoodEntriesCollection.find(
    			{$and: 
		 			[{userId: id}, 
		 			{entryDate:	{
						$gte: dayStart, 
						$lte: dayEnd
					}}
				]});
    	    
    	    //console.log("Date selected: " + newDate 
    	    //	+ ", calories: " + totalCalories 
    	    //	+ ", carbs: " + totalCarbohydrates 
    	    //	+ "Food Entries: " + foodReportCursor.fetch()
	    	//);
    		
    		if(foodReportCursor) {
    			 // console.log("Food Report Cursor valid");

    			_.each(foodReportCursor.fetch(), function (item) {
        			//console.log("entrydate " + item.entryDate); 
	        		//console.log("calories " + item.calories); 
	        		
	        		totalCalories += item.calories;
	        		totalCarbohydrates += item.carbohydrates;
	        		
	        		//console.log("Total calories " + totalCalories); 
	        		//console.log("arrayentry " + newEntry);
	        		
        		});	
	  		};
	  		if(totalCalories > 0 || totalCarbohydrates > 0) {
	  			// console.log("entryDate = " + moment.utc(newDate).toDate());
	  			var newEntry = {entryDate: moment.utc(newDate).toDate(), calories: totalCalories, 
	        			carbohydrates: totalCarbohydrates};
	        	    
	      	//console.log("arrayentry " + newEntry);
	        	foodEntryReportArray.push(newEntry);
	        	// console.log("after push entryDate = " + moment.utc(newDate).toDate());
		    }
		    newDate = moment.utc(newDate.setDate(newDate.getDate()+1)).toDate();
		}

		//console.log(foodEntryReportArray);   
		return foodEntryReportArray;
	}	
});

Template.foodEntryReport.events({
	
	'click #reportBack': function(evt, tpl) {
	    evt.preventDefault();
	    var path = FlowRouter.path("diaryRoute");
		FlowRouter.go(path);
 	}
}) 	
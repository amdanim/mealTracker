/* Template.foodEntryReportItem.onCreated(function () {
	var self = this;
	

	self.autorun(function () {
		// subscribe to the data for the whole month (multiple-rows for each day)
		self.subscribe("foodEntriesForMonth", Meteor.userId(), Session.get("foodEntryDate"));
		// self.subscribe("foodEntries", Meteor.userId());	
	});
}); */
Meteor.publish('foods', function() {
	return FoodsCollection.find();
});

Meteor.publish('foodEntriesForDate', function (user, dayOfEntries) {
	var dayStart = moment.utc(dayOfEntries).startOf('day').toDate();
	var dayEnd = moment.utc(dayOfEntries).endOf('day').toDate();
	console.log("dayEnd = " + dayEnd);
	
	var dataCursor = FoodEntriesCollection.find(
		{$and: [
			{userId: user}, 
			{entryDate: {
				$gte: dayStart, 
				$lte: dayEnd
			}}
		]});
	return dataCursor;

	//return FoodEntriesCollection.find({$and: [{userId: user}, {entryDate: dayOfEntries}]});
});

Meteor.publish('foodEntries', function (user) {
	return FoodEntriesCollection.find({userId: user}, {sort: {entryDate: 1, foodname: 1 }});
});

Meteor.publish('foodEntriesForMonth', function (user, dayOfEntries) {
	var monthStart = moment.utc(dayOfEntries).startOf('month').toDate();
	var monthEnd = moment.utc(dayOfEntries).endOf('month').toDate();
	
	console.log(monthEnd);
	var dataCursor = FoodEntriesCollection.find(
		{$and: [
			{userId: user}, 
			{entryDate: {
				$gte: monthStart, 
				$lte: monthEnd
			}},
			
		]});
	//var dataCursor = PayablesCollection.find((moment(paydate).month())==toMonth);
	//console.log(JSON.stringify(dataCursor.fetch()));	
	return dataCursor;
});
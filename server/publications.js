Meteor.publish('foods', function() {
	return FoodsCollection.find();
});

Meteor.publish('foodEntriesForDate', function (user, dayOfEntries) {
	return FoodEntriesCollection.find({$and: [{userId: user}, {entryDate: dayOfEntries}]});
});

Meteor.publish('foodEntries', function (user) {
	return FoodEntriesCollection.find({userId: user}, {sort: {entryDate: 1, foodname: 1 }});
});
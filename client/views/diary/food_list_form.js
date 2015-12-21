Template.foodListForm.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe("foods");
	});
});

Template.foodListForm.events({
	

	'click button#removeFoodButton': function(evt) {
        var id = this._id;
        if (confirm('Are you sure you want to delete this entry?' )){
            FoodsCollection.remove(id);
        }

    },

    'click button#editFoodButton': function(evt) {
        evt.preventDefault();
        var _id = this._id;
        var params = {id: _id};
        var path = FlowRouter.path("editfoodFormRoute", params);
        FlowRouter.go(path);
    },

    'click #selectFoodButton': function(evt, tpl) {
    	evt.preventDefault();
    	var id = this._id;
    	// console.log(id);
    	
    	var params = {id: id};
    	var queryParams = {fromSelect: true}
        var path = FlowRouter.path("selectedFoodEntryRoute", params, queryParams);
        FlowRouter.go(path);

    },

	'click #back': function(e) {
		e.preventDefault();
		// return window.history.back();
		var path = FlowRouter.path("diaryRoute");
		FlowRouter.go(path);
	},

	'click #add-food-item-button': function(evt) {
		evt.preventDefault();
		var path = FlowRouter.path("addfoodFormRoute");
		FlowRouter.go(path);
	}
});

Template.foodListForm.helpers({
	foods: function () {
		// console.log("in foods");
		var foodsCursor = FoodsCollection.find();
		return foodsCursor;
	},

	foodTableSettings: function () {
		var foodsCursor = FoodsCollection.find();
 
		var customFields = [
			{ key: 'foodname', label: 'Food Item' },
			{ key: 'calories', label: 'Calories' },
			{ key: 'carbohydrates', label: 'Carbohydrates' },
			{ key: 'servings', label: 'Servings' },
			{ key: 'servingunit', label: 'Serving unit' },
			{ key: 'select', label: 'Select', tmpl: Template.selectFoodTmpl },
			{ key: 'edit', label: 'Edit', tmpl: Template.editFoodTmpl },
			{ key: 'remove', label: 'Remove', tmpl: Template.removeFoodTmpl }
		];

		var settings = {
			collection: foodsCursor,
			rowsPerPage: 10,
			filters: ['foodItemSearchFilter'],
			showNavigation: 'auto',
			fields: customFields
		};

		return settings;
	}
});
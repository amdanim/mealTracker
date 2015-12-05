Template.foodForm.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe("foods", Meteor.userId());	
	});
});

Template.foodForm.helpers({
	'food': function () {
		var id = FlowRouter.getParam("id");
		console.log(id);
		console.log("in food");
		if(id) {
			var food = FoodsCollection.findOne(id);
			return food; 
		} else {
			
			return {
				foodname: "",
				carbohydrates: 0,
				calories: 0,
				servings: 0,
				servingunit: "Unit"
			};
		}
	},

	'foodFormOperationIsAdd': function () {
		var routeName = FlowRouter.getRouteName();
		if(routeName == 'editfoodFormRoute') {
			return false;
		} else {
			return true;
		}
	},

	'foodFormOperation': function () {
		var routeName = FlowRouter.getRouteName();
		if(routeName == 'editfoodFormRoute') {
			return "Edit";
		} else {
			return "Add";
		}
	},

	'unitTypeSelected': function (typeOfUnit) {
		var id = FlowRouter.getParam("id");
		var entry = FoodsCollection.findOne(id);
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

Template.foodForm.events({
	
	'click #cancelFood': function(evt, tpl) {
	    evt.preventDefault();
	    window.history.back();
 	},

  	'click #saveAddedFood': function(evt, tpl) {
	    evt.preventDefault();
	    var foodname = $('input[id=foodname]').val();
	    var carbohydrates = $('input[id=carbohydrates]').val();
	    var calories = $('input[id=calories]').val();
	    var servings = $('input[id=servings]').val();
	    var servingunit = $('select[id=servingunit]').val();
	    
	    FoodsCollection.insert({
	        foodname: foodname,
	        carbohydrates: carbohydrates,
	        calories: calories,
	        servings: servings,
	        servingunit: servingunit,
	        userId: Meteor.userId()
	   	}); 

	   	// TODO: Switch to route to diary
  	  	FlowRouter.go(FlowRouter.path("foodListRoute"));
  	  	$("#add-food-item-button").focus();
  	},

  	'click #saveEditedFood': function(evt, tpl) {
	    evt.preventDefault();
	    var id = FlowRouter.getParam("id");
	    var foodname = $('input[id=foodname]').val();
	    var carbohydrates = $('input[id=carbohydrates]').val();
	    var calories = $('input[id=calories]').val();
	    var servings = $('input[id=servings]').val();
	    var servingunit = $('select[id=servingunit]').val();
	    
    	FoodsCollection.update(id, 
    	{
	       foodname: foodname,
	       carbohydrates: carbohydrates,
	       calories: calories,
	       servings: servings,
	       servingunit: servingunit,
	       userId: Meteor.userId()
		});
		// TODO: Switch to route to diary
    	window.history.back();
  	}


});
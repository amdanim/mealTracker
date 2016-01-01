Template.foodForm.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe("foods", Meteor.userId());	
	});
});

Template.foodForm.helpers({
	'food': function () {
		var id = FlowRouter.getParam("id");
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
	    FlowRouter.go(FlowRouter.path("foodListRoute"));
 	},

  	'click #saveAddedFood': function(evt, tpl) {
	    evt.preventDefault();
	    var foodname = $('input[id=foodname]').val();
	    var carbohydrates = $('input[id=carbohydrates]').val() * 1;
	    var calories = $('input[id=calories]').val() * 1;
	    var servings = $('input[id=servings]').val() * 1;
	    var servingunit = $('select[id=servingunit]').val();
	    
	    FoodsCollection.insert({
	        foodname: foodname,
	        carbohydrates: carbohydrates,
	        calories: calories,
	        servings: servings,
	        servingunit: servingunit,
	        userId: Meteor.userId()
	   	}); 
	   	
  	  	FlowRouter.go(FlowRouter.path("foodListRoute"));
  	  	$("#add-food-item-button").focus();
  	},

  	'click #saveEditedFood': function(evt, tpl) {
	    evt.preventDefault();
	    var id = FlowRouter.getParam("id");
	    var foodname = $('input[id=foodname]').val();
	    var carbohydrates = $('input[id=carbohydrates]').val() * 1;
	    var calories = $('input[id=calories]').val() * 1;
	    var servings = $('input[id=servings]').val() * 1;
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
		
    	FlowRouter.go(FlowRouter.path("foodListRoute"));
  	}


});
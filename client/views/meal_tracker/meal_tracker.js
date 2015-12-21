/*
Session.setDefault('limit', 4);

// Meteor.subscribe('foods');


if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
}

Template.addFood.events({
  'submit form': function(evt, tpl) {
    evt.preventDefault();
    var fooditem = tpl.$('input[name="fooditem"]').val();
    var carbohydrates = tpl.$('input[name="carbohydrates"]').val(); 
    var calories = tpl.$('input[name="calories"]').val(); 
    var servingsize = tpl.$('input[name="servingsize"]').val(); 
  }
})

 
Template.mealTracker.helpers({
})  

Template.mealTracker.events({
  'click #addFoodButton': function (evt, tpl) {
     evt.preventDefault;
     Meteor.call('CreateFoodItem', {
      }, function (error, result) {
      if (error) return alert('Error: ' + error.error);
    });
  },

    
  
  'click #goButton': function (evt, tpl) {
    
    var foodKeywords = tpl.$('input[name="foodSearch"]').val();
    var qry = {
      name: foodKeywords
    };
    var qryOptions = {
      limit: 4,
      sort: {name: 1} 
    };
    var foodFound = false
    var food = FoodsCollection.find(qry, qryOptions);
    if(food != undefined) {
      if(food.length > 0) {
        foodFound = true; 
        // Display table with results
      } else {
        foodFound = false;
        alert("please add food item");
        
      }
      return foodFound;
      }
    }
  
});


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
*/
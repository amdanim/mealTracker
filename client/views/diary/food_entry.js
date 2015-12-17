Template.foodEntry.onCreated(function () {
    var self = this;
    var id = self.data._id;
    var calSessionVar = id + "_calories";
    var carbSessionVar = id + "_carbs";
    Session.set(calSessionVar, self.data.calories);
    Session.set(carbSessionVar, self.data.carbohydrates);
});

Template.foodEntry.events({
    'click button#remove-food-entry': function(evt) {
        var id = this._id;
        if (confirm('Are you sure you want to delete this entry?' )){
            FoodEntriesCollection.remove(id);
        }

    },

    'change .servings': function (evt) {
        evt.preventDefault();
        var originalServings = this.servings;
        var id = this._id;
        var servings = $('#' + id + "_servings").val();
        var calSessionVar = id + "_calories";
        var carbSessionVar = id + "_carbs";
        var calories = this.calories / originalServings * servings;
        var carbohydrates = this.carbohydrates / originalServings * servings;
        
        var totalCalories = Session.get("totalCalories");
        var totalCarbohydrates = Session.get("totalCarbohydrates");

        var caloriesOnScreen = $('#' + id + "_calories").text();
        var carbsOnScreen = $('#' + id + "_carbs").text();

        //console.log("calories on screen: " + caloriesOnScreen);
        //console.log("carbs on screen: " + carbsOnScreen);

        totalCalories = totalCalories - caloriesOnScreen + calories;
        totalCarbohydrates = totalCarbohydrates - carbsOnScreen + carbohydrates;

        //console.log("total calories: " + totalCalories);

        Session.set(calSessionVar, calories);
        Session.set(carbSessionVar, carbohydrates);
        
        Session.set("totalCalories", totalCalories);
        Session.set("totalCarbohydrates", totalCarbohydrates);
    },

    'blur .servings': function (evt) {
        evt.preventDefault();
        console.log("in onBlur");
        var id = this._id;
        var originalServings = this.servings;
        var servings = $('#' + id + "_servings").val();
        if (originalServings !== servings) {
            var servingsCell = $('#' + id + "_servings");
            servingsCell.addClass("redBorder");
        //    $("#" + id + "_servings").border("highlight", { color: "#ff0000" }, 3000);
        }
    },
    
    'click button.save-food-entry': function(evt, tpl) {
        evt.preventDefault();
        $('#' + id + "_calories").empty();
        $('#' + id + "_carbs").empty();
        var originalServings = this.servings;
        var id = this._id;
        var servings = $('#' + id + "_servings").val();
        var calories = this.calories / originalServings * servings;
        var carbohydrates = this.carbohydrates / originalServings * servings;

        var servingsCell = $('#' + id + "_servings");
        servingsCell.removeClass("redBorder");
        
            /* =================================
            console.log("in update " + id);
            console.log(this.foodname);
            console.log(this.carbohydrates);
            console.log("new " + carbohydrates);
            console.log(this.calories);
            console.log(this.servings);
            console.log(servings);
            ====================================== */

            console.log("Formatted UTC Date: " + moment.utc(this.entryDate).toDate());

        FoodEntriesCollection.update(id, 
        { $set: {
                entryDate: moment.utc(this.entryDate).toDate(),
                foodname: this.foodname,
                carbohydrates: carbohydrates,
                calories: calories,
                servings: servings,
                servingunit: this.servingunit,
                userId: Meteor.userId()
            }
        });
    
        sAlert.success('Food Entry Updated');
    }
}); 

Template.foodEntry.helpers ({

    'caloriesForServings' : function () {
        id = this._id;
        var calSessionVar = id + "_calories";
        var calories = Session.get(calSessionVar);
        return calories;
    },
    
    'carbsForServings': function () {
        id = this._id;
        var carbSessionVar = id + "_carbs";
        var carbohydrates = Session.get(carbSessionVar);
        return carbohydrates;  
    }
})
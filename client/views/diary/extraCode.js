// document.getElementById("legendTitleFoodEntry").innerHTML = "Edit Food Entry";
        // document.getElementById("date").value = this.entryDate;
        // document.getElementById("foodname").value = this.foodname;
        // document.getElementById("carbohydrates").value = this.carbohydrates;
        // document.getElementById("calories").value = this.calories;
        // document.getElementById("servings").value = this.servings;
        // document.getElementById("servingunit").value = this.servingunit;
        // document.getElementById("addFoodEntry").innerHTML = "Edit";
        
       /*
        
        if (confirm('Do you want to save changes?' )){
            FoodEntriesCollection.update();
        }*/

 /* From template="foodEntry"       <!--
    <div class="col-xs-2"><a class="xeditable-date" href="#" id="entryDate" data-type="combodate">{{ formatDate entryDate }}</a></div>
    <div class="col-xs-2"><a class="xeditable-text" href="#" id="name" showbuttons="false" data-inputclass="fix-size-class" data-type="text">{{ name }}</a></div>
    <div class="col-xs-2"><a class="xeditable-text" href="#" id="calories" data-inputclass="fix-size-class" data-type="number">{{ calories }}</a></div>
    <div class="col-xs-2"><a class="xeditable-text" href="#" id="carbohydrates" data-inputclass="fix-size-class" data-type="number">{{ carbohydrates }}</a></div>
    <div class="col-xs-1"><a class="xeditable-text" href="#" id="servings" data-inputclass="fix-size-class" data-type="number">{{ servingss }}</a></div>                    
    <div class="col-xs-2"><a class="xeditable-text" href="#" id="unit" data-inputclass="fix-size-class" data-type="text">{{ unit }}</a></div>
    <div class="col-xs-1"><button id="{{ _id }}" class="remove-food-entry">Remove</button></div>
    --> */

 /* From diary.html    <!--
                <div class="row">
                    <div class="col-xs-2"><strong>Date</strong></div>
                    <div class="col-xs-2"><strong>Name</strong></div>
                    <div class="col-xs-2"><strong>Calories</strong></div>
                    <div class="col-xs-2"><strong>Carbs</strong></div>
                    <div class="col-xs-1"><strong>Servings</strong></div>
                    <div class="col-xs-2"><strong>Unit of Measurement</strong></div>
                    <div class="col-xs-1"><strong>Remove?</strong></div>
                 --> */

/*  <!-- "FROM food_list_form.html"

        <form id="foodListForm" class="form-horizontal" role="form">
        
                <fieldset>
                    <legend id="legendTitleFoodList">Food List</legend>
                    <div class="col-sm-6">
                        <input class="form-control typeahead" id="mealName" name="foodList" type="text"
                            placeholder="Food item"
                            autocomplete="off" spellcheck="off"
                            data-source="foods"/>
                    </div>
                    <div class="col-sm-6">
                        <button class="button" id="searchButton" type="button">Search</button>          
                    </div>
                    <table id="entries" style="border-collapse: separate; border-spacing: 15px;">
                        <thead>
                            <th>Name</th>
                            <th>Calories</th>
                            <th>Carbs</th>
                            <th>Servings</th>
                            <th>Unit of Measurement</th>
                            <th>Select</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </thead>
                        <tbody>
                            {{#each foods }}
                                <tr>
                                    {{> foodItem }}
                                </tr>
                            {{/each}}
                        </tbody>
                    </table>

                    
                </fieldset>
            
        </form>

<template name="foodListTable">
    <div class="container-fluid">
        <legend id="legendTitleDiary">Food List</legend>
            <table id="entries" style="border-collapse: separate; border-spacing: 15px;">
                <thead>
                    <th>Name</th>
                    <th>Calories</th>
                    <th>Carbs</th>
                    <th>Servings</th>
                    <th>Unit of Measurement</th>
                    <th>Select</th>
                    <th>Edit</th>
                    <th>Remove</th>
                </thead>
                <tbody>
                    {{#each foods }}
                        <tr>
                            {{> foodItem }}
                        </tr>
                    {{/each}}
                </tbody>
            </table>
    </div>
    
</template>

<template name="foodItem">
    <td>{{ name }}</td>
    <td>{{ calories }}</td>
    <td>{{ carbs }}</td>
    
    <td><button id="select-food-list" class="button" type="button">Select</button></td>
    <td><button id="edit-food-list" class="button" type="button">Edit</button></td>
    <td><button id="{{ _id }}" class="remove-food-list" type="button">X</button></td>
</template> 
--> */


/* 'click #searchButton': function (e) {

        e.preventDefault();
        console.log("in search");
        var keywords = $('input[id=mealName]').val();
        var results = FoodsCollection.find({"name": {$in: [keywords]}});
        console.log(keywords);
        console.log(results.length);
        /*if(results.length == 0) {
            alert ("No records found.");
        } else {
            params = "";
        }*/
 /*       //var path = FlowRouter.path("foodListTableRoute");
        //FlowRouter.go(path);
        return results;
    };
*/
/*Template.foodEntry.onRendered(function () {
    $('#entries').editableTableWidget();

    $('.xeditable-text').editable({
        mode: "inline",
        showbuttons: false
    });

    $('.xeditable-date').editable({
        mode: "inline",
        showbuttons: false,
        format: 'MM-DD-YYYY',    
        viewformat: 'MM/DD/YYYY',    
        template: 'MMMM / D / YYYY',    
        combodate: {
            minuteStep: 1
       }
    });
});
*/





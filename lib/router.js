FlowRouter.route('/', {
	name: 'diaryRoute',
	action: function () {
		BlazeLayout.render("defaultLayout", {content: "diary"});
	}
});

FlowRouter.route('/diary/add_food_entry', {
	name: 'addFoodEntryRouteLegacy',
	action: function () {
		BlazeLayout.render("defaultLayout", {content: "addFoodEntry"});
	}
});

FlowRouter.route('/diary/edit/:id', {
	name: 'editFoodEntryRoute',
	action: function (params) {
		BlazeLayout.render("defaultLayout", {content: "foodEntryForm"});
	}
});

FlowRouter.route('/diary/add/', {
	name: 'addFoodEntryRoute',
	action: function () {
		BlazeLayout.render("defaultLayout", {content: "foodEntryForm"});
	}
});

FlowRouter.route('/foodlist', {
	name: 'foodListRoute',
	action: function () {
		BlazeLayout.render("defaultLayout", {content: "foodListForm"});
	}
});

FlowRouter.route('/foodlist/table', {
	name: 'foodListTableRoute',
	action: function () {
		BlazeLayout.render("defaultLayout", {content: "foodListTable"});
	}
});

FlowRouter.route('/foodlist/addfood', {
	name: 'addfoodFormRoute',
	action: function () {
		BlazeLayout.render("defaultLayout", {content: "foodForm"});
	}
});

FlowRouter.route('/foodlist/editfood/:id', {
	name: 'editfoodFormRoute',
	action: function (params) {
		BlazeLayout.render("defaultLayout", {content: "foodForm"});
	}
});

FlowRouter.route('/foodlist/food/selected/:id', {
	name: 'selectedFoodEntryRoute',
	action: function (params, queryParams) {
		BlazeLayout.render("defaultLayout", {content: "foodEntryForm"});
	}
});


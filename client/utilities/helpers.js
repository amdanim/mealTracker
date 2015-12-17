Template.registerHelper('formatDate', function(date) {
  return moment.utc(date).format('YYYY-MM-DD');
});

Template.registerHelper('formatDisplayDate', function(date) {
  console.log("registerHelper = " + moment.utc(date).format('MM-DD-YYYY'));
  return moment.utc(date).format('MM-DD-YYYY');
});

Template.registerHelper('sessionVar', function(sessionKey) {
  return Session.get(sessionKey);
});

Meteor.startup(function () {
  sAlert.config({
  	effect: 'bouncyflip',
  	position: 'top-right',
  	timeout: 1500,
  	stack: true,
  	beep: false,
  	offset: 125,
  	html: true,
  	onRouteClose: true
  });
});

error = function(message) {
  sAlert.error(message);
}

warning = function(message) {
  sAlert.warning(message);
}

info = function(message) {
  sAlert.info(message);
}

success = function(message) {
  sAlert.success(message);
}

// error("Problem happened!");
// warn("This could be an issue...");
// inform("Processing occurred.");
// success("Successfully saved your data!");

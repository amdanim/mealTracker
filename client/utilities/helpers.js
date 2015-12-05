Template.registerHelper('formatDate', function(date) {
  return moment(date).format('YYYY-MM-DD');
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
var ServerRequests = require('./ServerRequests');
var Login = require('../routes/Login');

var Authentication = {
	statics: {
		willTransitionTo: function(transition){
			console.log("Authentication");
			if(!ServerRequests.loggedIn()){
				Login.attemptedTransition = transition;
				transition.redirect('/login');
			}
		}
	}
};

module.exports = Authentication;
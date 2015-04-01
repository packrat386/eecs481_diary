var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var Authentication = require('../utils/Authentication');
var CurrentUserStore = require('../stores/CurrentUserStore');
var DiaryActions = require('../actions/DiaryActions');
var Parse = require('../utils/ParseInit');

var UpdatePassword = React.createClass({
	getInitialState: function() {
		return {
			message: null
		};
	},

	onUpdate: function(){
		event.preventDefault();
		var password = this.refs.pass.getDOMNode().value;
		var password_confirm = this.refs.pass_confirm.getDOMNode().value;

		if(password != password_confirm){
			this.setState(
				{
					message: 
						{
							className: "alert alert-danger", 
							message: "Passwords don't match."
						}
				});
			return;
		}

		console.log(password + " " + password_confirm);

		DiaryActions.updateCurrentUser({password: password}, function(response){
			if(!(response instanceof Parse.Error)){
				this.setState({
					message: 
						{
							className: "alert alert-success",
							message: "Password updated!"
						}
				})
			} else {
				this.setState({
					message: 
						{
							className: "alert alert-danger",
							message: response.message
						}
				})
			}
		}.bind(this));
	},

	render: function(){


		var messageComponent = null;
		if(this.state.message){
			messageComponent = 
				<div className={this.state.message.className}>
					{this.state.message.message}
				</div>;
		}

		return (
			<span>
				<h3>Update Password</h3>
				{messageComponent}
				<form onSubmit={this.onUpdate} ref="update_password_form">
		       		<label><input className="form-control" type="password" ref="pass" placeholder="Password"/></label><br/>
		       		<label><input className="form-control" type="password" ref="pass_confirm" placeholder="Confirm Password"/></label><br/>
		        	<button className="btn btn-lg btn-primary" type="submit">Update Password</button>
				</form>
			</span>);
	}

});

module.exports = UpdatePassword;
var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var Authentication = require('../utils/Authentication');
var CurrentUserStore = require('../stores/CurrentUserStore');
var DiaryActions = require('../actions/DiaryActions');
var Parse = require('../utils/ParseInit');

var UpdateEmail =  React.createClass({
	getInitialState: function() {
		return {
			message: null
		};
	},

	onUpdate: function(){
		event.preventDefault();
		var email = this.refs.email.getDOMNode().value;

		DiaryActions.updateCurrentUser({email: email}, function(response){
			if(!(response instanceof Parse.Error)){
				this.setState({
					message: 
						{
							className: "alert alert-success",
							message: "Email updated!"
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
				(<div className={this.state.message.className}>
					{this.state.message.message}
				</div>);
		}

		var emailComponent = 
			(
				<label>
					<input className="form-control" ref="email" defaultValue={CurrentUserStore.getUser().attributes.email}/>
				</label>
			);

		return (
			<div>
				{messageComponent}
				<form onSubmit={this.onUpdate} ref="update_email_form">
					{emailComponent}<br/>
		        	<button className="btn btn-lg btn-primary" type="submit">Update E-mail</button>
				</form>
			</div>);
	}

});

module.exports = UpdateEmail;
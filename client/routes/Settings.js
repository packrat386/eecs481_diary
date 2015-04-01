var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var Authentication = require('../utils/Authentication');
var CurrentUserStore = require('../stores/CurrentUserStore');
var DiaryActions = require('../actions/DiaryActions');
var Parse = require('../utils/ParseInit');
var UpdateEmail = require('../components/UpdateEmail');
var UpdatePassword = require('../components/UpdatePassword');

var Settings = React.createClass({
	mixins: [Authentication],


	getInitialState: function() {
		return {

		};
	},

	componentDidMount: function(){
		document.title = "ICU Diary | Settings";

	},

	changePassword: function(){
		event.preventDefault();
		var password = this.refs.pass1.getDOMNode().value;
		var password_confirm = this.refs.pass1_confirm.getDOMNode().value;

		if(password != password_confirm){
			this.setState(
				{
					updatePasswordMessage: 
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
					updatePasswordMessage: 
						{
							className: "alert alert-success",
							message: "Password updated!"
						}
				})
			} else {
				this.setState({
					updatePasswordMessage: 
						{
							className: "alert alert-danger",
							message: response.message
						}
				})
			}
		}.bind(this));
	},

	updateEmail: function(){
		event.preventDefault();
		var email = this.refs.email.getDOMNode().value;

		DiaryActions.updateCurrentUser({email: email}, function(response){
			if(!(response instanceof Parse.Error)){
				this.setState({
					updateEmailMessage: 
						{
							className: "alert alert-success",
							message: "Email updated!"
						}
				})
			} else {
				this.setState({
					updateEmailMessage: 
						{
							className: "alert alert-danger",
							message: response.message
						}
				})
			}
		}.bind(this));
	},

	render: function(){

		var input_className = "form-control";
		var button_className = "btn btn-lg btn-primary";

		console.log(CurrentUserStore.getUser());

		var user_type_component = "None";

		if(CurrentUserStore.getUser().attributes.user_type){
			user_type_component = CurrentUserStore.getUser().attributes.user_type;
		}

		var email_component = 
			<span>
				<label><input className={input_className} ref="email" defaultValue={CurrentUserStore.getUser().attributes.email}/></label><br/>
			</span>

		var updatePasswordComponent = null;
		if(this.state.updatePasswordMessage){
			updatePasswordComponent = 
				<div className={this.state.updatePasswordMessage.className}>
					{this.state.updatePasswordMessage.message}
				</div>;
		}

		var updateEmailComponent = null;
		if(this.state.updateEmailMessage){
			updateEmailComponent = 
				<div className={this.state.updateEmailMessage.className}>
					{this.state.updateEmailMessage.message}
				</div>;
		}

		//Instantiate patient list
		var patients = null;
		if(CurrentUserStore.getUser().attributes.user_type == "staff"){

		}

		return (

			<div className="container">
				<h3>User Type</h3>
				<p>{user_type_component}</p>
				<hr className="col-md-12"/>

				<UpdatePassword />
				<hr className="col-md-12"/>

				<h3>Update E-mail</h3>
				<UpdateEmail />
				<hr className="col-md-12"/>
			</div>
		)
	}

});

module.exports = Settings;
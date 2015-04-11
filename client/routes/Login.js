var React = require('react');
var Router = require('react-router');
var DiaryActions = require('../actions/DiaryActions');
var ServerRequests = require('../utils/ServerRequests');
var Parse = require('../utils/ParseInit');
var CurrentUserStore = require('../stores/CurrentUserStore');

var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Button = require('react-bootstrap').Button;

function getUserTypes() {
	return [
		"patient",
		"staff",
		"visitor"
	];
}


var Login = React.createClass({
	mixins: [Router.Navigation],

	statics: {
		attemptedTransition: null
	},

	getInitialState: function() {
		return {
			signinMessage: null,
			signupMessage: null,

			signupUsername: "",
			signupPassword: "",
			signupConfirmPassword: "",

			signinUsername: "",
			signinPassword: "",

			signupType: null,
			userTypes: getUserTypes()
		};
	},

	willTransitionTo: function(transition){
		//Redirect if logged in
		if(CurrentUserStore.loggedIn()){
			console.log("logged in, redirect now");
			transition.redirect('/add');
		}
	},

	componentDidMount: function(){
		document.title = "ICU Diary | Login";

		//Redirect if logged in (catch on load)
		if(CurrentUserStore.loggedIn()){
			console.log("logged in, redirect now");
			this.context.router.transitionTo('add');
		}

	},

	componentWillMount: function(){

	},

	handleLogin: function(event){
		event.preventDefault();
		var username = this.state.signinUsername;
		var password = this.state.signinPassword;
		console.log("handleLogin: " + username + " " + password);
	
		DiaryActions.login({
			username: username,
			password: password
		}, function(response){
			if(response instanceof Parse.Error){	
				this.setState({signinMessage: response.message.capitalizeFirstLetter()});
			} else {
				if(Login.attemptedTransition){
					var transition =  Login.attemptedTransition;
					Login.attemptedTransition = null;
					transition.retry();
				} else {
					this.transitionTo('/add');
				}
			}
		}.bind(this));
	},

	_setType: function(event){
		event.preventDefault();
		this.setState({
			signupType: event.currentTarget.value
		});
	},

	handleSignup: function(event){
		event.preventDefault();
		var username = this.state.signupUsername;
		var password = this.state.signupPassword;
		var password_confirm = this.state.signupConfirmPassword;

		if(username === '' || password_confirm === '' || password === ''){
			this.setState({signupMessage: "Username or password cannot be empty"});
			return;
		}

		if(password != password_confirm){
			this.setState({signupMessage: "Passwords don't match"});
			return;
		}

		if(!this.state.signupType){
			this.setState({signupMessage: "Pick a user type!"});
			return;
		}
		console.log("handleSignup: " + username + " " + password);

		DiaryActions.createUser({
			username: username, 
			password: password, 
			user_type: this.state.signupType
		}, function(response){
			if(response instanceof Parse.Error){	
				this.setState({signupMessage: response.message.capitalizeFirstLetter()});
			} else {
				if(Login.attemptedTransition){
					var transition =  Login.attemptedTransition;
					Login.attemptedTransition = null;
					transition.retry();
				} else {
					this.transitionTo('/add');
				}
			}
		}.bind(this));
	},

	handleSignupUsername: function(event){
		this.setState({
			signupUsername: event.target.value
		});
	},

	handleSignupPassword: function(event){
		this.setState({
			signupPassword: event.target.value
		});
	},

	handleSigninUsername: function(event){
		this.setState({
			signinUsername: event.target.value
		});
	},

	handleSigninPassword: function(event){
		this.setState({
			signinPassword: event.target.value
		});
	},

	handleSignupConfirmPassword: function(event){
		this.setState({
			signupConfirmPassword: event.target.value
		});
	},




	render: function(){

		//Create components for signin/signup error messages
		signupComponent = null;
		signinComponent = null;

		if(this.state.signupMessage){
			signupComponent = 
				<div className="alert alert-danger">
					{this.state.signupMessage}
				</div>;
		}

		if(this.state.signinMessage){
			signinComponent = 
				<div className="alert alert-danger">
					{this.state.signinMessage}
				</div>;
		}

		radioButtonComponent = this.state.userTypes.map(function(userType){
			className = null;
			if(this.state.signupType == userType){
				className="active"
			}
			return (
                <Button key={userType} value={userType} className={className} onClick={this._setType}>{userType.capitalizeFirstLetter()}</Button>
            );

		}.bind(this));

		var input_className = "form-control";
		var button_className = "btn btn-lg btn-primary";
		return (
			<div>
				<div className="col-xs-12 col-sm-12 col-md-4">
					<h2>Sign-In</h2>
					{signinComponent}
					<form onSubmit={this.handleLogin}>

						<label><input className={input_className} placeholder="Username" onChange={this.handleSigninUsername}/></label><br/>

						<label><input className={input_className} type="password" placeholder="Password" onChange={this.handleSigninPassword}/></label><br/>

						<button className={button_className} type="submit">Login</button><br/>
						
					</form>
				</div>

				<div className="col-xs-12 col-sm-12 col-md-4">
					<h2>Create Account</h2>
					{signupComponent}
					<form onSubmit={this.handleSignup} ref="create_user_form">
				        
			        	<label><input className={input_className} placeholder="Username" onChange={this.handleSignupUsername}/></label><br/>
			        
			       		<label><input className={input_className} type="password" placeholder="Password" onChange={this.handleSignupConfirmPassword}/></label><br/>
			   
			       		<label><input className={input_className} type="password" placeholder="Confirm" onChange={this.handleSignupPassword}/></label><br/>
			   
				        <ButtonGroup>
				        	{radioButtonComponent}
				        </ButtonGroup>
				    	<br/>
			        	<button className={button_className} type="submit">Create Account</button><br/>
		
					</form>
				</div>
			</div>
		);
	}


});

module.exports = Login;
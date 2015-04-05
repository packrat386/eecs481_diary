var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var DiaryActions = require('../actions/DiaryActions');
var Graffiti = require('./Graffiti');


var AddBasicEntry = React.createClass({
	mixins: [Router.Navigation],


	submitEntry: function(event){
		event.preventDefault();
		// var title = this.refs.title.getDOMNode().value;
		// var text = this.refs.text.getDOMNode().value;

		// DiaryActions.addEntry({
		// 	data: {
		// 		title: title,
		// 		text: text
		// 	}
		// }, function(response){
		// 	if(response){
		// 		this.transitionTo('main');
		// 	}
		// }.bind(this));
		// console.log(title + " " + text);
	},

	_getData: function(){
		var title = this.refs.title.getDOMNode().value;
		var text = this.refs.text.getDOMNode().value;
		return {
			title: title,
			text: text

		};
	},

	componentDidMount: function(){
		if(this.props.registerCallback){
			this.props.registerCallback(this._getData);
		}
	},

	render: function(){

		return (
			<form className="form-horizontal" onSubmit={this.submitEntry}>
				<h3>Add Diary Entry</h3> 
				<div className="form-group">
					<label className="col-sm-1 control-label">Title</label>
					<div className="col-sm-10">
						<input ref="title" type="title" className="form-control"/>
					</div>
				</div>

				<div className="form-group">
					<label className="col-sm-1 control-label">Diary Text</label>
					<div className="col-sm-10">
						<textarea ref="text" className="form-control" rows="4"></textarea>
					</div>
				</div>
			</form>
		);
	}
});

module.exports = AddBasicEntry;
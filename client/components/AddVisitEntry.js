var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var DiaryActions = require('../actions/DiaryActions');
var Graffiti = require('./Graffiti');



function getEntryTypes() {
	return [
		{name: "Andrew", icon: "glyphicon glyphicon-pencil", type: "text", path: ""},
		{name: "Eric", icon: "glyphicon glyphicon-picture", type: "text", path: ""},
		{name: "Katie", icon: "glyphicon glyphicon-heart", type: "text", path: ""},
		{name: "Visit", icon: "glyphicon glyphicon-user", type: "text", path: ""}
	];
}

var AddBasicEntry = React.createClass({
	mixins: [Router.Navigation],

	getInitialState: function(){
		return { types: getEntryTypes() };
	},

	submitEntry: function(event){
		event.preventDefault();
		var title = this.refs.title.getDOMNode().value;
		var text = this.refs.text.getDOMNode().value;

		DiaryActions.addEntry({
			data: {
				title: title,
				text: text
			}
		}, function(response){
			if(response){
				this.transitionTo('list');
			}
		}.bind(this));
		console.log(title + " " + text);
	},

	render: function(){

		var entryTypes = this.state.types.map(function (entryType) {
			return (
				<div className="btn-group">
						<button type="button" className="btn-lg">
							{ entryType.name }
						</button>
				</div>
			);
		});

		return (
			<div> 
			<h1>Who is visiting today?</h1>
			{entryTypes}
			<h1>Someone new?</h1>
			<form className="form-horizontal" onSubmit={this.submitEntry}>
				<div className="form-group">
					<label className="col-sm-1 control-label">Name?</label>
					<div className="col-sm-10">
						<input ref="title" type="title" className="form-control"/>
					</div>
				</div>
				<button type="button" className="btn">
				 Done
				</button>
			</form>
			</div>

		);
	}
});

module.exports = AddBasicEntry;

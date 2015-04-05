var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var DiaryActions = require('../actions/DiaryActions');
var Graffiti = require('./Graffiti');
var Slider = require("bootstrap-slider");


var AddMoodEntry = React.createClass({
	mixins: [Router.Navigation],

	componentDidMount: function(){
		$(this.refs.feelingslider.getDOMNode()).slider({

		});
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
				this.transitionTo('main');
			}
		}.bind(this));
		console.log(title + " " + text);
	},

	render: function(){


		return (
			<form className="form-horizontal" onSubmit={this.submitEntry}>
				<h3>Add Mood Entry</h3>
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

				<div className="form-group">
					<div className="col-sm-offset-1 col-sm-10">
						<button type="submit" className="btn btn-primary">Create Entry</button>
					</div>
				</div>

				<input ref="feelingslider">
					<p className="text-center">
					<img src="/images/Slice-1.png"> </img>
					</p>
				</input>
			</form>
		);
	}
});

module.exports = AddMoodEntry;

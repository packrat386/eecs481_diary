var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var AddDoodleEntryCom = require('../components/AddDoodleEntry');
var GraffitiCom = require('../components/Graffiti');
var Authentication = require('../utils/Authentication');


var AddDoodleEntry = React.createClass({
	mixins: [Authentication],

	getInitialState: function(){
		return {
			canvasFunc: null,
			readOnly: false
		};
	},

	_onUpdate: function(event){
		event.preventDefault();
		console.log('onUpdate');
		if(this.state.canvasFunc){
			this.state.entry.canvasImage = this.state.canvasFunc();
			console.log(this.state.entry.canvasString);
		}

		DiaryActions.updateEntry(this.state.entry, function(response){
			this.setState({
				entry: response,
				edited: false,
				readOnly: true
			});
		}.bind(this));
	},
	submitEntry: function(event){
		event.preventDefault();
		var title = this.refs.title.getDOMNode().value;

		event.preventDefault();
		console.log('onUpdate');
		if(this.state.canvasFunc){
			this.state.entry.canvasImage = this.state.canvasFunc();
			console.log(this.state.entry.canvasString);
		}
		DiaryActions.addDoodle({
			title: title,
		}, function(response){
			if(response){
				this.transitionTo('main');
			}
		}.bind(this));
		console.log(title + " " + text);
	},

	render: function(){
		var buttons = (
			<div className="form-group">
				<label className="col-sm-1 control-label">Title</label>
				<div className="col-sm-8">
					<input ref="title" type="title" className="form-control"/>
				</div>
				<div className="col-sm-offset-1 col-sm-2">
					<button type="submit" className="btn btn-primary">Create Entry</button>
				</div>
			</div>
		);
		return (
			<div className="container">
				<form className="form-horizontal" onSubmit={this.submitEntry}>
					{buttons}
					<div className="col-xs-12 col-md-12">
						<GraffitiCom
							readOnly={this.state.readOnly}
							registerCanvas={this.registerCanvas}
						/>
					</div>
				</form>
			</div>
		);
	},

	registerCanvas: function(getCanvasFunc){
		this.setState({
			canvasFunc: getCanvasFunc
		})
	}

});

module.exports = AddDoodleEntry;

var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var GraffitiCom = require('../components/Graffiti');
var DiaryActions = require('../actions/DiaryActions');
var Authentication = require('../utils/Authentication');


var AddDoodleEntry = React.createClass({
	mixins: [Router.Navigation],

	getInitialState: function(){
		return {
			canvasFunc: null,
			readOnly: false
		};
	},
	submitEntry: function(event){
		event.preventDefault();
		// var title = this.refs.title.getDOMNode().value;
		// var drawing = this.state.canvasFunc();

		// DiaryActions.addEntry({
		// 	data: {
		// 		type: "doodle",
		// 		title: title,
		// 		canvasImage: drawing
		// 	}
		// }, function(response){
		// 	if(response){
		// 		this.transitionTo('main');
		// 	}
		// }.bind(this));
		// console.log(title + " " + drawing);
	},

	_getData: function(){
		var title = this.refs.title.getDOMNode().value;
		var drawing = this.state.canvasFunc();
		return {
			title: title,
			canvasImage: drawing
		};
	},

	componentDidMount: function(){
		if(this.props.registerCallback){
			this.props.registerCallback(this._getData);
		}
	},

	render: function(){
		var buttons = (
			<div className="form-group">
				<label className="col-sm-1 control-label">Title</label>
				<div className="col-sm-8">
					<input ref="title" type="title" className="form-control"/>
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

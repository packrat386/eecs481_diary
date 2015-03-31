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

	render: function(){
		return (
			<div className="container">
				<div className="col-xs-12 col-md-7">
					<GraffitiCom
						readOnly={this.state.readOnly}
						registerCanvas={this.registerCanvas}
					/>
				</div>
			</div>
		);
	},

	registerCanvas: function(getCanvasFunc){
		this.setState({
			canvasFunc: getCanvasFunc
		});
	}

});

module.exports = AddDoodleEntry;

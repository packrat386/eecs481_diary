var React = require('react');
var Graffiti = require('../Graffiti');

var DoodlePanel =  React.createClass({

	render: function(){
		return (
			<span>
				<Graffiti 
					registerCallback={this.props.registerCallback} 
					entry={this.props.entry.get("data").canvasImage}
					edit={this.props.edit}
				/>
			</span>);
	}

});

module.exports = DoodlePanel;
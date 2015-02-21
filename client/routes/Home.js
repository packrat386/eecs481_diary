var React = require('react');
var Graffiti = require('../components/Graffiti');

var Home = React.createClass({
	render: function() {
		return (
			<div>
				<p>Sketch Test</p>
				<Graffiti />
			</div>
		);
	}
});

module.exports = Home;

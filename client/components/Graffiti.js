var React = require('react');

var Graffiti = React.createClass({

	componentDidMount: function(){
		console.log($(this.getDOMNode()));
		$(this.getDOMNode()).sketch();
	},

	render: function(){
		var inline_style = {
				width: 'auto',
				height: 'auto',
				border: '1px solid #ccc'
		};
		return (
			<canvas 
				width="658" 
				height="333" 
				style={inline_style}
					>
			</canvas>
		);
	}
});

module.exports = Graffiti;
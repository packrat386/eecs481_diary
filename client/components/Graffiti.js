var React = require('react');

var Graffiti = React.createClass({

	componentDidMount: function(){
		console.log($(this.getDOMNode()));
		$(this.refs.sketcher.getDOMNode()).sketch();
	},

	componentWillUpdate: function(){
		$(this.refs.sketcher.getDOMNode()).sketch();
	},

	render: function(){
		var inline_style = {
				width: 'auto',
				height: 'auto',
				border: '1px solid #ccc'
		};
		return (
			<div className="container">
				<div ref="tools">
					<a className="btn btn-default" href="#tools_sketch" data-tool="marker">Draw</a>
					<a className="btn btn-default" href="#tools_sketch" data-tool="eraser">Eraser (remove all)</a>
					<a className="btn btn-default" href="#tools_sketch" data-download="png">Download</a>
				</div>

				<canvas 
					id="tools_sketch"
					ref="sketcher"
					width="658" 
					height="333" 
					style={inline_style}
				>
				</canvas>
			</div>
		);
	}
});

module.exports = Graffiti;
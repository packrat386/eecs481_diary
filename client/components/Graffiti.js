var React = require('react');

var Graffiti = React.createClass({

	componentDidMount: function(){
		console.log($(this.getDOMNode()));
		$(this.refs.sketcher.getDOMNode()).sketch({
			defaultSize: 10
		});
	},

	componentWillUpdate: function(){
		$(this.refs.sketcher.getDOMNode()).sketch();
	},

	render: function(){
		var inline_style = {
				width: '100%',
				border: '1px solid #ccc'
		};
		return (
			<div className="container">
				<div ref="tools">
					<a className="btn btn-default" href="#tools_sketch" data-tool="marker" data-color="#000">Draw</a>
					<a className="btn btn-default" href="#tools_sketch" data-color="#fff" style={{background: "#fff"}}>Erase</a>
					<a className="btn btn-default" href="#tools_sketch" data-tool="eraser">Eraser (remove all)</a>
					<a className="btn btn-default" href="#tools_sketch" data-download="png">Download</a>
				</div>

				<canvas 
					id="tools_sketch"
					ref="sketcher"
					height="400px"
					style={inline_style}
				>
				</canvas>
			</div>
		);
	}
});

module.exports = Graffiti;
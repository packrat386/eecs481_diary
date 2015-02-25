var React = require('react');

var Graffiti = React.createClass({

	disableDrawing: function(){
		$(this.refs.sketcher.getDOMNode()).sketch().set('tool', null);
	},

	enableDrawing: function(){
		$(this.refs.sketcher.getDOMNode()).sketch().set('tool', 'marker');
	},

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
				height: '400px',
				border: '1px solid #ccc'
		};
		return (
			<span>
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
			</span>
		);
	}
});

module.exports = Graffiti;
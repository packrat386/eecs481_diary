var React = require('react');

var Graffiti = React.createClass({

	disableDrawing: function(){
		$(this.refs.sketcher.getDOMNode()).sketch().set('tool', 'nothing');
	},

	enableDrawing: function(){
		$(this.refs.sketcher.getDOMNode()).sketch().set('tool', 'marker');
	},

	clearDrawing: function(){
		var canvas = $(this.refs.sketcher.getDOMNode());
		var ctx = canvas[0].getContext('2d');
		canvas.sketch().actions = [];
		ctx.clearRect(0,0,canvas.width, canvas.height);
		canvas.sketch().redraw();
	},

	componentDidMount: function(){
		$(this.refs.sketcher.getDOMNode()).sketch({
			defaultSize: 10
		});
		console.log($.sketch.tools);
		$.sketch.tools["nothing"] = {
			draw: function(action){

			},
			onEvent: function(e){

			}
		};
		this.disableDrawing();
	},

	componentDidUpdate: function(prevProps, prevState){
		if(prevProps.entryID !== this.props.entryID){
			console.log("clearDrawing");
			this.clearDrawing();
		}

		if(this.props.readOnly == true){
			console.log("readONly");
			this.disableDrawing();
		} else {
			console.log("drawing");
			this.enableDrawing();
		}
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
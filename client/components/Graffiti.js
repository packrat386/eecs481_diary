var React = require('react');

var Graffiti = React.createClass({

	getInitialState: function(){
		return {};
	},

	disableDrawing: function(){
		//Set tool to component defined within componentDidMount
		$(this.refs.sketcher.getDOMNode()).sketch().set('tool', 'nothing');
	},

	enableDrawing: function(){
		$(this.refs.sketcher.getDOMNode()).sketch().set('tool', 'marker');
	},

	clearDrawing: function(){
		//Resets canvas actions and redraws canvas
		var canvas = $(this.refs.sketcher.getDOMNode());
		var ctx = canvas[0].getContext('2d');
		canvas.sketch().action = [];
		canvas.sketch().actions = [];
		ctx.clearRect(0,0,ctx.width, ctx.height);
		canvas.sketch().redraw();
	},

	getImage: function(){
		//Get the actions array from the canvas
		var canvas = $(this.refs.sketcher.getDOMNode());
		var ctx = canvas[0].getContext('2d');
		canvas.sketch().actions.push(canvas.sketch().action);
		return canvas.sketch().actions;
	},

	drawImage: function(actions){
		//Draws all the actions onto the canvas
		var canvas = $(this.refs.sketcher.getDOMNode());
		var ctx = canvas[0].getContext('2d');
		canvas.sketch().actions = actions.slice();
		if(canvas.sketch().actions && canvas.sketch().actions.length > 0){
			canvas.sketch().action = canvas.sketch().actions[canvas.sketch().actions.length-1];
		}
		canvas.sketch().redraw();
	},

	componentDidMount: function(){
		$(this.refs.sketcher.getDOMNode()).sketch({
			defaultSize: 10
		});
		console.log($.sketch.tools);

		//Set the non-drawing "tool"
		$.sketch.tools["nothing"] = {
			draw: function(action){

			},
			onEvent: function(e){

			}
		};

		//Register function with parent to return image when needed
		if(this.props.registerCanvas){
			this.props.registerCanvas(this.getImage);
		}

		//Initial disable drawing on the graffiti
		this.disableDrawing();

		//Draw image if entry is passed down
		if(this.props.entry && this.props.entry.canvasImage){
			console.log(this.props.entry.canvasImage);
			this.drawImage(this.props.entry.canvasImage);
		}
	},

	componentDidUpdate: function(prevProps, prevState){

		//Redraws the new graffiti based on new props
		if((!prevProps.entry) || (prevProps.entry.id !== this.props.entry.id)){
			this.clearDrawing();
			if(this.props.entry && this.props.entry.canvasImage){
				this.drawImage(this.props.entry.canvasImage);
			}
		}

		//Only allows drawing when edit is false
		if(this.props.readOnly == true){
			this.disableDrawing();
		} else {
			this.enableDrawing();
		}
	},

	render: function(){
		var inline_style = {
				width: '100%',
				height: '400px',
				border: '1px solid #ccc'
		};

		var tools = null;
		if(this.props.readOnly === false){
			tools = (<div ref="tools">
				<a className="btn btn-default" href="#tools_sketch" data-tool="marker" data-color="#000">Draw</a>
				<a className="btn btn-default" href="#tools_sketch" data-color="#fff" style={{background: "#fff"}}>Erase</a>
				<a className="btn btn-default" onClick={this.clearDrawing}>Clear</a>
				<a className="btn btn-default" href="#tools_sketch" data-download="png">Download</a>
			</div>);
		}

		return (
			<span>
				{tools}

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
var React = require('react');
var Parse = require('../../utils/ParseInit');

function getImageSource(value){
	return "/images/pain-"+value+".png";
}

var painList = [0, 2, 4, 6, 8, 10];

var MoodPanel =  React.createClass({

	getInitialState: function(){

		return {
			value: this.props.entry.get("data").value
		};
	},

	componentDidMount: function(){
		console.log("Mood mounted");
		if(this.props.registerCallback){
			this.props.registerCallback(this._getData);
		}
	},

	_getData: function(){
		if(this.state.value === null){
			return null;
		} else {
			return {
				value: this.state.value
			};		
		}
	},

	_setMood: function(event){
		event.preventDefault();
		var value = event.target.value;
		console.log(value);

		this.setState({
			value: value
		});
	},

	render: function(){

		var moodComponents = null;
		if(this.props.edit === true){
			var selectedStyle = {
				height: "250px",
				borderStyle: "solid",
				borderColor: "black"
			};
			var unselectedStyle = {
				height: "250px",
				borderStyle: "none"
			};

			moodComponents = painList.map(function(pain){
				var style = pain == this.state.value ? selectedStyle : unselectedStyle;
				return (<input 
					type="image" 
					className=".col-md-3"
					style={style}
					key={pain}
					src={getImageSource(pain)}
					value={pain}
					onClick={this._setMood} 
				/>);
			}.bind(this));
		} else {
			moodComponents = (<img
					style={
						{
							height: "250px",
							paddingBottom: "20px"
						}
					}
			src={getImageSource(this.props.entry.get("data").value)} />);
		}

		return (<span>
				{moodComponents}
			</span>);
	}

});

module.exports = MoodPanel;
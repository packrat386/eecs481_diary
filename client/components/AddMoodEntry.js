var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var DiaryActions = require('../actions/DiaryActions');
var Graffiti = require('./Graffiti');

var Slider = require("./Slider");

var AddMoodEntry = React.createClass({

	getInitialState: function() {
	    return {
	      value: 5
	    };
  	},

  	increment: function(event) {
	    this.setState({
	      value: this.state.value + 1
	    });
  	},

	didChange: function(event) {
		this.setState({
		  value: event.value
		});
	},

	componentDidMount: function(){
		console.log("stuff");
		// console.log($(this.refs.ex1.getDOMNode()).slider());
		// $(this.refs.feelingslider.getDOMNode()).slider();

		// var mySlider = new BootstrapSlider(this.refs.ex1.getDOMNode(),{
		// 	formatter: function(value) {
		// 		return 'Current value: ' + value;
		// 	},
		// 	id: "ex1Slider",
		// 	min: 0,
		// 	max: 20,
		// 	step: 1,
		// 	value: 14
		// });

		// console.log(mySlider);
	},

	// submitEntry: function(event){
	// 	event.preventDefault();
	// 	var title = this.refs.title.getDOMNode().value;
	// 	var text = this.refs.text.getDOMNode().value;

	// 	DiaryActions.addEntry({
	// 		data: {
	// 			title: title,
	// 			text: text
	// 		}
	// 	}, function(response){
	// 		if(response){
	// 			this.transitionTo('main');
	// 		}
	// 	}.bind(this));
	// 	console.log(title + " " + text);
	// },

	render: function(){


		return (
			<div>
				<div style={{position: "relative"}}>
					<p className="text-center">
						<img src="/images/Slice-1.png"> </img>
					</p>
					<Slider min={0} max={10} step={1} value={this.state.value} toolTip={true} onSlide={this.didChange}/>

				</div>
			 	<button onClick={this.increment}>Increment</button>
			</div>
		);
	}
});

module.exports = AddMoodEntry;

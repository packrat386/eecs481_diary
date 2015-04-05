var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var DiaryActions = require('../actions/DiaryActions');
var Graffiti = require('./Graffiti');

var Slider = require("./Slider");

var AddMoodEntry = React.createClass({

	componentDidMount: function(){
		console.log("Mood mounted");
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
				<div>
					<p className="text-center">
						<img src="/images/Slice-1.png"> </img>
					</p>

				</div>
			 	<button onClick={this.increment}>Increment</button>
			</div>
		);
	}
});

module.exports = AddMoodEntry;

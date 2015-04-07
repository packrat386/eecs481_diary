// var React = require('react');
// var Router = require('react-router');
// var Parse = require('parse').Parse;
// var LineChart = require("react-chartjs").Line;

// var Graphs = React.createClass({
// 	getInitialState: function(){
// 		return {
// 			moodData: []
// 		};
// 	},

// 	componentDidMount: function(){
// 		document.title = "ICU Diary | Graphs";

// 		console.log("graphs");
// 		Parse.Cloud.run("mood_history", {}, {
// 			success: function(response){
// 				console.log(response);
// 				this.setState({
// 					moodData: response
// 				});
// 			},

// 			error: function(error){
// 				console.log(error);
// 			}
// 		}.bind(this));



// 	},

// 	render: function() {
// 		console.log("graphs");
// 		var dataArray = [];
// 		this.state.moodData.map(function(mood){
// 			dataArray.push(mood.value);
// 		});
// 		var dataModel = {
// 			datasets: [
// 				{
// 					data: dataArray
// 				}
// 			]
// 		};

// 		return (
// 			 <LineChart data={this.state.moodData} width="600" height="250"/>
// 		);
// 	}
// });

// module.exports = Graphs;

var React = require('react');
var Router = require('react-router');
var Parse = require('parse').Parse;
var LineChart = require("react-chartjs").Line;
var Chart = require("react-chartjs").Chart;
var moment = require("moment");


var painList = [0, 2, 4, 8, 10];

function getImageSource(value){
	return "/images/pain-"+value+".png";
}

var Graphs = React.createClass({
	getInitialState: function(){
		return {
			moodData: []
		};
	},


	componentDidMount: function(){
		document.title = "ICU Diary | Graphs";

		console.log("graphs");
		var that = this;
		Parse.Cloud.run("mood_history", {}, {
			success: function(response){
				console.log(response);
				that.setState({
					moodData: response
				});
			},

			error: function(error){
				console.log(error);
			}
		});

		$("#chart").click(
			function(evt){
				console.log("chart clicked");
				console.log($("#chart"));
				console.log($("#chart").getPointsAtEvent(evt));
			}

		);

	},

	componentDidUpdate: function(){
		$("#chart").click(
			function(evt){
				console.log("chart clicked");
				console.log($("#chart"));
				console.log($("#chart").getPointsAtEvent(evt));
			}

		);
	},

	render: function() {
		console.log("graphs");
		var dataArray = [];
		var dataLabels = [];
		var graphComponent = null;
		var moodComponents = null;
		if(this.state.moodData.length > 0){

			var dateDictionary = {};

			//Go through each element in the mood data
			this.state.moodData.map(function(mood){
				var timeObj = moment(mood.date, "ddd MMM DD YYYY hh:mm:ss");
				var date = timeObj.format("MM-DD-YYYY");
				if(!(date in dateDictionary)){
					dateDictionary[date] = [];
				} 				
				dateDictionary[date].push(mood);
			});

			console.log(dateDictionary);

			var dateArray

			//Take the average of each day during momentjs
			for(key in dateDictionary){
				var sum = 0.0;
				for(var i = 0; i < dateDictionary[key].length; i++){
					sum += parseFloat(dateDictionary[key][i].mood);
				}
				dateDictionary[key] = sum/dateDictionary[key].length;
 			}

			//Sort the dates and push the correct data labels and the dataarray
 			var sortedDates = Object.keys(dateDictionary);
 			sortedDates = sortedDates.sort(function(a,b){
 				var dateA = a.split("-");
 				var dateB = b.split("-");
 				console.log(dateA);
 				console.log(dateB);

 				//Compare year
 				var yearA = parseInt(dateA[2]);
 				var yearB = parseInt(dateB[2]);
 				if(yearA !== yearB){
 					if(yearA < yearB){
 						return -1;
 					} else {
 						return 1;
 					}
 				}

 				var monthA = parseInt(dateA[0]);
 				var monthB = parseInt(dateB[0]);
 				if(monthA !== monthB){
 					if(monthA < monthB){
 						return -1;
 					} else {
 						return 1;
 					}
 				}

 				var dayA = parseInt(dateA[1]);
 				var dayB = parseInt(dateB[1]);	
 				if(dayA !== dayB){
 					
 					if(dayA < dayB){
 						return -1;
 					} else {
 						return 1;
 					}
 				}		
 				return 0;
 			});
 			
  			console.log(sortedDates);
 			for(var i = 0; i < sortedDates.length; i++){
				dataLabels.push(sortedDates[i]);
				dataArray.push(dateDictionary[sortedDates[i]]);
 			}

			console.log(dataLabels);
			console.log(dataArray);
			var dataModel = {
				labels: dataLabels,
				datasets: [
					{      
						label: "Mood Dataset",
						fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
						data: dataArray
					}
				]
			};		

			var chartOptions = {
				scaleOverride: true,
				scaleStartValue: 0,
				scaleStepWidth: 2,
				scaleSteps: 5,
				responsive: true,
				scaleFontSize: 16
			};
		
			graphComponent = (
				<LineChart 
					id="chart"
					data={dataModel} 
					options={chartOptions}
					width="600"
					height="250"
				/>);
			var style = {
				height: "200px",
				borderStyle: "none",
				paddingBottom: "20px"
			};
			var moodComponents = painList.map(function(pain){
				return (<img 
					className=".col-md-3"
					style={style}
					key={pain}
					src={getImageSource(pain)}
				/>);
			});
		} else {

		}

		return (
			 <div className="text-center">
			 	<h2>Average Mood Over Time</h2>
			 	<h3>Lower is happier | Reference below graph</h3>
			 	{graphComponent}
			 	<div className="row">
				 	{moodComponents}
				</div>
			 </div>
		);
	}
});

module.exports = Graphs;

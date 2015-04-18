var React = require('react');
var Router = require('react-router');
var Parse = require('parse').Parse;
var LineChart = require("react-chartjs").Line;
var BarChart = require("react-chartjs").Bar;
var Chart = require("react-chartjs");
var moment = require("moment");

var Authentication = require('../utils/Authentication');
var painList = [0, 2, 4, 8, 10];

function getImageSource(value){
	return "/images/pain-"+value+".png";
}

var Graphs = React.createClass({
	mixins: [Authentication],

	contextTypes: {
		router: React.PropTypes.func
	},

	getInitialState: function(){
		return {
			moodData: []
		};
	},

	componentDidMount: function(){
		document.title = "ICU Diary | Graphs";

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

	},

	componentDidUpdate: function(){
		var that = this;
		//Transition to list to specific day on click
		var that = this;
		$("#chart").click(
			function(evt){
				console.log("chart clicked");
				var points = that.refs.mood_graph.getChart().getPointsAtEvent(evt);
				console.log(points);
				if(points.length > 0){
					that.context.router.transitionTo('list', {}, {date: points[0].label});
				}
			}

		);
	},

	render: function() {
		console.log("graphs");
		var dataArray = [];
		var dataLabels = [];
		var graphComponent = null;
		var distributionLabels = ["0","2","4","6","8","10"];
		var distributionData = [];
		var graphDistributionComponent = null;
		var moodComponents = null;
		if(this.state.moodData.length > 0){

			var dateDictionary = {};
			var distributionDictionary = {}
			for(var i = 0; i < distributionLabels.length; i++){
				distributionDictionary[distributionLabels[i]] = 0;
			}

			//Go through each element in the mood data
			this.state.moodData.map(function(mood){
				var timeObj = moment(mood.date, "ddd MMM DD YYYY hh:mm:ss");
				var date = timeObj.format("MM-DD-YYYY");
				if(!(date in dateDictionary)){
					dateDictionary[date] = [];
				} 				
				distributionDictionary[mood.mood] += 1;
				dateDictionary[date].push(mood);
			});

			console.log(dateDictionary);

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
					ref="mood_graph"
				/>);


			//Distribution Graph Options
			for(var i = 0; i < distributionLabels.length; i++){
				distributionData.push(distributionDictionary[distributionLabels[i]]); 
			}
			console.log(distributionData);
			var distributionModel = {
				labels: distributionLabels,
				datasets: [
					{
			            label: "Distribution Dataset",
			            fillColor: "rgba(151,187,205,0.5)",
			            strokeColor: "rgba(151,187,205,0.8)",
			            highlightFill: "rgba(151,187,205,0.75)",
			            highlightStroke: "rgba(151,187,205,1)",
			            data: distributionData
					}
				] 
			};
			graphDistributionComponent = (<BarChart 
					id="distribution_graph"
					data={distributionModel} 
					width="600"
					height="250"
					ref="distribution_graph"
				/>);

			//Mood Components Creation
			var pictureStyle = {
				height: "175px",
				borderStyle: "none"
			};
			var moodComponents = painList.map(function(pain){
				return (<img 
					className=".col-md-3"
					style={pictureStyle}
					key={pain}
					src={getImageSource(pain)}
				/>);
			});
		} else {

		}

		return (
			 <div className="text-center">
	 			<div className="panel panel-default">
					<div className="panel-heading"> 
						<h3>Mood Reference</h3>
					</div>
					<div className="panel-body">
				 	{moodComponents}
					</div>

				</div>

	 			<div className="panel panel-default">

					<div className="panel-heading"> 
					 	<h2>Average Mood Over Time</h2>
					 	<h3>Lower is happier</h3>
					 	<p>Click on points to see the day's posts</p>
					</div>
					<div className="panel-body">
						<div>
						 	{graphComponent}
						</div>
					</div>
	 			</div>

	 			<div className="panel panel-default">
					<div className="panel-heading"> 
					 	<h2>Mood Distribution</h2>
					</div>
					<div className="panel-body">
						<div>
						 	{graphDistributionComponent}
						</div>
					</div>
	 			</div>
				
			 </div>
		);
	}
});

module.exports = Graphs;

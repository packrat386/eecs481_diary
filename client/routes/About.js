var React = require('react');
var Mood = require('../components/AddMoodEntry');

var About = React.createClass({
	componentDidMount: function(){
		document.title = "ICU Diary | About";
	},

	render: function() {
		return (
	  	<div className="jumbotron">
	  		<h3>A Diary for ICU Patients</h3>
		    <p>We built a web application to serve as an interactive diary to be used by the patient, their family, and the nursing staff. ICU survivors have a much higher incidence of depression and PTSD symptoms, which is believed to be caused by psychological trauma during their stay in the ICU. Some research has indicated that keeping a plain language diary for the patient can help them to make sense of their stay in the ICU and reduce psychological trauma.</p>
		    <p>Up until now the patient has generally not had any input in the diary, which we believe to be mostly because the patients have not felt up to the task of writing an entry for themselves. The goal of the diary web application is not only to make it easier to collect diary entries from different family and staff, but also to allow the possibility of the patient having some input. This will be accomplished with a simple touch interface for the patient to use, which should make it possible for the patient to input information in the diary without too much trouble. We believe that this will make the keeping of the diary an even more effective tool for preventing stress in the ICU.</p>
   		
		    <p> Contact: <a href="mailto:diary-481@umich.edu" target="_blank">diary-481@umich.edu</a></p>
   			<Mood />
   		</div>
		);
	}
});

module.exports = About;

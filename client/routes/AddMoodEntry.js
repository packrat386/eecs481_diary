var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var AddMoodEntryCom = require('../components/AddMoodEntry');
var Authentication = require('../utils/Authentication');


var AddMoodEntry = React.createClass({
	mixins: [Authentication],

	render: function(){
		return (
			<div className="container">
				<AddMoodEntryCom />
			</div>
		);
	}
});

module.exports = AddMoodEntry;

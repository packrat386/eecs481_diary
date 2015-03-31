var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var AddVisitEntryCom = require('../components/AddVisitEntry');
var Authentication = require('../utils/Authentication');


var AddVisitEntry = React.createClass({
	mixins: [Authentication],

	render: function(){
		return (
			<div className="container">
				<AddVisitEntryCom />
			</div>
		);
	}
});

module.exports = AddVisitEntry;

var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var AddDoodleEntryCom = require('../components/AddDoodleEntry');
var Authentication = require('../utils/Authentication');


var AddDoodleEntry = React.createClass({
	mixins: [Authentication],

	render: function(){
		return (
			<div className="container">
				<AddDoodleEntryCom />
			</div>
		);
	}
});

module.exports = AddDoodleEntry;

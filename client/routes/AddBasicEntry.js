var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var AddBasicEntryCom = require('../components/AddBasicEntry');
var Authentication = require('../utils/Authentication');


var AddBasicEntry = React.createClass({
	mixins: [Authentication],

	render: function(){
		return (
			<div className="container">
				<AddBasicEntryCom />
			</div>
		);
	}
});

module.exports = AddBasicEntry;

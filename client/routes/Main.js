var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var Authentication = require('../utils/Authentication');

var ListView = require('../components/ListView');

var Main = React.createClass({
	mixins: [Authentication],

	render: function(){
		return (
			<div className="container">
				<ListView />
			</div>
		);
	}
});

module.exports = Main;
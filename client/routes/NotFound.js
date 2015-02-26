var React = require('react');
var Router = require('react-router');

var NotFound = React.createClass({
	componentDidMount: function(){
		document.title = "ICU Diary | 404";
	},

	render: function(){

		return (
			<img src="http://cdn.gotraffic.net/business/public/images/bbiz404.3020e8d7.gif" width="675" height="380" />
		);
	}
})

module.exports = NotFound;